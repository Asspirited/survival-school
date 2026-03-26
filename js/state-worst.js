// state-worst.js — How Bad Is This? state management
// Single responsibility: state only. No DOM. No API.

const DEFAULT_STATE = {
  event: '',
  animal: '',
  circumstances: '',
  status: 'idle'   // idle | loading | results
};

let _state = JSON.parse(JSON.stringify(DEFAULT_STATE));

const getState = () => JSON.parse(JSON.stringify(_state));
const setEvent = (v) => { _state.event = v; };
const setAnimal = (v) => { _state.animal = v; };
const setCircumstances = (v) => { _state.circumstances = v; };
const setStatus = (s) => { _state.status = s; };

function buildSituation() {
  const parts = [];
  if (_state.event)         parts.push(`INCIDENT: ${_state.event}`);
  if (_state.animal)        parts.push(`ANIMAL / HAZARD: ${_state.animal}`);
  if (_state.circumstances) parts.push(`CIRCUMSTANCES: ${_state.circumstances}`);
  return parts.length ? parts.join('\n') : null;
}

function reset() {
  _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
}

export { getState, setEvent, setAnimal, setCircumstances, setStatus, buildSituation, reset };
