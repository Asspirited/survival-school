// ui-worst.js — How Bad Is This? rendering
// Single responsibility: DOM manipulation only.

import { CHARACTERS_WORST } from './characters-worst.js';

function clearChips(field) {
  document.querySelectorAll(`#chips-${field} .chip`).forEach(c => c.classList.remove('sel'));
}

function clearAll() {
  ['event', 'animal', 'circ'].forEach(f => {
    clearChips(f);
    const el = document.getElementById(`${f}-input`);
    if (el) el.value = '';
  });
}

function showLoading() {
  document.getElementById('results').classList.add('show');
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loading').innerHTML = '<span>PANEL CONVENING</span><span class="dots"></span>';
  document.getElementById('verdict-block').style.display = 'none';
}

function showError(msg) {
  document.getElementById('loading').innerHTML =
    `<span style="color:var(--blood)">${msg}</span>`;
}

// Doom meter — inverted: 0=green (fine), 100=red (dead)
function updateDoom(pct, animate = true) {
  const cls = pct <= 30 ? 'ok' : pct <= 65 ? 'mid' : '';
  const pctEl = document.getElementById('doom-pct');
  const fill  = document.getElementById('doom-fill');
  pctEl.className = 'pct doom' + (cls ? ' ' + cls : '');
  fill.className  = 'meter-fill' + (cls ? ' ' + cls : '');
  if (animate) {
    fill.style.width = '0%';
    pctEl.textContent = '0%';
    setTimeout(() => {
      fill.style.width = pct + '%';
      pctEl.textContent = pct + '%';
    }, 100);
  } else {
    fill.style.width = pct + '%';
    pctEl.textContent = pct + '%';
  }
}

function renderResults(data) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('verdict-block').style.display = 'block';

  // Attenborough opening — above doom meter
  const openingEl = document.getElementById('att-opening');
  if (openingEl && data.attenborough_opening) {
    openingEl.querySelector('.att-text').textContent = data.attenborough_opening;
    openingEl.style.display = 'flex';
  }

  updateDoom(data.doom_percentage);

  const container = document.getElementById('cards-out');
  container.innerHTML = '';

  (data.panel || []).forEach((r, i) => {
    const char = CHARACTERS_WORST[r.charId];
    if (!char) return;

    const isCody = r.charId === 'cody';
    const card = document.createElement('div');
    card.className = 'char-card' +
      (r.death ? ' death-card' : '') +
      (isCody ? ' cody-card' : '') +
      (r.charId ? ` char-${r.charId}` : '');
    card.style.opacity = '0';
    card.style.transform = 'translateY(7px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

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
        ${r.death && char.deathLine ? `<div class="death-note">${char.deathLine}</div>` : ''}
        ${r.fact_check ? `<div class="fact-check">&#10033; ${r.fact_check}</div>` : ''}
        ${isCody && r.action ? `<div class="action-line">&#9658; ${r.action}</div>` : ''}
      </div>`;

    container.appendChild(card);
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 + i * 100);
  });

  // Attenborough verdict — below cards, delayed
  if (data.attenborough_verdict) {
    const cardDelay = (data.panel?.length || 0) * 100 + 400;
    const verdictEl = document.getElementById('att-verdict');
    if (verdictEl) {
      setTimeout(() => {
        verdictEl.querySelector('.att-text').textContent = data.attenborough_verdict;
        verdictEl.style.display = 'flex';
        setTimeout(() => verdictEl.classList.add('visible'), 50);
      }, cardDelay);
    }
  }
}

function hideResults() {
  document.getElementById('results').classList.remove('show');
  document.getElementById('verdict-block').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loading').innerHTML = '<span>PANEL CONVENING</span><span class="dots"></span>';
  document.getElementById('cards-out').innerHTML = '';
  document.getElementById('doom-pct').textContent = '0%';
  document.getElementById('doom-fill').style.width = '0%';
  const opening = document.getElementById('att-opening');
  if (opening) { opening.style.display = 'none'; }
  const verdict = document.getElementById('att-verdict');
  if (verdict) { verdict.style.display = 'none'; verdict.classList.remove('visible'); }
}

function setButtonState(disabled) {
  const btn = document.getElementById('btn-assess');
  if (btn) btn.disabled = disabled;
}

export { clearChips, clearAll, showLoading, showError, renderResults, hideResults, setButtonState };
