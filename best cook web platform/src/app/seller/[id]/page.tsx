"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams } from "next/navigation";
import { Star, MapPin, BadgeCheck, Phone, Mail, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const sellersData = [
  {
    id: "1",
    name: "Dilnoza Bakery",
    type: "Novvoyxona",
    rating: 4.9,
    reviews: 342,
    location: "Chilonzor, Toshkent shahri",
    verified: true,
    specialty: "Tort va shirinliklar",
    phone: "+998 90 987 65 43",
    email: "dilnoza.bakery@bestcook.uz",
    experience: "7 yillik malaka",
    about: "Biz siz uchun eng shirin, sifatli va chiroyli shaxsiy dizayndagi tortlarni tayyorlab beramiz. Har bir buyurtma alohida mehr bilan, siz tanlagan 3D shakl va ta'mlarga mos ravishda pishiriladi. Allergiya talablaringiz inobatga olinadi.",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
    banner: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1000&q=80",
    menu: [
      { name: "3D Shokoladli Tort", category: "Cakes", price: "340,000", link: "/constructor/cake" },
      { name: "Mevali Karamel Tort", category: "Cakes", price: "320,000", link: "/constructor/cake" },
      { name: "Pistali Macaron To'plami", category: "Desserts", price: "80,000", link: "/constructor/dessert" },
      { name: "Kapkeyk To'plami (x12)", category: "Desserts", price: "180,000", link: "/constructor/dessert" },
    ],
  },
  {
    id: "2",
    name: "Master Burger",
    type: "Fast Food",
    rating: 4.7,
    reviews: 218,
    location: "Yunusobod, Toshkent shahri",
    verified: true,
    specialty: "Burger va lavashlar",
    phone: "+998 93 123 45 67",
    email: "master.burger@bestcook.uz",
    experience: "5 yillik malaka",
    about: "Tezkor va mazali fast food taomlari! Bizda faqat halol va sifatli yangi go'sht mahsulotlari ishlatiladi. O'zingiz xohlagan masalliqlarni tanlab, shaxsiy burger va pizzangizni yarating.",
    img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=400&q=80",
    banner: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1000&q=80",
    menu: [
      { name: "Maxsus pishloqli Burger", category: "Fast Food", price: "45,000", link: "/constructor/fastfood" },
      { name: "Double Cheese Pizza", category: "Fast Food", price: "85,000", link: "/constructor/fastfood" },
      { name: "Tovuqli Lavash", category: "Fast Food", price: "32,000", link: "/constructor/fastfood" },
    ],
  },
  {
    id: "3",
    name: "Osh Markazi",
    type: "Milliy taomlar",
    rating: 4.8,
    reviews: 567,
    location: "Sergeli, Toshkent shahri",
    verified: true,
    specialty: "Osh va milliy taomlar",
    phone: "+998 94 456 78 90",
    email: "osh.markazi@bestcook.uz",
    experience: "12 yillik malaka",
    about: "O'zbek milliy taomlarining haqiqiy ustasi. To'y oshi, manti, somsa va shashliklarni o'zgacha retsept bilan tayyorlaymiz. Har bir taomni shaxsiy xohishingizga ko'ra yog'li yoki kamroq yog'li qilib taqdim etamiz.",
    img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=400&q=80",
    banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    menu: [
      { name: "Bayramona to'y Oshi", category: "Milliy Taomlar", price: "180,000", link: "/constructor/milliy" },
      { name: "Qo'y go'shtli Manti (x5)", category: "Milliy Taomlar", price: "45,000", link: "/constructor/milliy" },
      { name: "Tandir Somsa", category: "Milliy Taomlar", price: "12,000", link: "/constructor/milliy" },
    ],
  },
];

export default function SellerDetailPage() {
  const params = useParams();
  const id = params?.id || "1";
  const seller = sellersData.find((s) => s.id === id) || sellersData[0];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        {/* Banner */}
        <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
          <img src={seller.banner} alt={seller.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" }} />
        </div>

        {/* Content Section */}
        <div className="container" style={{ marginTop: -80, position: "relative", zIndex: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 32 }} id="seller-detail-layout">
            
            {/* Left Column Profile Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  boxShadow: "var(--shadow-lg)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "4px solid var(--bg-surface)",
                    overflow: "hidden",
                    margin: "0 auto 16px",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <img src={seller.img} alt={seller.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{seller.name}</h2>
                  {seller.verified && <BadgeCheck size={20} style={{ color: "var(--info)" }} />}
                </div>

                <span style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  marginBottom: 16,
                }}>
                  {seller.type}
                </span>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
                  <Star size={16} fill="var(--warning)" color="var(--warning)" /> {seller.rating}
                  <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>({seller.reviews} izoh)</span>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "16px 0" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left", fontSize: 13.5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-secondary)" }}>
                    <MapPin size={16} style={{ color: "var(--text-muted)" }} />
                    <span>{seller.location}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-secondary)" }}>
                    <Phone size={16} style={{ color: "var(--text-muted)" }} />
                    <span>{seller.phone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-secondary)" }}>
                    <Mail size={16} style={{ color: "var(--text-muted)" }} />
                    <span>{seller.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-secondary)" }}>
                    <Award size={16} style={{ color: "var(--text-muted)" }} />
                    <span>{seller.experience}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 80 }}>
              
              {/* About seller */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 32,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginTop: 0, marginBottom: 16 }}>
                  Biz haqimizda
                </h3>
                <p style={{ fontSize: 15.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {seller.about}
                </p>
              </div>

              {/* Custom Menu */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 32,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginTop: 0, marginBottom: 24 }}>
                  Taklif qilinadigan taomlar va loyihalar
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} id="seller-menu-grid">
                  {seller.menu.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        padding: 20,
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 16,
                        background: "var(--bg-inset)",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {item.category}
                        </span>
                        <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", margin: "4px 0 8px" }}>
                          {item.name}
                        </h4>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                          {item.price} so'm
                        </span>
                      </div>

                      <a
                        href={item.link}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 16px",
                          borderRadius: "var(--radius-pill)",
                          background: "var(--accent)",
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                          textAlign: "center",
                          boxShadow: "0 2px 8px rgba(232, 98, 43, 0.15)",
                          transition: "all 120ms",
                        }}
                      >
                        Konstruktorda yaratish
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #seller-detail-layout {
            grid-template-columns: 1fr !important;
          }
          #seller-menu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
