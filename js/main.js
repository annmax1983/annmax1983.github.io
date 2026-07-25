/* ============================================================
   AnnMax Portfolio - Main Script
   i18n · scroll reveal · particles · nav
   ============================================================ */

(function () {
  'use strict';

  // ---- Language Detection & Switching ----
  var SUPPORTED = ['zh', 'en', 'es', 'de', 'ja', 'fr'];

  function detectLang() {
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('ja')) return 'ja';
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (nav.startsWith(SUPPORTED[i])) return SUPPORTED[i];
    }
    return 'en';
  }

  var currentLang = detectLang();

  function applyLang(lang) {
    document.documentElement.lang = lang;

    var dict = I18N[lang] || I18N.en || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
  }

  // ---- Navbar ----
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  // ---- Scroll Reveal ----
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  // ---- Particles ----
  function createParticles() {
    var container = document.querySelector('.particles');
    if (!container) return;
    var count = window.innerWidth < 768 ? 20 : 40;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';
      p.style.animationDuration = (Math.random() * 15 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = Math.random() * 0.3 + 0.1;
      container.appendChild(p);
    }
  }

  // ---- Counter Animation ----
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(function (el) {
      var target = parseInt(el.dataset.target, 10);
      if (!target) return;
      var current = 0;
      var step = Math.max(1, Math.floor(target / 60));
      var timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + (el.dataset.suffix || '');
      }, 25);
    });
  }

  // Observe stats section
  var statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    var statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Back to Top ----
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    createParticles();

    // Load language file then apply
    loadLang(currentLang).then(function () {
      applyLang(currentLang);
    });
  });

})();
