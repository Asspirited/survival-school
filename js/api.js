// api.js
// Single responsibility: Worker integration and API calls.
// Nothing outside this file knows how to talk to the backend.
// PACT contract lives here — if the Worker changes, this file changes.

import { buildSystemPrompt } from './characters.js';

const WORKER_ENDPOINT = '/survival-school/assess';

// PACT contract — request shape
function buildRequest(situation) {
  return {
    system: buildSystemPrompt(),
    situation: situation
  };
}

// PACT contract — response shape
// { survival_probability, attenborough_verdict, panel[] }
// panel[]: { charId, text, death }
async function assess(situation) {
  const response = await fetch(WORKER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildRequest(situation))
  });

  if (!response.ok) {
    throw new Error(`Worker responded ${response.status}`);
  }

  const data = await response.json();

  // Validate response shape before returning
  if (!data.panel || !Array.isArray(data.panel)) {
    throw new Error('Invalid response shape from Worker');
  }

  return data;
}

export { assess };
