"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, Save, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allergyCategories = [
  {
    title: "Asosiy allergenlar",
    items: [
      { id: "nuts", emoji: "🥜", label: "Yong'oqlar (Nuts)", desc: "Bodom, yong'oq, pista, yer yong'oq", severity: "high" },
      { id: "milk", emoji: "🥛", label: "Sut mahsulotlari (Milk)", desc: "Sut, qaymoq, pishloq, sariyog'", severity: "high" },
      { id: "eggs", emoji: "🥚", label: "Tuxum (Eggs)", desc: "Tuxum oqi va sarig'i bo'lgan mahsulotlar", severity: "high" },
      { id: "gluten", emoji: "🌾", label: "Gluten", desc: "Bug'doy, arpa va boshqa don mahsulotlari", severity: "high" },
    ],
  },
  {
    title: "Boshqa allergenlar",
    items: [
      { id: "soy", emoji: "🫘", label: "Soya (Soy)", desc: "Soya suti, soya sousi va soya oqsili", severity: "medium" },
      { id: "seafood", emoji: "🦐", label: "Dengiz mahsulotlari", desc: "Qisqichbaqasimonlar, kalmarlar", severity: "medium" },
      { id: "fish", emoji: "🐟", label: "Baliq (Fish)", desc: "Barcha turdagi daryo va dengiz baliqlari", severity: "medium" },
      { id: "sesame", emoji: "⚪", label: "Kunjut (Sesame)", desc: "Kunjut urug'i va kunjut yog'i", severity: "medium" },
      { id: "honey", emoji: "🍯", label: "Asal (Honey)", desc: "Tabiiy asal va asal qo'shilgan mahsulotlar", severity: "low" },
      { id: "gelatin", emoji: "🍮", label: "Jelatin", desc: "Hayvon jelatini bo'lgan mahsulotlar", severity: "low" },
    ],
  },
];

export default function AllergiesPage() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedAllergies = localStorage.getItem("userAllergies");
    if (savedAllergies) {
      setSelectedAllergies(JSON.parse(savedAllergies));
    }
  }, []);

  const toggleAllergy = (id: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const saveAllergies = () => {
    localStorage.setItem("userAllergies", JSON.stringify(selectedAllergies));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const severityColor = (s: string) =>
    s === "high" ? "var(--error)" : s === "medium" ? "var(--warning)" : "var(--text-muted)";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, var(--warning-light), var(--error-light))",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
              }}>🛡️</div>
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>
                  Allergiya sozlamalari
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 2 }}>
                  Buyurtmalarda xavfli ingredientlardan himoya
                </p>
              </div>
            </div>
          </div>

          {/* Info banner */}
          <div style={{
            display: "flex", gap: 12, padding: 16, background: "var(--info-light)",
            borderRadius: "var(--radius-lg)", color: "var(--info)", fontSize: 14,
            fontWeight: 500, marginBottom: 28, lineHeight: 1.5, border: "1px solid rgba(43,122,232,0.15)",
          }}>
            <Info size={20} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              Tanlangan allergiyalar har bir buyurtmada oshpaz yoki restoranga avtomatik yuboriladi.
              Taomingiz ushbu ingredientlarsiz tayyorlanadi.
            </span>
          </div>

          {/* Active allergies summary */}
          {selectedAllergies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                padding: 16, borderRadius: "var(--radius-lg)",
                background: "var(--error-light)", border: "1px solid var(--error)",
                marginBottom: 28, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
              }}
            >
              <AlertTriangle size={18} style={{ color: "var(--error)" }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--error)" }}>
                {selectedAllergies.length} ta allergen tanlangan:
              </span>
              {selectedAllergies.map((id) => {
                const all = allergyCategories.flatMap((c) => c.items);
                const item = all.find((a) => a.id === id);
                return item ? (
                  <span key={id} style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "4px 10px", borderRadius: "var(--radius-pill)",
                    background: "var(--error)", color: "#fff", fontSize: 12, fontWeight: 600,
                  }}>
                    {item.emoji} {item.label.split(" (")[0]}
                    <button onClick={() => toggleAllergy(id)} style={{
                      color: "#fff", fontSize: 11, fontWeight: 700, marginLeft: 2, lineHeight: 1,
                    }}>✕</button>
                  </span>
                ) : null;
              })}
            </motion.div>
          )}

          {/* Categories */}
          {allergyCategories.map((cat) => (
            <div key={cat.title} style={{ marginBottom: 28 }}>
              <h3 style={{
                fontSize: 15, fontWeight: 600, marginBottom: 14,
                color: "var(--text-secondary)", textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {cat.title}
              </h3>
              <div style={{
                background: "var(--bg-surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)", overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}>
                {cat.items.map((allergy, idx) => {
                  const isSelected = selectedAllergies.includes(allergy.id);
                  return (
                    <div
                      key={allergy.id}
                      onClick={() => toggleAllergy(allergy.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                        borderBottom: idx < cat.items.length - 1 ? "1px solid var(--border)" : "none",
                        background: isSelected ? "var(--error-light)" : "transparent",
                        cursor: "pointer", transition: "all 150ms",
                      }}
                    >
                      <span style={{ fontSize: 28, lineHeight: 1 }}>{allergy.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 15, fontWeight: 600, color: "var(--text-primary)",
                          textDecoration: isSelected ? "line-through" : "none",
                          display: "flex", alignItems: "center", gap: 8,
                        }}>
                          {allergy.label}
                          <span style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: severityColor(allergy.severity),
                          }} />
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
                          {allergy.desc}
                        </div>
                      </div>
                      <div style={{
                        width: 26, height: 26, borderRadius: 8,
                        border: "2px solid",
                        borderColor: isSelected ? "var(--error)" : "var(--border-strong)",
                        background: isSelected ? "var(--error)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", flexShrink: 0, transition: "all 120ms",
                      }}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Save button */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: 64 }}>
            <button
              onClick={saveAllergies}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: "var(--radius-pill)",
                background: "var(--accent)", color: "#fff",
                fontWeight: 600, fontSize: 15,
                boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >
              <Save size={18} /> Saqlash
            </button>
          </div>

          {/* Success toast */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
                  background: "var(--success)", color: "#fff",
                  padding: "12px 24px", borderRadius: "var(--radius-pill)",
                  boxShadow: "var(--shadow-lg)", fontSize: 14, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8, zIndex: 300,
                }}
              >
                <Check size={18} /> Muvaffaqiyatli saqlandi!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
