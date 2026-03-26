// ui.js
// Single responsibility: DOM manipulation and rendering.
// No API calls. No character data. No state management.
// Takes data, renders it. Pure UI.

import { CHARACTERS } from './characters.js';

function switchTab(mode) {
  ['guided', 'free'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === mode);
    document.getElementById(`panel-${t}`).classList.toggle('active', t === mode);
  });
}

function pickChip(el, field) {
  document.querySelectorAll(`#chips-${field} .chip`).forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
}

function clearChips(field) {
  document.querySelectorAll(`#chips-${field} .chip`).forEach(c => c.classList.remove('sel'));
}

function clearAll() {
  ['loc', 'sit', 'who', 'wx'].forEach(f => {
    const el = document.getElementById(`${f}-input`);
    if (el) el.value = '';
    clearChips(f);
  });
  const free = document.getElementById('free-input');
  if (free) free.value = '';
}

function showLoading() {
  document.getElementById('results').classList.add('show');
  document.getElementById('loading').style.display = 'block';
  document.getElementById('verdict-block').style.display = 'none';
}

function showError(msg) {
  document.getElementById('loading').innerHTML =
    `<span style="color:#8B0000">${msg}</span>`;
}

function showResults(data) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('verdict-block').style.display = 'block';

  // Survival probability meter
  const pct = data.survival_probability;
  const cls = pct >= 70 ? 'ok' : pct >= 40 ? 'mid' : '';
  const pctEl = document.getElementById('surv-pct');
  const fill = document.getElementById('pct-fill');

  pctEl.className = 'screwed-pct' + (cls ? ' ' + cls : '');
  fill.className = 'pct-fill' + (cls ? ' ' + cls : '');
  fill.style.width = '0%';
  pctEl.textContent = '0%';

  setTimeout(() => {
    fill.style.width = pct + '%';
    pctEl.textContent = pct + '%';
  }, 100);

  // Attenborough verdict
  document.getElementById('att-verdict').textContent = data.attenborough_verdict || '';

  // Panel cards
  const container = document.getElementById('cards-out');
  container.innerHTML = '';

  (data.panel || []).forEach((r, i) => {
    const char = CHARACTERS[r.charId] || Object.values(CHARACTERS)[i];
    if (!char) return;

    const card = document.createElement('div');
    card.className = 'char-card' + (r.death ? ' death-card' : '');

    card.innerHTML = `
      <div class="card-head">
        <div class="avatar ${char.avClass}">${char.av}</div>
        <div>
          <div class="char-name">${char.name}</div>
          <div class="char-role">${char.role}</div>
        </div>
      </div>
      <div class="card-body">
        ${r.text}
        ${r.death && char.deathLine
          ? `<div class="death-note">${char.deathLine}</div>`
          : ''}
      </div>`;

    container.appendChild(card);
    setTimeout(() => card.classList.add('show'), 120 + i * 110);
  });
}

function hideResults() {
  document.getElementById('results').classList.remove('show');
  document.getElementById('verdict-block').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loading').innerHTML =
    '<span>PANEL CONVENING</span><span class="dots"></span>';
  document.getElementById('cards-out').innerHTML = '';
  document.getElementById('surv-pct').textContent = '0%';
  document.getElementById('pct-fill').style.width = '0%';
}

function setButtonState(mode, disabled) {
  const btn = document.getElementById(`btn-${mode}`);
  if (btn) btn.disabled = disabled;
}

export {
  switchTab, pickChip, clearChips, clearAll,
  showLoading, showError, showResults, hideResults,
  setButtonState
};
