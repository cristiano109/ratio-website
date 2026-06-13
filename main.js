/**
 * RATIO — Decision Intelligence System
 * Cinematic Engine v3.1 — Refined
 *
 * Modules:
 *  1. BOOT SEQUENCE      — system initialisation screen
 *  2. HERO ENTRANCE      — staggered left + authority panel reveal, line-by-line
 *  3. SCROLL ENGINE      — varied rhythm: slow/fast/slide/scale per section type
 *  4. OUTPUT SCENE       — cinematic decision generation with precise timing
 *  5. BAR & COUNTER ANIM — metric bars + count-up on entry
 *  6. NAVIGATION         — progress, active links, smooth scroll, mobile
 *  7. CONTACT FORM       — real-time validation + submit
 *  8. LIVE CLOCK         — timestamp ticker
 *  9. SECTION-SPECIFIC   — scale-in on data numbers, step pulses
 */

'use strict';

/* ─────────────────────────────
   UTILS
───────────────────────────── */
const $    = (s, c = document) => c.querySelector(s);
const $$   = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const wait  = ms => new Promise(r => setTimeout(r, ms));
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeInOutQuad = t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;

/* ─────────────────────────────
   1. BOOT SEQUENCE
───────────────────────────── */
const BOOT_LOG = [
  { text: 'RATIO/CORE v2.4.1 — loading...',            cls: '',     ms: 0   },
  { text: 'Decision matrix: initialised',               cls: 'ok',   ms: 240 },
  { text: 'Risk calibration engine: ONLINE',            cls: 'ok',   ms: 460 },
  { text: 'Cryptographic modules: verified',            cls: 'ok',   ms: 660 },
  { text: 'WARN — 3 executive access slots remaining',  cls: 'warn', ms: 820 },
  { text: 'Classification: RESTRICTED — EXECUTIVE',     cls: 'err',  ms: 980 },
  { text: 'All modules operational',                    cls: 'ok',   ms: 1140 },
  { text: 'ACCESS GRANTED',                             cls: 'ok',   ms: 1280 },
];

async function runBoot() {
  const overlay  = $('#boot-overlay');
  const logEl    = $('#boot-log');
  const barEl    = $('#boot-bar');
  const statusEl = $('#boot-status');
  if (!overlay) { document.body.classList.remove('booting'); runHeroEntrance(); return; }

  let prevMs = 0;
  for (let i = 0; i < BOOT_LOG.length; i++) {
    const line = BOOT_LOG[i];
    await wait(line.ms - prevMs);
    prevMs = line.ms;

    const span = document.createElement('span');
    span.className = `boot-log-line ${line.cls}`.trim();
    span.style.animationDelay = '0ms';
    span.textContent = `> ${line.text}`;
    logEl.appendChild(span);
    logEl.scrollTop = logEl.scrollHeight;

    const pct = Math.round(((i + 1) / BOOT_LOG.length) * 100);
    barEl.style.width = `${pct}%`;
  }

  await wait(100);
  statusEl.textContent = 'SISTEMA PRONTO';
  statusEl.style.color = 'var(--green-bright)';

  await wait(420);
  overlay.classList.add('hidden');
  document.body.classList.remove('booting');

  await wait(180);
  runHeroEntrance();
}

/* ─────────────────────────────
   2. HERO ENTRANCE
───────────────────────────── */
function runHeroEntrance() {
  const header = $('#main-header');
  if (header) {
    // Nav slides in from top with a slight delay
    requestAnimationFrame(() => header.classList.add('nav-visible'));
  }

  // Left column — staggered in, each element with its own delay
  $$('.cin-item').forEach(el => {
    const d = parseInt(el.getAttribute('data-cin-delay') || '0', 10);
    setTimeout(() => el.classList.add('cin-visible'), d + 80);
  });

  // Right panel — authority entrance: slides in from right
  const panel = $('#hero-panel');
  if (panel) {
    setTimeout(() => {
      panel.classList.add('panel-arrived');
      // Wait for panel to arrive, then populate rows
      setTimeout(() => revealPanelRows(panel), 420);
    }, 520);
  }
}

