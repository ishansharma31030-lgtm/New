/* NewOrbit BIM Services — Premium Animation Suite
   - Hero canvas BIM particle network
   - Scroll-triggered reveal animations (IntersectionObserver)
   - Animated progress bars on reveal
   - Staggered card entrances
*/

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     HERO CANVAS — BIM PARTICLE NETWORK
  ═══════════════════════════════════════════════════════ */

  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const hero = document.getElementById('hero');
    let W = hero.offsetWidth;
    let H = hero.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const NODE_COUNT    = Math.min(70, Math.floor(W * H / 14000));
    const CONNECT_DIST  = 160;
    const HUB_COUNT     = 6;
    const ACCENT        = { r: 0,  g: 87,  b: 184 };
    const ACCENT_LIGHT  = { r: 77, g: 166, b: 255 };

    function rgba(c, a) {
      return `rgba(${c.r},${c.g},${c.b},${a})`;
    }

    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * 0.32,
      vy:   (Math.random() - 0.5) * 0.32,
      r:    i < HUB_COUNT ? Math.random() * 2 + 2.5 : Math.random() * 1.5 + 0.8,
      hub:  i < HUB_COUNT,
      phase: Math.random() * Math.PI * 2
    }));

    let frame = 0;
    let animId;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, W, H);

      /* Draw connection lines */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.28;
            const isHubConn = nodes[i].hub || nodes[j].hub;
            ctx.strokeStyle = isHubConn ? rgba(ACCENT_LIGHT, alpha * 1.6) : rgba(ACCENT, alpha);
            ctx.lineWidth   = isHubConn ? 1.0 : 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw nodes */
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.025 + n.phase);

        if (n.hub) {
          /* Hub glow halo */
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
          grad.addColorStop(0, rgba(ACCENT_LIGHT, 0.18 + pulse * 0.12));
          grad.addColorStop(1, rgba(ACCENT, 0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          /* Hub ring */
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(ACCENT_LIGHT, 0.25 + pulse * 0.2);
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }

        /* Core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hub
          ? rgba(ACCENT_LIGHT, 0.75 + pulse * 0.25)
          : rgba(ACCENT_LIGHT, 0.45 + pulse * 0.15);
        ctx.fill();
      }

      /* Move nodes */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10)      { n.x = W + 10; }
        else if (n.x > W + 10) { n.x = -10; }
        if (n.y < -10)      { n.y = H + 10; }
        else if (n.y > H + 10) { n.y = -10; }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    /* Resize */
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animId);
        W = hero.offsetWidth;
        H = hero.offsetHeight;
        canvas.width  = W;
        canvas.height = H;
        /* Clamp existing node positions into the new viewport */
        for (const n of nodes) {
          n.x = Math.min(Math.max(n.x, 0), W);
          n.y = Math.min(Math.max(n.y, 0), H);
        }
        draw();
      }, 200);
    });
  }

  /* ═══════════════════════════════════════════════════════
     SCROLL REVEAL — INTERSECTION OBSERVER
  ═══════════════════════════════════════════════════════ */

  function initReveal() {
    const revealOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
          animateProgressBars(entry.target);
        }
      });
    }, revealOpts);

    /* Observe elements with reveal classes already in the DOM */
    document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    ).forEach(function (el) {
      revealObs.observe(el);
    });

    /* Watch for dynamically rendered cards (stats, categories, testimonials…) */
    const mutObs = new MutationObserver(function () {
      document.querySelectorAll(
        '.stat-card:not(.observed), .cat-card:not(.observed),' +
        ' .testimonial-card:not(.observed), .career-card:not(.observed),' +
        ' .project-card:not(.observed)'
      ).forEach(function (el, idx) {
        el.classList.add('observed', 'reveal-up');
        el.style.transitionDelay = (Math.min(idx, 8) * 0.07) + 's';
        revealObs.observe(el);
      });
    });

    mutObs.observe(document.body, { childList: true, subtree: true });
  }

  /* ═══════════════════════════════════════════════════════
     ANIMATED PROGRESS BARS (triggered on reveal)
  ═══════════════════════════════════════════════════════ */

  function animateProgressBars(container) {
    const fills = container.querySelectorAll
      ? container.querySelectorAll('.progress-fill, .cat-bar-fill')
      : [];
    fills.forEach(function (fill) {
      /* Prefer inline style (set by JS), fall back to computed style */
      const target = fill.style.width || window.getComputedStyle(fill).width || '0%';
      fill.style.width = '0%';
      /* Force reflow then animate */
      void fill.offsetWidth;
      fill.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
      fill.style.width      = target;
    });
  }

  /* ═══════════════════════════════════════════════════════
     ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  ═══════════════════════════════════════════════════════ */

  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id], #hero[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('active'); });
          const active = document.querySelector(
            '.nav-links a[href="#' + entry.target.id + '"]'
          );
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ═══════════════════════════════════════════════════════
     HERO STATS — FLOATING ANIMATION STAGGER
  ═══════════════════════════════════════════════════════ */

  function initHeroStatsFloat() {
    document.querySelectorAll('.hero-stat').forEach(function (el, i) {
      el.style.animationDelay = (i * 0.18) + 's';
      el.classList.add('hero-stat-float');
    });
  }

  /* ═══════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════ */

  function init() {
    initHeroCanvas();
    initReveal();
    initNavHighlight();
    initHeroStatsFloat();

    /* Add reveal classes to static HTML section elements */
    document.querySelectorAll('.section-header').forEach(function (el) {
      el.classList.add('reveal-up');
    });
    document.querySelectorAll('.lod-card, .mep-card, .contact-item').forEach(function (el, i) {
      el.classList.add('reveal-up');
      el.style.transitionDelay = (Math.min(i % 6, 5) * 0.08) + 's';
    });
    document.querySelectorAll('.contact-info, .contact-form').forEach(function (el, i) {
      el.classList.add(i === 0 ? 'reveal-left' : 'reveal-right');
    });
    document.querySelectorAll('.standards-table-wrap, .lod-cta-strip').forEach(function (el) {
      el.classList.add('reveal-up');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
