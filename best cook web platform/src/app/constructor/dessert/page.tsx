"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useMemo } from "react";
import { ShoppingBag, Star, Package, Sparkles } from "lucide-react";

const dessertTypes = [
  { id: "cupcake", label: "Kapkeyklar (Cupcakes)", emoji: "🧁", basePrice: 15000, image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80" },
  { id: "cookies", label: "Pechenyelar (Cookies)", emoji: "🍪", basePrice: 8000, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80" },
  { id: "macarons", label: "Makaronlar (Macarons)", emoji: "🍬", basePrice: 12000, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80" },
  { id: "donuts", label: "Donatlar (Donuts)", emoji: "🍩", basePrice: 14000, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80" },
  { id: "chocolates", label: "Shokoladlar (Chocolates)", emoji: "🍫", basePrice: 18000, image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=600&q=80" },
];

const flavors = [
  { id: "chocolate", label: "Shokoladli", price: 0 },
  { id: "strawberry", label: "Qulupnayli", price: 2000 },
  { id: "pistachio", label: "Pistali", price: 5000 },
  { id: "caramel", label: "Karamel", price: 3000 },
];

const decors = [
  { id: "none", label: "Oddiy (Bezaksiz)", price: 0 },
  { id: "sprinkles", label: "Shirin kukunlar (Sprinkles)", price: 2000 },
  { id: "fruits", label: "Yangi meva bo'laklari", price: 6000 },
  { id: "gold", label: "Oltin zarralari (Gold leaf)", price: 10000 },
];

const packagings = [
  { id: "standard", label: "Standart qog'oz quti", price: 0 },
  { id: "gift", label: "Premium sovg'a qutisi", price: 15000 },
  { id: "wooden", label: "Yog'ochli eko-quti", price: 25000 },
];

export default function DessertConstructorPage() {
  const [dessert, setDessert] = useState("cupcake");
  const [flavor, setFlavor] = useState("chocolate");
  const [decor, setDecor] = useState("sprinkles");
  const [packaging, setPackaging] = useState("standard");
  const [quantity, setQuantity] = useState(6);
  const [customMsg, setCustomMsg] = useState("");

  const totalCost = useMemo(() => {
    const selectedDessert = dessertTypes.find((d) => d.id === dessert)?.basePrice || 0;
    const selectedFlavor = flavors.find((f) => f.id === flavor)?.price || 0;
    const selectedDecor = decors.find((d) => d.id === decor)?.price || 0;
    const selectedPack = packagings.find((p) => p.id === packaging)?.price || 0;

    const baseItemCost = selectedDessert + selectedFlavor + selectedDecor;
    return baseItemCost * quantity + selectedPack;
  }, [dessert, flavor, decor, packaging, quantity]);

  const handleAddToCart = () => {
    try {
      const selectedDessertObj = dessertTypes.find((d) => d.id === dessert);
      const selectedFlavor = flavors.find((f) => f.id === flavor)?.label || flavor;
      const selectedDecor = decors.find((d) => d.id === decor)?.label || decor;
      const selectedPack = packagings.find((p) => p.id === packaging)?.label || packaging;

      const detailsStr = `Ta'm: ${selectedFlavor} | Bezak: ${selectedDecor} | Qadoq: ${selectedPack}${customMsg ? ` | Xabar: "${customMsg}"` : ""}`;

      const cartItem = {
        id: "dessert_" + Date.now(),
        name: `${selectedDessertObj?.emoji || "🧁"} Shirinlik: ${selectedDessertObj?.label.split(" ")[0]}`,
        details: detailsStr,
        price: totalCost / quantity, // Single item price
        quantity: quantity,
        image: selectedDessertObj?.emoji || "🧁",
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
              🧁 Desert Konstruktori
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              O'zingizga yoqadigan desertlarni tanlang, ta'mini, bezagini va
              qadog'ini mustaqil ravishda moslashtiring.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 32,
              alignItems: "start",
            }}
            id="dessert-layout"
          >
            {/* Visual preview */}
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
              <div
                style={{
                  height: 380,
                  background: "linear-gradient(to bottom, #FFF3F0, #FBECE8)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <img
                  src={dessertTypes.find((d) => d.id === dessert)?.image}
                  alt={dessert}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "var(--radius-xl)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "var(--bg-surface)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-pill)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--accent)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {quantity} dona
                </div>

                {customMsg && (
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      padding: "8px 16px",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "var(--shadow-sm)",
                      border: "1px solid var(--border)",
                      marginTop: 20,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-display)",
                      maxWidth: "80%",
                      textAlign: "center",
                    }}
                  >
                    &quot;{customMsg}&quot;
                  </div>
                )}
              </div>

              {/* Price and Cart Widget */}
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
                    Umumiy narx
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
              {/* Dessert Type Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  1. Desert turi
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                  }}
                  id="dessert-types-grid"
                >
                  {dessertTypes.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDessert(d.id)}
                      style={{
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: dessert === d.id ? "var(--accent)" : "var(--border)",
                        background: dessert === d.id ? "var(--accent-light)" : "var(--bg-surface)",
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
                      <img src={d.image} alt={d.label} style={{ width: "100%", height: 75, objectFit: "cover" }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 4px" }}>
                        <span style={{ fontSize: 16 }}>{d.emoji}</span>
                        {d.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  2. Miqdori (Soni)
                </h3>
                <div style={{ display: "flex", gap: 8 }}>
                  {[6, 12, 24, 36, 48].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: "var(--radius-md)",
                        border: "1.5px solid",
                        borderColor: quantity === qty ? "var(--accent)" : "var(--border)",
                        background: quantity === qty ? "var(--accent-light)" : "var(--bg-surface)",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--text-primary)",
                      }}
                    >
                      {qty} dona
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  3. Ta'm
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {flavors.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setFlavor(f.id)}
                      style={{
                        padding: 12,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: flavor === f.id ? "var(--accent)" : "var(--border)",
                        background: flavor === f.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decoration Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  4. Bezagi
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {decors.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setDecor(d.id)}
                      style={{
                        padding: 12,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: decor === d.id ? "var(--accent)" : "var(--border)",
                        background: decor === d.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {d.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging Select */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  5. Qadoqlash
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {packagings.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPackaging(p.id)}
                      style={{
                        padding: 14,
                        borderRadius: "var(--radius-md)",
                        border: "1.5px solid",
                        borderColor: packaging === p.id ? "var(--accent)" : "var(--border)",
                        background: packaging === p.id ? "var(--accent-light)" : "var(--bg-surface)",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 14.5, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                        <Package size={16} />
                        {p.label}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600 }}>
                        {p.price > 0 ? `+${p.price.toLocaleString()} so'm` : "Bepul"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gift Message */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  6. Ochiqcha yoki Tabrik xati (Maks. 30 belgi)
                </h3>
                <input
                  type="text"
                  maxLength={30}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Quti ustiga yoziladigan xabar..."
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: "var(--radius-md)",
                    border: "1.5px solid var(--border-strong)",
                    background: "var(--bg-surface)",
                    outline: "none",
                    fontSize: 14.5,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #dessert-layout {
            grid-template-columns: 1fr !important;
          }
          .sticky-viz {
            position: relative !important;
            top: 0 !important;
          }
          #dessert-types-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
