/* NewOrbit BIM Services — Premium Animation Suite
   - Hero canvas: BIM buildings + MEP pipe ducting + particle network
   - Scroll-triggered reveal animations (IntersectionObserver)
   - Animated progress bars on reveal
   - Staggered card entrances
*/

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     HERO CANVAS — BIM BUILDINGS & PIPE DUCTING
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

    /* ── Colour palette ─────────────────────────────────── */
    const ACCENT   = { r: 0,   g: 87,  b: 184 };
    const ACCENT_L = { r: 77,  g: 166, b: 255 };
    const CYAN     = { r: 0,   g: 210, b: 255 };
    const WHITE    = { r: 220, g: 235, b: 255 };
    const PIPE_H   = { r: 0,   g: 180, b: 240 };   /* HVAC / duct — cyan-blue  */
    const PIPE_P   = { r: 30,  g: 120, b: 255 };   /* plumbing    — blue       */
    const PIPE_F   = { r: 220, g: 60,  b: 60  };   /* fire sprinkler — red     */
    const STEEL    = { r: 140, g: 200, b: 255 };   /* structural steel         */

    function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a})`; }

    /* ══════════════════════════════════════════════════════
       1. PERSPECTIVE GRID  (BIM floor plane scrolling toward viewer)
    ══════════════════════════════════════════════════════ */
    let gridTick = 0;
    const HORIZON_Y = 0.44;
    const GRID_ROWS = 18;
    const GRID_COLS = 16;

    function drawPerspectiveGrid() {
      const hy     = H * HORIZON_Y;
      const vpx    = W * 0.5;
      const spread = W * 0.92;
      const tOff   = (gridTick * 0.0012) % (1 / GRID_ROWS);

      ctx.save();

      /* Horizontal lines */
      for (let r = 0; r <= GRID_ROWS; r++) {
        const t     = ((r / GRID_ROWS + tOff) % 1);
        const y     = hy + Math.pow(t, 1.7) * (H - hy + 80);
        const halfW = Math.pow(t, 1.1) * spread * 0.5;
        const alpha = Math.pow(t, 0.55) * 0.20;
        ctx.strokeStyle = rgba(ACCENT_L, alpha);
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(vpx - halfW, y);
        ctx.lineTo(vpx + halfW, y);
        ctx.stroke();
      }

      /* Vertical converging lines */
      for (let c = 0; c <= GRID_COLS; c++) {
        const frac  = c / GRID_COLS;
        const xFar  = vpx + (frac - 0.5) * spread;
        const alpha = 0.13 - Math.abs(frac - 0.5) * 0.11;
        ctx.strokeStyle = rgba(ACCENT, alpha);
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(vpx, hy);
        ctx.lineTo(xFar, H + 60);
        ctx.stroke();
      }

      ctx.restore();
    }

    /* ══════════════════════════════════════════════════════
       2. ISOMETRIC BIM BUILDINGS  (detailed multi-floor wireframes)
    ══════════════════════════════════════════════════════ */
    function makeBuildingDef(i) {
      const slots = [0.07, 0.22, 0.38, 0.56, 0.72, 0.88];
      const xBase = slots[i % slots.length] * W + (Math.random() - 0.5) * W * 0.04;
      return {
        xBase,
        baseY   : H * (0.70 + Math.random() * 0.14),
        w       : 34 + Math.random() * 52,
        h       : 70 + Math.random() * 160,
        depth   : 22 + Math.random() * 32,
        phase   : Math.random() * Math.PI * 2,
        speed   : 0.005 + Math.random() * 0.005,
        opacity : 0.14 + Math.random() * 0.12,
        floors  : 4 + Math.floor(Math.random() * 7),
        hasCrane: Math.random() > 0.6
      };
    }
    const buildings = Array.from({ length: 6 }, (_, i) => makeBuildingDef(i));

    function drawOneBuilding(b, frame) {
      const pulse = 0.5 + 0.5 * Math.sin(frame * b.speed + b.phase);
      const op    = b.opacity * (0.60 + 0.40 * pulse);
      const { w, h, depth } = b;
      const iso   = { dx: depth * 0.58, dy: -depth * 0.36 };
      const x = b.xBase, y = b.baseY;

      ctx.save();

      /* ── Front face fill (very subtle) ── */
      ctx.fillStyle = rgba(ACCENT, op * 0.06);
      ctx.beginPath();
      ctx.rect(x - w / 2, y - h, w, h);
      ctx.fill();

      /* ── Front face outline ── */
      ctx.strokeStyle = rgba(ACCENT_L, op);
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.rect(x - w / 2, y - h, w, h);
      ctx.stroke();

      /* ── Top face ── */
      ctx.fillStyle   = rgba(ACCENT_L, op * 0.10);
      ctx.strokeStyle = rgba(ACCENT_L, op);
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.moveTo(x - w / 2,           y - h);
      ctx.lineTo(x - w / 2 + iso.dx,  y - h + iso.dy);
      ctx.lineTo(x + w / 2 + iso.dx,  y - h + iso.dy);
      ctx.lineTo(x + w / 2,           y - h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      /* ── Right side face ── */
      ctx.fillStyle   = rgba(ACCENT, op * 0.08);
      ctx.strokeStyle = rgba(STEEL,  op * 0.75);
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.moveTo(x + w / 2,           y - h);
      ctx.lineTo(x + w / 2 + iso.dx,  y - h + iso.dy);
      ctx.lineTo(x + w / 2 + iso.dx,  y      + iso.dy);
      ctx.lineTo(x + w / 2,           y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      /* ── Floor plates (front) ── */
      ctx.lineWidth   = 0.45;
      ctx.strokeStyle = rgba(ACCENT_L, op * 0.50);
      for (let f = 1; f < b.floors; f++) {
        const fy = y - (h / b.floors) * f;
        ctx.beginPath();
        ctx.moveTo(x - w / 2, fy);
        ctx.lineTo(x + w / 2, fy);
        ctx.stroke();
        /* Extend floor line onto right side */
        ctx.strokeStyle = rgba(STEEL, op * 0.35);
        ctx.beginPath();
        ctx.moveTo(x + w / 2,          fy);
        ctx.lineTo(x + w / 2 + iso.dx, fy + iso.dy);
        ctx.stroke();
        ctx.strokeStyle = rgba(ACCENT_L, op * 0.50);
      }

      /* ── Window grid (front, lower 60 % of building) ── */
      ctx.lineWidth   = 0.35;
      ctx.strokeStyle = rgba(CYAN, op * 0.35);
      const winCols = Math.max(2, Math.floor(w / 13));
      const winFlrs = Math.max(2, Math.floor(b.floors * 0.6));
      for (let wc = 1; wc < winCols; wc++) {
        const wx = x - w / 2 + (w / winCols) * wc;
        ctx.beginPath();
        ctx.moveTo(wx, y);
        ctx.lineTo(wx, y - (h / b.floors) * winFlrs);
        ctx.stroke();
      }

      /* ── Structural cross-bracing on right side ── */
      ctx.lineWidth   = 0.3;
      ctx.strokeStyle = rgba(STEEL, op * 0.28);
      const rx1 = x + w / 2, ry1 = y - h;
      const rx2 = x + w / 2 + iso.dx, ry2 = y - h + iso.dy;
      const rx3 = x + w / 2 + iso.dx, ry3 = y + iso.dy;
      const rx4 = x + w / 2,          ry4 = y;
      ctx.beginPath();
      ctx.moveTo(rx1, ry1); ctx.lineTo(rx3, ry3);
      ctx.moveTo(rx2, ry2); ctx.lineTo(rx4, ry4);
      ctx.stroke();

      /* ── Rooftop HVAC unit ── */
      const rux  = x + iso.dx * 0.35;
      const ruy  = y - h + iso.dy * 0.7;
      const ruw  = w * 0.28, ruh = h * 0.04;
      ctx.strokeStyle = rgba(PIPE_H, op * 0.65);
      ctx.lineWidth   = 0.6;
      ctx.beginPath();
      ctx.rect(rux - ruw / 2, ruy - ruh, ruw, ruh);
      ctx.stroke();

      /* ── Construction crane (selected buildings) ── */
      if (b.hasCrane) {
        const craneX = x + w / 2 + 8;
        const craneY = y - h;
        ctx.strokeStyle = rgba(STEEL, op * 0.55);
        ctx.lineWidth   = 0.7;
        /* Mast */
        ctx.beginPath();
        ctx.moveTo(craneX, craneY);
        ctx.lineTo(craneX, craneY - 40);
        ctx.stroke();
        /* Jib */
        ctx.beginPath();
        ctx.moveTo(craneX, craneY - 38);
        ctx.lineTo(craneX + 35, craneY - 38);
        ctx.stroke();
        /* Counter jib */
        ctx.beginPath();
        ctx.moveTo(craneX, craneY - 38);
        ctx.lineTo(craneX - 14, craneY - 38);
        ctx.stroke();
        /* Hoist rope */
        const hoistOff = 16 + 10 * Math.sin(frame * 0.015 + b.phase);
        ctx.strokeStyle = rgba(CYAN, op * 0.45);
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(craneX + 28, craneY - 38);
        ctx.lineTo(craneX + 28, craneY - 38 + hoistOff);
        ctx.stroke();
        /* Hook */
        ctx.beginPath();
        ctx.arc(craneX + 28, craneY - 38 + hoistOff + 3, 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(CYAN, op * 0.55);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawBuildings(frame) {
      buildings.forEach(b => drawOneBuilding(b, frame));
    }

    /* ══════════════════════════════════════════════════════
       3. MEP PIPE / DUCT ROUTING  (animated flow lines)
    ══════════════════════════════════════════════════════ */
    function buildPipeNetwork() {
      /* Each pipe is a polyline of [x, y] segments.
         Flow particles travel along them.
         x/y values are fractions of W/H, resolved at draw time. */
      return [
        /* HVAC main duct — large horizontal run across top third */
        {
          col: PIPE_H, lw: 3.2, label: 'HVAC',
          pts: [[0.02, 0.22], [0.30, 0.22], [0.30, 0.34], [0.62, 0.34], [0.62, 0.22], [0.98, 0.22]]
        },
        /* HVAC branch drops */
        {
          col: PIPE_H, lw: 1.8, label: null,
          pts: [[0.15, 0.22], [0.15, 0.50]]
        },
        {
          col: PIPE_H, lw: 1.8, label: null,
          pts: [[0.45, 0.34], [0.45, 0.58]]
        },
        {
          col: PIPE_H, lw: 1.8, label: null,
          pts: [[0.78, 0.22], [0.78, 0.48]]
        },
        /* Plumbing supply — blue run along lower section */
        {
          col: PIPE_P, lw: 2.0, label: 'CWS',
          pts: [[0.05, 0.64], [0.40, 0.64], [0.40, 0.76], [0.70, 0.76], [0.70, 0.64], [0.95, 0.64]]
        },
        /* Plumbing branch risers */
        {
          col: PIPE_P, lw: 1.2, label: null,
          pts: [[0.20, 0.64], [0.20, 0.50], [0.20, 0.40]]
        },
        {
          col: PIPE_P, lw: 1.2, label: null,
          pts: [[0.55, 0.76], [0.55, 0.60], [0.55, 0.44]]
        },
        {
          col: PIPE_P, lw: 1.2, label: null,
          pts: [[0.85, 0.64], [0.85, 0.50]]
        },
        /* Fire sprinkler — red ring main */
        {
          col: PIPE_F, lw: 1.6, label: 'FP',
          pts: [[0.08, 0.42], [0.36, 0.42], [0.36, 0.52], [0.66, 0.52], [0.66, 0.42], [0.92, 0.42]]
        },
        /* Sprinkler drops */
        {
          col: PIPE_F, lw: 0.9, label: null,
          pts: [[0.22, 0.42], [0.22, 0.54]]
        },
        {
          col: PIPE_F, lw: 0.9, label: null,
          pts: [[0.51, 0.52], [0.51, 0.62]]
        },
        {
          col: PIPE_F, lw: 0.9, label: null,
          pts: [[0.80, 0.42], [0.80, 0.56]]
        }
      ];
    }

    let pipes = buildPipeNetwork();

    /* Pre-compute absolute pixel coords + per-pipe particles */
    function resolvePipes() {
      pipes.forEach(pipe => {
        pipe.resolved = pipe.pts.map(([fx, fy]) => [fx * W, fy * H]);
        /* Total length */
        let total = 0;
        for (let i = 1; i < pipe.resolved.length; i++) {
          const dx = pipe.resolved[i][0] - pipe.resolved[i - 1][0];
          const dy = pipe.resolved[i][1] - pipe.resolved[i - 1][1];
          total += Math.sqrt(dx * dx + dy * dy);
        }
        pipe.totalLen = total;
        /* Spawn 1–3 flow particles per pipe */
        const count = Math.max(1, Math.floor(total / 220));
        pipe.particles = Array.from({ length: count }, (_, k) => ({
          t    : k / count,       /* progress 0–1 along pipe */
          speed: 0.0006 + Math.random() * 0.0007
        }));
      });
    }
    resolvePipes();

    /* Interpolate point at fraction t along a polyline */
    function pointAlongPipe(resolved, totalLen, t) {
      const target = t * totalLen;
      let acc = 0;
      for (let i = 1; i < resolved.length; i++) {
        const dx  = resolved[i][0] - resolved[i - 1][0];
        const dy  = resolved[i][1] - resolved[i - 1][1];
        const seg = Math.sqrt(dx * dx + dy * dy);
        if (acc + seg >= target) {
          const u = (target - acc) / seg;
          return [resolved[i - 1][0] + dx * u, resolved[i - 1][1] + dy * u];
        }
        acc += seg;
      }
      return resolved[resolved.length - 1];
    }

    function drawPipes(frame) {
      const globalAlpha = 0.38 + 0.08 * Math.sin(frame * 0.008);

      pipes.forEach(pipe => {
        if (!pipe.resolved || pipe.resolved.length < 2) return;
        const col = pipe.col;

        /* ── Pipe body ── */
        ctx.save();
        ctx.globalAlpha = globalAlpha;
        ctx.strokeStyle = rgba(col, 0.55);
        ctx.lineWidth   = pipe.lw;
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.beginPath();
        ctx.moveTo(pipe.resolved[0][0], pipe.resolved[0][1]);
        for (let i = 1; i < pipe.resolved.length; i++) {
          ctx.lineTo(pipe.resolved[i][0], pipe.resolved[i][1]);
        }
        ctx.stroke();

        /* ── Pipe highlight (thinner, brighter top edge) ── */
        ctx.strokeStyle = rgba(col, 0.28);
        ctx.lineWidth   = pipe.lw * 0.35;
        ctx.beginPath();
        ctx.moveTo(pipe.resolved[0][0], pipe.resolved[0][1] - pipe.lw * 0.3);
        for (let i = 1; i < pipe.resolved.length; i++) {
          ctx.lineTo(pipe.resolved[i][0], pipe.resolved[i][1] - pipe.lw * 0.3);
        }
        ctx.stroke();

        /* ── Elbow joints (circles at each vertex) ── */
        for (let i = 1; i < pipe.resolved.length - 1; i++) {
          ctx.beginPath();
          ctx.arc(pipe.resolved[i][0], pipe.resolved[i][1], pipe.lw * 0.95, 0, Math.PI * 2);
          ctx.fillStyle   = rgba(col, 0.65);
          ctx.strokeStyle = rgba(WHITE, 0.25);
          ctx.lineWidth   = 0.5;
          ctx.fill();
          ctx.stroke();
        }

        /* ── End cap flanges ── */
        [pipe.resolved[0], pipe.resolved[pipe.resolved.length - 1]].forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], pipe.lw * 1.4, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(col, 0.50);
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        });

        /* ── Label tag ── */
        if (pipe.label) {
          const [lx, ly] = pipe.resolved[0];
          ctx.font      = 'bold 7px monospace';
          ctx.fillStyle = rgba(col, 0.90);
          ctx.textAlign = 'left';
          ctx.fillText(pipe.label, lx + 4, ly - pipe.lw - 3);
        }

        ctx.restore();

        /* ── Flow particles (animated dots travelling along pipe) ── */
        pipe.particles.forEach(p => {
          p.t = (p.t + p.speed) % 1;
          const [px, py] = pointAlongPipe(pipe.resolved, pipe.totalLen, p.t);
          const grad = ctx.createRadialGradient(px, py, 0, px, py, pipe.lw * 2.2);
          grad.addColorStop(0, rgba(WHITE, 0.90));
          grad.addColorStop(0.4, rgba(col,  0.70));
          grad.addColorStop(1, rgba(col,  0));
          ctx.beginPath();
          ctx.arc(px, py, pipe.lw * 2.2, 0, Math.PI * 2);
          ctx.fillStyle   = grad;
          ctx.globalAlpha = 0.70 * globalAlpha * 2.0;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      });
    }

    /* ══════════════════════════════════════════════════════
       4. BIM DATA-NODE NETWORK  (particles with labels)
    ══════════════════════════════════════════════════════ */
    const HUB_LABELS = ['LOD 300', 'IFC', 'MEP', 'BIM', 'Revit', 'Navis'];
    const NODE_COUNT = Math.min(55, Math.floor(W * H / 14000));
    const HUB_COUNT  = 6;
    const CONNECT_DIST = 145;

    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x     : Math.random() * W,
      y     : Math.random() * H,
      vx    : (Math.random() - 0.5) * 0.28,
      vy    : (Math.random() - 0.5) * 0.28,
      r     : i < HUB_COUNT ? Math.random() * 2 + 2.8 : Math.random() * 1.4 + 0.6,
      hub   : i < HUB_COUNT,
      phase : Math.random() * Math.PI * 2,
      label : i < HUB_COUNT ? HUB_LABELS[i] : null
    }));

    function drawNodes(frame) {
      /* Connection lines */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            const isHub = nodes[i].hub || nodes[j].hub;
            ctx.strokeStyle = isHub ? rgba(ACCENT_L, alpha * 1.6) : rgba(ACCENT, alpha);
            ctx.lineWidth   = isHub ? 0.85 : 0.5;
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
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
          grad.addColorStop(0, rgba(ACCENT_L, 0.18 + pulse * 0.10));
          grad.addColorStop(1, rgba(ACCENT, 0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (2.2 + pulse * 0.6), 0, Math.PI * 2);
          ctx.strokeStyle = rgba(ACCENT_L, 0.26 + pulse * 0.16);
          ctx.lineWidth   = 0.75;
          ctx.stroke();

          if (n.label) {
            ctx.font      = 'bold 8px monospace';
            ctx.fillStyle = rgba(WHITE, 0.42 + pulse * 0.26);
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y - n.r * 4.5);
          }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hub
          ? rgba(ACCENT_L, 0.75 + pulse * 0.25)
          : rgba(ACCENT_L, 0.35 + pulse * 0.18);
        ctx.fill();
      }

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10)         n.x = W + 10;
        else if (n.x > W + 10) n.x = -10;
        if (n.y < -10)         n.y = H + 10;
        else if (n.y > H + 10) n.y = -10;
      }
    }

    /* ══════════════════════════════════════════════════════
       5. SCAN-TO-BIM POINT CLOUD  (twinkling cyan dots)
    ══════════════════════════════════════════════════════ */
    const scanPoints = Array.from({ length: 80 }, () => ({
      x       : Math.random() * W,
      y       : H * 0.50 + Math.random() * H * 0.48,
      size    : Math.random() * 1.0 + 0.3,
      alpha   : Math.random() * 0.30 + 0.07,
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
       6. DIMENSION / ANNOTATION LINES
    ══════════════════════════════════════════════════════ */
    function makeDimLine() {
      const x1    = W * 0.06 + Math.random() * W * 0.82;
      const y1    = H * 0.20 + Math.random() * H * 0.55;
      const len   = 50 + Math.random() * 100;
      const angle = Math.random() * Math.PI;
      return {
        x1, y1,
        x2   : x1 + Math.cos(angle) * len,
        y2   : y1 + Math.sin(angle) * len,
        len,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.06 + Math.random() * 0.07
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
        ctx.beginPath();
        ctx.moveTo(d.x1, d.y1);
        ctx.lineTo(d.x2, d.y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(d.x1 + nx, d.y1 + ny); ctx.lineTo(d.x1 - nx, d.y1 - ny);
        ctx.moveTo(d.x2 + nx, d.y2 + ny); ctx.lineTo(d.x2 - nx, d.y2 - ny);
        ctx.stroke();

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
      drawScanPoints(frame);
      drawDimLines(frame);
      drawPipes(frame);
      drawBuildings(frame);
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
        resolvePipes();
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
