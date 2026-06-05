"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { Clock, Eye, ShoppingBag } from "lucide-react";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("seller-orders");
      if (stored) {
        // For simulation, we assume user's orders are the ones in "seller-orders"
        // but we can filter or show them as the user's active history.
        setOrders(JSON.parse(stored));
      } else {
        const defaultOrders = [
          { id: "BC-84920", customer: "Jamshid Alimov", items: "3D Shokoladli Tort (x1), Lavash (x1)", total: 675000, date: "Bugun, 12:30", status: "Yangi", allergens: ["Sut", "Tuxum"] },
          { id: "BC-84811", customer: "Shahzoda Karimova", items: "Kapkeyk To'plami (x12)", total: 180000, date: "Kecha", status: "Tayyorlanmoqda", allergens: [] },
          { id: "BC-84704", customer: "Sardorbek Albakiev", items: "Bayramona Osh (x2)", total: 240000, date: "03 Iyun", status: "Yetkazildi", allergens: [] },
        ];
        setOrders(defaultOrders);
        localStorage.setItem("seller-orders", JSON.stringify(defaultOrders));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
              }}
            >
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Mening Buyurtmalarim
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "4px 0 0" }}>
                Siz tomondan amalga oshirilgan buyurtmalar ro'yxati
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 32px",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Hozircha buyurtmalar yo'q</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
                Konstruktorlarimiz orqali birinchi taomingizni yarating!
              </p>
              <a
                href="/constructor/cake"
                style={{
                  display: "inline-flex",
                  padding: "12px 24px",
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: "var(--radius-pill)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Katalogga o'tish
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-xl)",
                    padding: 24,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 24,
                    boxShadow: "var(--shadow-sm)",
                    transition: "transform 150ms, box-shadow 150ms",
                  }}
                  className="order-card"
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                        #{order.id}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: "var(--radius-pill)",
                          background:
                            order.status === "Yangi"
                              ? "var(--accent-light)"
                              : order.status === "Tayyorlanmoqda"
                              ? "#FFF8E0"
                              : "#E8F5E7",
                          color:
                            order.status === "Yangi"
                              ? "var(--accent)"
                              : order.status === "Tayyorlanmoqda"
                              ? "var(--warning)"
                              : "var(--success)",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", margin: 0 }}>
                      {order.items}
                    </p>

                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-muted)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={14} /> {order.date}
                      </span>
                      <span>•</span>
                      <span>
                        Jami: <strong style={{ color: "var(--text-primary)" }}>{order.total.toLocaleString()} so'm</strong>
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/orders/${order.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      borderRadius: "var(--radius-pill)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      background: "transparent",
                      transition: "all 150ms",
                    }}
                    className="track-button"
                  >
                    <Eye size={16} /> Kuzatish
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .track-button:hover {
          background: var(--text-primary) !important;
          color: var(--text-on-dark) !important;
          border-color: var(--text-primary) !important;
        }
      `}</style>
    </>
  );
}
