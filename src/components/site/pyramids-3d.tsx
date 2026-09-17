"use client";

import * as React from "react";
import * as THREE from "three";

export function Pyramids3D({ imgClassName = "h-66" }: { imgClassName?: string }) {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [live, setLive] = React.useState(false);

  React.useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let cancelled = false;
    let raf = 0;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    const target = { x: 0, y: 0 };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.7, 9.0);

    // --- Окружение для металлических отражений (мини-сцена, без внешних файлов) ---
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0a0a0a);
    const panel = (
      color: number,
      intensity: number,
      w: number,
      h: number,
      x: number,
      y: number,
      z: number
    ) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) })
      );
      m.position.set(x, y, z);
      m.lookAt(0, 0, 0);
      envScene.add(m);
    };
    panel(0xffffff, 6, 8, 4, 0, 6, 2); // верхний софтбокс
    panel(0xffe9a3, 2.5, 5, 5, -6, 1, 2); // тёплый слева
    panel(0x88aaff, 1.5, 5, 5, 6, 0, -1); // холодный справа
    panel(0xffffff, 1, 10, 2, 0, -2, 6); // нижняя подсветка
    scene.environment = pmrem.fromScene(envScene, 0.04).texture;
    pmrem.dispose();

    // --- Свет ---
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd97a, 0.9);
    rim.position.set(-4, 2, -3);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // --- Три пирамиды ---
    const logo = new THREE.Group();
    scene.add(logo);

    const makePyramid = (
      radius: number,
      height: number,
      color: number,
      metalness: number,
      roughness: number
    ) => {
      const geo = new THREE.ConeGeometry(radius, height, 4, 1);
      geo.rotateY(Math.PI / 4);
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness,
        roughness,
        flatShading: true,
        envMapIntensity: 1.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0x141414 })
      );
      edges.scale.setScalar(1.003);
      mesh.add(edges);
      return mesh;
    };

    const backL = makePyramid(1.42, 2.45, 0x8f8600, 0.85, 0.32);
    backL.position.set(-0.98, 1.22, -0.55);
    const backR = makePyramid(1.42, 2.45, 0x8f8600, 0.85, 0.32);
    backR.position.set(0.98, 1.22, -0.55);
    const front = makePyramid(1.32, 2.1, 0xffd400, 0.7, 0.24);
    front.position.set(0, 1.05, 0.62);
    logo.add(backL, backR, front);

    // --- Лёгкое следование за курсором (без свободного вращения) ---
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      target.y = (px - 0.5) * 1.1; // ±~31° влево-вправо
      target.x = (0.5 - py) * 0.6; // ±~17° вверх-вниз
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    const clock = new THREE.Clock();
    const lookAt = new THREE.Vector3(0, 1.05, 0);
    let firstFrame = true;
    const loop = () => {
      if (cancelled) return;
      const t = clock.getElapsedTime();
      logo.position.y = Math.sin(t * 1.2) * 0.05; // лёгкое парение
      logo.rotation.y += (target.y - logo.rotation.y) * 0.06;
      logo.rotation.x += (target.x - logo.rotation.x) * 0.06;
      camera.lookAt(lookAt);
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        fadeTimer = setTimeout(() => {
          if (!cancelled) setLive(true);
        }, 50);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (fadeTimer) clearTimeout(fadeTimer);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      mount.innerHTML = "";
    };
  }, []);

  return (
    <div className="anim-logo-3d">
      <div className={`relative aspect-square ${imgClassName} w-auto`}>
        <div
          ref={mountRef}
          className={`absolute inset-0 transition-opacity duration-500 [&>canvas]:h-full [&>canvas]:w-full ${
            live ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div
        aria-hidden
        className="mx-auto mt-2 h-5 w-3/5 rounded-[100%] bg-black/50 blur-md dark:bg-black/70"
      />
    </div>
  );
}
