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
  lastFeedbackScore: null,
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
  if (id === 'view-practice') {
    loadScenario(getScenarios()[state.currentScenarioIndex]);
  }
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
   LANGUAGE TOGGLE
   ===================================================== */
function setLang(lang) {
  LANG.set(lang);
  applyTranslations();
  updateLangPills();

  const activeView = document.querySelector('.view.active');
  if (!activeView) return;
  const vid = activeView.id;
  if (vid === 'view-onboard-3') updateStress(document.getElementById('stress-slider').value);
  if (vid === 'view-dashboard') buildDashboard();
  if (vid === 'view-practice') { loadScenario(getScenarios()[state.currentScenarioIndex]); updateCountryNote(); }
  if (vid === 'view-feedback') {
    const scenario = getScenarios()[state.currentScenarioIndex];
    document.getElementById('exp-grammar').textContent =
      lang === 'ru' ? scenario.feedback.grammarNoteRu : scenario.feedback.grammarNote;
    document.getElementById('exp-tone').textContent =
      lang === 'ru' ? scenario.feedback.toneNoteRu : scenario.feedback.toneNote;
    if (state.lastFeedbackScore) {
      const scoreKey = { good: 'fb.score.good', great: 'fb.score.great', 'needs-work': 'fb.score.needswork' };
      document.getElementById('feedback-score').textContent = LANG.t(scoreKey[state.lastFeedbackScore]);
    }
  }
}

function toggleLang() {
  setLang(LANG.current === 'ru' ? 'en' : 'ru');
}

