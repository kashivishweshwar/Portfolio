/* ═══════════════════════════════════════════════════
   KASHI VISHWESHWAR · PORTFOLIO SCRIPT
   - Sticky nav shadow on scroll
   - Hamburger menu toggle
   - Smooth close on nav link click
   - Scroll-reveal for section content
   - Active nav link highlight
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM REFS ────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = navLinks ? navLinks.querySelectorAll('a') : [];

  /* ── NAV SHADOW ON SCROLL ────────────────────────── */
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 16) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  /* ── HAMBURGER TOGGLE ────────────────────────── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  /* ── CLOSE MOBILE NAV ON LINK CLICK ────────────────────────── */
  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── ACTIVE NAV LINK ON SCROLL ────────────────────────── */
  const sections = Array.from(
    document.querySelectorAll('section[id], div[id]')
  ).filter(function (el) {
    return el.id && el.id !== 'navbar';
  });

  function setActiveLink() {
    const scrollY   = window.scrollY;
    const navHeight = navbar ? navbar.offsetHeight : 62;
    let current     = '';

    sections.forEach(function (sec) {
      const top = sec.offsetTop - navHeight - 40;
      if (scrollY >= top) {
        current = sec.id;
      }
    });

    allLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href === '#' + current) {
        link.style.color    = 'var(--blue)';
        link.style.borderBottomColor = 'var(--blue)';
      } else {
        link.style.color    = '';
        link.style.borderBottomColor = '';
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── SCROLL-REVEAL ────────────────────────── */
  // Add .reveal class to key content blocks
  const revealSelectors = [
    '.project-card',
    '.cert-card',
    '.comp-card',
    '.about-card',
    '.about-text',
    '.training-banner',
    '.exp-open',
    '.status-card',
    '.contact-tile',
    '.skill-group',
    '.hero-content',
    '.resume-container',
    '.section-title',
    '.section-label',
  ];

  const revealElements = document.querySelectorAll(
    revealSelectors.join(', ')
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  // Hero content reveals immediately
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.remove('reveal');
    heroContent.classList.add('visible');
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  /* ── STAGGER CARDS ────────────────────────── */
  // Add staggered delay to grid children
  function staggerChildren(parentSelector, delay) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    const children = parent.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * delay) + 's';
    });
  }

  staggerChildren('.projects-grid',   0.1);
  staggerChildren('.certs-grid',      0.06);
  staggerChildren('.comp-grid',       0.08);
  staggerChildren('.contact-grid',    0.07);
  staggerChildren('.skills-grid',     0.05);

})();
