import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface SceneControls {
  exploded: number; // 0.0 to 1.0
  speed: number;    // 0 to 2
  colorScheme: 'cyber' | 'cyan' | 'neon';
  viewPreset: 'overview' | 'instagram' | 'youtube' | 'exploded';
}

export const CyberneticStreamScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [controls, setControls] = useState<SceneControls>({
    exploded: 0,
    speed: 1,
    colorScheme: 'cyber',
    viewPreset: 'overview',
  });

  // Keep a mutable ref of controls so animation loop does not trigger React re-renders
  const controlsRef = useRef(controls);
  controlsRef.current = controls;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b11);
    scene.fog = new THREE.FogExp2(0x080b11, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig
    const warmKeyLight = new THREE.DirectionalLight(0xfff1e6, 2.2);
    warmKeyLight.position.set(5, 8, 5);
    warmKeyLight.castShadow = !isSoftwareGl;
    warmKeyLight.shadow.mapSize.width = 1024;
    warmKeyLight.shadow.mapSize.height = 1024;
    warmKeyLight.shadow.camera.near = 0.5;
    warmKeyLight.shadow.camera.far = 25;
    warmKeyLight.shadow.bias = -0.0005;
    warmKeyLight.shadow.normalBias = 0.02;
    scene.add(warmKeyLight);

    const coolHemiLight = new THREE.HemisphereLight(0x4cd7f6, 0x080b11, 1.4);
    scene.add(coolHemiLight);

    const accentPurpleLight = new THREE.PointLight(0xa078ff, 3.5, 12);
    accentPurpleLight.position.set(-4, 3, 2);
    scene.add(accentPurpleLight);

    const accentCyanLight = new THREE.PointLight(0x06b6d4, 3.5, 12);
    accentCyanLight.position.set(4, 3, 2);
    scene.add(accentCyanLight);

    // 5. Procedural Ground Contact Shadow & Cyber Grid
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 512;
    groundCanvas.height = 512;
    const gctx = groundCanvas.getContext('2d')!;
    const radGrad = gctx.createRadialGradient(256, 256, 40, 256, 256, 250);
    radGrad.addColorStop(0, 'rgba(160, 120, 255, 0.45)');
    radGrad.addColorStop(0.3, 'rgba(76, 215, 246, 0.25)');
    radGrad.addColorStop(0.7, 'rgba(10, 14, 23, 0.8)');
    radGrad.addColorStop(1, 'rgba(8, 11, 17, 0)');
    gctx.fillStyle = radGrad;
    gctx.fillRect(0, 0, 512, 512);

    // Draw cyber concentric rings
    gctx.strokeStyle = 'rgba(76, 215, 246, 0.2)';
    gctx.lineWidth = 1.5;
    for (let r = 80; r < 240; r += 45) {
      gctx.beginPath();
      gctx.arc(256, 256, r, 0, Math.PI * 2);
      gctx.stroke();
    }

    const groundTex = new THREE.CanvasTexture(groundCanvas);
    groundTex.colorSpace = THREE.SRGBColorSpace;
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.MeshBasicMaterial({
      map: groundTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -1.2;
    scene.add(groundMesh);

    // 6. Master Scene Graph Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================
    // A. CENTRAL QUANTUM REACTOR (Composite 7-Part Group)
    // ==========================================
    const reactorGroup = new THREE.Group();
    worldGroup.add(reactorGroup);

    // Part 1: Outer Hexagonal Chassis
    const chassisGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.6, 6);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x161a29,
      metalness: 0.85,
      roughness: 0.35,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.castShadow = !isSoftwareGl;
    reactorGroup.add(chassisMesh);

    // Part 2: Inner Titanium Core Sleeve
    const sleeveGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.8, 16);
    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0x2b334d,
      metalness: 0.95,
      roughness: 0.15,
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    reactorGroup.add(sleeveMesh);

    // Part 3: Central Energy Crystal (Refractive Glass Octahedron)
    const crystalGeo = new THREE.OctahedronGeometry(0.55, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xd0bcff,
      emissive: 0x6d3bd7,
      emissiveIntensity: 0.6,
      metalness: 0.1,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.4 : 0.95,
      ior: 1.6,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    reactorGroup.add(crystalMesh);

    // Part 4 & 5: Magnetic Containment Emitter Rings (Top and Bottom)
    const ringGeo = new THREE.TorusGeometry(1.05, 0.05, 12, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x4cd7f6,
      emissive: 0x03b5d3,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const topRing = new THREE.Mesh(ringGeo, ringMat);
    topRing.rotation.x = Math.PI / 2;
    topRing.position.y = 0.38;
    reactorGroup.add(topRing);

    const bottomRing = new THREE.Mesh(ringGeo, ringMat);
    bottomRing.rotation.x = Math.PI / 2;
    bottomRing.position.y = -0.38;
    reactorGroup.add(bottomRing);

    // Part 6: Stabilizer Fin array (4 radial fins)
    const finGeo = new THREE.BoxGeometry(0.12, 0.5, 0.6);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x31353f,
      metalness: 0.7,
      roughness: 0.3,
    });
    const fins: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeo, finMat);
      const angle = (i * Math.PI) / 2;
      fin.position.set(Math.cos(angle) * 1.3, 0, Math.sin(angle) * 1.3);
      fin.rotation.y = -angle;
      reactorGroup.add(fin);
      fins.push(fin);
    }

    // Part 7: Equatorial Laser Halo
    const haloGeo = new THREE.RingGeometry(1.4, 1.48, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xa078ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    reactorGroup.add(haloMesh);

    // ==========================================
    // B. INSTAGRAM QUANTUM NODE (Left Satellite Group)
    // ==========================================
    const igGroup = new THREE.Group();
    igGroup.position.set(-2.8, 0.5, 0.4);
    worldGroup.add(igGroup);

    // Part 1: Outer Rounded Housing
    const igBoxGeo = new THREE.BoxGeometry(1.1, 1.1, 0.35);
    const igBoxMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x581c87,
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.25,
    });
    const igBoxMesh = new THREE.Mesh(igBoxGeo, igBoxMat);
    igBoxMesh.castShadow = !isSoftwareGl;
    igGroup.add(igBoxMesh);

    // Part 2: Outer Bezel Ring
    const igBezelGeo = new THREE.TorusGeometry(0.36, 0.05, 16, 32);
    const igBezelMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
    });
    const igBezel = new THREE.Mesh(igBezelGeo, igBezelMat);
    igBezel.position.z = 0.18;
    igGroup.add(igBezel);

    // Part 3: Camera Lens Core
    const igLensGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 24);
    const igLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      metalness: 0.3,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const igLens = new THREE.Mesh(igLensGeo, igLensMat);
    igLens.rotation.x = Math.PI / 2;
    igLens.position.z = 0.18;
    igGroup.add(igLens);

    // Part 4: Camera Sensor Flash Dot
    const igFlashGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    const igFlashMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    const igFlash = new THREE.Mesh(igFlashGeo, igFlashMat);
    igFlash.rotation.x = Math.PI / 2;
    igFlash.position.set(0.32, 0.32, 0.18);
    igGroup.add(igFlash);

    // Part 5: Holographic Orbital Ring around Instagram
    const igOrbitGeo = new THREE.TorusGeometry(0.9, 0.02, 12, 32);
    const igOrbitMat = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.6 });
    const igOrbit = new THREE.Mesh(igOrbitGeo, igOrbitMat);
    igOrbit.rotation.x = 1.1;
    igGroup.add(igOrbit);

    // ==========================================
    // C. YOUTUBE QUANTUM NODE (Right Satellite Group)
    // ==========================================
    const ytGroup = new THREE.Group();
    ytGroup.position.set(2.8, 0.5, -0.4);
    worldGroup.add(ytGroup);

    // Part 1: Outer Red Anodized Badge Housing
    const ytBoxGeo = new THREE.BoxGeometry(1.2, 0.9, 0.35);
    const ytBoxMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.45,
      metalness: 0.8,
      roughness: 0.25,
    });
    const ytBoxMesh = new THREE.Mesh(ytBoxGeo, ytBoxMat);
    ytBoxMesh.castShadow = !isSoftwareGl;
    ytGroup.add(ytBoxMesh);

    // Part 2: Play Button Triangle (Prism)
    const ytPlayGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 3);
    const ytPlayMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2,
    });
    const ytPlay = new THREE.Mesh(ytPlayGeo, ytPlayMat);
    ytPlay.rotation.x = Math.PI / 2;
    ytPlay.rotation.z = Math.PI / 2;
    ytPlay.position.z = 0.18;
    ytGroup.add(ytPlay);

    // Part 3: Chrome Frame Accent
    const ytFrameGeo = new THREE.BoxGeometry(1.24, 0.94, 0.1);
    const ytFrameMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.1,
    });
    const ytFrame = new THREE.Mesh(ytFrameGeo, ytFrameMat);
    ytFrame.position.z = -0.15;
    ytGroup.add(ytFrame);

    // Part 4: Holographic Orbital Ring around YouTube
    const ytOrbitGeo = new THREE.TorusGeometry(0.95, 0.02, 12, 32);
    const ytOrbitMat = new THREE.MeshBasicMaterial({ color: 0x4cd7f6, transparent: true, opacity: 0.6 });
    const ytOrbit = new THREE.Mesh(ytOrbitGeo, ytOrbitMat);
    ytOrbit.rotation.x = -1.1;
    ytGroup.add(ytOrbit);

    // ==========================================
    // D. DATA BRIDGE CONDUITS (Spline Tubes)
    // ==========================================
    const igCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-2.2, 0.4, 0.3),
      new THREE.Vector3(-1.2, 1.4, 0.8),
      new THREE.Vector3(-0.6, 0.1, 0)
    );
    const igTubeGeo = new THREE.TubeGeometry(igCurve, 24, 0.035, 8, false);
    const igTubeMat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.5 });
    const igTube = new THREE.Mesh(igTubeGeo, igTubeMat);
    worldGroup.add(igTube);

    const ytCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(2.2, 0.4, -0.3),
      new THREE.Vector3(1.2, 1.4, -0.8),
      new THREE.Vector3(0.6, 0.1, 0)
    );
    const ytTubeGeo = new THREE.TubeGeometry(ytCurve, 24, 0.035, 8, false);
    const ytTubeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.5 });
    const ytTube = new THREE.Mesh(ytTubeGeo, ytTubeMat);
    worldGroup.add(ytTube);

    // ==========================================
    // E. INSTANCED STREAM PACKETS (60 Particles)
    // ==========================================
    const particleCount = 60;
    const pGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0x4cd7f6 });
    const instancedMesh = new THREE.InstancedMesh(pGeo, pMat, particleCount);
    instancedMesh.frustumCulled = false;
    worldGroup.add(instancedMesh);

    const dummy = new THREE.Object3D();
    const particleProgress = new Float32Array(particleCount);
    const particleSide = new Uint8Array(particleCount); // 0 = ig side, 1 = yt side
    for (let i = 0; i < particleCount; i++) {
      particleProgress[i] = Math.random();
      particleSide[i] = i % 2;
    }

    // 7. Interactive Orbit & Mouse Pointer Damping
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotY += deltaX * 0.006;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + deltaY * 0.006));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 8. Animation & Render Loop with Software WebGL pacing
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const targetCameraPos = new THREE.Vector3(0, 3.5, 9);
    const targetLookAt = new THREE.Vector3(0, 0.4, 0);

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const curControls = controlsRef.current;
      const timeScale = curControls.speed;

      // Handle Preset Views
      if (curControls.viewPreset === 'overview') {
        targetCameraPos.set(0, 3.2, 8.5);
      } else if (curControls.viewPreset === 'instagram') {
        targetCameraPos.set(-2.5, 1.8, 4.5);
      } else if (curControls.viewPreset === 'youtube') {
        targetCameraPos.set(2.5, 1.8, 4.5);
      } else if (curControls.viewPreset === 'exploded') {
        targetCameraPos.set(0, 5.0, 9.5);
      }

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos, 1 - Math.exp(-5 * delta));
      camera.lookAt(targetLookAt);

      // Smooth world rotation with damping
      worldGroup.rotation.y = THREE.MathUtils.damp(worldGroup.rotation.y, targetRotY, 6, delta);
      worldGroup.rotation.x = THREE.MathUtils.damp(worldGroup.rotation.x, targetRotX, 6, delta);

      // Idle spin when not dragging
      if (!isDragging && timeScale > 0) {
        targetRotY += 0.2 * delta * timeScale;
      }

      // Reactor components animation
      if (timeScale > 0) {
        crystalMesh.rotation.y += 0.8 * delta * timeScale;
        crystalMesh.rotation.x += 0.4 * delta * timeScale;
        topRing.rotation.z += 0.5 * delta * timeScale;
        bottomRing.rotation.z -= 0.5 * delta * timeScale;
        igOrbit.rotation.z += 0.6 * delta * timeScale;
        ytOrbit.rotation.z -= 0.6 * delta * timeScale;

        // Subtle floating oscillations
        const elapsed = clock.getElapsedTime() * timeScale;
        igGroup.position.y = 0.5 + Math.sin(elapsed * 1.5) * 0.12;
        ytGroup.position.y = 0.5 + Math.cos(elapsed * 1.5) * 0.12;
        reactorGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;
      }

      // Exploded View separation: smoothly push parts along offset normals
      const explodedFactor = curControls.exploded;
      topRing.position.y = 0.38 + explodedFactor * 0.7;
      bottomRing.position.y = -0.38 - explodedFactor * 0.7;
      chassisMesh.scale.set(1 + explodedFactor * 0.3, 1, 1 + explodedFactor * 0.3);
      haloMesh.position.y = explodedFactor * 1.1;

      // Fins separation
      fins.forEach((fin, idx) => {
        const angle = (idx * Math.PI) / 2;
        const dist = 1.3 + explodedFactor * 0.8;
        fin.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
      });

      // Satellite nodes separation
      igGroup.position.x = -2.8 - explodedFactor * 1.2;
      ytGroup.position.x = 2.8 + explodedFactor * 1.2;

      // Update instanced particles
      for (let i = 0; i < particleCount; i++) {
        particleProgress[i] = (particleProgress[i] + delta * 0.35 * timeScale) % 1.0;
        const t = particleProgress[i];
        const isYt = particleSide[i] === 1;
        const curve = isYt ? ytCurve : igCurve;
        const pt = curve.getPoint(t);

        dummy.position.copy(pt);
        dummy.scale.setScalar(0.8 + Math.sin(t * Math.PI) * 0.8);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Render
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // 9. Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      chassisGeo.dispose();
      chassisMat.dispose();
      sleeveGeo.dispose();
      sleeveMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      finGeo.dispose();
      finMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      igBoxGeo.dispose();
      igBoxMat.dispose();
      igBezelGeo.dispose();
      igBezelMat.dispose();
      igLensGeo.dispose();
      igLensMat.dispose();
      igFlashGeo.dispose();
      igFlashMat.dispose();
      igOrbitGeo.dispose();
      igOrbitMat.dispose();
      ytBoxGeo.dispose();
      ytBoxMat.dispose();
      ytPlayGeo.dispose();
      ytPlayMat.dispose();
      ytFrameGeo.dispose();
      ytFrameMat.dispose();
      ytOrbitGeo.dispose();
      ytOrbitMat.dispose();
      igTubeGeo.dispose();
      igTubeMat.dispose();
      ytTubeGeo.dispose();
      ytTubeMat.dispose();
      pGeo.dispose();
      pMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden bg-[#080b11] border border-white/10 shadow-[0_12px_60px_-10px_rgba(0,0,0,0.9),0_0_40px_rgba(160,120,255,0.15)] flex flex-col justify-between">
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        data-testid="threejs-canvas-container"
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Spec Badges & Controls Header */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md">
            <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wider uppercase text-white font-mono">
                QUANTUM DISPATCH REACTOR // 3D
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono font-semibold">
                LIVE WEBGL
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Drag to orbit • Scroll to zoom • Interactive assembly
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-3 py-1.5 rounded-lg bg-[#141a2b] hover:bg-[#1f2940] text-xs font-medium text-slate-300 border border-white/10 shadow-sm flex items-center gap-1 transition-all"
            aria-label={isCollapsed ? 'Show 3D HUD' : 'Hide 3D HUD'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCollapsed ? 'expand_less' : 'expand_more'}
            </span>
            <span>{isCollapsed ? 'Show 3D HUD' : 'Collapse HUD'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Sleek Dock (Collapsible HUD following Three.js guidelines) */}
      <div
        className={`relative z-10 p-4 transition-all duration-300 flex justify-center ${
          isCollapsed ? 'translate-y-28 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="w-full max-w-3xl bg-[#101524] border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-between gap-4">
          {/* Camera View Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              View:
            </span>
            <button
              type="button"
              onClick={() => setControls((c) => ({ ...c, viewPreset: 'overview' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                controls.viewPreset === 'overview'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Reactor Core
            </button>
            <button
              type="button"
              onClick={() => setControls((c) => ({ ...c, viewPreset: 'instagram' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                controls.viewPreset === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Instagram Node
            </button>
            <button
              type="button"
              onClick={() => setControls((c) => ({ ...c, viewPreset: 'youtube' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                controls.viewPreset === 'youtube'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              YouTube Node
            </button>
            <button
              type="button"
              onClick={() => setControls((c) => ({ ...c, viewPreset: 'exploded', exploded: 0.65 }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                controls.viewPreset === 'exploded'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Exploded
            </button>
          </div>

          {/* Exploded Slider & Speed */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <label htmlFor="exploded-range" className="text-slate-400 font-medium">
                Exploded:
              </label>
              <input
                id="exploded-range"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={controls.exploded}
                onChange={(e) =>
                  setControls((c) => ({ ...c, exploded: parseFloat(e.target.value) }))
                }
                className="w-24 accent-purple-500 cursor-pointer"
              />
              <span className="text-purple-300 font-mono w-8">
                {Math.round(controls.exploded * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
              <button
                type="button"
                onClick={() =>
                  setControls((c) => ({
                    ...c,
                    speed: c.speed === 0 ? 1 : c.speed === 1 ? 2 : 0,
                  }))
                }
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 font-mono"
              >
                {controls.speed === 0 ? '⏸ Paused' : `${controls.speed}x Speed`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
