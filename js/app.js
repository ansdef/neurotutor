/* =====================================================
   STATE
   ===================================================== */
const state = {
  goal: null,
  country: null,
  stressLevel: 0,
  situations: new Set(),
  currentScenarioIndex: 0,
  viewHistory: [],
};

/* =====================================================
   NAVIGATION
   ===================================================== */
function showView(id, pushHistory = true) {
  const current = document.querySelector('.view.active');
  if (current) {
    if (pushHistory) state.viewHistory.push(current.id);
    current.classList.remove('active');
  }
  const next = document.getElementById(id);
  if (next) next.classList.add('active');
  updateNav(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  if (state.viewHistory.length === 0) return;
  const prevId = state.viewHistory.pop();
  const current = document.querySelector('.view.active');
  if (current) current.classList.remove('active');
  const prev = document.getElementById(prevId);
  if (prev) prev.classList.add('active');
  updateNav(prevId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNav(viewId) {
  const backBtn = document.getElementById('btn-nav-back');
  const stepIndicator = document.getElementById('nav-step-indicator');
  const onboardViews = ['view-onboard-1', 'view-onboard-2', 'view-onboard-3', 'view-onboard-4'];
  const stepMap = { 'view-onboard-1': 0, 'view-onboard-2': 1, 'view-onboard-3': 2, 'view-onboard-4': 3 };

  if (onboardViews.includes(viewId)) {
    backBtn.style.display = 'block';
    stepIndicator.style.display = 'flex';
    const dots = stepIndicator.querySelectorAll('.step-dot');
    const activeIdx = stepMap[viewId];
    dots.forEach((d, i) => d.classList.toggle('active', i <= activeIdx));
  } else {
    backBtn.style.display = 'none';
    stepIndicator.style.display = 'none';
  }
}

/* =====================================================
   ONBOARDING — CHOICES
   ===================================================== */
function selectChoice(el, field) {
  const group = el.closest('.choice-grid');
  group.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state[field] = el.dataset.value;

  const continueMap = { goal: 'btn-continue-1', country: 'btn-continue-2' };
  const btn = document.getElementById(continueMap[field]);
  if (btn) btn.disabled = false;
}

function toggleSituation(el) {
  const val = el.dataset.value;
  if (state.situations.has(val)) {
    state.situations.delete(val);
    el.classList.remove('selected');
  } else {
    state.situations.add(val);
    el.classList.add('selected');
  }
  const btn = document.getElementById('btn-continue-4');
  if (btn) btn.disabled = state.situations.size === 0;
}

/* =====================================================
   STRESS SLIDER
   ===================================================== */
function updateStress(value) {
  state.stressLevel = parseInt(value, 10);
  const level = STRESS_LEVELS.find(l => value >= l.min && value <= l.max);
  if (!level) return;
  document.getElementById('stress-emoji').textContent = level.emoji;
  document.getElementById('stress-text').textContent = level.text;

  const slider = document.getElementById('stress-slider');
  const pct = (value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, var(--accent-orange) ${pct}%, var(--border-default) ${pct}%)`;
}

/* =====================================================
   PLAN BUILDER
   ===================================================== */
function buildPlan() {
  const goal = state.goal || 'moving';
  const items = PLAN_ITEMS_BY_GOAL[goal] || PLAN_ITEMS_BY_GOAL.moving;

  const summaryEl = document.getElementById('plan-summary');
  summaryEl.innerHTML = items.map(item => `
    <div class="plan-summary-item">
      <span>${item.icon}</span>
      <span>${item.label}</span>
    </div>
  `).join('');

  const situationCount = 8 + state.situations.size * 2;
  document.getElementById('plan-situations-count').textContent = situationCount;

  showView('view-plan-ready');
}

/* =====================================================
   PRACTICE & FEEDBACK
   ===================================================== */
function submitResponse() {
  const input = document.getElementById('response-input');
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.style.borderColor = '#E05454';
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
    return;
  }

  const scenario = AIRPORT_SCENARIOS[state.currentScenarioIndex] || AIRPORT_SCENARIOS[0];
  renderFeedback(text, scenario);
  showView('view-feedback');
}

function renderFeedback(userText, scenario) {
  const { feedback } = scenario;

  const badge = document.getElementById('feedback-score');
  badge.textContent = { good: 'Good try', great: 'Well done', 'needs-work': 'Needs work' }[feedback.score] || 'Good try';
  badge.className = `feedback-score-badge ${feedback.score}`;

  document.getElementById('feedback-original-text').textContent = `"${userText}"`;
  document.getElementById('feedback-improved-text').textContent = feedback.improved;
  document.getElementById('exp-grammar').textContent = feedback.grammarNote;
  document.getElementById('exp-tone').textContent = feedback.toneNote;

  const issuesEl = document.querySelector('.feedback-issues');
  issuesEl.innerHTML = feedback.issues.length
    ? feedback.issues.map(i => `<span class="issue-tag">${i}</span>`).join('')
    : '<span class="issue-tag" style="color:var(--accent-green);background:var(--accent-green-dim);border-color:rgba(82,196,138,0.3)">✓ natural</span>';
}

function nextScenario() {
  state.currentScenarioIndex = (state.currentScenarioIndex + 1) % AIRPORT_SCENARIOS.length;
  const scenario = AIRPORT_SCENARIOS[state.currentScenarioIndex];
  loadScenario(scenario);
  document.getElementById('response-input').value = '';
  showView('view-practice');
}

function loadScenario(scenario) {
  document.getElementById('scenario-question').textContent = scenario.question;
  document.querySelector('.scenario-avatar').textContent = scenario.speaker;
  document.querySelector('.scenario-role').textContent = scenario.role;
  document.querySelector('.context-text').textContent = scenario.context;
  document.querySelector('.hint-tag').textContent = scenario.hint;

  const counter = document.querySelector('.scenario-counter');
  if (counter) counter.textContent = `Question ${scenario.id} of ${AIRPORT_SCENARIOS.length}`;

  const dots = document.querySelectorAll('.scenario-dots .sdot');
  dots.forEach((d, i) => d.classList.toggle('active', i === scenario.id - 1));
}

/* =====================================================
   UTILITIES
   ===================================================== */
function copyPhrase(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}

/* =====================================================
   DEPARTURE BOARD ANIMATION
   ===================================================== */
const FLIP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function flipText(el, target, duration = 500, onDone) {
  const steps = 10;
  let step = 0;
  const interval = setInterval(() => {
    let result = '';
    for (let i = 0; i < target.length; i++) {
      if (target[i] === ' ') {
        result += ' ';
      } else if (step >= steps - 2 || Math.random() > 0.45) {
        result += target[i];
      } else {
        result += FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)];
      }
    }
    el.textContent = result;
    step++;
    if (step >= steps) {
      el.textContent = target;
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, duration / steps);
}

function startDepartureBoard() {
  const textEl = document.getElementById('board-text');
  const locEl = document.getElementById('board-country');
  if (!textEl || !locEl) return;

  let idx = 0;
  function cycle() {
    const item = BOARD_SITUATIONS[idx % BOARD_SITUATIONS.length];
    flipText(textEl, item.text, 600, () => {
      locEl.textContent = item.location;
    });
    idx++;
    setTimeout(cycle, 3200);
  }
  setTimeout(cycle, 1200);
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  updateStress(0);
  startDepartureBoard();
});
