import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroBackground3DProps {
  className?: string;
}

/**
 * Layered WebGL hero backdrop:
 *  - drifting particle constellation
 *  - wireframe neural shell + inner core polygon
 *  - two orbital rings
 * Everything reacts to pointer + scroll with damped motion, and the scene
 * rebuilds its geometry budget on resize so it stays smooth on phones.
 */
export const HeroBackground3D: React.FC<HeroBackground3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerFineQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // No WebGL: CSS glow layers remain as the fallback.
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      2000
    );
    camera.position.set(0, 0, 96);

    const isSmallScreen = () => window.innerWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen() ? 1.5 : 1.85));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const themeIsLight = () =>
      document.documentElement.classList.contains('light');
    const cyanColor = new THREE.Color('#FF7A45');
    const violetColor = new THREE.Color('#E7C79A');
    const deepColor = new THREE.Color('#B45309');

    // ------------------------------------------------------------------
    // 1. Particle constellation
    // ------------------------------------------------------------------
    const particleCount = isSmallScreen() ? 80 : 170;
    const maxDistance = isSmallScreen() ? 20 : 24;

    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 130;
      positions[i3 + 1] = (Math.random() - 0.5) * 95;
      positions[i3 + 2] = (Math.random() - 0.5) * 70;

      velocities[i3] = (Math.random() - 0.5) * 0.075;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.075;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

      const mixed = cyanColor.clone().lerp(violetColor, Math.random());
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 122, 69, 0.85)');
      gradient.addColorStop(0.7, 'rgba(240, 162, 75, 0.28)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(spriteCanvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: isSmallScreen() ? 3.4 : 4.4,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9,
    });
    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);

    const lineCapacity = particleCount * 8;
    const linePositions = new Float32Array(lineCapacity * 6);
    const lineColors = new Float32Array(lineCapacity * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);

    // ------------------------------------------------------------------
    // 2. Wireframe neural shell + core + orbital rings
    // ------------------------------------------------------------------
    const shellGroup = new THREE.Group();
    shellGroup.position.z = -18;

    const shellGeometry = new THREE.IcosahedronGeometry(34, isSmallScreen() ? 1 : 2);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: cyanColor,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);

    const coreGeometry = new THREE.IcosahedronGeometry(16, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: violetColor,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringGeometry = new THREE.TorusGeometry(44, 0.18, 6, isSmallScreen() ? 80 : 160);
    const ringA = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringBMaterial = ringMaterial.clone();
    ringBMaterial.color = violetColor;
    ringBMaterial.opacity = 0.22;
    const ringB = new THREE.Mesh(ringGeometry, ringBMaterial);
    ringB.scale.setScalar(0.82);

    shellGroup.add(shell, core, ringA, ringB);

    // ------------------------------------------------------------------
    // 2b. Lit metallic sculpture + animated perspective floor
    // ------------------------------------------------------------------
    const sculpture = new THREE.Group();
    const sculptureBase = {
      x: isSmallScreen() ? -14 : -32,
      y: isSmallScreen() ? 8 : 14,
      z: -2,
    };
    sculpture.position.set(sculptureBase.x, sculptureBase.y, sculptureBase.z);

    const knotGeometry = new THREE.TorusKnotGeometry(
      10,
      2.8,
      isSmallScreen() ? 72 : 170,
      isSmallScreen() ? 10 : 20
    );
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xff7a45,
      metalness: 0.92,
      roughness: 0.24,
      emissive: 0x3a1408,
      emissiveIntensity: 1.6,
      transparent: true,
      opacity: 0.38,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);

    const haloGeometry = new THREE.TorusKnotGeometry(6, 1.5, 70, 8);
    const haloMaterial = new THREE.MeshStandardMaterial({
      color: 0xe7c79a,
      metalness: 1,
      roughness: 0.18,
      transparent: true,
      opacity: 0.45,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2.6;

    sculpture.add(knot, halo);
    if (isSmallScreen()) sculpture.scale.setScalar(0.66);
    scene.add(sculpture);
    scene.add(new THREE.AmbientLight(0xffd9c2, 0.6));
    const keyLight = new THREE.DirectionalLight(0xff9a6b, 4.2);
    keyLight.position.set(60, 55, 70);
    const rimLight = new THREE.DirectionalLight(0xe7c79a, 1.9);
    rimLight.position.set(-70, -25, 25);
    const warmFill = new THREE.PointLight(0xff7a45, 140, 260, 2);
    warmFill.position.set(0, -34, 34);
    scene.add(keyLight, rimLight, warmFill);

    // Animated horizon grid — reads as a 3D floor receding into depth
    const gridGeometry = new THREE.GridHelper(
      360,
      60,
      new THREE.Color('#ff7a45'),
      new THREE.Color('#5a3a29')
    );
    const gridMaterial = gridGeometry.material as THREE.LineBasicMaterial;
    gridMaterial.transparent = true;
    gridMaterial.opacity = isSmallScreen() ? 0.2 : 0.3;
    gridMaterial.depthWrite = false;
    gridMaterial.blending = THREE.AdditiveBlending;
    gridGeometry.position.set(0, -44, -70);
    scene.add(gridGeometry);

    const world = new THREE.Group();
    world.add(pointCloud, linesMesh, shellGroup);
    scene.add(world);

    // ------------------------------------------------------------------
    // Interaction state
    // ------------------------------------------------------------------
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.targetY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        pointer.targetX = 0;
        pointer.targetY = 0;
        return;
      }
      handleMouseMove(event as unknown as MouseEvent);
    };

    if (pointerFineQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ------------------------------------------------------------------
    // Resize (container aware, keeps the camera and DPR in sync)
    // ------------------------------------------------------------------
    const applySize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen() ? 1.5 : 1.85));
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => applySize());
    resizeObserver.observe(container);

    // ------------------------------------------------------------------
    // Theme sync so the lattice reads on light backgrounds too
    // ------------------------------------------------------------------
    const applyTheme = () => {
      const light = themeIsLight();
      shellMaterial.color.copy(light ? deepColor : cyanColor);
      shellMaterial.opacity = light ? 0.2 : 0.14;
      coreMaterial.color.copy(light ? deepColor : violetColor);
      coreMaterial.opacity = light ? 0.24 : 0.22;
      ringMaterial.color.copy(light ? deepColor : cyanColor);
      ringBMaterial.color.copy(light ? violetColor : violetColor);
      pointsMaterial.opacity = light ? 0.55 : 0.9;
      lineMaterial.opacity = light ? 0.18 : 0.26;
      knotMaterial.opacity = light ? 0.24 : 0.38;
      haloMaterial.opacity = light ? 0.42 : 0.34;
      gridMaterial.opacity = light ? 0.16 : isSmallScreen() ? 0.2 : 0.3;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // ------------------------------------------------------------------
    // Render loop (single loop, paused when hidden or offscreen)
    // ------------------------------------------------------------------
    let frameId = 0;
    let isRunning = false;
    let isVisible = true;

    const renderFrame = (delta: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;

      // Damped pointer parallax on the camera and the lattice group.
      camera.position.x = pointer.x * 10;
      camera.position.y = pointer.y * 8;
      camera.position.z = 96 + scrollProgress * 26;
      camera.lookAt(0, 0, 0);

      world.rotation.y = pointer.x * 0.16 + delta * 0.045;
      world.rotation.x = -pointer.y * 0.1;

      shellGroup.rotation.y -= 0.0022;
      shellGroup.rotation.x += 0.0007;
      core.rotation.y += 0.0042;
      core.rotation.z -= 0.0016;

      ringA.rotation.x = Math.PI / 2.6;
      ringA.rotation.y += 0.0035;
      ringB.rotation.x = -Math.PI / 3.1;
      ringB.rotation.z += 0.0028;

      // Lit sculpture: slow independent tumble + breathing float
      knot.rotation.x = delta * 0.26;
      knot.rotation.y = delta * 0.34;
      halo.rotation.y = -delta * 0.22;
      halo.rotation.z = delta * 0.4;
      sculpture.position.y = sculptureBase.y + Math.sin(delta * 0.7) * 3.5;
      sculpture.position.x = sculptureBase.x + Math.cos(delta * 0.5) * 2.5;

      // Floor grid drifts toward the viewer, then wraps seamlessly
      gridGeometry.position.z = -70 + ((delta * 8) % 6);

      shellGroup.position.z = -18 + Math.sin(delta * 0.6) * 4;

      // Particle drift + constellation rebuild
      const positionAttribute = pointsGeometry.attributes.position;
      const array = positionAttribute.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        array[i3] += velocities[i3];
        array[i3 + 1] += velocities[i3 + 1];
        array[i3 + 2] += velocities[i3 + 2];

        if (Math.abs(array[i3]) > 64) velocities[i3] *= -1;
        if (Math.abs(array[i3 + 1]) > 48) velocities[i3 + 1] *= -1;
        if (Math.abs(array[i3 + 2]) > 35) velocities[i3 + 2] *= -1;

        if (lineIndex + 6 > linePositions.length) continue;

        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex + 6 > linePositions.length) break;
          const j3 = j * 3;
          const dx = array[i3] - array[j3];
          const dy = array[i3 + 1] - array[j3 + 1];
          const dz = array[i3 + 2] - array[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            const alpha = 1 - distance / maxDistance;
            linePositions[lineIndex] = array[i3];
            linePositions[lineIndex + 1] = array[i3 + 1];
            linePositions[lineIndex + 2] = array[i3 + 2];
            lineColors[lineIndex] = cyanColor.r * alpha;
            lineColors[lineIndex + 1] = cyanColor.g * alpha;
            lineColors[lineIndex + 2] = cyanColor.b * alpha;

            linePositions[lineIndex + 3] = array[j3];
            linePositions[lineIndex + 4] = array[j3 + 1];
            linePositions[lineIndex + 5] = array[j3 + 2];
            lineColors[lineIndex + 3] = violetColor.r * alpha;
            lineColors[lineIndex + 4] = violetColor.g * alpha;
            lineColors[lineIndex + 5] = violetColor.b * alpha;

            lineIndex += 6;
          }
        }
      }

      positionAttribute.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (isRunning || reducedMotionQuery.matches) return;
      isRunning = true;
      const clock = new THREE.Clock();
      const loop = () => {
        if (!isRunning) return;
        frameId = requestAnimationFrame(loop);
        renderFrame(clock.getElapsedTime());
      };
      loop();
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (isVisible) start();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleMotionPreference = () => {
      stop();
      if (reducedMotionQuery.matches) {
        renderFrame(0);
      } else if (isVisible && !document.hidden) {
        start();
      }
    };
    reducedMotionQuery.addEventListener?.('change', handleMotionPreference);

    // First paint: a static frame works even for reduced motion.
    renderFrame(0);
    if (!reducedMotionQuery.matches && !document.hidden) start();

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotionQuery.removeEventListener?.('change', handleMotionPreference);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringBMaterial.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* CSS fallback / ambient depth layers behind the WebGL canvas */}
      <div className="absolute top-1/3 left-1/2 -transtone-x-1/2 -transtone-y-1/2 w-[min(560px,90vw)] h-[min(560px,90vw)] bg-neon-cyan/10 rounded-full blur-[130px] -z-10" />
      <div className="absolute top-1/2 left-1/3 -transtone-x-1/2 -transtone-y-1/2 w-[min(440px,80vw)] h-[min(440px,80vw)] bg-neon-violet/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0A09] dark:from-[#0B0A09] to-transparent -z-10 opacity-70" />
    </div>
  );
};
