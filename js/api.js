// api.js — v2 with reaction mode support
// Single responsibility: Worker integration and API calls.

import { buildSystemPrompt } from './characters.js';

const WORKER_ENDPOINT = '/survival-school/assess';

async function assess(situation) {
  const response = await fetch(WORKER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system: buildSystemPrompt('assessment'),
      situation
    })
  });
  if (!response.ok) throw new Error(`Worker ${response.status}`);
  const data = await response.json();
  if (!data.panel || !Array.isArray(data.panel)) throw new Error('Invalid response');
  return data;
}

async function react(situation, decision, currentProbability) {
  const context = `ORIGINAL SITUATION:\n${situation}\n\nCURRENT SURVIVAL PROBABILITY: ${currentProbability}%\n\nUSER'S DECISION: ${decision}`;
  const response = await fetch(WORKER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system: buildSystemPrompt('reaction'),
      situation: context
    })
  });
  if (!response.ok) throw new Error(`Worker ${response.status}`);
  const data = await response.json();
  if (!data.panel || !Array.isArray(data.panel)) throw new Error('Invalid response');
  return data;
}

export { assess, react };