function revealPanelRows(panel) {
  const rows = $$('.panel-row', panel);

  rows.forEach((row, i) => {
    const isMetric = row.classList.contains('metric-row');
    const isRec    = row.classList.contains('panel-recommendation');
    const isFooter = row.classList.contains('panel-footer');
    const isDivider = row.classList.contains('panel-divider');

    let delay;
    if (isDivider)     delay = i * 40;
    else if (i < 9)    delay = i * 60;
    else if (isMetric) delay = 540 + (i - 9) * 200;
    else               delay = 540 + 4 * 200 + (i - 13) * 60;
    if (isRec)         delay = 1440;
    if (isFooter)      delay = 1580;

    setTimeout(() => {
      row.classList.add('row-visible');
      if (isMetric) animateBarIn(row);
    }, delay);
  });
}

function animateBarIn(row) {
  const fill = row.querySelector('.metric-bar-fill');
  if (!fill) return;
  const target = fill.getAttribute('data-target') || fill.style.width;
  fill.style.transition = 'none';
  fill.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    fill.style.transition = 'width 1.0s var(--ease-cin)';
    fill.style.width = target;
  }));
}

/* ─────────────────────────────
   3. SCROLL ENGINE — VARIED RHYTHM
───────────────────────────── */
function buildRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);

      setTimeout(() => {
        el.classList.add('revealed');
        activateBarsIn(el);
        activateCountersIn(el);
      }, delay);

      observer.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  $$('.reveal-block').forEach(el => observer.observe(el));
}

/* ─────────────────────────────
   4. OUTPUT SCENE — CINEMATIC DECISION
───────────────────────────── */
let outputTriggered = false;

function buildOutputObserver() {
  const scene = $('#report-scene');
  if (!scene) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || outputTriggered) return;
      outputTriggered = true;
      obs.unobserve(e.target);
      runOutputScene();
    });
  }, { threshold: 0.28 });

  obs.observe(scene);
}

async function runOutputScene() {
  const overlay = $('#report-gen-overlay');
  const pctEl   = $('#rgo-pct');
  const lines   = $$('.report-line');
  const rmBars  = $$('.rm-bar');

  // Zero all bars before scene
  rmBars.forEach(b => {
    b._target = b.style.width;
    b.style.width = '0%';
    b.style.transition = 'none';
  });

  if (!overlay) return;

  // Phase 1 — progress counter (realistic, non-linear)
  const startTime = performance.now();
  const totalMs   = 1500;
  await new Promise(resolve => {
    function tick(now) {
      const elapsed = now - startTime;
      const t = clamp(elapsed / totalMs, 0, 1);
      // Non-linear: fast at start, slow near end
      const eased = t < 0.7 ? easeInOutQuad(t / 0.7) * 0.85 : 0.85 + easeOutCubic((t - 0.7) / 0.3) * 0.15;
      if (pctEl) pctEl.textContent = `${Math.round(eased * 100)}%`;
      if (t < 1) requestAnimationFrame(tick);
      else { if (pctEl) pctEl.textContent = '100%'; resolve(); }
    }
    requestAnimationFrame(tick);
  });

  await wait(220);

  // Phase 2 — dismiss overlay
  overlay.classList.add('hidden');
  await wait(280);

  // Phase 3 — reveal lines sequentially with intentional pauses
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Timing by line type — header/dividers fast, data rows measured, critical slow
    let pause;
    if (i <= 1)       pause = 60;   // header + first divider — fast
    else if (i <= 7)  pause = 75;   // field rows — steady
    else if (i <= 9)  pause = 55;   // divider + label — quick
    else if (i <= 12) pause = 110;  // metrics — measured
    else if (i === 13) pause = 260; // RISK LINE — dramatic pause before
    else if (i === 14) pause = 60;  // divider after risk
    else if (i === 15) pause = 320; // RECOMMENDATION — most dramatic pause
    else               pause = 80;  // notes + footer

    await wait(pause);
    line.classList.add('line-visible');

    // Animate bar as its row appears
    const bar = line.querySelector('.rm-bar');
    if (bar && bar._target) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.transition = 'width 0.85s var(--ease-cin)';
        bar.style.width = bar._target;
      }));
    }

    // Risk line: brief red ambient flash on scene background
    if (line.classList.contains('risk-line')) {
      const redGlow = $('.osb-glow-red');
      if (redGlow) {
        redGlow.style.transition = 'opacity 0.15s ease';
        redGlow.style.opacity = '2';
        setTimeout(() => { redGlow.style.opacity = ''; redGlow.style.transition = ''; }, 600);
      }
    }

    // Final recommendation: green glow flash
    if (line.classList.contains('report-final-line')) {
      const greenGlow = $('.osb-glow-green');
      if (greenGlow) {
        greenGlow.style.transition = 'opacity 0.2s ease';
        greenGlow.style.opacity = '2.5';
        setTimeout(() => { greenGlow.style.opacity = ''; greenGlow.style.transition = ''; }, 800);
      }
    }
  }
}

