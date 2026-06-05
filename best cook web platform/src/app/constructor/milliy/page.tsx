"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { ShoppingBag, Check, RotateCcw } from "lucide-react";

const dishes = [
  {
    id: "osh",
    label: "Osh (Palov)",
    emoji: "🍽️",
    desc: "Toshkentcha bayramona osh",
    basePrice: 35000,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80",
    options: [
      { id: "meat", label: "Qo'shimcha go'sht (Meat)", price: 15000 },
      { id: "quail-eggs", label: "Bedana tuxumi (Quail eggs)", price: 5000 },
      { id: "garlic", label: "Sarimsoqpiyoz (Garlic)", price: 3000 },
      { id: "raisins", label: "Mayiz (Raisins)", price: 2000 },
      { id: "kazi", label: "Qazi bo'lagi", price: 12000 },
    ],
  },
  {
    id: "manti",
    label: "Manti",
    emoji: "🥟",
    desc: "Bug'da pishgan go'shtli manti",
    basePrice: 8000, // per piece
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80",
    options: [
      { id: "sour-cream", label: "Smetana bilan", price: 3000 },
      { id: "extra-onion", label: "Ko'proq piyoz bilan", price: 1000 },
    ],
  },
  {
    id: "somsa",
    label: "Somsa",
    emoji: "🥐",
    desc: "Tandirda pishgan go'shtli somsa",
    basePrice: 9000,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80",
    options: [
      { id: "cheese-filling", label: "Pishloqli to'ldiruvchi", price: 4000 },
    ],
  },
];

