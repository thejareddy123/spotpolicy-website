/**
 * spotpolicy.com — Main JavaScript
 * File: js/main.js
 *
 * Features:
 *  - Language switching (en/hi/te/ta/kn)
 *  - Hamburger menu toggle
 *  - Sticky header shadow
 *  - Scroll-reveal animations
 *  - Company carousel (built dynamically)
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     COMPANY LIST for carousel
  ────────────────────────────────────────────── */
  const COMPANIES = [
    { name: 'Bajaj Allianz',   logo: '/images/logo.jpeg' },
    { name: 'ICICI Lombard',   logo: '/images/logo (2).jpeg'},
    { name: 'New India',       logo: '/images/logo (3).jpeg'},
    { name: 'Bajaj Allianz',   logo: '/images/logo (4).jpeg'},
    { name: 'Tata AIG',        logo: '/images/logo (5).jpeg'},
    { name: 'United India',    logo: '/images/logo (6).jpeg'},
    { name: 'Oriental',        logo: '/images/logo (7).jpeg'},
    { name: 'Reliance GI',     logo: '/images/logo (8).jpeg'},
    { name: 'Kotak GI',        logo: '/images/logo (9).jpeg'},
    { name: 'Digit Ins.',      logo: '/images/logo (10).jpeg'},
    { name: 'Acko',            logo: '/images/logo (11).jpeg'},
    { name: 'Iffco Tokio',     logo: '/images/logo (12).jpeg'},
    { name: 'Royal Sundaram',  logo: '/images/logo (13).jpeg'},
    { name: 'National Ins.',   logo: '/images/logo (14).jpeg'},
    { name: 'Cholamandalam',   logo: '/images/logo (15).jpeg'},
    { name: 'Future Generali', logo: '/images/logo (16).jpeg'},
    { name: 'Liberty GI',      logo: '/images/logo (17).jpeg'},
    { name: 'Shriram GI',      logo: '/images/logo (18).jpeg'},
    { name: 'Universal Sompo', logo: '/images/logo (19).jpeg'},
    { name: 'SBI General',     logo: '/images/logo (20).jpeg'},
  ];

  /* ──────────────────────────────────────────────
     BUILD CAROUSEL
     Two rows — row 1 (left→right) row 2 (right→left)
     Each row splits companies in half, duplicated for infinite loop.
  ────────────────────────────────────────────── */
  function buildCarousel() {
    const wrap = document.getElementById('companiesCarousel');
    if (!wrap) return;

    const half = Math.ceil(COMPANIES.length / 2);
    const row1 = COMPANIES.slice(0, half);
    const row2 = COMPANIES.slice(half);

    function makeLogoHTML(c) {
      return `<div class="company-logo" title="${c.name}">
        <div class="company-logo-inner">
          <img src="${c.logo}" alt="${c.name}" class="logo-img">
        </div>
      </div>`;
    }

    function makeRowHTML(companies, reverse) {
      // Duplicate items so the animation seamlessly loops
      const items = [...companies, ...companies].map(makeLogoHTML).join('');
      return `<div class="carousel-row${reverse ? ' row-reverse' : ''}">
        <div class="carousel-track">${items}</div>
      </div>`;
    }

    wrap.innerHTML = makeRowHTML(row1, false) + makeRowHTML(row2, true);
  }

  /* ──────────────────────────────────────────────
     LANGUAGE SWITCHER
  ────────────────────────────────────────────── */
  const LANG_META = {
    en: { flag: '🇮🇳', name: 'English',  native: 'EN' },
    hi: { flag: '🇮🇳', name: 'हिंदी',   native: 'HI' },
    te: { flag: '🇮🇳', name: 'తెలుగు',   native: 'TE' },
    ta: { flag: '🇮🇳', name: 'தமிழ்',   native: 'TA' },
    kn: { flag: '🇮🇳', name: 'ಕನ್ನಡ',   native: 'KN' },
  };

  let currentLang = localStorage.getItem('sp_lang') || 'en';

  /**
   * Map of translation key → { selector, attribute/property }
   * attribute: 'html' means innerHTML, 'text' means textContent
   */
  const KEY_MAP = [
    // Header
    { key: 'callNow',       sel: '#btnHeaderCall',  attr: 'text' },
    { key: 'whatsappUs',    sel: '#btnHeaderWa',    attr: 'text' },
    // Hero
    { key: 'heroBadge',     sel: '#heroBadge',      attr: 'text' },
    { key: 'heroTitle1',    sel: '#heroTitle1',     attr: 'text' },
    { key: 'heroTitle2',    sel: '#heroTitle2',     attr: 'text' },
    { key: 'heroSub',       sel: '#heroSub',        attr: 'html' },
    { key: 'heroBtnCall',   sel: '#heroBtnCall',    attr: 'text' },
    { key: 'heroBtnWa',     sel: '#heroBtnWa',      attr: 'text' },
    { key: 'statInsurers',  sel: '#statInsurers',   attr: 'text' },
    { key: 'statPolicy',    sel: '#statPolicy',     attr: 'text' },
    { key: 'statSupport',   sel: '#statSupport',    attr: 'text' },
    { key: 'cardTitle',     sel: '#cardTitle',      attr: 'text' },
    { key: 'cardSub',       sel: '#cardSub',        attr: 'text' },
    { key: 'cardF1',        sel: '#cardF1',         attr: 'text' },
    { key: 'cardF2',        sel: '#cardF2',         attr: 'text' },
    { key: 'cardF3',        sel: '#cardF3',         attr: 'text' },
    { key: 'cardF4',        sel: '#cardF4',         attr: 'text' },
    { key: 'cardCta',       sel: '#cardCta',        attr: 'text' },
    // Trust bar
    { key: 'trustInsurers', sel: '#trustInsurers',  attr: 'text' },
    { key: 'trustInstant',  sel: '#trustInstant',   attr: 'text' },
    { key: 'trustSupport',  sel: '#trustSupport',   attr: 'text' },
    { key: 'trustDoorstep', sel: '#trustDoorstep',  attr: 'text' },
    { key: 'trustPremium',  sel: '#trustPremium',   attr: 'text' },
    // Services
    { key: 'servicesTag',   sel: '#servicesTag',    attr: 'text' },
    { key: 'servicesHead',  sel: '#servicesHead',   attr: 'text' },
    { key: 'servicesSub',   sel: '#servicesSub',    attr: 'text' },
    { key: 'svc1Title',     sel: '#svc1Title',      attr: 'text' },
    { key: 'svc1Desc',      sel: '#svc1Desc',       attr: 'text' },
    { key: 'svc2Title',     sel: '#svc2Title',      attr: 'text' },
    { key: 'svc2Desc',      sel: '#svc2Desc',       attr: 'text' },
    { key: 'svc3Title',     sel: '#svc3Title',      attr: 'text' },
    { key: 'svc3Desc',      sel: '#svc3Desc',       attr: 'text' },
    { key: 'svcHint',       sel: '.svc-hint',       attr: 'text', all: true },
    // Companies
    { key: 'companiesTag',  sel: '#companiesTag',   attr: 'text' },
    { key: 'companiesHead', sel: '#companiesHead',  attr: 'text' },
    { key: 'companiesSub',  sel: '#companiesSub',   attr: 'text' },
    { key: 'companiesNote', sel: '#companiesNote',  attr: 'html' },
    // Why
    { key: 'whyTag',        sel: '#whyTag',         attr: 'text' },
    { key: 'whyHead',       sel: '#whyHead',        attr: 'text' },
    { key: 'whySub',        sel: '#whySub',         attr: 'text' },
    { key: 'why1Title',     sel: '#why1Title',      attr: 'text' },
    { key: 'why1Desc',      sel: '#why1Desc',       attr: 'text' },
    { key: 'why2Title',     sel: '#why2Title',      attr: 'text' },
    { key: 'why2Desc',      sel: '#why2Desc',       attr: 'text' },
    { key: 'why3Title',     sel: '#why3Title',      attr: 'text' },
    { key: 'why3Desc',      sel: '#why3Desc',       attr: 'text' },
    { key: 'why4Title',     sel: '#why4Title',      attr: 'text' },
    { key: 'why4Desc',      sel: '#why4Desc',       attr: 'text' },
    { key: 'why5Title',     sel: '#why5Title',      attr: 'text' },
    { key: 'why5Desc',      sel: '#why5Desc',       attr: 'text' },
    { key: 'why6Title',     sel: '#why6Title',      attr: 'text' },
    { key: 'why6Desc',      sel: '#why6Desc',       attr: 'text' },
    // How
    { key: 'howTag',        sel: '#howTag',         attr: 'text' },
    { key: 'howHead',       sel: '#howHead',        attr: 'text' },
    { key: 'howSub',        sel: '#howSub',         attr: 'text' },
    { key: 'step1Title',    sel: '#step1Title',     attr: 'text' },
    { key: 'step1Desc',     sel: '#step1Desc',      attr: 'text' },
    { key: 'step2Title',    sel: '#step2Title',     attr: 'text' },
    { key: 'step2Desc',     sel: '#step2Desc',      attr: 'text' },
    { key: 'step3Title',    sel: '#step3Title',     attr: 'text' },
    { key: 'step3Desc',     sel: '#step3Desc',      attr: 'text' },
    { key: 'step4Title',    sel: '#step4Title',     attr: 'text' },
    { key: 'step4Desc',     sel: '#step4Desc',      attr: 'text' },
    // CTA banner
    { key: 'ctaHead',       sel: '#ctaHead',        attr: 'text' },
    { key: 'ctaSub',        sel: '#ctaSub',         attr: 'text' },
    { key: 'ctaBtnCall',    sel: '#ctaBtnCall',     attr: 'text' },
    { key: 'ctaBtnWa',      sel: '#ctaBtnWa',       attr: 'text' },
    // Contact
    { key: 'contactTag',    sel: '#contactTag',     attr: 'text' },
    { key: 'contactHead',   sel: '#contactHead',    attr: 'text' },
    { key: 'contactSub',    sel: '#contactSub',     attr: 'text' },
    { key: 'callWa',        sel: '#callWa',         attr: 'text' },
    { key: 'available',     sel: '#available',      attr: 'text' },
    { key: 'callBtn',       sel: '.btn-contact-call', attr: 'text', all: true },
    { key: 'waBtn',         sel: '.btn-contact-wa',   attr: 'text', all: true },
    { key: 'office1',       sel: '#office1',        attr: 'text' },
    { key: 'office2',       sel: '#office2',        attr: 'text' },
    // Footer
    { key: 'footerTagline', sel: '#footerTagline',  attr: 'text' },
    { key: 'footerAddr',    sel: '#footerAddr',     attr: 'text' },
    { key: 'footerCopy',    sel: '#footerCopy',     attr: 'html' },
  ];

  function applyTranslation(lang) {
    const t = window.TRANSLATIONS[lang];
    if (!t) return;

    KEY_MAP.forEach(({ key, sel, attr, all }) => {
      const val = t[key];
      if (val === undefined) return;

      const els = all
        ? document.querySelectorAll(sel)
        : [document.querySelector(sel)];

      els.forEach(el => {
        if (!el) return;
        if (attr === 'html') {
          // Preserve icon children if present
          const iconEl = el.querySelector('i');
          if (iconEl) {
            el.innerHTML = iconEl.outerHTML + ' ' + val;
          } else {
            el.innerHTML = val;
          }
        } else {
          // text — but keep leading icon if present
          const iconEl = el.querySelector('i');
          if (iconEl) {
            el.textContent = val;
            el.prepend(iconEl);
          } else {
            el.textContent = val;
          }
        }
      });
    });

    // Update lang button label
    const lblEl = document.getElementById('langLabel');
    if (lblEl) lblEl.textContent = LANG_META[lang].native;

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Update mobile lang pills
    document.querySelectorAll('.mobile-lang-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.lang === lang);
    });

    // Update <html lang> attribute
    document.documentElement.lang = lang;

    currentLang = lang;
    localStorage.setItem('sp_lang', lang);
  }

  /* ──────────────────────────────────────────────
     DOM READY
  ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    // 1. Build carousel
    buildCarousel();

    // 2. Apply saved / default language
    applyTranslation(currentLang);

    /* ── Language dropdown ── */
    const langSwitcher = document.getElementById('langSwitcher');
    const langBtn      = document.getElementById('langBtn');

    if (langBtn && langSwitcher) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
      });

      document.addEventListener('click', function () {
        langSwitcher.classList.remove('open');
      });

      langSwitcher.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          applyTranslation(opt.dataset.lang);
          langSwitcher.classList.remove('open');
        });
      });
    }

    /* ── Mobile language pills ── */
    document.querySelectorAll('.mobile-lang-pill').forEach(pill => {
      pill.addEventListener('click', function () {
        applyTranslation(pill.dataset.lang);
      });
    });

    /* ── Hamburger ── */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', false);
        });
      });

      // Close menu on outside click
      document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', false);
        }
      });
    }

    /* ── Sticky header shadow ── */
    const header = document.getElementById('mainHeader');
    if (header) {
      window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    }

    /* ── Scroll reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach(el => observer.observe(el));
    } else {
      // Fallback: show all
      revealEls.forEach(el => el.classList.add('visible'));
    }

  });

})();
