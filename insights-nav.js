/**
 * RATIO — Insights Navigation & Scroll Engine
 * Minimal JS for standalone pages (no boot sequence)
 */

'use strict';

/* ─────────────────────────────
   SCROLL REVEAL
───────────────────────────── */
function initReveal() {
  const blocks = document.querySelectorAll('.reveal-block');
  if (!blocks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.revealDelay || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  blocks.forEach(b => observer.observe(b));
}

/* ─────────────────────────────
   NAV SCROLL EFFECTS
───────────────────────────── */
function initNav() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ─────────────────────────────
   MOBILE NAV TOGGLE
───────────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ─────────────────────────────
   INIT
───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNav();
  initMobileNav();
  console.log('%cRATIO INSIGHTS v1.0 — ONLINE', 'color:#3FD17A;font-family:monospace;font-weight:700;letter-spacing:0.12em;font-size:11px');
});
