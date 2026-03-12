/* NewOrbit Services – 3D Viewer
   Uses Three.js (CDN) to render a 3D rotating box with the project image mapped to its faces.
   Supports orbit controls, zoom, auto-rotate, and swapping the image texture.
*/

function launch3DViewer(project) {
  const container = document.getElementById('viewer3d');
  if (!container) return;

  // Clean up previous instance
  if (window._viewer3dDispose) window._viewer3dDispose();

  container.innerHTML = '';

  // Check Three.js availability
  if (typeof THREE === 'undefined') {
    showFallback(container, project);
    return;
  }

  // ── Scene setup ──────────────────────────────────────────────────────────
  const W = container.clientWidth  || 900;
  const H = container.clientHeight || 400;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  scene.background = new THREE.Color(0x060c1e);

  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 1.2, 3.8);

  // ── Lighting ─────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0x4499ff, 1.4);
  dirLight.position.set(4, 6, 5);
  dirLight.castShadow = true;
  scene.add(dirLight);
  const backLight = new THREE.PointLight(0x1e90ff, 0.8, 15);
  backLight.position.set(-3, 2, -3);
  scene.add(backLight);

  // ── Texture loader ────────────────────────────────────────────────────────
  const texLoader = new THREE.TextureLoader();
  texLoader.crossOrigin = 'anonymous';

  let currentTexture = null;

  function buildMaterials(texture) {
    const mat = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.3, roughness: 0.45 });
    const plain = new THREE.MeshStandardMaterial({ color: 0x1a2540, metalness: 0.5, roughness: 0.4 });
    return [mat, mat, plain, plain, mat, plain];
  }

  // ── Main 3D object (box) ──────────────────────────────────────────────────
  const geo    = new THREE.BoxGeometry(2.4, 1.5, 0.15, 1, 1, 1);
  let   mesh   = null;

  function createMesh(texture) {
    if (mesh) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
    mesh = new THREE.Mesh(geo, buildMaterials(texture));
    mesh.castShadow = true;
    mesh.rotation.x = 0.08;
    scene.add(mesh);
  }

  // ── Floor grid ────────────────────────────────────────────────────────────
  const grid = new THREE.GridHelper(12, 24, 0x1e90ff, 0x112244);
  grid.position.y = -1.2;
  grid.material.opacity = 0.35;
  grid.material.transparent = true;
  scene.add(grid);

  // ── Floating particles ────────────────────────────────────────────────────
  const particleGeo = new THREE.BufferGeometry();
  const PARTICLE_COUNT = 120;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) positions[i] = (Math.random() - 0.5) * 12;
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0x1e90ff, size: 0.04, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(particleGeo, particleMat));

  // ── Orbit controls (manual drag) ─────────────────────────────────────────
  let isDragging = false, prevX = 0, prevY = 0;
  let rotX = 0.08, rotY = 0;
  let autoRotate = true;

  renderer.domElement.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; autoRotate = false; });
  renderer.domElement.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevX, dy = e.clientY - prevY;
    rotY += dx * 0.012; rotX += dy * 0.008;
    prevX = e.clientX; prevY = e.clientY;
  });
  renderer.domElement.addEventListener('mouseup',   () => isDragging = false);
  renderer.domElement.addEventListener('mouseleave',() => isDragging = false);

  // Touch
  let prevTX = 0, prevTY = 0;
  renderer.domElement.addEventListener('touchstart', e => { prevTX = e.touches[0].clientX; prevTY = e.touches[0].clientY; autoRotate = false; });
  renderer.domElement.addEventListener('touchmove',  e => {
    if (!mesh) return;
    const dx = e.touches[0].clientX - prevTX, dy = e.touches[0].clientY - prevTY;
    rotY += dx * 0.012; rotX += dy * 0.008;
    prevTX = e.touches[0].clientX; prevTY = e.touches[0].clientY;
  });

  // Scroll-to-zoom
  renderer.domElement.addEventListener('wheel', e => {
    camera.position.z = Math.max(1.5, Math.min(7, camera.position.z + e.deltaY * 0.006));
    e.preventDefault();
  }, { passive: false });

  // ── Control buttons ───────────────────────────────────────────────────────
  const ctrlHtml = `<div class="viewer-controls">
    <button class="viewer-btn" id="vbtn-auto">⟳ Auto</button>
    <button class="viewer-btn" id="vbtn-front">Front</button>
    <button class="viewer-btn" id="vbtn-iso">Iso</button>
    <button class="viewer-btn" id="vbtn-zoom-in">＋</button>
    <button class="viewer-btn" id="vbtn-zoom-out">－</button>
  </div>
  <p class="viewer-hint">Drag to rotate · Scroll to zoom · Touch supported</p>`;

  const ctrlDiv = document.createElement('div');
  ctrlDiv.innerHTML = ctrlHtml;
  ctrlDiv.style.cssText = 'position:absolute;bottom:0;left:0;right:0;';
  container.appendChild(ctrlDiv);

  document.getElementById('vbtn-auto')?.addEventListener('click',     () => { autoRotate = !autoRotate; });
  document.getElementById('vbtn-front')?.addEventListener('click',    () => { rotX = 0; rotY = 0; camera.position.z = 3.8; });
  document.getElementById('vbtn-iso')?.addEventListener('click',      () => { rotX = 0.5; rotY = 0.6; camera.position.z = 4.5; });
  document.getElementById('vbtn-zoom-in')?.addEventListener('click',  () => { camera.position.z = Math.max(1.5, camera.position.z - 0.5); });
  document.getElementById('vbtn-zoom-out')?.addEventListener('click', () => { camera.position.z = Math.min(7,   camera.position.z + 0.5); });

  // ── Load initial texture ──────────────────────────────────────────────────
  function loadTexture(url, cb) {
    texLoader.load(url, tex => { currentTexture = tex; cb(tex); },
      undefined,
      () => {
        // fallback plain colour
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 160;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0,0,256,160);
        grad.addColorStop(0, '#0e1529'); grad.addColorStop(1, '#1a3a6e');
        ctx.fillStyle = grad; ctx.fillRect(0,0,256,160);
        ctx.fillStyle = '#1e90ff'; ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center'; ctx.fillText(project.title.substring(0,25), 128, 88);
        cb(new THREE.CanvasTexture(canvas));
      });
  }

  loadTexture(project.image, tex => createMesh(tex));

  // ── Allow gallery to swap image ───────────────────────────────────────────
  window._viewer3dSetImage = function(url) {
    loadTexture(url, tex => {
      if (mesh) {
        mesh.material[0].map = tex;
        mesh.material[0].needsUpdate = true;
        mesh.material[1].map = tex;
        mesh.material[1].needsUpdate = true;
        mesh.material[4].map = tex;
        mesh.material[4].needsUpdate = true;
      }
    });
  };

  // ── Animation loop ────────────────────────────────────────────────────────
  let rafId;
  let t = 0;

  function animate() {
    rafId = requestAnimationFrame(animate);
    t += 0.012;

    if (mesh) {
      if (autoRotate) rotY += 0.008;
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      mesh.position.y = Math.sin(t * 0.8) * 0.06;
    }

    particleMat.opacity = 0.4 + Math.sin(t) * 0.2;
    renderer.render(scene, camera);
  }

  animate();

  // ── Resize ────────────────────────────────────────────────────────────────
  const resizeObs = new ResizeObserver(() => {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  resizeObs.observe(container);

  // ── Dispose ───────────────────────────────────────────────────────────────
  window._viewer3dDispose = function () {
    cancelAnimationFrame(rafId);
    resizeObs.disconnect();
    renderer.dispose();
    geo.dispose();
    if (currentTexture) currentTexture.dispose();
    container.innerHTML = '';
    window._viewer3dDispose  = null;
    window._viewer3dSetImage = null;
  };
}

// ── Fallback (Three.js unavailable) ──────────────────────────────────────────
function showFallback(container, project) {
  container.innerHTML = `
    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;background:linear-gradient(160deg,#060c1e,#0a1535);">
      <img src="${project.image}" alt="${project.title}" style="max-height:70%;max-width:88%;object-fit:contain;border-radius:10px;box-shadow:0 0 40px rgba(30,144,255,0.3);">
      <p style="color:#63B3ED;font-size:0.85rem;">3D Viewer • ${project.title}</p>
    </div>`;
}
