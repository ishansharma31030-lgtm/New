/* NewOrbit Services – Main Application
   Handles: filtering, search, project cards, stats, categories, testimonials, contact form
*/

(function () {
  'use strict';

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const searchInput   = document.getElementById('search-input');
  const catFilter     = document.getElementById('cat-filter');
  const statusFilter  = document.getElementById('status-filter');
  const yearFilter    = document.getElementById('year-filter');
  const chipsWrap     = document.getElementById('filter-chips');
  const projectsGrid  = document.getElementById('projects-grid');
  const resultsMeta   = document.getElementById('results-meta');
  const loadMoreBtn   = document.getElementById('load-more');
  const modal         = document.getElementById('project-modal');
  const modalClose    = document.getElementById('modal-close');
  const statsSection  = document.getElementById('stats');
  const catGrid       = document.getElementById('cat-grid');
  const testimonialsEl= document.getElementById('testimonials-list');
  const contactForm   = document.getElementById('contact-form');
  const formSuccess   = document.getElementById('form-success');
  const backTop       = document.getElementById('back-top');
  const navbar        = document.getElementById('navbar');
  const hamburger     = document.getElementById('hamburger');
  const navLinks      = document.getElementById('nav-links');

  // ── State ─────────────────────────────────────────────────────────────────
  let filtered   = [...PROJECTS];
  let page       = 1;
  const pageSize = 12;
  let activeChip = 'All';

  // ── ICONS (inline SVG helpers) ────────────────────────────────────────────
  const icon = {
    location: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    calendar:  `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    clock:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    user:      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    cube:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2z"/><line x1="12" y1="11" x2="12" y2="20"/><polyline points="21 6.5 12 11 3 6.5"/></svg>`,
    pin:       `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`
  };

  // ── Category icons map ────────────────────────────────────────────────────
  const catIcons = {
    'BIM Solutions':          '🏗️',
    'Scan-to-BIM':            '📡',
    'Automation':             '⚙️',
    'Structural Engineering': '🔩',
    'MEP Coordination':       '🔧',
    'Architectural Design':   '✏️',
    'Infrastructure':         '🛣️',
    'Green Building':         '🌱',
    'Interior Design':        '🛋️',
    'Smart Building':         '💡'
  };

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    buildYearFilter();
    buildChips();
    renderStats();
    renderCategories();
    renderTestimonials();
    applyFilters();
    attachEvents();
    animateHeroCounters();
  }

  // ── Build year filter options ─────────────────────────────────────────────
  function buildYearFilter() {
    const years = [...new Set(PROJECTS.map(p => p.year))].sort((a, b) => b - a);
    years.forEach(y => {
      const opt = document.createElement('option');
      opt.value = y; opt.textContent = y;
      yearFilter.appendChild(opt);
    });
  }

  // ── Chips (status) ────────────────────────────────────────────────────────
  function buildChips() {
    const labels = ['All', 'Completed', 'Ongoing', 'Planned'];
    labels.forEach(lbl => {
      const ch = document.createElement('button');
      ch.className = 'chip' + (lbl === activeChip ? ' active' : '');
      ch.textContent = lbl;
      ch.dataset.chip = lbl;
      ch.addEventListener('click', () => {
        activeChip = lbl;
        document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.chip === lbl));
        applyFilters();
      });
      chipsWrap.appendChild(ch);
    });
  }

  // ── Filter logic ──────────────────────────────────────────────────────────
  function applyFilters() {
    const q      = searchInput.value.trim().toLowerCase();
    const cat    = catFilter.value;
    const status = statusFilter.value;
    const year   = yearFilter.value;

    filtered = PROJECTS.filter(p => {
      const matchQ  = !q || p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchC  = !cat    || p.category === cat;
      const matchS  = !status || p.status   === status;
      const matchSC = activeChip === 'All' || p.status === activeChip;
      const matchY  = !year   || p.year     === parseInt(year);
      return matchQ && matchC && matchS && matchSC && matchY;
    });

    page = 1;
    renderProjects();
  }

  // ── Render projects ───────────────────────────────────────────────────────
  function renderProjects() {
    projectsGrid.innerHTML = '';
    const visible = filtered.slice(0, page * pageSize);

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:48px 0;">
        <p style="font-size:2rem;margin-bottom:12px;">🔍</p>
        <p>No projects found. Try a different search or filter.</p></div>`;
      resultsMeta.innerHTML = '';
      loadMoreBtn.style.display = 'none';
      return;
    }

    resultsMeta.innerHTML = `Showing <strong>${visible.length}</strong> of <strong>${filtered.length}</strong> projects`;

    visible.forEach((p, i) => {
      const card = createProjectCard(p, i);
      projectsGrid.appendChild(card);
    });

    loadMoreBtn.style.display = visible.length < filtered.length ? 'inline-flex' : 'none';
  }

  function createProjectCard(p, animIdx) {
    const statusClass = p.status.toLowerCase();
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.animationDelay = `${Math.min(animIdx * 0.05, 0.4)}s`;
    card.innerHTML = `
      <div class="card-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80'">
        <div class="card-overlay"></div>
        <div class="card-badges">
          <span class="badge-status ${statusClass}">${p.status}</span>
          <span class="badge-category">${p.category}</span>
        </div>
        <button class="view-3d-btn" data-id="${p.id}" aria-label="View in 3D">
          ${icon.cube} 3D View
        </button>
      </div>
      <div class="card-body">
        <div class="card-id">PROJECT #${String(p.id).padStart(3,'0')}</div>
        <h3 class="card-title">${p.title}</h3>
        <div class="card-meta">
          <span class="card-meta-item">${icon.user} ${p.client}</span>
          <span class="card-meta-item">${icon.calendar} ${p.year}</span>
          <span class="card-meta-item">${icon.clock} ${p.duration}</span>
        </div>
        ${p.progress > 0 || p.status === 'Completed' ? `
        <div class="progress-wrap">
          <div class="progress-label"><span>Progress</span><span>${p.progress}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${p.progress}%"></div></div>
        </div>` : `<div class="progress-wrap">
          <div class="progress-label"><span>Status</span><span>Planning Phase</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:5%;background:var(--status-planned)"></div></div>
        </div>`}
        <div class="card-footer">
          <span class="card-location">${icon.pin} ${p.location}</span>
          <span class="card-budget">${p.budget}</span>
        </div>
      </div>`;

    card.querySelector('.view-3d-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(p);
    });
    card.addEventListener('click', () => openModal(p));
    return card;
  }

  // ── Stats ─────────────────────────────────────────────────────────────────
  function renderStats() {
    const total     = PROJECTS.length;
    const completed = PROJECTS.filter(p => p.status === 'Completed').length;
    const ongoing   = PROJECTS.filter(p => p.status === 'Ongoing').length;
    const planned   = PROJECTS.filter(p => p.status === 'Planned').length;
    const cats      = new Set(PROJECTS.map(p => p.category)).size;
    const clients   = new Set(PROJECTS.map(p => p.client)).size;

    const data = [
      { icon: '🏗️', num: total,     label: 'Total Projects',    suffix: '+' },
      { icon: '✅', num: completed,  label: 'Completed',         suffix: ''  },
      { icon: '🔄', num: ongoing,    label: 'Active Projects',   suffix: ''  },
      { icon: '📋', num: planned,    label: 'In Pipeline',       suffix: ''  },
      { icon: '📂', num: cats,       label: 'Service Categories',suffix: ''  },
      { icon: '🤝', num: clients,    label: 'Clients Served',    suffix: '+'  }
    ];

    const grid = document.getElementById('stats-grid');
    grid.innerHTML = data.map(d => `
      <div class="stat-card">
        <div class="stat-icon">${d.icon}</div>
        <span class="stat-num" data-target="${d.num}" data-suffix="${d.suffix}">0</span>
        <div class="stat-label">${d.label}</div>
      </div>`).join('');
  }

  function animateCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target  = parseInt(el.dataset.target);
      const suffix  = el.dataset.suffix || '';
      const dur     = 1200;
      const start   = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const v = Math.round(t * target);
        el.textContent = v + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function animateHeroCounters() {
    const heroNums = document.querySelectorAll('.hero-stat .num[data-target]');
    heroNums.forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      setTimeout(() => {
        let start = null;
        function tick(ts) {
          if (!start) start = ts;
          const t = Math.min((ts - start) / 1000, 1);
          el.textContent = Math.round(t * target) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, 600);
    });
  }

  // ── Categories ────────────────────────────────────────────────────────────
  function renderCategories() {
    const counts = {};
    PROJECTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    const max = Math.max(...Object.values(counts));

    catGrid.innerHTML = CATEGORIES.map(cat => `
      <div class="cat-card" data-cat="${cat}" role="button" tabindex="0" aria-label="Filter by ${cat}">
        <div class="cat-icon">${catIcons[cat] || '📁'}</div>
        <div class="cat-name">${cat}</div>
        <div class="cat-count">${counts[cat] || 0} projects</div>
        <div class="cat-bar"><div class="cat-bar-fill" style="width:${Math.round((counts[cat]||0)/max*100)}%"></div></div>
      </div>`).join('');

    catGrid.querySelectorAll('.cat-card').forEach(c => {
      c.addEventListener('click', () => {
        catFilter.value = c.dataset.cat;
        applyFilters();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
      });
      c.addEventListener('keydown', e => { if (e.key === 'Enter') c.click(); });
    });
  }

  // ── Testimonials ──────────────────────────────────────────────────────────
  function renderTestimonials() {
    testimonialsEl.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
        <p class="testimonial-text">${t.text}</p>
        <div class="testimonial-author">
          <img class="testimonial-avatar" src="${t.avatar}" alt="${t.name}" loading="lazy">
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.designation}</div>
          </div>
        </div>
      </div>`).join('');
  }

  // ── Events ────────────────────────────────────────────────────────────────
  const SEARCH_DEBOUNCE_DELAY_MS = 280;

  function attachEvents() {
    searchInput.addEventListener('input', debounce(applyFilters, SEARCH_DEBOUNCE_DELAY_MS));
    catFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);

    loadMoreBtn.addEventListener('click', () => {
      page++;
      renderProjects();
      // re-animate newly added cards
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', scrollY > 60);
      backTop.classList.toggle('show', scrollY > 400);
    }, { passive: true });

    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Intersection observer for counter animation
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); }
      });
    }, { threshold: 0.3 });
    if (statsSection) statsObs.observe(statsSection);

    // Contact form
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      });
    }

    // Smooth scroll for anchor nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          navLinks.classList.remove('open');
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ── Modal / 3D Viewer ─────────────────────────────────────────────────────
  function openModal(project) {
    document.getElementById('modal-project-title').textContent   = project.title;
    document.getElementById('modal-project-subtitle').textContent = `${project.category} · ${project.origin}`;

    // Detail fields
    const fields = {
      'modal-client'  : project.client,
      'modal-status'  : project.status,
      'modal-budget'  : project.budget,
      'modal-year'    : project.year,
      'modal-duration': project.duration,
      'modal-category': project.category,
      'modal-location': project.location,
      'modal-progress': project.progress + '%'
    };
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });

    document.getElementById('modal-desc').textContent = project.description;

    // Gallery
    buildGallery(project);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Launch 3D viewer with the project's main image
    launch3DViewer(project);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (window._viewer3dDispose) { window._viewer3dDispose(); }
  }

  function buildGallery(project) {
    const strip = document.getElementById('gallery-strip');
    const allImgs = [project.image, ...project.gallery];
    strip.innerHTML = allImgs.map((img, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-src="${img}">
        <img src="${img}" alt="Project view ${i+1}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80'">
      </div>`).join('');

    strip.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        strip.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (window._viewer3dSetImage) window._viewer3dSetImage(thumb.dataset.src);
      });
    });
  }

  // ── Debounce ──────────────────────────────────────────────────────────────
  function debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  }

  // ── Expose for global HTML event use ─────────────────────────────────────
  window.AppState = { applyFilters };

  init();
})();