const portions = [
  { id: "standard", label: "Standart (1.0x)", multiplier: 1, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80" },
  { id: "large", label: "Katta (1.5x)", multiplier: 1.5, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80" },
  { id: "double", label: "Dubl (2.0x)", multiplier: 2, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80" },
];

// Check WebGL availability
const getWebGLStatus = () => {
  if (typeof window === "undefined") return false;
  const isHeadless = /HeadlessChrome|puppeteer|playwright/i.test(navigator.userAgent);
  if (isHeadless) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
};

// Interactive 3D Dish Canvas using Three.js
interface ThreeDishCanvasProps {
  dishId: string;
  portion: string;
  activeOptions: string[];
}

function ThreeDishCanvas({ dishId, portion, activeOptions }: ThreeDishCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const dishGroupRef = useRef<THREE.Group | null>(null);
  const targetRotation = useRef({ x: 0.5, y: -0.6 });
  const currentRotation = useRef({ x: 0.5, y: -0.6 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    const available = getWebGLStatus();
    setWebGLAvailable(available);
    if (!available) return;

    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFDF9");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5eb, 1.3);
    dirLight.position.set(5, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(-4, 3, -4);
    scene.add(pointLight);

    const dishGroup = new THREE.Group();
    scene.add(dishGroup);
    dishGroupRef.current = dishGroup;

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };
    window.addEventListener("resize", handleResize);

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x = Math.max(0.1, Math.min(1.2, targetRotation.current.x + deltaY * 0.008));
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.15;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.15;

      if (dishGroupRef.current) {
        dishGroupRef.current.rotation.x = currentRotation.current.x;
        dishGroupRef.current.rotation.y = currentRotation.current.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(frameId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(domEl);
      }
    };
  }, []);

  // Redraw dish elements
  useEffect(() => {
    if (!webGLAvailable) return;
    const dishGroup = dishGroupRef.current;
    if (!dishGroup) return;

    // Clear previous geometries/materials safely to prevent loops
    const childrenCopy = [...dishGroup.children];
    childrenCopy.forEach((obj) => {
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: any) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
      dishGroup.remove(obj);
    });

    // 1. Traditional Uzbek Ceramic Plate (Lagan) with concentric geometric patterns
    const laganGroup = new THREE.Group();
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 512, 512);

      // Draw traditional blue circular borders
      ctx.strokeStyle = "#1A237E";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(256, 256, 230, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(256, 256, 200, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(256, 256, 120, 0, Math.PI * 2);
      ctx.stroke();

      // Concentric blue star/flower pattern in center
      ctx.fillStyle = "#1E88E5";
      for (let s = 0; s < 12; s++) {
        const angle = (s / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(256 + Math.cos(angle) * 160, 256 + Math.sin(angle) * 160, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const laganTex = new THREE.CanvasTexture(canvas);
    const laganMat = new THREE.MeshStandardMaterial({
      map: laganTex,
      roughness: 0.15,
      metalness: 0.1,
    });

    const laganGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.15, 32);
    const lagan = new THREE.Mesh(laganGeo, laganMat);
    lagan.position.y = -0.3;
    lagan.receiveShadow = true;
    lagan.castShadow = true;
    laganGroup.add(lagan);

    const rimGeo = new THREE.CylinderGeometry(1.65, 1.65, 0.05, 32);
    const rim = new THREE.Mesh(rimGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
    rim.position.y = -0.21;
    laganGroup.add(rim);

    dishGroup.add(laganGroup);

    // Get portion size multiplier
    const sizeMult = portion === "double" ? 1.5 : portion === "large" ? 1.25 : 1.0;

    // 2. Render specific dish food items
    if (dishId === "osh") {
      // 🌾 Palov (Rice Pile)
      const riceHeapGeo = new THREE.SphereGeometry(1.05 * sizeMult, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      const riceHeapMat = new THREE.MeshStandardMaterial({
        color: 0xdfab4b,
        roughness: 0.8,
        metalness: 0.05,
      });
      const riceHeap = new THREE.Mesh(riceHeapGeo, riceHeapMat);
      riceHeap.position.y = -0.22;
      riceHeap.scale.y = 0.55;
      riceHeap.castShadow = true;
      riceHeap.receiveShadow = true;
      dishGroup.add(riceHeap);

      // Rice grains visual decoration
      const grainCount = 140;
      const grainGeo = new THREE.BoxGeometry(0.04, 0.015, 0.015);
      const grainMat = new THREE.MeshStandardMaterial({ color: 0xf5dd90, roughness: 0.7 });
      for (let g = 0; g < grainCount; g++) {
        const grain = new THREE.Mesh(grainGeo, grainMat);
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.9 * sizeMult;
        grain.position.set(
          Math.cos(theta) * radius,
          (1 - (radius / (1.05 * sizeMult))) * 0.25 - 0.16,
          Math.sin(theta) * radius
        );
        grain.rotation.set(Math.random() * 0.4, Math.random() * 6.2, Math.random() * 0.4);
        dishGroup.add(grain);
      }

      // Meat chunks
      const meatCount = activeOptions.includes("meat") ? 8 : 4;
      const meatGeo = new THREE.DodecahedronGeometry(0.18, 1);
      const meatMat = new THREE.MeshStandardMaterial({ color: 0x4e2714, roughness: 0.75, metalness: 0.05 });
      for (let m = 0; m < meatCount; m++) {
        const meat = new THREE.Mesh(meatGeo, meatMat);
        const angle = (m / meatCount) * Math.PI * 2;
        const radius = 0.4 + Math.random() * 0.25;
        meat.position.set(
          Math.cos(angle) * radius * sizeMult,
          -0.12 + Math.random() * 0.06,
          Math.sin(angle) * radius * sizeMult
        );
        meat.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        meat.castShadow = true;
        dishGroup.add(meat);
      }

      // Garlic bulb
      if (activeOptions.includes("garlic")) {
        const garlicMat = new THREE.MeshStandardMaterial({ color: 0xfaf9f5, roughness: 0.5 });
        const garlicGeo = new THREE.ConeGeometry(0.18, 0.25, 12);
        const garlic = new THREE.Mesh(garlicGeo, garlicMat);
        garlic.position.set(0, 0.23, 0);
        garlic.castShadow = true;
        dishGroup.add(garlic);
      }

      // Quail Eggs
      if (activeOptions.includes("quail-eggs")) {
        const eggMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const eggGeo = new THREE.SphereGeometry(0.09, 12, 12);
        for (let e = 0; e < 3; e++) {
          const egg = new THREE.Mesh(eggGeo, eggMat);
          egg.scale.y = 1.35;
          const angle = (e / 3) * Math.PI * 2 + 0.5;
          egg.position.set(
            Math.cos(angle) * 0.65 * sizeMult,
            -0.08,
            Math.sin(angle) * 0.65 * sizeMult
          );
          egg.rotation.z = 0.3;
          egg.castShadow = true;
          dishGroup.add(egg);
        }
      }

      // Kazi slices
      if (activeOptions.includes("kazi")) {
        const kaziGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16);
        const kaziMat = new THREE.MeshStandardMaterial({ color: 0x5d1f1f, roughness: 0.4 });
        for (let k = 0; k < 2; k++) {
          const kazi = new THREE.Mesh(kaziGeo, kaziMat);
          kazi.rotation.x = Math.PI / 3;
          const angle = k === 0 ? 1.5 : 4.5;
          kazi.position.set(
            Math.cos(angle) * 0.75 * sizeMult,
            -0.06,
            Math.sin(angle) * 0.75 * sizeMult
          );
          kazi.castShadow = true;
          dishGroup.add(kazi);
        }
      }

      // Raisins
      if (activeOptions.includes("raisins")) {
        const raisinGeo = new THREE.SphereGeometry(0.025, 8, 8);
        const raisinMat = new THREE.MeshStandardMaterial({ color: 0x221122, roughness: 0.6 });
        for (let r = 0; r < 20; r++) {
          const raisin = new THREE.Mesh(raisinGeo, raisinMat);
          raisin.scale.set(1.5, 0.8, 1);
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.7 * sizeMult;
          raisin.position.set(
            Math.cos(angle) * radius,
            -0.14 + (1 - (radius / (1.05 * sizeMult))) * 0.25,
            Math.sin(angle) * radius
          );
          dishGroup.add(raisin);
        }
      }
    } else if (dishId === "manti") {
      // 🥟 Steamed Dumplings (Manti)
      const mantiCount = portion === "double" ? 8 : portion === "large" ? 6 : 4;
      const mantiGeo = new THREE.ConeGeometry(0.24, 0.22, 5);
      const mantiMat = new THREE.MeshStandardMaterial({ color: 0xfdfbf2, roughness: 0.65 });
      for (let m = 0; m < mantiCount; m++) {
        const manti = new THREE.Mesh(mantiGeo, mantiMat);
        const angle = (m / mantiCount) * Math.PI * 2;
        const radius = 0.65;
        manti.position.set(
          Math.cos(angle) * radius,
          -0.12,
          Math.sin(angle) * radius
        );
        manti.rotation.y = angle + Math.PI / 2;
        manti.castShadow = true;
        dishGroup.add(manti);
      }

      // Sour cream dollop in the center
      if (activeOptions.includes("sour-cream")) {
        const creamGeo = new THREE.SphereGeometry(0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        const creamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.05 });
        const cream = new THREE.Mesh(creamGeo, creamMat);
        cream.position.y = -0.22;
        cream.scale.y = 0.45;
        cream.castShadow = true;
        dishGroup.add(cream);
      }
    } else if (dishId === "somsa") {
      // 🥐 Tandir Somsa (Puff pastry triangles)
      const somsaCount = portion === "double" ? 4 : portion === "large" ? 3 : 2;
      const somsaMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.55 });

      // Create a triangular somsa shape using ConeGeometry with 3 segments
      const somsaGeo = new THREE.ConeGeometry(0.32, 0.2, 3);
      for (let s = 0; s < somsaCount; s++) {
        const somsaGroup = new THREE.Group();
        const somsa = new THREE.Mesh(somsaGeo, somsaMat);
        somsa.rotation.x = Math.PI / 2; // Lie flat
        somsa.castShadow = true;
        somsaGroup.add(somsa);

        // Black sesame seeds on top
        const sesameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
        const sesameGeo = new THREE.BoxGeometry(0.015, 0.008, 0.015);
        for (let se = 0; se < 15; se++) {
          const sesame = new THREE.Mesh(sesameGeo, sesameMat);
          const rx = (Math.random() - 0.5) * 0.3;
          const rz = (Math.random() - 0.5) * 0.3;
          sesame.position.set(rx, 0.105, rz);
          somsaGroup.add(sesame);
        }

        const angle = (s / somsaCount) * Math.PI * 2;
        const radius = somsaCount === 2 ? 0.45 : 0.6;
        somsaGroup.position.set(
          Math.cos(angle) * radius,
          -0.18,
          Math.sin(angle) * radius
        );
        somsaGroup.rotation.y = Math.random() * 6.28;
        dishGroup.add(somsaGroup);
      }
    }
  }, [dishId, portion, activeOptions]);

  if (!webGLAvailable) {
    const dishImg = dishes.find((d) => d.id === dishId)?.image || "";
    const dishName = dishes.find((d) => d.id === dishId)?.label || "";
    const scale = portion === "double" ? 1.2 : portion === "large" ? 1.1 : 1.0;

    return (
      <div
        style={{
          width: "100%",
          height: 380,
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(to bottom, #FFFDF9, #FAF2DF)",
          border: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          boxShadow: "var(--shadow-sm)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lagan (Plate) Backplate */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "8px double #1A237E",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transform: `scale(${scale})`,
            transition: "all 300ms ease-out",
          }}
        >
          {/* Internal Plate Pattern Ring */}
          <div style={{ position: "absolute", width: "80%", height: "80%", borderRadius: "50%", border: "2px dashed #1E88E5", opacity: 0.4 }} />

          {/* Dish Image */}
          <img
            src={dishImg}
            alt={dishName}
            style={{
              width: "70%",
              height: "70%",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              zIndex: 2,
            }}
          />
        </div>

        {/* Portion indicator badge */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          background: "var(--accent-light)", color: "var(--accent)",
          padding: "4px 10px", borderRadius: "var(--radius-pill)",
          fontSize: 11, fontWeight: 600, border: "1px solid rgba(232, 98, 43, 0.15)"
        }}>
          Porsiya: {portion === "double" ? "Dubl (2.0x)" : portion === "large" ? "Katta (1.5x)" : "Standart (1.0x)"}
        </div>

        {/* Active Options badges overlay */}
        {activeOptions.length > 0 && (
          <div style={{
            position: "absolute", bottom: 16, left: 16, right: 16,
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, zIndex: 10
          }}>
            {activeOptions.map((optId) => {
              const label = dishes.find((d) => d.id === dishId)?.options.find((o) => o.id === optId)?.label || optId;
              return (
                <div
                  key={optId}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "var(--radius-pill)",
                    padding: "4px 8px",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  +{label.split(" ")[0]}
                </div>
              );
            })}
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
        height: 380,
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
}


export default function MilliyTaomlarPage() {
  const [selectedDish, setSelectedDish] = useState("osh");
  const [activeOptions, setActiveOptions] = useState<string[]>([]);
  const [portion, setPortion] = useState("standard");
  const [quantity, setQuantity] = useState(1);

  const currentDish = useMemo(() => {
    return dishes.find((d) => d.id === selectedDish) || dishes[0];
  }, [selectedDish]);

  const toggleOption = (id: string) => {
    setActiveOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalCost = useMemo(() => {
    let base = currentDish.basePrice;

    activeOptions.forEach((optId) => {
      const opt = currentDish.options.find((o) => o.id === optId);
      if (opt) {
        base += opt.price;
      }
    });

    const portionMult = portions.find((p) => p.id === portion)?.multiplier || 1;
    return Math.round(base * portionMult * quantity);
  }, [currentDish, activeOptions, portion, quantity]);

  const handleAddToCart = () => {
    try {
      const dish = dishes.find((d) => d.id === selectedDish);
      const dishLabel = dish?.label || selectedDish;
      const portionLabel = portions.find((p) => p.id === portion)?.label || portion;
      
      const activeOptionsLabels = activeOptions.map((optId) => {
        return dish?.options.find((o) => o.id === optId)?.label || optId;
      });

      const detailsStr = `Porsiya: ${portionLabel}${activeOptionsLabels.length > 0 ? ` | Masalliqlar: ${activeOptionsLabels.join(", ")}` : ""}`;

      const cartItem = {
        id: "milliy_" + Date.now(),
        name: `Milliy Taom: ${dishLabel}`,
        details: detailsStr,
        price: totalCost / quantity, // Price per single item
        quantity: quantity,
        image: dish?.emoji || "🍽️",
        allergens: [],
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

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: "90vh" }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              🍽️ Milliy Taomlar Konstruktori
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              An'anaviy o'zbek taomlarining porsiya hajmini va masalliqlarini
              o'zingiz xohlaganingizcha sozlang.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 32,
              alignItems: "start",
            }}
            id="milliy-layout"
          >
            {/* Visual Preview */}
            <div
              style={{
                position: "sticky",
                top: 100,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
              className="sticky-viz"
            >
              <div style={{ position: "relative" }}>
                <ThreeDishCanvas
                  dishId={selectedDish}
                  portion={portion}
                  activeOptions={activeOptions}
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

            {/* Customization controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Dish Type */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  1. Milliy taom turini tanlang
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {dishes.map((dish) => (
                    <button
                      key={dish.id}
                      onClick={() => {
                        setSelectedDish(dish.id);
                        setActiveOptions([]);
                      }}
                      style={{
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: selectedDish === dish.id ? "var(--accent)" : "var(--border)",
                        background: selectedDish === dish.id ? "var(--accent-light)" : "var(--bg-surface)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        overflow: "hidden",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <img src={dish.image} alt={dish.label} style={{ width: "100%", height: 75, objectFit: "cover" }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 4px" }}>
                        <span style={{ fontSize: 16 }}>{dish.emoji}</span>
                        {dish.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portion size */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  2. Porsiya o&apos;lchami
                </h3>
                <div style={{ display: "flex", gap: 10 }}>
                  {portions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPortion(p.id)}
                      style={{
                        flex: 1,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: portion === p.id ? "var(--accent)" : "var(--border)",
                        background: portion === p.id ? "var(--accent-light)" : "var(--bg-surface)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      <img src={p.image} alt={p.label} style={{ width: "100%", height: 60, objectFit: "cover" }} />
                      <span style={{ padding: "8px 4px" }}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dish Options checkboxes */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  3. Qo&apos;shimcha masalliqlar
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentDish.options.map((opt) => {
                    const isActive = activeOptions.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleOption(opt.id)}
                        style={{
                          padding: 14,
                          borderRadius: "var(--radius-md)",
                          border: "1.5px solid",
                          borderColor: isActive ? "var(--accent)" : "var(--border)",
                          background: isActive ? "var(--accent-light)" : "var(--bg-surface)",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 4,
                              border: "2px solid",
                              borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                              background: isActive ? "var(--accent)" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                            }}
                          >
                            {isActive && <Check size={12} strokeWidth={3} />}
                          </div>
                          {opt.label}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600 }}>
                          +{opt.price.toLocaleString()} so&apos;m
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  4. Taom soni
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1.5px solid var(--border-strong)",
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700 }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1.5px solid var(--border-strong)",
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #milliy-layout {
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
