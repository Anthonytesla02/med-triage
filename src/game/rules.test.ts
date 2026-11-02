import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  evaluateCasePerformance, 
  calculateLevelFromXp, 
  updateProfileWithResult, 
  INITIAL_IDP_PROFILE 
} from './rules';
import { CASE_LIBRARY, CHALLENGE_TOPICS, buildCaseFromTopicAndVariation } from '../data/caseLibrary';
import { AppliedAction } from '../types/clinical';

test('calculateLevelFromXp calculates correct level and remaining XP', () => {
  const level1 = calculateLevelFromXp(120);
  assert.equal(level1.level, 1);
  assert.equal(level1.title, 'Pharmacy Intern');
  assert.equal(level1.xpToNextLevel, 180);

  const level3 = calculateLevelFromXp(900);
  assert.equal(level3.level, 3);
  assert.equal(level3.title, 'Triage & First Aid Specialist');
});

test('Flawless trauma procedure scores 100% and awards achievements', () => {
  const minorCutCase = CASE_LIBRARY.find(c => c.id.includes('topic-wound-laceration'))!;
  assert.ok(minorCutCase);

  const actions: AppliedAction[] = [
    {
      id: 'a1',
      supplyId: 'gloves',
      supplyName: 'Sterile Exam Gloves',
      targetRegion: 'right_leg',
      timestampSeconds: 5,
      isEssential: true,
      isHarmful: false,
      isContraindicated: false,
      clinicalFeedback: 'PPE donned.'
    },
    {
      id: 'a2',
      supplyId: 'sterile_saline',
      supplyName: 'Sterile Saline',
      targetRegion: 'right_leg',
      timestampSeconds: 12,
      isEssential: true,
      isHarmful: false,
      isContraindicated: false,
      clinicalFeedback: 'Wound irrigated.'
    },
    {
      id: 'a3',
      supplyId: 'direct_pressure',
      supplyName: 'Firm Direct Pressure',
      targetRegion: 'right_leg',
      timestampSeconds: 20,
      isEssential: true,
      isHarmful: false,
      isContraindicated: false,
      clinicalFeedback: 'Hemostasis achieved.'
    },
    {
      id: 'a4',
      supplyId: 'sterile_gauze',
      supplyName: 'Sterile Gauze Pad',
      targetRegion: 'right_leg',
      timestampSeconds: 28,
      isEssential: true,
      isHarmful: false,
      isContraindicated: false,
      clinicalFeedback: 'Gauze applied.'
    },
    {
      id: 'a5',
      supplyId: 'elastic_bandage',
      supplyName: 'Conforming Roller Bandage',
      targetRegion: 'right_leg',
      timestampSeconds: 38,
      isEssential: true,
      isHarmful: false,
      isContraindicated: false,
      clinicalFeedback: 'Bandage secured.'
    }
  ];

  const result = evaluateCasePerformance(minorCutCase, actions, 45, false, INITIAL_IDP_PROFILE);
  assert.equal(result.score, 100);
  assert.equal(result.performanceBand, 'flawless');
  assert.equal(result.criticalSafetyErrors.length, 0);
  assert.equal(result.isCriticalOverride, false);
  assert.ok(result.unlockedBadges.includes('badge_wound_specialist'));
});

test('Toxicology: Inducing vomiting in kerosene poisoning triggers critical safety override', () => {
  const keroseneTopic = CHALLENGE_TOPICS.find(t => t.topicId === 'topic-toxicology-kerosene')!;
  assert.ok(keroseneTopic);
  const keroseneCase = buildCaseFromTopicAndVariation(keroseneTopic, 0);

  const actionsWithVomiting: AppliedAction[] = [
    {
      id: 'k1',
      supplyId: 'gloves',
      supplyName: 'Sterile Exam Gloves',
      targetRegion: 'head_face',
      timestampSeconds: 5,
      isEssential: true,
      isHarmful: false,
      isContraindicated: false,
      clinicalFeedback: 'Gloves donned.'
    },
    {
      id: 'k2',
      supplyId: 'induce_vomiting',
      supplyName: 'Induce Vomiting',
      targetRegion: 'head_face',
      timestampSeconds: 15,
      isEssential: false,
      isHarmful: true,
      isContraindicated: true,
      clinicalFeedback: 'Inducing vomiting causes fatal chemical aspiration pneumonitis.'
    }
  ];

  const result = evaluateCasePerformance(keroseneCase, actionsWithVomiting, 30, false, INITIAL_IDP_PROFILE);
  assert.ok(result.isCriticalOverride);
  assert.ok(result.score <= 45);
  assert.equal(result.performanceBand, 'critical_failure');
  assert.ok(result.criticalSafetyErrors.some(e => e.includes('vomiting')));
});

test('Epistaxis: Tilting head backwards triggers critical safety override', () => {
  const epistaxisTopic = CHALLENGE_TOPICS.find(t => t.topicId === 'topic-epistaxis')!;
  assert.ok(epistaxisTopic);
  const epistaxisCase = buildCaseFromTopicAndVariation(epistaxisTopic, 0);

  const actionsWithTilt: AppliedAction[] = [
    {
      id: 'ep1',
      supplyId: 'tilt_head_back',
      supplyName: 'Tilt Head Backwards',
      targetRegion: 'head_face',
      timestampSeconds: 10,
      isEssential: false,
      isHarmful: true,
      isContraindicated: true,
      clinicalFeedback: 'Tilting head backwards causes blood aspiration and emesis.'
    }
  ];

  const result = evaluateCasePerformance(epistaxisCase, actionsWithTilt, 20, false, INITIAL_IDP_PROFILE);
  assert.ok(result.isCriticalOverride);
  assert.ok(result.score <= 45);
  assert.ok(result.criticalSafetyErrors.some(e => e.includes('backwards')));
});

test('Snakebite: Applying tourniquet triggers critical safety hazard', () => {
  const snakebiteTopic = CHALLENGE_TOPICS.find(t => t.topicId === 'topic-venomous-snakebite')!;
  assert.ok(snakebiteTopic);
  const snakebiteCase = buildCaseFromTopicAndVariation(snakebiteTopic, 0);

  const actionsWithTourniquet: AppliedAction[] = [
    {
      id: 'sb1',
      supplyId: 'snakebite_tourniquet',
      supplyName: 'Arterial Tourniquet for Snakebite',
      targetRegion: 'right_leg',
      timestampSeconds: 15,
      isEssential: false,
      isHarmful: true,
      isContraindicated: true,
      clinicalFeedback: 'Tourniquet concentrates venom causing local gangrene.'
    }
  ];

  const result = evaluateCasePerformance(snakebiteCase, actionsWithTourniquet, 25, false, INITIAL_IDP_PROFILE);
  assert.ok(result.isCriticalOverride);
  assert.ok(result.criticalSafetyErrors.some(e => e.includes('Tourniquets')));
});

test('Each challenge topic has up to 5 distinct clinical variations', () => {
  for (const topic of CHALLENGE_TOPICS) {
    assert.equal(topic.variations.length, 5, `Topic ${topic.topicId} must have 5 variations`);
    const var1 = buildCaseFromTopicAndVariation(topic, 0);
    const var2 = buildCaseFromTopicAndVariation(topic, 1);
    assert.notEqual(var1.patient.name, var2.patient.name);
  }
});
