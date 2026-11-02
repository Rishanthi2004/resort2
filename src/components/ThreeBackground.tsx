import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  scrollProgress?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard (per Three.js skill)
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
        return false;
      }
    })();

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf8f5, 0.018);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 3. Studio Warm/Cool Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const sunKeyLight = new THREE.DirectionalLight(0xffedd5, 2.5);
    sunKeyLight.position.set(8, 12, 10);
    scene.add(sunKeyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.6);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x1a3326, 0.8);
    scene.add(hemiLight);

    // 4. Procedural Materials
    // A. Luxury Gold Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.22,
      envMapIntensity: 1.2,
    });

    // B. Tropical Palm Leaf Material
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b4332,
      roughness: 0.38,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const leafAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.42,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    // C. Petal Material
    const petalMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff0db,
      roughness: 0.6,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    const petalPinkMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4a261,
      roughness: 0.5,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });

    // D. Water Droplet Glass Material
    const dropletMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.05,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.9,
      transparent: true,
      opacity: 0.65,
      ior: 1.33,
    });

    // 5. Procedural Leaf Geometry Generator (Compound 3D Palm Frond)
    function createPalmLeafFrond(): THREE.Group {
      const frondGroup = new THREE.Group();
      
      // Central curved stem
      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.6, 0),
        new THREE.Vector3(0.3, -0.6, 0.1),
        new THREE.Vector3(0.5, 0.6, 0.2),
        new THREE.Vector3(0.4, 1.6, 0.1),
        new THREE.Vector3(0.1, 2.4, 0),
      ]);
      const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.035, 6, false);
      const stemMesh = new THREE.Mesh(stemGeo, leafMaterial);
      frondGroup.add(stemMesh);

      // Pinnae (leaflets) along the stem
      const leafletPairs = 10;
      for (let i = 0; i < leafletPairs; i++) {
        const t = (i + 1) / (leafletPairs + 1);
        const point = stemCurve.getPoint(t);
        const tangent = stemCurve.getTangent(t);
        const length = Math.sin(t * Math.PI) * 0.9 + 0.3;

        // Left leaflet
        const leftShape = new THREE.Shape();
        leftShape.moveTo(0, 0);
        leftShape.quadraticCurveTo(length * 0.5, 0.08, length, 0);
        leftShape.quadraticCurveTo(length * 0.5, -0.05, 0, 0);
        const leftGeo = new THREE.ShapeGeometry(leftShape, 8);
        const leftMesh = new THREE.Mesh(leftGeo, i % 2 === 0 ? leafMaterial : leafAccentMaterial);
        leftMesh.position.copy(point);
        leftMesh.rotation.z = Math.atan2(tangent.y, tangent.x) + 0.7;
        leftMesh.rotation.x = 0.25;
        frondGroup.add(leftMesh);

        // Right leaflet
        const rightShape = new THREE.Shape();
        rightShape.moveTo(0, 0);
        rightShape.quadraticCurveTo(-length * 0.5, 0.08, -length, 0);
        rightShape.quadraticCurveTo(-length * 0.5, -0.05, 0, 0);
        const rightGeo = new THREE.ShapeGeometry(rightShape, 8);
        const rightMesh = new THREE.Mesh(rightGeo, i % 2 === 0 ? leafMaterial : leafAccentMaterial);
        rightMesh.position.copy(point);
        rightMesh.rotation.z = Math.atan2(tangent.y, tangent.x) - 0.7;
        rightMesh.rotation.x = -0.25;
        frondGroup.add(rightMesh);
      }

      return frondGroup;
    }

    // 6. Assemble Floating Objects
    // A. 3D Palm Leaves (Multiple layered fronds)
    const palmLeaves: { group: THREE.Group; basePos: THREE.Vector3; speed: number; rotSpeed: THREE.Vector3 }[] = [];
    for (let i = 0; i < 4; i++) {
      const frond = createPalmLeafFrond();
      const scale = 0.8 + Math.random() * 0.5;
      frond.scale.set(scale, scale, scale);

      // Distribute in different depths
      const x = (i % 2 === 0 ? 1 : -1) * (4.5 + Math.random() * 2.5);
      const y = (i < 2 ? 1 : -1) * (2.5 + Math.random() * 2);
      const z = -2 + Math.random() * 4;
      frond.position.set(x, y, z);
      frond.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * 0.5);

      scene.add(frond);
      palmLeaves.push({
        group: frond,
        basePos: new THREE.Vector3(x, y, z),
        speed: 0.5 + Math.random() * 0.5,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.003
        ),
      });
    }

    // B. 3D Golden Armillary Sun Element
    const sunGroup = new THREE.Group();
    const coreSunGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const coreSun = new THREE.Mesh(coreSunGeo, goldMaterial);
    sunGroup.add(coreSun);

    // Three interlocking golden rings
    const ringGeo1 = new THREE.TorusGeometry(0.85, 0.025, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo1, goldMaterial);
    sunGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.05, 0.02, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, goldMaterial);
    ring2.rotation.x = Math.PI / 3;
    sunGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(1.25, 0.018, 16, 64);
    const ring3 = new THREE.Mesh(ringGeo3, goldMaterial);
    ring3.rotation.y = Math.PI / 4;
    sunGroup.add(ring3);

    sunGroup.position.set(5.5, 3.2, 0);
    sunGroup.scale.set(0.7, 0.7, 0.7);
    scene.add(sunGroup);

    // C. 3D Golden Island Jewel / Location Pin
    const pinGroup = new THREE.Group();
    const headGeo = new THREE.SphereGeometry(0.35, 20, 20);
    const pinHead = new THREE.Mesh(headGeo, goldMaterial);
    pinHead.position.y = 0.5;
    pinGroup.add(pinHead);

    const coneGeo = new THREE.ConeGeometry(0.35, 0.8, 20);
    const pinCone = new THREE.Mesh(coneGeo, goldMaterial);
    pinCone.rotation.x = Math.PI;
    pinGroup.add(pinCone);

    // Floating gem ring around pin
    const pinRingGeo = new THREE.TorusGeometry(0.5, 0.02, 16, 32);
    const pinRing = new THREE.Mesh(pinRingGeo, goldMaterial);
    pinRing.rotation.x = Math.PI / 2;
    pinRing.position.y = 0.5;
    pinGroup.add(pinRing);

    pinGroup.position.set(-5.8, -2.5, 1);
    pinGroup.scale.set(0.65, 0.65, 0.65);
    scene.add(pinGroup);

    // D. Translucent Water Droplets (Refractive spheres floating)
    const droplets: { mesh: THREE.Mesh; basePos: THREE.Vector3; freq: number }[] = [];
    const dropletGeo = new THREE.SphereGeometry(0.18, 20, 20);
    for (let i = 0; i < 7; i++) {
      const drop = new THREE.Mesh(dropletGeo, dropletMaterial);
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = 1 + Math.random() * 3;
      drop.position.set(x, y, z);
      const s = 0.4 + Math.random() * 0.7;
      drop.scale.set(s, s * 1.25, s);
      scene.add(drop);
      droplets.push({
        mesh: drop,
        basePos: new THREE.Vector3(x, y, z),
        freq: 0.8 + Math.random() * 0.8,
      });
    }

    // E. Tropical Petals
    const petals: { mesh: THREE.Mesh; pos: THREE.Vector3; rotSpeed: THREE.Vector3; fallSpeed: number }[] = [];
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.15, 0.15, 0.15, 0.4, 0, 0.6);
    petalShape.bezierCurveTo(-0.15, 0.4, -0.15, 0.15, 0, 0);
    const petalGeo = new THREE.ShapeGeometry(petalShape, 10);

    for (let i = 0; i < 12; i++) {
      const petal = new THREE.Mesh(petalGeo, i % 3 === 0 ? petalPinkMaterial : petalMaterial);
      const x = (Math.random() - 0.5) * 14;
      const y = -4 + Math.random() * 8;
      const z = (Math.random() - 0.5) * 6;
      petal.position.set(x, y, z);
      const s = 0.5 + Math.random() * 0.5;
      petal.scale.set(s, s, s);
      petal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(petal);
      petals.push({
        mesh: petal,
        pos: new THREE.Vector3(x, y, z),
        rotSpeed: new THREE.Vector3(0.01, 0.015, 0.008),
        fallSpeed: 0.006 + Math.random() * 0.008,
      });
    }

    // F. 3D Butterflies with flapping wings
    interface Butterfly {
      group: THREE.Group;
      leftWing: THREE.Mesh;
      rightWing: THREE.Mesh;
      t: number;
      speed: number;
      pathRadiusX: number;
      pathRadiusY: number;
      yOffset: number;
    }
    const butterflies: Butterfly[] = [];

    function createButterfly(colorHex: number): Butterfly {
      const bGroup = new THREE.Group();
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.bezierCurveTo(0.3, 0.2, 0.5, 0.4, 0.4, 0.7);
      wingShape.bezierCurveTo(0.2, 0.8, 0.05, 0.5, 0, 0.2);
      wingShape.bezierCurveTo(-0.05, 0.1, -0.02, 0.05, 0, 0);

      const wingGeo = new THREE.ShapeGeometry(wingShape, 8);
      const bMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      const bodyGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 6);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.rotation.x = Math.PI / 2;
      bGroup.add(body);

      const leftWing = new THREE.Mesh(wingGeo, bMat);
      leftWing.position.x = 0.02;
      leftWing.rotation.y = 0;
      bGroup.add(leftWing);

      const rightWing = new THREE.Mesh(wingGeo, bMat);
      rightWing.position.x = -0.02;
      rightWing.scale.x = -1;
      bGroup.add(rightWing);

      bGroup.scale.set(0.6, 0.6, 0.6);
      scene.add(bGroup);

      return {
        group: bGroup,
        leftWing,
        rightWing,
        t: Math.random() * 100,
        speed: 0.008 + Math.random() * 0.006,
        pathRadiusX: 4 + Math.random() * 3,
        pathRadiusY: 2 + Math.random() * 2,
        yOffset: (Math.random() - 0.5) * 4,
      };
    }

    butterflies.push(createButterfly(0xd4af37)); // Golden butterfly
    butterflies.push(createButterfly(0x38bdf8)); // Azure morpho butterfly

    // 7. Interactive Mouse / Scroll Listeners
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentScroll = 0;
    let targetScroll = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScroll = window.scrollY / maxScroll;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 8. Render Loop with Silky Damping
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX = THREE.MathUtils.damp(mouseX, targetMouseX, 4, dt);
      mouseY = THREE.MathUtils.damp(mouseY, targetMouseY, 4, dt);
      currentScroll = THREE.MathUtils.damp(currentScroll, targetScroll, 3, dt);

      // Camera responds gently to mouse and scroll depth
      camera.position.x = mouseX * 0.6;
      camera.position.y = -mouseY * 0.5 - currentScroll * 3.5;
      camera.lookAt(0, -currentScroll * 3.5, 0);

      // Animate Palm leaves
      palmLeaves.forEach((leaf, idx) => {
        const floatY = Math.sin(time * leaf.speed + idx) * 0.25;
        const floatX = Math.cos(time * leaf.speed * 0.7 + idx) * 0.15;
        leaf.group.position.x = leaf.basePos.x + floatX + mouseX * 0.4;
        leaf.group.position.y = leaf.basePos.y + floatY - currentScroll * 2;
        leaf.group.rotation.x += leaf.rotSpeed.x;
        leaf.group.rotation.y += leaf.rotSpeed.y;
        leaf.group.rotation.z += Math.sin(time * 0.5 + idx) * 0.001;
      });

      // Animate Golden Sun
      sunGroup.rotation.y += 0.008;
      sunGroup.rotation.x = Math.sin(time * 0.3) * 0.2;
      ring1.rotation.z += 0.012;
      ring2.rotation.x += 0.009;
      ring3.rotation.y += 0.015;
      sunGroup.position.y = 3.2 + Math.sin(time * 0.8) * 0.2 - currentScroll * 4;

      // Animate Location Pin
      pinGroup.rotation.y += 0.015;
      pinGroup.position.y = -2.5 + Math.sin(time * 1.2) * 0.25 - currentScroll * 2.5;

      // Animate Droplets
      droplets.forEach((drop, idx) => {
        drop.mesh.position.y = drop.basePos.y + Math.sin(time * drop.freq + idx) * 0.35 - currentScroll * 2;
        drop.mesh.position.x = drop.basePos.x + Math.cos(time * 0.5 + idx) * 0.15 + mouseX * 0.2;
        drop.mesh.rotation.y += 0.01;
      });

      // Animate Petals tumbling down
      petals.forEach((p) => {
        p.pos.y -= p.fallSpeed;
        p.pos.x += Math.sin(time + p.pos.y) * 0.005;
        if (p.pos.y < -7) {
          p.pos.y = 7;
          p.pos.x = (Math.random() - 0.5) * 14;
        }
        p.mesh.position.copy(p.pos);
        p.mesh.rotation.x += p.rotSpeed.x;
        p.mesh.rotation.y += p.rotSpeed.y;
        p.mesh.rotation.z += p.rotSpeed.z;
      });

      // Animate Butterflies
      butterflies.forEach((b) => {
        b.t += b.speed;
        const bx = Math.sin(b.t) * b.pathRadiusX;
        const bz = Math.cos(b.t) * 2;
        const by = b.yOffset + Math.sin(b.t * 2) * b.pathRadiusY - currentScroll * 3;
        
        b.group.position.set(bx, by, bz);
        // Tangent heading
        const nextX = Math.sin(b.t + 0.02) * b.pathRadiusX;
        const nextY = b.yOffset + Math.sin((b.t + 0.02) * 2) * b.pathRadiusY - currentScroll * 3;
        b.group.lookAt(nextX, nextY, Math.cos(b.t + 0.02) * 2);

        // Flapping wings
        const flap = Math.sin(time * 18) * 0.75;
        b.leftWing.rotation.y = flap;
        b.rightWing.rotation.y = -flap;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
