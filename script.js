/* ============================================
   ARJUN PAUDYAL PORTFOLIO — script.js
   ============================================ */

'use strict';

/* ── Loader ─────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    initReveal();
  }, 2200);
});
document.body.style.overflow = 'hidden';

/* ── Year ───────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Theme Toggle ───────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── Navbar ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  const scrollY = window.scrollY;

  // Scrolled class
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── Mobile Menu ────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinksContainer.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinksContainer.classList.remove('open');
  });
});

/* ── Typing Effect ──────────────────────────── */
const phrases = [
  'modern web apps',
  'React interfaces',
  '.NET backends',
  'clean UI/UX',
  'full-stack solutions',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(type, speed);
}

// Start after loader
setTimeout(type, 2400);

/* ── Scroll Reveal ──────────────────────────── */
function initReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => {
            el.classList.add('revealed');
            // Trigger skill bars when skills section is visible
            if (el.closest('#skills')) animateSkillBars(el);
          }, Number(delay));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el, i) => {
    // Stagger children reveals
    const parent = el.closest('.projects-grid, .skills-categories, .exp-cards');
    if (parent) {
      const siblings = parent.querySelectorAll('[data-reveal]');
      siblings.forEach((sib, j) => {
        sib.dataset.delay = j * 120;
      });
    }
    observer.observe(el);
  });
}

/* ── Skill Bar Animation ────────────────────── */
function animateSkillBars(container) {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const target = fill.dataset.width;
    fill.style.width = target + '%';
  });
}

// Also trigger when skills section scrolls into view independently
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObserver.unobserve(skillsSection);
    }
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}

/* ── Contact Form Validation ────────────────── */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validateField(id, errorId, validationFn, errorMsg) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(errorId);
  if (!el || !errEl) return true;

  const isValid = validationFn(el.value.trim());
  if (!isValid) {
    el.classList.add('error');
    errEl.textContent = errorMsg;
  } else {
    el.classList.remove('error');
    errEl.textContent = '';
  }
  return isValid;
}

function isEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

// Real-time validation on blur
['name', 'email', 'subject', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', () => {
    if (id === 'email') {
      validateField('email', 'emailError', isEmail, 'Please enter a valid email address.');
    } else {
      validateField(id, `${id}Error`, v => v.length > 0, `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`);
    }
  });
  el.addEventListener('input', () => {
    el.classList.remove('error');
    document.getElementById(`${id}Error`).textContent = '';
  });
});

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validName = validateField('name', 'nameError', v => v.length >= 2, 'Please enter your full name.');
    const validEmail = validateField('email', 'emailError', isEmail, 'Please enter a valid email address.');
    const validSubject = validateField('subject', 'subjectError', v => v.length >= 3, 'Subject must be at least 3 characters.');
    const validMsg = validateField('message', 'messageError', v => v.length >= 10, 'Message must be at least 10 characters.');

    if (validName && validEmail && validSubject && validMsg) {
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      // Simulate form submission
      setTimeout(() => {
        form.reset();
        formSuccess.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1500);
    }
  });
}

/* ── Smooth Scroll for anchor links ─────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Parallax Orbs (subtle) ─────────────────── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translateY(${scrollY * 0.08}px)`;
  if (orb2) orb2.style.transform = `translateY(${-scrollY * 0.05}px)`;
}, { passive: true });

/* ── Intersection Observer for Timeline ─────── */
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.marker-dot')?.classList.add('active');
    }
  });
}, { threshold: 0.5 });
timelineItems.forEach(item => tlObserver.observe(item));
