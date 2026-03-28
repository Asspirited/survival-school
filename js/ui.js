// ui.js — v2 with interaction loop rendering
// Single responsibility: DOM manipulation and rendering only.

import { CHARACTERS } from './characters.js';

// Tabs
function switchTab(mode) {
  ['guided', 'free'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === mode);
    document.getElementById(`panel-${t}`).classList.toggle('active', t === mode);
  });
}

// Chips
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

// Loading / error
function showLoading(msg = 'PANEL CONVENING') {
  document.getElementById('results').classList.add('show');
  const loading = document.getElementById('loading');
  loading.style.display = 'block';
  loading.innerHTML = `<span>${msg}</span><span class="dots"></span>`;
  document.getElementById('verdict-block').style.display = 'none';
  document.getElementById('interaction-block').style.display = 'none';
}

function showError(msg) {
  document.getElementById('loading').innerHTML =
    `<span style="color:var(--blood)">${msg}</span>`;
}

// Probability meter
function updateProbability(pct, animate = true) {
  const cls = pct >= 70 ? 'ok' : pct >= 40 ? 'mid' : '';
  const pctEl = document.getElementById('surv-pct');
  const fill = document.getElementById('pct-fill');
  pctEl.className = 'pct' + (cls ? ' ' + cls : '');
  fill.className = 'meter-fill' + (cls ? ' ' + cls : '');
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

// Render panel cards
function renderCards(panelData, container, startDelay = 0) {
  (panelData || []).forEach((r, i) => {
    const char = CHARACTERS[r.charId] || Object.values(CHARACTERS)[i];
    if (!char) return;

    const card = document.createElement('div');
    card.className = 'char-card' + (r.death ? ' death-card' : '') + (r.charId ? ` char-${r.charId}` : '');
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
      </div>`;

    container.appendChild(card);
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, startDelay + 80 + i * 100);
  });
}

// Attenborough bookend helpers
function showAttOpening(text) {
  const el = document.getElementById('att-opening');
  if (!el || !text) return;
  el.querySelector('.att-text').textContent = text;
  el.style.display = 'flex';
}

function showAttVerdict(text, delayMs = 0) {
  const el = document.getElementById('att-verdict');
  if (!el || !text) return;
  el.querySelector('.att-text').textContent = text;
  el.style.display = 'flex';
  el.classList.remove('visible');
  setTimeout(() => el.classList.add('visible'), delayMs + 50);
}

// Initial assessment results
function showResults(data, onDecision) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('verdict-block').style.display = 'block';

  showAttOpening(data.attenborough_opening);
  updateProbability(data.survival_probability);

  const container = document.getElementById('cards-out');
  container.innerHTML = '';
  renderCards(data.panel, container);

  const cardDelay = (data.panel?.length || 0) * 100 + 400;
  showAttVerdict(data.attenborough_verdict, cardDelay);

  showDecisionInput(data.next_actions, data.survival_probability, onDecision);
}

// Decision input after initial assessment
function showDecisionInput(nextActions, currentProbability, onDecision) {
  const block = document.getElementById('interaction-block');
  block.style.display = 'block';

  const actionsHtml = (nextActions || []).map(a =>
    `<div class="action-chip" onclick="window._onActionChip(this, '${a.replace(/'/g, "\\'")}')">${a}</div>`
  ).join('');

  block.innerHTML = `
    <div class="decision-header">
      <div class="decision-label">WHAT DO YOU DO?</div>
      <div class="turn-pct">Currently: <span style="color:${currentProbability < 40 ? 'var(--blood)' : currentProbability < 70 ? 'var(--amber)' : 'var(--green)'}">${currentProbability}%</span></div>
    </div>
    <div class="action-chips">${actionsHtml}</div>
    <div class="decision-input-row">
      <input type="text" id="decision-input" placeholder="or describe your decision..." />
      <button class="btn-decide" id="btn-decide" onclick="window._onDecide()">GO ↗</button>
    </div>`;

  window._onActionChip = (el, val) => {
    document.querySelectorAll('.action-chip').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
    document.getElementById('decision-input').value = val;
  };

  window._onDecide = () => {
    const val = document.getElementById('decision-input').value.trim();
    if (!val) return;
    onDecision(val);
  };

  document.getElementById('decision-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') window._onDecide();
  });
}