function updateLangPills() {
  const lang = LANG.current;
  document.getElementById('lang-pill-ru')?.classList.toggle('active', lang === 'ru');
  document.getElementById('lang-pill-en')?.classList.toggle('active', lang === 'en');
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
  document.getElementById('stress-text').textContent =
    LANG.current === 'ru' ? level.textRu : level.text;

  const slider = document.getElementById('stress-slider');
  const pct = (value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background =
    `linear-gradient(to right, var(--accent-orange) ${pct}%, var(--border-default) ${pct}%)`;
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
      <span>${LANG.current === 'ru' ? item.labelRu : item.label}</span>
    </div>
  `).join('');

  document.getElementById('plan-situations-count').textContent = 8 + state.situations.size * 2;
  buildDashboard();
  showView('view-plan-ready');
}

function buildDashboard() {
  const data = DASHBOARD_BY_GOAL[state.goal] || DASHBOARD_BY_GOAL.moving;
  const lang = LANG.current;

  document.getElementById('dash-mission-title').textContent =
    lang === 'ru' ? data.missionTitleRu : data.missionTitle;
  document.getElementById('dash-mission-desc').textContent =
    lang === 'ru' ? data.missionDescRu : data.missionDesc;

  const levelKey = { beginner: 'dash.beginner', intermediate: 'dash.intermediate' };
  document.getElementById('quick-situations-list').innerHTML = data.situations.map(s => `
    <button class="quick-sit-card" onclick="showView('view-practice')">
      <span class="quick-sit-icon">${s.icon}</span>
      <div class="quick-sit-info">
        <span class="quick-sit-title">${lang === 'ru' ? s.titleRu : s.title}</span>
        <span class="quick-sit-meta">${s.min} ${LANG.t('dash.min')} · ${LANG.t(levelKey[s.level])}</span>
      </div>
      <span class="quick-sit-arrow">→</span>
    </button>
  `).join('');
}

/* =====================================================
   PRACTICE & FEEDBACK
   ===================================================== */
function getScenarios() {
  return SCENARIOS_BY_GOAL[state.goal] || SCENARIOS_BY_GOAL.moving;
}

function submitResponse() {
  const input = document.getElementById('response-input');
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.style.borderColor = '#E05454';
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
    return;
  }
  const scenarios = getScenarios();
  const scenario = scenarios[state.currentScenarioIndex] || scenarios[0];
  renderFeedback(text, scenario);
  showView('view-feedback');
}

function renderFeedback(userText, scenario) {
  const { feedback } = scenario;
  const lang = LANG.current;
  state.lastFeedbackScore = feedback.score;

  const scoreKey = { good: 'fb.score.good', great: 'fb.score.great', 'needs-work': 'fb.score.needswork' };
  const badge = document.getElementById('feedback-score');
  badge.textContent = LANG.t(scoreKey[feedback.score] || 'fb.score.good');
  badge.className = `feedback-score-badge ${feedback.score}`;

  document.getElementById('feedback-original-text').textContent = `"${userText}"`;
  document.getElementById('feedback-improved-text').textContent = feedback.improved;
  document.getElementById('exp-grammar').textContent =
    lang === 'ru' ? feedback.grammarNoteRu : feedback.grammarNote;
  document.getElementById('exp-tone').textContent =
    lang === 'ru' ? feedback.toneNoteRu : feedback.toneNote;

  const issuesEl = document.querySelector('.feedback-issues');
  issuesEl.innerHTML = feedback.issues.length
    ? feedback.issues.map(i => `<span class="issue-tag">${i}</span>`).join('')
    : '<span class="issue-tag" style="color:var(--accent-green);background:var(--accent-green-dim);border-color:rgba(82,196,138,0.3)">✓ natural</span>';
}

function nextScenario() {
  const scenarios = getScenarios();
  state.currentScenarioIndex = (state.currentScenarioIndex + 1) % scenarios.length;
  loadScenario(scenarios[state.currentScenarioIndex]);
  document.getElementById('response-input').value = '';
  showView('view-practice');
}

function loadScenario(scenario) {
  const lang = LANG.current;
  const scenarios = getScenarios();

  document.getElementById('scenario-question').textContent = scenario.question;
  document.querySelector('.scenario-avatar').textContent = scenario.speaker;
  document.querySelector('.scenario-role').textContent =
    lang === 'ru' ? scenario.roleRu : scenario.role;
  document.querySelector('.context-text').textContent =
    lang === 'ru' ? scenario.contextRu : scenario.context;
  document.querySelector('.hint-tag').textContent =
    lang === 'ru' ? scenario.hintRu : scenario.hint;

  const counter = document.querySelector('.scenario-counter');
  if (counter) {
    counter.textContent =
      `${LANG.t('prac.q')} ${scenario.id} ${LANG.t('prac.of')} ${scenarios.length}`;
  }
  const dots = document.querySelectorAll('.scenario-dots .sdot');
  dots.forEach((d, i) => d.classList.toggle('active', i === scenario.id - 1));

  updatePracticeCategory();
  updateCountryNote();
}

function updatePracticeCategory() {
  const catEl = document.getElementById('prac-cat');
  if (!catEl) return;
  const catKeys = {
    moving: 'prac.cat.moving',
    study:  'prac.cat.study',
    work:   'prac.cat.work',
    travel: 'prac.cat.travel',
  };
  catEl.textContent = LANG.t(catKeys[state.goal] || 'prac.cat.moving');
}

function updateCountryNote() {
  const note = COUNTRY_NOTES[state.country];
  const el = document.getElementById('country-note');
  if (!el) return;
  if (!note) { el.style.display = 'none'; return; }

  el.style.display = 'flex';
  const lang = LANG.current;
  document.getElementById('country-note-flag').textContent = note.flag;
  document.getElementById('country-note-tip').textContent = lang === 'ru' ? note.tipRu : note.tip;
  document.getElementById('country-note-toggle').textContent =
    lang === 'ru' ? '+ лексика' : '+ vocab';

  const vocabEl = document.getElementById('country-note-vocab');
  const vocabList = lang === 'ru' ? note.vocabRu : note.vocab;
  vocabEl.innerHTML = vocabList.map(v => `<span class="vocab-chip">${v}</span>`).join('');
}

function toggleCountryVocab() {
  const vocabEl = document.getElementById('country-note-vocab');
  const btn = document.getElementById('country-note-toggle');
  const lang = LANG.current;
  const open = vocabEl.style.display === 'none';
  vocabEl.style.display = open ? 'flex' : 'none';
  btn.textContent = open
    ? (lang === 'ru' ? '− лексика' : '− vocab')
    : (lang === 'ru' ? '+ лексика' : '+ vocab');
}

/* =====================================================
   UTILITIES
   ===================================================== */
function copyPhrase(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = LANG.current === 'ru' ? 'Скопировано!' : 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = LANG.current === 'ru' ? 'Скопировано!' : 'Copied!';
    setTimeout(() => { btn.textContent = btn.dataset.origText || 'Copy'; }, 2000);
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
  const locEl  = document.getElementById('board-country');
  if (!textEl || !locEl) return;

  let idx = 0;
  function cycle() {
    const item = BOARD_SITUATIONS[idx % BOARD_SITUATIONS.length];
    flipText(textEl, item.text, 600, () => { locEl.textContent = item.location; });
    idx++;
    setTimeout(cycle, 3200);
  }
  setTimeout(cycle, 1200);
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangPills();
  updateStress(0);
  startDepartureBoard();
});