/* ─────────────────────────────
   5. BAR & COUNTER HELPERS
───────────────────────────── */
function activateBarsIn(container) {
  $$('.metric-bar-fill', container).forEach(fill => {
    const t = fill.getAttribute('data-target') || fill.style.width;
    if (!t || t === '0%') return;
    fill.style.width = '0%';
    fill.style.transition = 'none';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = 'width 1.0s var(--ease-cin)';
      fill.style.width = t;
    }));
  });
}

function activateCountersIn(container) {
  $$('[data-count]', container).forEach(el => {
    const target   = parseFloat(el.getAttribute('data-count'));
    const isFloat  = !Number.isInteger(target);
    const dec      = isFloat ? (String(target).split('.')[1] || '').length : 0;
    const suffixEl = el.querySelector('span');
    const suffixHTML = suffixEl ? suffixEl.outerHTML : '';

    // Find text node
    let textNode = null;
    el.childNodes.forEach(n => { if (n.nodeType === Node.TEXT_NODE) textNode = n; });
    if (!textNode) return;

    const duration = 1000;
    const start    = performance.now();

    function tick(now) {
      const t     = clamp((now - start) / duration, 0, 1);
      const eased = easeOutCubic(t);
      const val   = eased * target;
      textNode.textContent = isFloat ? val.toFixed(dec) : Math.round(val);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ─────────────────────────────
   6. NAVIGATION
───────────────────────────── */
function initNav() {
  const header      = $('#main-header');
  const progressBar = $('#nav-progress');
  const navToggle   = $('.nav-toggle');
  const navLinks    = $('.nav-links');

  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const sy   = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) progressBar.style.width = `${docH > 0 ? (sy / docH) * 100 : 0}%`;
      if (header)      header.classList.toggle('scrolled', sy > 40);
      updateActiveLink();
      scrollTicking = false;
    });
  }, { passive: true });

  function updateActiveLink() {
    const mid = window.scrollY + window.innerHeight * 0.35;
    let cur = '';
    $$('section[id]').forEach(s => { if (s.offsetTop <= mid) cur = s.id; });
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === cur));
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav-link').forEach(l => l.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => {
      if (header && !header.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const off = (header?.offsetHeight || 58) + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────
   7. CONTACT FORM
───────────────────────────── */
function initContactForm() {
  const form = $('#contact-form');
  const btn  = $('#form-submit-btn');
  if (!form) return;

  /* Detect language from <html> tag */
  const lang = document.documentElement.getAttribute('data-lang') || 'it';
  const isEN = lang === 'en';

  const i18n = {
    required:     isEN ? 'Required field'   : 'Campo obbligatorio',
    emailInvalid: isEN ? 'Invalid email'     : 'Email non valida',
    subject:      isEN ? 'Executive%20assessment%20request' : 'Richiesta%20valutazione%20executive',
    roleLabel:    isEN ? 'Role%20to%20fill'          : 'Ruolo%20da%20coprire',
    levelLabel:   isEN ? 'Position%20level'          : 'Livello%20della%20posizione',
    contextLabel: isEN ? 'Context'                   : 'Contesto',
  };

  function validate(input) {
    const msg = input.closest('.form-field')?.querySelector('.form-validation-msg');
    if (!msg) return true;
    if (input.required && !input.value.trim()) {
      msg.textContent = i18n.required;
      input.style.borderColor = 'var(--red-bright)';
      return false;
    }
    if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      msg.textContent = i18n.emailInvalid;
      input.style.borderColor = 'var(--red-bright)';
      return false;
    }
    msg.textContent = '';
    input.style.borderColor = '';
    return true;
  }

  $$('input, textarea, select', form).forEach(i => {
    i.addEventListener('blur', () => validate(i));
    i.addEventListener('input', () => { if (i.style.borderColor === 'var(--red-bright)') validate(i); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = $$('[required]', form).map(validate).every(Boolean);
    if (!allValid) return;

    const ruolo   = encodeURIComponent((form.querySelector('#cf-ruolo')?.value  || '').trim());
    const livello = encodeURIComponent((form.querySelector('#cf-livello')?.value || '').trim());

    const body =
      i18n.roleLabel  + '%3A%20' + ruolo   + '%0A%0A' +
      i18n.levelLabel + '%3A%20' + livello + '%0A%0A' +
      i18n.contextLabel + '%3A';

    const mailto =
      'mailto:decision@ratioapp.co' +
      '?subject=' + i18n.subject +
      '&body=' + body;

    window.location.href = mailto;
  });
}

/* ─────────────────────────────
   8. LIVE CLOCK
───────────────────────────── */
function initLiveClock() {
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const now = new Date();
    const ts  = `GEN: ${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} CET`;
    $$('.panel-ts').forEach(el => { if (el.textContent.startsWith('GEN:')) el.textContent = ts; });
  }
  tick();
  setInterval(tick, 1000);
}

/* ─────────────────────────────
   9. SECTION-SPECIFIC POLISH
───────────────────────────── */
function initSectionPolish() {
  // Data card numbers get a brief scale-in handled via CSS class — trigger on reveal
  $$('.data-card').forEach(card => {
    // Numbers are already handled by activateCountersIn;
    // here we also trigger micro-bar randomisation on hover
    const bars = $$('.micro-bars span', card);
    if (!bars.length) return;
    const origH = bars.map(b => b.style.height);

    card.addEventListener('mouseenter', () => {
      bars.forEach((b, i) => {
        b.style.transition = `height ${180 + i * 50}ms var(--ease-out)`;
        b.style.height = `${20 + Math.random() * 80}%`;
      });
    });
    card.addEventListener('mouseleave', () => {
      bars.forEach((b, i) => {
        b.style.transition = `height ${140 + i * 35}ms ease`;
        b.style.height = origH[i];
      });
    });
  });

  // Process steps: add sequential active highlight as they reveal
  $$('.process-step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 60}ms`;
  });
}

/* ─────────────────────────────
   INIT
───────────────────────────── */
function init() {
  initNav();
  initContactForm();
  initLiveClock();
  initSectionPolish();
  buildRevealObserver();
  buildOutputObserver();

  // Pre-zero all bars that will be animated on scroll entry
  $$('.metric-bar-fill').forEach(fill => {
    fill.setAttribute('data-target', fill.style.width || '0%');
    fill.style.width = '0%';
  });

  // Run boot — everything else is triggered from it
  runBoot();

  console.log(
    '%cRATIO DECISION ENGINE v3.1 — ONLINE',
    'color:#3FD17A;font-family:monospace;font-weight:700;letter-spacing:0.12em;font-size:11px'
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
