// ================================
// THEME TOGGLE
// ================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ================================
// NAVBAR SCROLL
// ================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ================================
// HAMBURGER MENU
// ================================
const hamburger = document.getElementById('hamburger');
let mobileMenu = null;

hamburger.addEventListener('click', () => {
  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <a href="#about" onclick="closeMobile()">About</a>
      <a href="#skills" onclick="closeMobile()">Skills</a>
      <a href="#projects" onclick="closeMobile()">Projects</a>
      <a href="#experience" onclick="closeMobile()">Experience</a>
      <a href="#contact" onclick="closeMobile()">Contact</a>
    `;
    document.body.appendChild(mobileMenu);
  }
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ================================
// TYPING EFFECT
// ================================
const phrases = [
  'beautiful UIs.',
  'scalable APIs.',
  'open-source tools.',
  'awesome experiences.',
  'things that matter.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();

// ================================
// SCROLL REVEAL
// ================================
const revealElements = document.querySelectorAll(
  '.section-header, .about-grid, .skill-category, .project-card, .timeline-item, .contact-grid, .tech-icons, .stats-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ================================
// SKILL BARS
// ================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

// ================================
// COUNTER ANIMATION
// ================================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(num => {
        const target = parseInt(num.dataset.target);
        let count = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            num.textContent = target + '+';
            clearInterval(timer);
          } else {
            num.textContent = Math.floor(count);
          }
        }, 40);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsCard = document.querySelector('.stats-card');
if (statsCard) counterObserver.observe(statsCard);

// ================================
// CONTACT FORM
// ================================
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate sending (replace with real API call e.g. EmailJS / Formspree)
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    e.target.reset();

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

// ================================
// ACTIVE NAV LINK
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});
