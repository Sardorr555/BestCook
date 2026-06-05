"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Star, MapPin, BadgeCheck, Search, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const initialSellers = [
  { id: "1", name: "Dilnoza Bakery", type: "Novvoyxona", rating: 4.9, reviews: 342, location: "Chilonzor", verified: true, specialty: "Tort va pishiriqlar", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80" },
  { id: "2", name: "Master Burger", type: "Fast Food", rating: 4.7, reviews: 218, location: "Yunusobod", verified: true, specialty: "Burger va lavash", img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=400&q=80" },
  { id: "3", name: "Osh Markazi", type: "Milliy taomlar", rating: 4.8, reviews: 567, location: "Sergeli", verified: true, specialty: "Osh va milliy taomlar", img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=400&q=80" },
  { id: "4", name: "Sweet Dreams", type: "Desert do'koni", rating: 4.9, reviews: 189, location: "Mirzo Ulug'bek", verified: false, specialty: "Kapkeyk va makaron", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
  { id: "5", name: "Pizzamania", type: "Pitseriya", rating: 4.6, reviews: 154, location: "Yakkasaroy", verified: true, specialty: "Pitsa va italyan taomlari", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { id: "6", name: "Samarqand Somsa", type: "Milliy taomlar", rating: 4.9, reviews: 412, location: "Mirobod", verified: true, specialty: "Tandir somsa va kabob", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80" },
];

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Barchasi");

  const types = ["Barchasi", "Novvoyxona", "Fast Food", "Milliy taomlar", "Desert do'koni", "Pitseriya"];

  const filteredSellers = initialSellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          seller.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "Barchasi" || seller.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <ChefHat style={{ color: "var(--accent)" }} size={24} />
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                  Professional Oshpazlar va Restoranlar
                </h1>
              </div>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", margin: 0 }}>
                Platformamizning tekshirilgan va ishonchli oshpazlaridan taomlar buyurtma qiling
              </p>
            </div>

            {/* Search Input */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-pill)",
              padding: "10px 20px",
              width: "100%",
              maxWidth: 360,
            }}>
              <Search size={18} style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Oshpaz yoki taom turini qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  width: "100%",
                  color: "var(--text-primary)",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* Type Filters */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 8 }}>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid",
                  borderColor: selectedType === type ? "var(--accent)" : "var(--border-strong)",
                  background: selectedType === type ? "var(--accent)" : "transparent",
                  color: selectedType === type ? "#fff" : "var(--text-secondary)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 120ms",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredSellers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 32px", background: "var(--bg-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>Oshpazlar topilmadi</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Boshqa kalit so'z yoki filtrlar orqali qidirib ko'ring.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} id="sellers-page-grid">
              {filteredSellers.map((seller, i) => (
                <motion.a
                  key={seller.id}
                  href={`/seller/${seller.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "var(--radius-xl)",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    textDecoration: "none",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 200ms",
                  }}
                  className="seller-card"
                >
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <img src={seller.img} alt={seller.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} className="seller-img" />
                  </div>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{seller.name}</h3>
                      {seller.verified && <BadgeCheck size={18} style={{ color: "var(--info)", flexShrink: 0 }} />}
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 16, margin: 0 }}>{seller.specialty}</p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", gap: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                          <Star size={14} fill="var(--warning)" color="var(--warning)" /> {seller.rating}
                          <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>({seller.reviews})</span>
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--text-muted)" }}>
                          <MapPin size={13} /> {seller.location}
                        </span>
                      </div>
                      <span style={{
                        marginLeft: "auto",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--bg-inset)",
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}>
                        {seller.type}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        .seller-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .seller-card:hover .seller-img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          #sellers-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 550px) {
          #sellers-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
