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

    /* ── Colour palette (matches site theme) ─────────────── */
    const ACCENT       = { r: 0,   g: 87,  b: 184 };
    const ACCENT_L     = { r: 77,  g: 166, b: 255 };
    const CYAN         = { r: 0,   g: 210, b: 255 };
    const WHITE        = { r: 220, g: 235, b: 255 };

    function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a.toFixed(3)})`; }

    /* ══════════════════════════════════════════════════════
       1. PERSPECTIVE GRID  (BIM floor plane scrolling toward viewer)
    ══════════════════════════════════════════════════════ */
    let gridTick = 0;
    const HORIZON_Y  = 0.46;   /* fraction of H */
    const GRID_ROWS  = 16;
    const GRID_COLS  = 14;

    function drawPerspectiveGrid() {
      const hy  = H * HORIZON_Y;
      const vpx = W * 0.5;
      const spread = W * 0.85;

      /* Animate: rows scroll from horizon toward bottom */
      const tOff = (gridTick * 0.0014) % (1 / GRID_ROWS);

      ctx.save();
      ctx.lineWidth = 0.55;

      /* Horizontal lines */
      for (let r = 0; r <= GRID_ROWS; r++) {
        const t = ((r / GRID_ROWS + tOff) % 1);
        /* Exponential spacing gives perspective effect */
        const y    = hy + Math.pow(t, 1.75) * (H - hy + 80);
        const halfW = Math.pow(t, 1.2) * spread * 0.5;
        const alpha = Math.pow(t, 0.6) * 0.22;
        ctx.strokeStyle = rgba(ACCENT_L, alpha);
        ctx.beginPath();
        ctx.moveTo(vpx - halfW, y);
        ctx.lineTo(vpx + halfW, y);
        ctx.stroke();
      }

      /* Vertical (converging) lines */
      for (let c = 0; c <= GRID_COLS; c++) {
        const frac   = c / GRID_COLS;           /* 0 → 1 across width */
        const xFar   = vpx + (frac - 0.5) * spread;
        const alpha  = 0.14 - Math.abs(frac - 0.5) * 0.12;
        ctx.strokeStyle = rgba(ACCENT, alpha);
        ctx.beginPath();
        ctx.moveTo(vpx, hy);
        ctx.lineTo(xFar, H + 60);
        ctx.stroke();
      }

      ctx.restore();
    }

    /* ══════════════════════════════════════════════════════
       2. BUILDING WIREFRAMES  (isometric BIM silhouettes)
    ══════════════════════════════════════════════════════ */
    function makeBuildingDef(i) {
      const xBase = (0.08 + i * 0.19) * W + (Math.random() - 0.5) * W * 0.05;
      return {
        xBase,
        baseY   : H * (0.72 + Math.random() * 0.12),
        w       : 28 + Math.random() * 44,
        h       : 55 + Math.random() * 130,
        depth   : 18 + Math.random() * 28,
        phase   : Math.random() * Math.PI * 2,
        speed   : 0.006 + Math.random() * 0.006,
        opacity : 0.10 + Math.random() * 0.10,
        floors  : 3 + Math.floor(Math.random() * 5)
      };
    }
    const buildings = Array.from({ length: 5 }, (_, i) => makeBuildingDef(i));

    function drawBuildings(frame) {
      for (const b of buildings) {
        const pulse  = 0.5 + 0.5 * Math.sin(frame * b.speed + b.phase);
        const op     = b.opacity * (0.65 + 0.35 * pulse);
        const w = b.w, h = b.h, d = b.depth;
        const iso = { dx: d * 0.55, dy: -d * 0.38 };
        const x = b.xBase, y = b.baseY;

        ctx.save();
        ctx.strokeStyle = rgba(ACCENT_L, op);
        ctx.lineWidth   = 0.7;

        /* Front face */
        ctx.beginPath();
        ctx.rect(x - w / 2, y - h, w, h);
        ctx.stroke();

        /* Top face */
        ctx.beginPath();
        ctx.moveTo(x - w / 2,           y - h);
        ctx.lineTo(x - w / 2 + iso.dx,  y - h + iso.dy);
        ctx.lineTo(x + w / 2 + iso.dx,  y - h + iso.dy);
        ctx.lineTo(x + w / 2,           y - h);
        ctx.closePath();
        ctx.stroke();

        /* Right side face */
        ctx.beginPath();
        ctx.moveTo(x + w / 2,           y - h);
        ctx.lineTo(x + w / 2 + iso.dx,  y - h + iso.dy);
        ctx.lineTo(x + w / 2 + iso.dx,  y      + iso.dy);
        ctx.lineTo(x + w / 2,           y);
        ctx.closePath();
        ctx.stroke();

        /* Floor lines on front face */
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = rgba(ACCENT_L, op * 0.45);
        for (let f = 1; f < b.floors; f++) {
          const fy = y - (h / b.floors) * f;
          ctx.beginPath();
          ctx.moveTo(x - w / 2, fy);
          ctx.lineTo(x + w / 2, fy);
          ctx.stroke();
        }

        /* Window grid on front face (just for top 2 floors) */
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = rgba(CYAN, op * 0.3);
        const winCols = Math.max(2, Math.floor(w / 14));
        const winRows = Math.min(2, b.floors);
        for (let wc = 1; wc < winCols; wc++) {
          const wx = x - w / 2 + (w / winCols) * wc;
          ctx.beginPath();
          ctx.moveTo(wx, y - h);
          ctx.lineTo(wx, y - h + (h / b.floors) * winRows);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    /* ══════════════════════════════════════════════════════
       3. BIM DATA-NODE NETWORK  (enhanced particles with labels)
    ══════════════════════════════════════════════════════ */
    const HUB_LABELS   = ['LOD 300', 'IFC', 'MEP', 'BIM', 'Revit', 'Navis'];
    const NODE_COUNT   = Math.min(60, Math.floor(W * H / 13000));
    const HUB_COUNT    = 6;
    const CONNECT_DIST = 155;

    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x     : Math.random() * W,
      y     : Math.random() * H,
      vx    : (Math.random() - 0.5) * 0.30,
      vy    : (Math.random() - 0.5) * 0.30,
      r     : i < HUB_COUNT ? Math.random() * 2 + 2.8 : Math.random() * 1.4 + 0.7,
      hub   : i < HUB_COUNT,
      phase : Math.random() * Math.PI * 2,
      label : i < HUB_COUNT ? HUB_LABELS[i] : null
    }));

    function drawNodes(frame) {
      /* Connection lines */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha  = (1 - dist / CONNECT_DIST) * 0.26;
            const isHub  = nodes[i].hub || nodes[j].hub;
            ctx.strokeStyle = isHub ? rgba(ACCENT_L, alpha * 1.7) : rgba(ACCENT, alpha);
            ctx.lineWidth   = isHub ? 0.9 : 0.55;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* Nodes */
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.024 + n.phase);

        if (n.hub) {
          /* Glow halo */
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
          grad.addColorStop(0, rgba(ACCENT_L, 0.20 + pulse * 0.12));
          grad.addColorStop(1, rgba(ACCENT,   0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          /* Pulsing ring */
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (2.2 + pulse * 0.6), 0, Math.PI * 2);
          ctx.strokeStyle = rgba(ACCENT_L, 0.28 + pulse * 0.18);
          ctx.lineWidth   = 0.8;
          ctx.stroke();

          /* BIM label */
          if (n.label) {
            ctx.font      = 'bold 8px monospace';
            ctx.fillStyle = rgba(WHITE, 0.45 + pulse * 0.28);
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y - n.r * 4.5);
          }
        }

        /* Core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hub
          ? rgba(ACCENT_L, 0.78 + pulse * 0.22)
          : rgba(ACCENT_L, 0.40 + pulse * 0.18);
        ctx.fill();
      }

      /* Move */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10)       n.x = W + 10;
        else if (n.x > W + 10) n.x = -10;
        if (n.y < -10)       n.y = H + 10;
        else if (n.y > H + 10) n.y = -10;
      }
    }

    /* ══════════════════════════════════════════════════════
       4. SCAN-TO-BIM POINT CLOUD  (twinkling cyan dots)
    ══════════════════════════════════════════════════════ */
    const scanPoints = Array.from({ length: 90 }, () => ({
      x       : Math.random() * W,
      y       : H * 0.48 + Math.random() * H * 0.50,
      size    : Math.random() * 1.1 + 0.3,
      alpha   : Math.random() * 0.35 + 0.08,
      twinkle : Math.random() * Math.PI * 2
    }));

    function drawScanPoints(frame) {
      for (const p of scanPoints) {
        const a = p.alpha * (0.45 + 0.55 * Math.sin(frame * 0.038 + p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(CYAN, a);
        ctx.fill();
      }
    }

    /* ══════════════════════════════════════════════════════
       5. DIMENSION LINES  (architectural measurement annotations)
    ══════════════════════════════════════════════════════ */
    function makeDimLine() {
      const x1    = W * 0.05 + Math.random() * W * 0.85;
      const y1    = H * 0.25 + Math.random() * H * 0.50;
      const len   = 55  + Math.random() * 110;
      const angle = Math.random() * Math.PI;
      return {
        x1, y1,
        x2   : x1 + Math.cos(angle) * len,
        y2   : y1 + Math.sin(angle) * len,
        len,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.07 + Math.random() * 0.07
      };
    }
    const dimLines = Array.from({ length: 5 }, makeDimLine);

    function drawDimLines(frame) {
      for (const d of dimLines) {
        const alpha = d.alpha * (0.45 + 0.55 * Math.sin(frame * 0.014 + d.phase));
        const dx    = d.x2 - d.x1;
        const dy    = d.y2 - d.y1;
        const len   = Math.sqrt(dx * dx + dy * dy);
        const nx    = -dy / len * 5;
        const ny    =  dx / len * 5;

        ctx.save();
        ctx.strokeStyle = rgba(ACCENT_L, alpha);
        ctx.lineWidth   = 0.6;

        /* Main line */
        ctx.beginPath();
        ctx.moveTo(d.x1, d.y1);
        ctx.lineTo(d.x2, d.y2);
        ctx.stroke();

        /* End ticks */
        ctx.beginPath();
        ctx.moveTo(d.x1 + nx, d.y1 + ny);
        ctx.lineTo(d.x1 - nx, d.y1 - ny);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(d.x2 + nx, d.y2 + ny);
        ctx.lineTo(d.x2 - nx, d.y2 - ny);
        ctx.stroke();

        /* Measurement label */
        const mx = (d.x1 + d.x2) / 2;
        const my = (d.y1 + d.y2) / 2;
        ctx.font      = '7.5px monospace';
        ctx.fillStyle = rgba(ACCENT_L, alpha * 1.5);
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(d.len * 0.28) + ' m', mx, my - 5);

        ctx.restore();
      }
    }

    /* ══════════════════════════════════════════════════════
       RENDER LOOP
    ══════════════════════════════════════════════════════ */
    let frame  = 0;
    let animId;

    function draw() {
      frame++;
      gridTick++;
      ctx.clearRect(0, 0, W, H);

      drawPerspectiveGrid();
      drawBuildings(frame);
      drawScanPoints(frame);
      drawDimLines(frame);
      drawNodes(frame);

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
