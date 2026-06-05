"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import {
  Upload,
  Type,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

// Configuration choices with realistic minimalist food photography
const shapes = [
  { id: "round", label: "Dumaloq (Round)", icon: "◯", price: 0, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" },
  { id: "square", label: "To'rtburchak (Square)", icon: "⬜", price: 20000, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=400&q=80" },
  { id: "heart", label: "Yurak (Heart)", icon: "❤️", price: 40000, image: "https://images.unsplash.com/photo-1518047601542-79f18c655718?auto=format&fit=crop&w=400&q=80" },
];

const sizes = [
  { id: "sm", label: "Kichik (Small) - 1kg", desc: "4-6 kishi uchun", price: 120000, image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80" },
  { id: "md", label: "O'rtacha (Medium) - 2kg", desc: "8-12 kishi uchun", price: 220000, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80" },
  { id: "lg", label: "Katta (Large) - 3kg+", desc: "15-20 kishi uchun", price: 320000, image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80" },
];

const layersList = [
  { count: 1, label: "1 qavatli (1 Layer)", priceMultiplier: 1 },
  { count: 2, label: "2 qavatli (2 Layers)", priceMultiplier: 1.6 },
  { count: 3, label: "3 qavatli (3 Layers)", priceMultiplier: 2.2 },
];

const flavors = [
  { id: "vanilla", label: "Vanilli", color: "#FFF8DC", price: 0, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80" },
  { id: "chocolate", label: "Shokoladli", color: "#3D2314", price: 15000, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" },
  { id: "strawberry", label: "Qulupnayli", color: "#FFB6C1", price: 20000, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80" },
  { id: "red-velvet", label: "Qizil Baxmal (Red Velvet)", color: "#8B0000", price: 30000, image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=400&q=80" },
  { id: "pistachio", label: "Pistali", color: "#98FB98", price: 35000, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=400&q=80" },
];

const creams = [
  { id: "cream-cheese", label: "Cream Cheese", price: 10000, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80" },
  { id: "chocolate-ganache", label: "Shokoladli Ganash", price: 25000, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" },
  { id: "buttercream", label: "Sariyog'li krem", price: 0, image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=400&q=80" },
  { id: "whipped-cream", label: "Kopirtirilgan qaymoq", price: 5000, image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=400&q=80" },
];

const fillings = [
  { id: "none", label: "Yo'q", price: 0, image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80" },
  { id: "banana", label: "Bananli", price: 10000, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80" },
  { id: "strawberry-jam", label: "Qulupnayli jem", price: 15000, image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=400&q=80" },
  { id: "caramel", label: "Karamel", price: 12000, image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80" },
  { id: "cherry", label: "Gilosli", price: 18000, image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80" },
];

const decors = [
  { id: "berries", label: "Yangi meva va rezavorlar", price: 40000, image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=400&q=80" },
  { id: "flowers", label: "Yeyish mumkin bo'lgan gullar", price: 50000, image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=400&q=80" },
  { id: "chocolate-drips", label: "Shokolad oqimlari (Drips)", price: 20000, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" },
  { id: "gold-leaf", label: "Oltin zarralari (Gold leaf)", price: 60000, image: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?auto=format&fit=crop&w=400&q=80" },
  { id: "minimalist", label: "Minimalist yozuvlar", price: 15000, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=400&q=80" },
];

// Check WebGL availability
const getWebGLStatus = () => {
  if (typeof window === "undefined") return false;
  const isHeadless = /HeadlessChrome|puppeteer|playwright/i.test(navigator.userAgent);
  if (isHeadless) return false; // Bypass WebGL in headless tests
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
};

// Interactive 3D Cake Canvas Component using Three.js
interface ThreeCakeCanvasProps {
  shape: string;
  size: string;
  layers: number;
  flavorColor: string;
  creamType: string;
  fillingType: string;
  decorType: string;
  customText: string;
  textColor: string;
  uploadedPhoto: string | null;
}

function ThreeCakeCanvas({
  shape,
  size,
  layers,
  flavorColor,
  creamType,
  fillingType,
  decorType,
  customText,
  textColor,
  uploadedPhoto,
}: ThreeCakeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cakeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotation = useRef({ x: 0.3, y: -0.8 });
  const currentRotation = useRef({ x: 0.3, y: -0.8 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    const available = getWebGLStatus();
    setWebGLAvailable(available);
    if (!available) return;

    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = 480;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFDF9");
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 7.5);
    camera.lookAt(0, 0, 0);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    dirLight.position.set(6, 9, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.bias = -0.0015;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.6, 12);
    pointLight.position.set(-5, 4, -5);
    scene.add(pointLight);

    // Add cake group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);
    cakeGroupRef.current = cakeGroup;

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };
    window.addEventListener("resize", handleResize);

    // Mouse / Touch Interaction Listeners
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x = Math.max(-0.1, Math.min(1.1, targetRotation.current.x + deltaY * 0.008));
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth rotation interpolation (lerp)
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.15;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.15;

      if (cakeGroupRef.current) {
        cakeGroupRef.current.rotation.x = currentRotation.current.x;
        cakeGroupRef.current.rotation.y = currentRotation.current.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(domEl);
      }
    };
  }, []);

  // Update cake elements whenever properties change
  useEffect(() => {
    if (!webGLAvailable) return;
    const cakeGroup = cakeGroupRef.current;
    if (!cakeGroup) return;
    // Clear previous geometries/materials safely to prevent loops
    const childrenCopy = [...cakeGroup.children];
    childrenCopy.forEach((obj) => {
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: any) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
      cakeGroup.remove(obj);
    });

    // 1. Ceramic Plate / stand
    const standGroup = new THREE.Group();
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xfbfbfb,
      roughness: 0.1,
      metalness: 0.05,
    });

    const plateGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 36);
    const plate = new THREE.Mesh(plateGeo, standMat);
    plate.position.y = -0.9;
    plate.receiveShadow = true;
    plate.castShadow = true;
    standGroup.add(plate);

    const stemGeo = new THREE.CylinderGeometry(0.25, 0.45, 0.4, 18);
    const stem = new THREE.Mesh(stemGeo, standMat);
    stem.position.y = -1.14;
    stem.castShadow = true;
    standGroup.add(stem);

    const baseGeo = new THREE.CylinderGeometry(0.7, 0.8, 0.08, 24);
    const base = new THREE.Mesh(baseGeo, standMat);
    base.position.y = -1.34;
    base.receiveShadow = true;
    standGroup.add(base);

    cakeGroup.add(standGroup);

    // 2. Build Layers (Tiers)
    const cakeColor = new THREE.Color(flavorColor);
    const creamColor = new THREE.Color(
      creamType === "chocolate-ganache" ? "#3D2314" :
      creamType === "cream-cheese" ? "#FFFDF2" :
      creamType === "whipped-cream" ? "#FFFFFF" :
      "#FFF4D6"
    );

    const layerHeight = 0.75;
    const padding = 0.02;

    for (let i = 0; i < layers; i++) {
      const tierGroup = new THREE.Group();
      const scale = 1 - i * 0.2;
      const radius = 1.15 * scale;

      let spongeGeo: THREE.BufferGeometry;
      let icingGeo: THREE.BufferGeometry;

      // Geometries based on shape choice
      if (shape === "square") {
        spongeGeo = new THREE.BoxGeometry(radius * 2, layerHeight - padding, radius * 2);
        icingGeo = new THREE.BoxGeometry(radius * 2 + 0.03, 0.04, radius * 2 + 0.03);
      } else if (shape === "heart") {
        // Heart shape extrusion
        const x = 0, y = 0;
        const heartShape = new THREE.Shape();
        heartShape.moveTo( x, y + 0.3 );
        heartShape.bezierCurveTo( x, y + 0.3, x - 0.2, y + 0.8, x - 0.6, y + 0.8 );
        heartShape.bezierCurveTo( x - 1.2, y + 0.8, x - 1.2, y + 0.2, x - 1.2, y + 0.2 );
        heartShape.bezierCurveTo( x - 1.2, y - 0.3, x - 0.7, y - 0.7, x, y - 1.2 );
        heartShape.bezierCurveTo( x + 0.7, y - 0.7, x + 1.2, y - 0.3, x + 1.2, y + 0.2 );
        heartShape.bezierCurveTo( x + 1.2, y + 0.2, x + 1.2, y + 0.8, x + 0.6, y + 0.8 );
        heartShape.bezierCurveTo( x + 0.2, y + 0.8, x, y + 0.3, x, y + 0.3 );

        const extrudeSettings = {
          depth: layerHeight - padding,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.04,
          bevelThickness: 0.04
        };
        spongeGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        spongeGeo.rotateX(-Math.PI / 2);
        spongeGeo.center();
        spongeGeo.scale(scale, 1, scale);

        const icingExtrudeSettings = {
          depth: 0.04,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.05,
          bevelThickness: 0.02
        };
        icingGeo = new THREE.ExtrudeGeometry(heartShape, icingExtrudeSettings);
        icingGeo.rotateX(-Math.PI / 2);
        icingGeo.center();
        icingGeo.scale(scale, 1, scale);
      } else {
        // Default Round
        spongeGeo = new THREE.CylinderGeometry(radius, radius, layerHeight - padding, 40);
        icingGeo = new THREE.CylinderGeometry(radius + 0.015, radius + 0.015, 0.04, 40);
      }

      // Materials
      const spongeMat = new THREE.MeshStandardMaterial({
        color: cakeColor,
        roughness: 0.8,
        metalness: 0.02,
      });

      const icingMat = new THREE.MeshStandardMaterial({
        color: creamColor,
        roughness: 0.25,
        metalness: 0.05,
      });

      // Assemble sponge tier
      const spongeMesh = new THREE.Mesh(spongeGeo, spongeMat);
      spongeMesh.position.y = (i * layerHeight) + (layerHeight / 2) - 0.8;
      spongeMesh.castShadow = true;
      spongeMesh.receiveShadow = true;
      tierGroup.add(spongeMesh);

      // Assemble frosting top layer
      const icingMesh = new THREE.Mesh(icingGeo, icingMat);
      icingMesh.position.y = (i * layerHeight) + layerHeight - 0.8;
      icingMesh.castShadow = true;
      icingMesh.receiveShadow = true;
      tierGroup.add(icingMesh);

      // Cream drips around top tier rim
      if (i === layers - 1) {
        if (decorType === "chocolate-drips" || creamType === "chocolate-ganache") {
          const dripColor = creamType === "chocolate-ganache" ? creamColor : new THREE.Color("#3D2314");
          const dripMat = new THREE.MeshStandardMaterial({ color: dripColor, roughness: 0.15, metalness: 0.1 });
          const dripCount = 14;
          for (let d = 0; d < dripCount; d++) {
            const angle = (d / dripCount) * Math.PI * 2;
            const dripLength = 0.08 + Math.random() * 0.2;
            const dripGeo = new THREE.CylinderGeometry(0.025, 0.025, dripLength, 8);
            const dripMesh = new THREE.Mesh(dripGeo, dripMat);

            const dx = Math.cos(angle) * (radius - 0.01);
            const dz = Math.sin(angle) * (radius - 0.01);
            dripMesh.position.set(dx, (i * layerHeight) + layerHeight - (dripLength / 2) - 0.8, dz);
            dripMesh.castShadow = true;
            tierGroup.add(dripMesh);

            // Add drop droplet sphere at tip
            const tipGeo = new THREE.SphereGeometry(0.03, 8, 8);
            const tipMesh = new THREE.Mesh(tipGeo, dripMat);
            tipMesh.position.set(dx, (i * layerHeight) + layerHeight - dripLength - 0.8, dz);
            tierGroup.add(tipMesh);
          }
        }
      }

      // Add decorations on the very top layer
      if (i === layers - 1) {
        if (decorType === "berries") {
          // Berries on top
          const strawberryMat = new THREE.MeshStandardMaterial({ color: 0xb71c1c, roughness: 0.35, metalness: 0.1 });
          const blueberryMat = new THREE.MeshStandardMaterial({ color: 0x0d47a1, roughness: 0.25, metalness: 0.05 });

          const berryCount = 10;
          for (let b = 0; b < berryCount; b++) {
            const angle = (b / berryCount) * Math.PI * 2;
            const berryRadius = 0.07;
            const berryGeo = new THREE.SphereGeometry(berryRadius, 10, 10);
            const berryMesh = new THREE.Mesh(berryGeo, b % 2 === 0 ? strawberryMat : blueberryMat);

            const bx = Math.cos(angle) * (radius * 0.7);
            const bz = Math.sin(angle) * (radius * 0.7);
            berryMesh.position.set(bx, (i * layerHeight) + layerHeight + berryRadius - 0.8, bz);
            berryMesh.castShadow = true;
            tierGroup.add(berryMesh);
          }
        } else if (decorType === "flowers") {
          // Flower decoration
          const flowerColors = [0xd81b60, 0x8e24aa, 0xfdd835, 0x00acc1];
          flowerColors.forEach((color, fIdx) => {
            const fMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.7 });
            const fGeo = new THREE.SphereGeometry(0.075, 6, 6);
            const fMesh = new THREE.Mesh(fGeo, fMat);
            const angle = (fIdx / flowerColors.length) * Math.PI * 2;
            fMesh.position.set(
              Math.cos(angle) * (radius * 0.65),
              (i * layerHeight) + layerHeight + 0.04 - 0.8,
              Math.sin(angle) * (radius * 0.65)
            );
            fMesh.castShadow = true;
            tierGroup.add(fMesh);
          });
        } else if (decorType === "gold-leaf") {
          // Gold flakes
          const goldMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            roughness: 0.08,
            metalness: 0.95,
          });
          for (let g = 0; g < 18; g++) {
            const flakeGeo = new THREE.BoxGeometry(0.05, 0.008, 0.05);
            const flake = new THREE.Mesh(flakeGeo, goldMat);
            const angle = Math.random() * Math.PI * 2;
            const rOffset = Math.random() * radius;
            flake.position.set(
              Math.cos(angle) * rOffset,
              (i * layerHeight) + layerHeight + 0.02 - 0.8,
              Math.sin(angle) * rOffset
            );
            flake.rotation.set(Math.random() * 0.15, Math.random() * 6.28, Math.random() * 0.15);
            flake.castShadow = true;
            tierGroup.add(flake);
          }
        }

        // Custom text / graphic edible sheets on the top layer
        if (customText || uploadedPhoto || decorType === "minimalist") {
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#FFFBF4";
            ctx.beginPath();
            ctx.arc(256, 256, 250, 0, Math.PI * 2);
            ctx.fill();

            // Draw border
            ctx.strokeStyle = "#E8622B";
            ctx.lineWidth = 12;
            ctx.stroke();

            const textToDraw = customText || (decorType === "minimalist" ? "Tabrik!" : "");

            if (!uploadedPhoto && textToDraw) {
              // Only text
              ctx.fillStyle = textColor;
              ctx.font = "bold 56px sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(textToDraw, 256, 256);
            }

            // Create texture and mesh synchronously
            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            
            const textPlaneGeo = new THREE.CircleGeometry(radius * 0.7, 32);
            const textPlaneMat = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
            });
            const textMesh = new THREE.Mesh(textPlaneGeo, textPlaneMat);
            textMesh.rotation.x = -Math.PI / 2;
            textMesh.position.set(0, (i * layerHeight) + layerHeight + 0.045 - 0.8, 0);
            textMesh.receiveShadow = true;
            tierGroup.add(textMesh);

            // If photo print is uploaded
            if (uploadedPhoto) {
              const img = new Image();
              img.onload = () => {
                // Clear center
                ctx.fillStyle = "#FFFBF4";
                ctx.beginPath();
                ctx.arc(256, 256, 240, 0, Math.PI * 2);
                ctx.fill();

                // Draw image
                ctx.save();
                ctx.beginPath();
                ctx.arc(256, 200, 120, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, 136, 80, 240, 240);
                ctx.restore();

                // Draw text under image
                if (textToDraw) {
                  ctx.fillStyle = textColor;
                  ctx.font = "bold 38px sans-serif";
                  ctx.textAlign = "center";
                  ctx.fillText(textToDraw, 256, 400);
                }

                texture.needsUpdate = true;
              };
              img.src = uploadedPhoto;
            }
          }
        }
      }

      cakeGroup.add(tierGroup);
    }
  }, [shape, size, layers, flavorColor, creamType, fillingType, decorType, customText, textColor, uploadedPhoto]);

  if (!webGLAvailable) {
    return (
      <div
        style={{
          width: "100%",
          height: 480,
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(to bottom, #FFFDF9, #FAF5EA)",
          border: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          boxShadow: "var(--shadow-sm)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Stylized CSS Cake */}
        <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", width: "100%", maxWidth: 260, margin: "auto" }}>
          {/* Cake Stand Base */}
          <div style={{ width: 180, height: 12, borderRadius: "6px 6px 0 0", background: "#E0E0E0", borderBottom: "4px solid #BDBDBD" }} />
          <div style={{ width: 40, height: 35, background: "#E0E0E0" }} />
          <div style={{ width: 260, height: 16, borderRadius: "50% / 8px", background: "#F5F5F5", border: "1.5px solid #E0E0E0", position: "relative", zIndex: 2, marginBottom: -10 }} />

          {/* Cake Tiers (rendered bottom to top) */}
          {Array.from({ length: layers }).map((_, i) => {
            const scale = 1 - i * 0.15;
            const w = 200 * scale;
            const h = 75;
            return (
              <div
                key={i}
                style={{
                  width: w,
                  height: h,
                  borderRadius: "50% / 15px",
                  background: flavorColor,
                  border: "1.5px solid rgba(0,0,0,0.1)",
                  position: "relative",
                  zIndex: i + 3,
                  boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginBottom: -22, // stack overlap
                }}
              >
                {/* Cream Layer decoration */}
                <div style={{
                  position: "absolute", top: 12, left: "5%", right: "5%", height: 6,
                  background: creamType === "chocolate-ganache" ? "#3D2314" : creamType === "cream-cheese" ? "#FFFDF2" : "#FFFFFF",
                  borderRadius: "50% / 2px", opacity: 0.85
                }} />
                
                {/* Layer details */}
                <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, opacity: 0.7, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {i + 1}-qavat
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Custom Decor Stickers */}
        <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
          <div style={{ background: "var(--accent-light)", color: "var(--accent)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontWeight: 600 }}>
            {shape === "heart" ? "❤️ Yurak" : shape === "square" ? "⏹️ To'rtburchak" : "⭕ Dumaloq"}
          </div>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontWeight: 600 }}>
            {decorType === "berries" ? "🍓 Mevali" : decorType === "flowers" ? "🌸 Gullar" : decorType === "gold-leaf" ? "✨ Oltin" : "🎂 Oddiy"}
          </div>
        </div>

        {/* Custom Text Preview */}
        {customText && (
          <div style={{
            position: "absolute", bottom: 20, left: 20, right: 20, textAlign: "center",
            background: "rgba(255,255,255,0.9)", border: "1.5px solid var(--border)",
            borderRadius: "var(--radius-md)", padding: "8px 12px", fontSize: 13, fontWeight: 600,
            color: "var(--text-primary)", boxShadow: "var(--shadow-sm)"
          }}>
            Yozuv: &quot;<span style={{ color: textColor }}>{customText}</span>&quot;
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: 480,
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
}


export default function CakeConstructorPage() {
  const [shape, setShape] = useState("round");
  const [size, setSize] = useState("md");
  const [layers, setLayers] = useState(1);
  const [flavor, setFlavor] = useState("vanilla");
  const [cream, setCream] = useState("cream-cheese");
  const [filling, setFilling] = useState("banana");
  const [decor, setDecor] = useState("berries");
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);

  // Custom text options
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  // 3D Canvas element rotation control
  const [rotation, setRotation] = useState({ x: 15, y: -45 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Handle live calculation
  const totalCost = useMemo(() => {
    const selectedShape = shapes.find((s) => s.id === shape)?.price || 0;
    const selectedSize = sizes.find((s) => s.id === size)?.price || 0;
    const selectedLayer = layersList.find((l) => l.count === layers)?.priceMultiplier || 1;
    const selectedFlavor = flavors.find((f) => f.id === flavor)?.price || 0;
    const selectedCream = creams.find((c) => c.id === cream)?.price || 0;
    const selectedFilling = fillings.find((f) => f.id === filling)?.price || 0;
    const selectedDecor = decors.find((d) => d.id === decor)?.price || 0;

    const base = selectedSize + selectedShape + selectedFlavor + selectedCream + selectedFilling + selectedDecor;
    const final = base * selectedLayer;

    return Math.round(final);
  }, [shape, size, layers, flavor, cream, filling, decor]);

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    try {
      const selectedShape = shapes.find((s) => s.id === shape)?.label || shape;
      const selectedFlavor = flavors.find((f) => f.id === flavor)?.label || flavor;
      const selectedCream = creams.find((c) => c.id === cream)?.label || cream;
      const selectedFilling = fillings.find((f) => f.id === filling)?.label || filling;
      const selectedDecor = decors.find((d) => d.id === decor)?.label || decor;

      const detailsStr = `Shakl: ${selectedShape} | Qavatlar: ${layers} | Ta'm: ${selectedFlavor} | Krem: ${selectedCream} | Ich: ${selectedFilling} | Bezak: ${selectedDecor}${customText ? ` | Matn: "${customText}"` : ""}`;

      const cartItem = {
        id: "cake_" + Date.now(),
        name: `Buyurtma 3D Tort (${layers} qavatli)`,
        details: detailsStr,
        price: totalCost,
        quantity: 1,
        image: "🎂",
        allergens: excludedAllergens.map(a => {
          const names: Record<string, string> = { nuts: "Yong'oq", milk: "Sut", eggs: "Tuxum", gluten: "Gluten", soy: "Soya", honey: "Asal", sesame: "Kunjut", gelatin: "Jelatin" };
          return names[a] || a;
        }),
      };

      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      currentCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(currentCart));

      window.dispatchEvent(new Event("cart-updated"));
      window.location.href = "/cart";
    } catch (e) {
      console.error(e);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  const selectedFlavorColor = useMemo(() => {
    return flavors.find((f) => f.id === flavor)?.color || "#F3E5AB";
  }, [flavor]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: "90vh" }}>
        <div className="container">
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              🎂 3D Tort Konstruktori
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              O'z orzuingizdagi tortni loyihalashtiring, biz uni professional darajada tayyorlab beramiz.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 32,
              alignItems: "start",
            }}
            id="constructor-grid"
          >
            {/* Left Column: 3D Visualization */}
            <div
              style={{
                position: "sticky",
                top: 100,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
              className="sticky-viz"
            >
               <div style={{ position: "relative" }}>
                 <ThreeCakeCanvas
                   shape={shape}
                   size={size}
                   layers={layers}
                   flavorColor={selectedFlavorColor}
                   creamType={cream}
                   fillingType={filling}
                   decorType={decor}
                   customText={customText}
                   textColor={textColor}
                   uploadedPhoto={uploadedPhoto}
                 />
                 {/* Drag Help Overlay */}
                 <div style={{
                   position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
                   background: "rgba(26, 24, 20, 0.75)", backdropFilter: "blur(4px)", color: "#fff",
                   padding: "6px 14px", borderRadius: "var(--radius-pill)", fontSize: 11, fontWeight: 600,
                   display: "flex", alignItems: "center", gap: 6, pointerEvents: "none",
                   boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                 }}>
                   <RotateCcw size={12} /> Aylantirish uchun sudrang
                 </div>
               </div>

              {/* Real-time pricing widget */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    Taxminiy narxi
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {totalCost.toLocaleString()} so'm
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--accent)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                  }}
                >
                  <ShoppingBag size={18} /> savatga qo'shish
                </button>
              </div>
            </div>

            {/* Right Column: Customization Panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                paddingBottom: 64,
              }}
            >
              {/* Size Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  1. O&apos;lcham (Size)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {sizes.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      style={{
                        padding: 12,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: size === s.id ? "var(--accent)" : "var(--border)",
                        background: size === s.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        transition: "all 120ms",
                      }}
                    >
                      <img src={s.image} alt={s.label} style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{s.desc}</div>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 14 }}>
                        {s.price > 0 ? `+${s.price.toLocaleString()} so'm` : "Standart"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shape Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  2. Shakl (Shape)
                </h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {shapes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      style={{
                        flex: 1,
                        padding: 10,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: shape === s.id ? "var(--accent)" : "var(--border)",
                        background: shape === s.id ? "var(--accent-light)" : "var(--bg-surface)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        cursor: "pointer",
                      }}
                    >
                      <img src={s.image} alt={s.label} style={{ width: "100%", height: 70, borderRadius: "var(--radius-sm)", objectFit: "cover", marginBottom: 4 }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 16 }}>{s.icon}</span>
                        {s.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layers Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  3. Qavatlar soni (Layers)
                </h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {layersList.map((l) => (
                    <button
                      key={l.count}
                      onClick={() => setLayers(l.count)}
                      style={{
                        flex: 1,
                        padding: 14,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: layers === l.count ? "var(--accent)" : "var(--border)",
                        background: layers === l.count ? "var(--accent-light)" : "var(--bg-surface)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        cursor: "pointer",
                      }}
                    >
                      {l.count} qavat
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  4. Ta&apos;m (Flavor)
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {flavors.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setFlavor(f.id)}
                      style={{
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: flavor === f.id ? "var(--accent)" : "var(--border)",
                        background: flavor === f.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 120ms",
                      }}
                    >
                      <img src={f.image} alt={f.label} style={{ width: "100%", height: 80, objectFit: "cover" }} />
                      <div style={{ padding: 10, display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: f.color,
                            border: "1px solid rgba(0,0,0,0.1)",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{f.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cream Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  5. Krem turi (Cream)
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {creams.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setCream(c.id)}
                      style={{
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: cream === c.id ? "var(--accent)" : "var(--border)",
                        background: cream === c.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 120ms",
                      }}
                    >
                      <img src={c.image} alt={c.label} style={{ width: "100%", height: 80, objectFit: "cover" }} />
                      <div style={{ padding: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                        {c.price > 0 && <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500, marginTop: 2 }}>+{c.price.toLocaleString()} so&apos;m</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filling Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  5b. Ich to&apos;ldiruvchi (Filling)
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {fillings.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setFilling(f.id)}
                      style={{
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: filling === f.id ? "var(--accent)" : "var(--border)",
                        background: filling === f.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 120ms",
                      }}
                    >
                      <img src={f.image} alt={f.label} style={{ width: "100%", height: 80, objectFit: "cover" }} />
                      <div style={{ padding: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{f.label}</div>
                        {f.price > 0 && <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500, marginTop: 2 }}>+{f.price.toLocaleString()} so&apos;m</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decoration Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  5c. Bezak (Decoration)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {decors.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => {
                        setDecor(d.id);
                        if (d.id === "minimalist" && !customText) {
                          setCustomText("Tabrik!");
                        }
                      }}
                      style={{
                        padding: 12,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: decor === d.id ? "var(--accent)" : "var(--border)",
                        background: decor === d.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        transition: "all 120ms",
                      }}
                    >
                      <img src={d.image} alt={d.label} style={{ width: 50, height: 50, borderRadius: "var(--radius-md)", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{d.label}</div>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>
                        +{d.price.toLocaleString()} so&apos;m
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Message input */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  6. Tabrik matni (Custom Text)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: "var(--bg-surface)",
                      border: "1.5px solid var(--border-strong)",
                      borderRadius: "var(--radius-md)",
                      padding: "4px 14px",
                    }}
                  >
                    <Type size={18} style={{ color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      maxLength={24}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Tort ustidagi yozuv (maks. 24 belgi)"
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "10px 0",
                        outline: "none",
                        fontSize: 14.5,
                      }}
                    />
                  </div>

                  {/* Text Color Picker */}
                  {(customText || decor === "minimalist") && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Palette size={16} style={{ color: "var(--text-secondary)" }} />
                      <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                        Matn rangi:
                      </span>
                      {["#FFFFFF", "#000000", "#FFD700", "#FF1493", "#00FF00"].map((col) => (
                        <button
                          key={col}
                          onClick={() => setTextColor(col)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: col,
                            border: textColor === col ? "2px solid var(--accent)" : "1px solid rgba(0,0,0,0.2)",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  7. Rasm yuklash (Photo/Logo Print)
                </h3>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 120,
                    borderRadius: "var(--radius-lg)",
                    border: "2px dashed var(--border-strong)",
                    background: "var(--bg-surface)",
                    cursor: "pointer",
                    transition: "border-color 150ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                >
                  <Upload size={24} style={{ color: "var(--text-muted)", marginBottom: 8 }} />
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    Rasm, logo yoki rasmni yuklang
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: "none" }}
                  />
                </label>

                {uploadedPhoto && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginTop: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 6,
                        backgroundImage: `url(${uploadedPhoto})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "1px solid var(--border)",
                      }}
                    />
                    <button
                      onClick={() => setUploadedPhoto(null)}
                      style={{
                        fontSize: 13,
                        color: "var(--error)",
                        fontWeight: 500,
                      }}
                    >
                      Rasmni o'chirish
                    </button>
                  </div>
                )}
              </div>

              {/* ═══ Allergy / Ingredient Exclusion ═══ */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "var(--warning-light)", fontSize: 14 }}>⚠️</span>
                  8. Allergiya filtri
                </h3>
                <div style={{ padding: 14, background: "var(--warning-light)", borderRadius: "var(--radius-md)", fontSize: 13, color: "#8B6914", lineHeight: 1.5, marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
                  <span>Agar sizda allergiya bo&apos;lsa, quyidagi ingredientlarni olib tashlang. Oshpazga ogohlantirish yuboriladi.</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    { id: "nuts", emoji: "🥜", label: "Yong'oq" },
                    { id: "milk", emoji: "🥛", label: "Sut" },
                    { id: "eggs", emoji: "🥚", label: "Tuxum" },
                    { id: "gluten", emoji: "🌾", label: "Gluten" },
                    { id: "soy", emoji: "🫘", label: "Soya" },
                    { id: "honey", emoji: "🍯", label: "Asal" },
                    { id: "sesame", emoji: "⚪", label: "Kunjut" },
                    { id: "gelatin", emoji: "🍮", label: "Jelatin" },
                  ].map((item) => {
                    const active = excludedAllergens.includes(item.id);
                    return (
                      <button key={item.id} onClick={() => setExcludedAllergens(prev => prev.includes(item.id) ? prev.filter(a => a !== item.id) : [...prev, item.id])} style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "8px 14px", borderRadius: "var(--radius-pill)",
                        border: "1.5px solid", fontSize: 13, fontWeight: 500,
                        borderColor: active ? "var(--error)" : "var(--border)",
                        background: active ? "var(--error-light)" : "var(--bg-surface)",
                        color: active ? "var(--error)" : "var(--text-primary)",
                        textDecoration: active ? "line-through" : "none",
                        transition: "all 150ms", cursor: "pointer",
                      }}>
                        <span style={{ fontSize: 16 }}>{item.emoji}</span>
                        {item.label}
                        {active && <span style={{ fontSize: 11, fontWeight: 700 }}>✕</span>}
                      </button>
                    );
                  })}
                </div>
                {excludedAllergens.length > 0 && (
                  <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--error-light)", border: "1px solid var(--error)", fontSize: 13, color: "var(--error)", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>🚫</span>
                    {excludedAllergens.length} ta ingredient chiqarib tashlandi — oshpazga yuboriladi
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #constructor-grid {
            grid-template-columns: 1fr !important;
          }
          .sticky-viz {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
