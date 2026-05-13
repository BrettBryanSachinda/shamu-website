// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// Sticky nav shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(reveals).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (idx % 4) * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// Highlight today's hours
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const today = days[new Date().getDay()];
const now = new Date();
const currentHour = now.getHours();
const isOpen = currentHour >= 7 && currentHour < 18;

document.querySelectorAll('.hours-row').forEach(row => {
  const dayEl = row.querySelector('.day');
  if (dayEl && dayEl.textContent.trim() === today) {
    row.classList.add('today');
  }
});

// Update open/closed status
const badge = document.querySelector('.open-badge');
if (badge) {
  if (isOpen) {
    badge.innerHTML = '<span class="pulse-dot"></span> Open Now';
    badge.classList.add('is-open');
  } else {
    badge.innerHTML = '<span class="pulse-dot closed-dot"></span> Closed — Opens 07:00';
    badge.classList.add('is-closed');
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});