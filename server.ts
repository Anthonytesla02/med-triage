import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CASE_LIBRARY } from './src/data/caseLibrary';
import { STG_GUIDELINES } from './src/data/stgGuidelines';
import { DRUG_DATABASE } from './src/data/drugList';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// API: Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Guidelines & Formulary
app.get('/api/guidelines', (req: Request, res: Response) => {
  res.json(STG_GUIDELINES);
});

app.get('/api/drugs', (req: Request, res: Response) => {
  res.json(DRUG_DATABASE);
});

// API: Case Generation (via Gemini API with verified schema fallback)
app.post('/api/generate-case', async (req: Request, res: Response) => {
  const { category, difficulty } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Return verified case from library matching criteria
    const filtered = CASE_LIBRARY.filter(c => 
      (!category || category === 'all' || c.category === category) &&
      (!difficulty || c.difficulty === difficulty)
    );
    const selected = filtered[Math.floor(Math.random() * filtered.length)] || CASE_LIBRARY[0];
    return res.json({ case: selected, source: 'verified_library' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a senior clinical pharmacist and medical simulation expert.
Create a realistic, structured 2D pharmacy emergency case in valid JSON.
Category: ${category || 'trauma'}
Difficulty: ${difficulty || 'intermediate'}

Output JSON matching this exact structure:
{
  "title": string,
  "category": "trauma" | "acute_emergency" | "pharma_emergency",
  "difficulty": "beginner" | "intermediate" | "advanced" | "expert",
  "timeLimitSeconds": number (optional, 90-120 for acute emergencies),
  "patient": {
    "gender": "male" | "female",
    "ageGroup": "child" | "adult" | "elderly",
    "skinTone": "#8d5524" | "#c68642" | "#5c3826" | "#3e2723",
    "name": string,
    "age": number,
    "expression": "in_pain" | "gasping" | "distressed" | "unconscious"
  },
  "presentingComplaint": string,
  "patientStatement": string,
  "visibleFindings": [string],
  "affectedBodyRegion": "head_face" | "chest" | "abdomen" | "right_arm" | "left_arm" | "right_hand" | "left_hand" | "right_leg" | "left_leg",
  "injuryType": "laceration" | "abrasion" | "burn_thermal" | "asthma" | "anaphylaxis" | "seizure" | "drug_reaction",
  "initialVitals": {
    "heartRate": number,
    "bloodPressure": string,
    "respiratoryRate": number,
    "oxygenSaturation": number,
    "temperature": number,
    "gcsOrAvpu": "Alert" | "Voice" | "Pain" | "Unresponsive"
  },
  "medicalHistory": [string],
  "currentMedications": [string],
  "knownAllergies": [string],
  "expectedOutcomeSummary": string,
  "stgReference": {
    "guidelineTitle": string,
    "chapter": string,
    "keyPoints": [string],
    "referralCriteria": [string]
  },
  "educationalExplanations": {
    "whyCorrect": string,
    "commonPitfalls": string,
    "safetyPearls": string
  }
}
Return raw JSON only, no markdown backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.title && parsed.affectedBodyRegion) {
      // Merge with safe rubric and available supplies
      const fallback = CASE_LIBRARY.find(c => c.category === (parsed.category || category)) || CASE_LIBRARY[0];
      const completeCase = {
        ...parsed,
        id: `ai-case-${Date.now()}`,
        availableSupplies: fallback.availableSupplies,
        rubric: fallback.rubric
      };
      return res.json({ case: completeCase, source: 'ai_generated' });
    }
  } catch (err) {
    console.error('AI generation fallback to library:', err);
  }

  // Fallback to verified library case
  const filtered = CASE_LIBRARY.filter(c => 
    (!category || category === 'all' || c.category === category)
  );
  const selected = filtered[Math.floor(Math.random() * filtered.length)] || CASE_LIBRARY[0];
  res.json({ case: selected, source: 'verified_library' });
});

// Vite Middleware for Full-Stack React Applet
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`PharmEmerg Simulator running on http://0.0.0.0:${port}`);
  });
}

startServer();
