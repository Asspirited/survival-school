// state.js
// Single responsibility: input state and session state.
// No DOM manipulation. No API calls. No character knowledge.
// Pure state — readable, snapshotable, testable.

const DEFAULT_STATE = {
  mode: 'guided',        // 'guided' | 'free'
  guided: {
    loc: '',
    sit: '',
    who: '',
    wx: ''
  },
  free: {
    text: ''
  },
  status: 'idle'         // 'idle' | 'loading' | 'results' | 'error'
};

let _state = JSON.parse(JSON.stringify(DEFAULT_STATE));

function getState() {
  return JSON.parse(JSON.stringify(_state));
}

function setMode(mode) {
  _state.mode = mode;
}

function setGuidedField(field, value) {
  _state.guided[field] = value;
}

function setFreeText(text) {
  _state.free.text = text;
}

function setStatus(status) {
  _state.status = status;
}

function reset() {
  _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
}

// Build situation string for API from current state
function buildSituation() {
  if (_state.mode === 'free') {
    return _state.free.text.trim() || null;
  }
  const { loc, sit, who, wx } = _state.guided;
  if (!loc && !sit) return null;
  return [
    loc && `Location: ${loc}`,
    sit && `Situation: ${sit}`,
    who && `With you: ${who}`,
    wx  && `Conditions: ${wx}`
  ].filter(Boolean).join('\n');
}

export { getState, setMode, setGuidedField, setFreeText, setStatus, reset, buildSituation };
