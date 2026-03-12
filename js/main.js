/* ============================================
   Central Mechanical LLC - Main JavaScript
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // NAVBAR SCROLL BEHAVIOR
  // ===========================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===========================
  // HAMBURGER MENU
  // ===========================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown toggle
        if (!link.classList.contains('dropdown-toggle')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });
  }

  // ===========================
  // MOBILE DROPDOWN
  // ===========================
  const dropdownItems = document.querySelectorAll('.dropdown');
  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdownItems.forEach(d => d.classList.remove('open'));
    }
  });

  // ===========================
  // ACTIVE NAV LINK
  // ===========================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a:not(.nav-btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===========================
  // SMOOTH SCROLL
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===========================
  // COUNTER ANIMATION
  // ===========================
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  // ===========================
  // SCROLL ANIMATIONS
  // ===========================
  const animatedEls = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  if (animatedEls.length) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    animatedEls.forEach(el => animObserver.observe(el));
  }

  // ===========================
  // LOD TAB INTERFACE
  // ===========================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
      });
    });
  }

  // ===========================
  // PROJECT FILTER
  // ===========================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===========================
  // CONTACT FORM VALIDATION
  // ===========================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      this.querySelectorAll('.form-control').forEach(field => {
        field.classList.remove('error');
      });

      // Validate required fields
      this.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      // Email validation
      const emailField = this.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.classList.add('error');
          valid = false;
        }
      }

      if (valid) {
        const btn = this.querySelector('[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #1a7a46, #27ae60)';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 4000);
      }
    });

    // Real-time validation clearing
    contactForm.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) field.classList.remove('error');
      });
    });
  }

  // ===========================
  // CAREERS APPLICATION FORM
  // ===========================
  const careerForm = document.getElementById('career-form');
  if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      this.querySelectorAll('[required]').forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });
      if (valid) {
        const btn = this.querySelector('[type="submit"]');
        btn.innerHTML = '✓ Application Submitted!';
        btn.style.background = 'linear-gradient(135deg, #1a7a46, #27ae60)';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = 'Submit Application';
          btn.style.background = '';
          btn.disabled = false;
          careerForm.reset();
        }, 4000);
      }
    });
  }

});
