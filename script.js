/* ===========================================================
   ARCHITECTURE 2.0 @ HPCA 2027 — SCRIPTS
   No dependencies. Every feature degrades gracefully.
   =========================================================== */
(function () {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- OpenReview links ---------- */
  if (config.openreviewUrl) {
    document.querySelectorAll('.js-openreview').forEach((a) => {
      a.href = config.openreviewUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  } else {
    const btn = document.getElementById('openreview-button');
    if (btn) {
      btn.textContent = 'OpenReview link coming soon';
      btn.classList.add('disabled');
      btn.setAttribute('aria-disabled', 'true');
      btn.addEventListener('click', (e) => e.preventDefault());
    }
  }

  /* ---------- Dates (Anywhere on Earth, UTC-12) ---------- */
  const isISO = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
  const aoeStartOfDay = (iso) => new Date(iso + 'T00:00:00-12:00');
  const aoeEndOfDay = (iso) => new Date(iso + 'T23:59:59-12:00');
  const now = new Date();

  /* ---------- CFP status badge ---------- */
  const cfpStatus = document.getElementById('cfp-status');
  if (cfpStatus && isISO(cfpStatus.dataset.open) && isISO(cfpStatus.dataset.close)) {
    const fmt = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    if (now < aoeStartOfDay(cfpStatus.dataset.open)) {
      cfpStatus.textContent = `Submissions open ${fmt(cfpStatus.dataset.open)}`;
    } else if (now <= aoeEndOfDay(cfpStatus.dataset.close)) {
      cfpStatus.textContent = `Submissions open · due ${fmt(cfpStatus.dataset.close)}`;
      cfpStatus.classList.add('open');
    } else {
      cfpStatus.textContent = 'Submissions closed';
    }
  }

  /* ---------- Navbar: border on scroll, mobile menu ---------- */
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');

  const onScroll = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Active section highlight in the nav ---------- */
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)'));
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Important dates: mark past/next, show countdown ----------
     Each <li> in #important-dates has data-date="YYYY-MM-DD".
     Deadlines use Anywhere on Earth (UTC-12), end of day. */
  const dateItems = Array.from(document.querySelectorAll('#important-dates li[data-date]'));
  let next = null;

  dateItems.forEach((li) => {
    const iso = li.dataset.date;
    if (!isISO(iso)) return;
    const when = aoeEndOfDay(iso);
    if (when < now) li.classList.add('past');
    else if (!next) next = { li, when };
  });

  if (next) {
    next.li.classList.add('next');
    const countdown = document.getElementById('deadline-countdown');
    if (countdown) {
      const label = next.li.querySelector('span');
      const days = Math.ceil((next.when - now) / 86400000);
      countdown.textContent = `${label ? label.textContent : 'Next date'} in ${days} day${days === 1 ? '' : 's'}`;
      countdown.hidden = false;
    }
  }

  /* ---------- Hero design-loop animation ---------- */
  const nodes = Array.from(document.querySelectorAll('.loop-node'));
  if (nodes.length) {
    let step = 0;
    const tick = () => {
      nodes.forEach((n, i) => n.classList.toggle('active', i === step));
      step = (step + 1) % nodes.length;
    };
    tick();
    if (!reduceMotion) setInterval(tick, 1400);
  }

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.section .container > *');
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((t) => {
      t.classList.add('reveal');
      reveal.observe(t);
    });
  }
})();