// Reaction results — appended below existing cards
function showReaction(data, turnCount, onDecision) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('verdict-block').style.display = 'block';
  document.getElementById('interaction-block').style.display = 'none';

  updateProbability(data.survival_probability);

  const cardsOut = document.getElementById('cards-out');

  // Remove previous att-verdict (will re-append new one)
  const prevVerdict = cardsOut.querySelector('.att-turn-verdict');
  if (prevVerdict) prevVerdict.remove();

  // Attenborough opening — frames what this decision caused
  if (data.attenborough_opening) {
    const opening = document.createElement('div');
    opening.className = 'att-turn-header';
    opening.innerHTML = `
      <div class="att-mini-avatar">DA</div>
      <div class="att-mini-text">${data.attenborough_opening}</div>`;
    cardsOut.appendChild(opening);
  }

  // Divider
  const divider = document.createElement('div');
  divider.className = 'turn-divider';
  divider.textContent = `TURN ${turnCount}`;
  cardsOut.appendChild(divider);

  // Situation update
  if (data.situation_update) {
    const banner = document.createElement('div');
    banner.className = 'situation-update';
    banner.textContent = data.situation_update;
    cardsOut.appendChild(banner);
  }

  // New panel cards
  const startCount = cardsOut.querySelectorAll('.char-card').length;
  renderCards(data.panel, cardsOut, 0);

  // Attenborough verdict after cards
  if (data.attenborough_verdict) {
    const cardDelay = (data.panel?.length || 0) * 100 + 400;
    setTimeout(() => {
      const verdict = document.createElement('div');
      verdict.className = 'att-turn-verdict att-fade';
      verdict.innerHTML = `
        <div class="att-mini-avatar">DA</div>
        <div class="att-mini-text">${data.attenborough_verdict}</div>`;
      cardsOut.appendChild(verdict);
      setTimeout(() => verdict.classList.add('visible'), 50);
    }, cardDelay);
    const nextDelay = (data.panel?.length || 0) * 100 + 900;
    if (data.is_terminal) {
      setTimeout(() => showTerminal(data.survival_probability), nextDelay);
    } else {
      setTimeout(() => showDecisionInput(data.next_actions, data.survival_probability, onDecision), nextDelay);
    }
  } else {
    if (data.is_terminal) {
      showTerminal(data.survival_probability);
    } else {
      setTimeout(() => showDecisionInput(data.next_actions, data.survival_probability, onDecision), 800);
    }
  }
}

// Terminal state
function showTerminal(probability) {
  const block = document.getElementById('interaction-block');
  block.style.display = 'block';

  if (probability <= 0) {
    block.innerHTML = `
      <div class="terminal terminal-dead">
        <div class="terminal-label">YOU DID NOT SURVIVE</div>
        <div class="terminal-sub">Attenborough will close proceedings.</div>
      </div>
      <div class="reset-row"><button class="btn-reset" onclick="window._onReset()">TRY AGAIN</button></div>`;
  } else {
    block.innerHTML = `
      <div class="terminal terminal-alive">
        <div class="terminal-label">YOU SURVIVED</div>
        <div class="terminal-sub">Improbably. The panel is as surprised as you are.</div>
      </div>
      <div class="reset-row"><button class="btn-reset" onclick="window._onReset()">NEW SITUATION</button></div>`;
  }
}

function hideResults() {
  document.getElementById('results').classList.remove('show');
  document.getElementById('verdict-block').style.display = 'none';
  document.getElementById('interaction-block').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loading').innerHTML = '<span>PANEL CONVENING</span><span class="dots"></span>';
  document.getElementById('cards-out').innerHTML = '';
  document.getElementById('surv-pct').textContent = '0%';
  document.getElementById('pct-fill').style.width = '0%';
  const opening = document.getElementById('att-opening');
  if (opening) { opening.style.display = 'none'; opening.classList.remove('visible'); }
  const verdict = document.getElementById('att-verdict');
  if (verdict) { verdict.style.display = 'none'; verdict.classList.remove('visible'); }
}

function setButtonState(mode, disabled) {
  const btn = document.getElementById(`btn-${mode}`);
  if (btn) btn.disabled = disabled;
}

export {
  switchTab, pickChip, clearChips, clearAll,
  showLoading, showError, showResults, showReaction,
  showTerminal, hideResults, setButtonState, updateProbability,
  showAttOpening, showAttVerdict
};
