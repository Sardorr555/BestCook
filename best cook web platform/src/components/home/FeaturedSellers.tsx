"use client";

import { motion } from "framer-motion";
import { Star, MapPin, BadgeCheck, ArrowRight } from "lucide-react";

const sellers = [
  { name: "Dilnoza Bakery", type: "Novvoyxona", rating: 4.9, reviews: 342, location: "Chilonzor", verified: true, specialty: "Tort va pishiriqlar", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80" },
  { name: "Master Burger", type: "Fast Food", rating: 4.7, reviews: 218, location: "Yunusobod", verified: true, specialty: "Burger va lavash", img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=400&q=80" },
  { name: "Osh Markazi", type: "Milliy taomlar", rating: 4.8, reviews: 567, location: "Sergeli", verified: true, specialty: "Osh va milliy taomlar", img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=400&q=80" },
  { name: "Sweet Dreams", type: "Desert do'koni", rating: 4.9, reviews: 189, location: "Mirzo Ulug'bek", verified: false, specialty: "Kapkeyk va makaron", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
];

export default function FeaturedSellers() {
  return (
    <section id="featured-sellers" style={{ padding: "80px 0" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 8 }}>
              Eng yaxshi oshpazlar
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>Tekshirilgan va ishonchli professional oshpazlar</p>
          </div>
          <a href="/sellers" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
            Barchasi <ArrowRight size={16} />
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} id="sellers-grid">
          {sellers.map((seller, i) => (
            <motion.a
              key={seller.name}
              href={`/seller/${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                display: "flex", flexDirection: "column", borderRadius: "var(--radius-xl)",
                background: "var(--bg-surface)", border: "1px solid var(--border)",
                overflow: "hidden", textDecoration: "none", transition: "all 150ms", cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Header */}
              <div style={{
                height: 140,
                position: "relative",
                overflow: "hidden",
              }}>
                <img
                  src={seller.img}
                  alt={seller.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Content */}
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 600, color: "var(--text-primary)" }}>{seller.name}</h3>
                  {seller.verified && <BadgeCheck size={16} style={{ color: "var(--info)" }} />}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>{seller.specialty}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600, color: "var(--text-primary)" }}>
                    <Star size={14} fill="var(--warning)" color="var(--warning)" /> {seller.rating}
                    <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>({seller.reviews})</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)" }}>
                    <MapPin size={13} /> {seller.location}
                  </span>
                </div>
                <div style={{
                  marginTop: 12, padding: "6px 12px", borderRadius: "var(--radius-pill)",
                  background: "var(--bg-inset)", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "inline-block",
                }}>
                  {seller.type}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) { #sellers-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 550px) { #sellers-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
