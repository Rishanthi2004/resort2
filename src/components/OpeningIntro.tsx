import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface OpeningIntroProps {
  onComplete: () => void;
}

export const OpeningIntro: React.FC<OpeningIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'initial' | 'unfurl' | 'title' | 'ready'>('initial');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js scene for the cinematic resort sunrise intro
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c1a14, 0.04);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Warm tropical sunlight and atmospheric rim
    const sunLight = new THREE.DirectionalLight(0xffecd2, 4.0);
    sunLight.position.set(5, 8, 7);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x1a3326, 1.8);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xd4af37, 3.5, 20);
    goldPoint.position.set(0, 2, 3);
    scene.add(goldPoint);

    // 1. Shimmering Water Reflection Plane at the bottom
    const waterGeo = new THREE.PlaneGeometry(30, 20, 40, 40);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0f2a20,
      roughness: 0.15,
      metalness: 0.7,
      transparent: true,
      opacity: 0.85,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2.3;
    waterMesh.position.set(0, -3.2, 0);
    scene.add(waterMesh);

    // 2. Golden Sun Dust Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 18;
      particlePos[i + 1] = (Math.random() - 0.5) * 12;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde68a,
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Realistic Left & Right Palm Fronds (Natural Organic Curtain)
    function createFrond(): THREE.Group {
      const g = new THREE.Group();
      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(0.5, -0.8, 0.2),
        new THREE.Vector3(1.2, 1.0, 0.3),
        new THREE.Vector3(2.0, 2.8, 0.2),
      ]);
      const stemGeo = new THREE.TubeGeometry(stemCurve, 24, 0.045, 6, false);
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x183b2b,
        roughness: 0.35,
        metalness: 0.08,
        side: THREE.DoubleSide,
      });
      const stemMesh = new THREE.Mesh(stemGeo, leafMat);
      g.add(stemMesh);

      for (let i = 0; i < 14; i++) {
        const t = (i + 1) / 16;
        const pt = stemCurve.getPoint(t);
        const tan = stemCurve.getTangent(t);
        const len = Math.sin(t * Math.PI) * 1.3 + 0.3;

        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.quadraticCurveTo(len * 0.45, 0.15, len, 0);
        s.quadraticCurveTo(len * 0.5, -0.1, 0, 0);
        const lMesh = new THREE.Mesh(new THREE.ShapeGeometry(s, 6), leafMat);
        lMesh.position.copy(pt);
        lMesh.rotation.z = Math.atan2(tan.y, tan.x) + 0.75;
        lMesh.rotation.x = 0.3;
        g.add(lMesh);
      }
      return g;
    }

    // Left Frond
    const leftFrond = createFrond();
    leftFrond.position.set(-4.5, 1.5, 2.5);
    leftFrond.rotation.set(0.3, 0.4, -0.2);
    leftFrond.scale.set(1.4, 1.4, 1.4);
    scene.add(leftFrond);

    // Right Frond
    const rightFrond = createFrond();
    rightFrond.position.set(4.5, 1.8, 2.2);
    rightFrond.rotation.set(0.3, -0.4, 0.2);
    rightFrond.scale.set(-1.3, 1.3, 1.3);
    scene.add(rightFrond);

    // 4. Tropical Petals Drifting in the Wind
    const petals: { mesh: THREE.Mesh; pos: THREE.Vector3; vy: number; rx: number; ry: number }[] = [];
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.12, 0.1, 0.15, 0.3, 0, 0.45);
    petalShape.bezierCurveTo(-0.15, 0.3, -0.12, 0.1, 0, 0);
    const petalGeo = new THREE.ShapeGeometry(petalShape, 6);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      roughness: 0.5,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 10; i++) {
      const pm = new THREE.Mesh(petalGeo, petalMat);
      const px = (Math.random() - 0.5) * 12;
      const py = 2 + Math.random() * 4;
      const pz = 1 + Math.random() * 4;
      pm.position.set(px, py, pz);
      scene.add(pm);
      petals.push({
        mesh: pm,
        pos: new THREE.Vector3(px, py, pz),
        vy: 0.008 + Math.random() * 0.008,
        rx: 0.015,
        ry: 0.02,
      });
    }

    let animId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();

      // Camera zooms forward into the villa landscape
      camera.position.z = 8 - Math.min(elapsed * 0.75, 2.8);

      // Organic parting of the palm fronds like a natural curtain
      leftFrond.position.x = -4.5 - Math.min(elapsed * 0.4, 2.2);
      rightFrond.position.x = 4.5 + Math.min(elapsed * 0.4, 2.2);
      leftFrond.rotation.z = -0.2 - Math.min(elapsed * 0.05, 0.3);
      rightFrond.rotation.z = 0.2 + Math.min(elapsed * 0.05, 0.3);

      // Water gentle undulation
      const posAttr = waterGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getY(i);
        posAttr.setZ(i, Math.sin(u * 0.5 + elapsed * 1.5) * 0.08 + Math.cos(v * 0.5 + elapsed) * 0.05);
      }
      posAttr.needsUpdate = true;

      // Petals tumbling
      petals.forEach((p) => {
        p.pos.y -= p.vy;
        p.pos.x += Math.sin(elapsed + p.pos.y) * 0.004;
        if (p.pos.y < -4) {
          p.pos.y = 4;
        }
        p.mesh.position.copy(p.pos);
        p.mesh.rotation.x += p.rx;
        p.mesh.rotation.y += p.ry;
      });

      // Drifting particles
      particles.rotation.y = elapsed * 0.025;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Timer progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 85);

    const t1 = setTimeout(() => setStage('unfurl'), 600);
    const t2 = setTimeout(() => setStage('title'), 1600);
    const t3 = setTimeout(() => setStage('ready'), 3200);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const resortLetters = 'KAIALUNA'.split('');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#09140F] via-[#0E1E17] to-[#08120D] text-[#FAF8F5] overflow-hidden select-none"
    >
      {/* Background Cinematic Resort Villa Horizon with Depth Focus */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-[6000ms] ease-out will-change-transform"
        style={{
          backgroundImage: `url(/src/assets/images/hero_resort_villa_1793611580912.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${1.08 + progress * 0.0008})`,
          filter: `brightness(${0.4 + progress * 0.003}) contrast(1.05)`,
        }}
      />
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#09140F]/60 to-[#08120D]/95 z-0" />

      {/* 3D WebGL Layer (Water plane, parting palm leaves, floating petals & dust) */}
      <div ref={mountRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Top Bar with Coordinates & Skip */}
      <div className="relative z-20 w-full max-w-7xl px-8 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.3em] uppercase text-[#D4AF37]/90">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>04°12′22″N 73°30′14″E · North Malé Atoll</span>
        </div>

        <button
          onClick={onComplete}
          className="text-xs tracking-[0.2em] uppercase text-[#FAF8F5]/70 hover:text-[#D4AF37] transition-colors py-2 px-3 cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      {/* Center Editorial Title Revelation */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 my-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="w-8 h-[1px] bg-[#C5A059]" />
          <span className="text-xs uppercase tracking-[0.45em] text-[#C5A059] font-medium">
            The Private Island Sanctuary
          </span>
          <span className="w-8 h-[1px] bg-[#C5A059]" />
        </motion.div>

        {/* Resort Letters */}
        <div className="flex items-center justify-center gap-1.5 md:gap-4 overflow-hidden mb-4">
          {resortLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 90, opacity: 0, filter: 'blur(8px)' }}
              animate={
                stage === 'title' || stage === 'ready'
                  ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                  : { y: 90, opacity: 0, filter: 'blur(8px)' }
              }
              transition={{
                duration: 1.1,
                delay: 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-[0.16em] text-[#FAF8F5] drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={stage === 'title' || stage === 'ready' ? { opacity: 0.85, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#FAF8F5]/80 font-light max-w-lg leading-relaxed"
        >
          Where Architecture Dissolves Into The Ocean
        </motion.p>
      </div>

      {/* Bottom Progress / Enter Sanctuary Button */}
      <div className="relative z-20 w-full max-w-md px-8 pb-12 flex flex-col items-center gap-4">
        <AnimatePresence>
          {stage === 'ready' ? (
            <motion.button
              key="enter-btn"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={onComplete}
              className="group relative inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#12231A] text-xs uppercase tracking-[0.25em] font-bold rounded-full shadow-2xl hover:shadow-[#D4AF37]/40 transition-all cursor-pointer hover:scale-105 border border-white/30"
            >
              <span>Enter Sanctuary</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          ) : (
            <div className="w-full flex flex-col items-center gap-2.5">
              <div className="w-52 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                Immersing Sanctuary · {Math.round(progress)}%
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
