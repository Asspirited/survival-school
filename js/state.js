// state.js — v2 with interaction loop state
// Single responsibility: all state management. No DOM. No API.

const DEFAULT_STATE = {
  mode: 'guided',
  guided: { loc: '', sit: '', who: '', wx: '' },
  free: { text: '' },
  status: 'idle',         // idle | loading | results | reacting | terminal
  situation: null,        // built situation string, persists across reactions
  probability: null,      // current survival probability
  turnCount: 0,           // how many decisions made
  history: []             // array of {decision, probability, situationUpdate}
};

let _state = JSON.parse(JSON.stringify(DEFAULT_STATE));

const getState = () => JSON.parse(JSON.stringify(_state));
const setMode = (mode) => { _state.mode = mode; };
const setGuidedField = (field, value) => { _state.guided[field] = value; };
const setFreeText = (text) => { _state.free.text = text; };
const setStatus = (status) => { _state.status = status; };

function setProbability(p) {
  _state.probability = Math.max(0, Math.min(100, p));
}

function setSituation(s) {
  _state.situation = s;
}

function recordDecision(decision, newProbability, situationUpdate) {
  _state.history.push({
    decision,
    probability: newProbability,
    situationUpdate
  });
  _state.turnCount++;
  setProbability(newProbability);
}

function reset() {
  _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function buildSituation() {
  if (_state.mode === 'free') return _state.free.text.trim() || null;
  const { loc, sit, who, wx } = _state.guided;
  if (!loc && !sit) return null;
  return [
    loc && `Location: ${loc}`,
    sit && `Situation: ${sit}`,
    who && `With you: ${who}`,
    wx  && `Conditions: ${wx}`
  ].filter(Boolean).join('\n');
}

export {
  getState, setMode, setGuidedField, setFreeText,
  setStatus, setProbability, setSituation, recordDecision,
  reset, buildSituation
};
