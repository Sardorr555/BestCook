"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Package,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  DollarSign,
  UserCheck,
} from "lucide-react";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("seller-orders");
      if (stored) {
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

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem("seller-orders", JSON.stringify(updated));
        // Trigger storage event so that customer tracking page updates in real-time
        window.dispatchEvent(new Event("storage"));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        color: "#212529",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#1A1D20",
          color: "#fff",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            S
          </div>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Seller Panel</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "orders", label: "Buyurtmalar (Orders)", icon: <Clock size={16} /> },
            { id: "products", label: "Mahsulotlar (Products)", icon: <Package size={16} /> },
            { id: "earnings", label: "Daromad (Earnings)", icon: <DollarSign size={16} /> },
            { id: "settings", label: "Sozlamalar (Settings)", icon: <Settings size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 8,
                color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.6)",
                background: activeTab === tab.id ? "rgba(255,255,255,0.08)" : "transparent",
                fontSize: 14.5,
                fontWeight: 500,
                textAlign: "left",
                transition: "all 120ms",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 40 }}>
        {/* Header Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {[
            { title: "Umumiy tushum", val: "1,095,000 so'm", icon: <TrendingUp size={24} />, color: "var(--accent)" },
            { title: "Faol buyurtmalar", val: "2 ta", icon: <Clock size={24} />, color: "var(--warning)" },
            { title: "Muvaffaqiyatli yetkazilgan", val: "24 ta", icon: <UserCheck size={24} />, color: "var(--success)" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                border: "1px solid #ECEEEF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#6C757D", marginBottom: 6 }}>
                  {stat.title}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#212529" }}>
                  {stat.val}
                </div>
              </div>
              <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === "orders" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
              border: "1px solid #ECEEEF",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              Buyurtmalar ro'yxati
            </h2>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #ECEEEF", textAlign: "left", color: "#6C757D" }}>
                    <th style={{ padding: "12px 16px" }}>Mijoz</th>
                    <th style={{ padding: "12px 16px" }}>Mahsulotlar</th>
                    <th style={{ padding: "12px 16px" }}>Narxi</th>
                    <th style={{ padding: "12px 16px" }}>Sana</th>
                    <th style={{ padding: "12px 16px" }}>Allergiya ogohlantirishi</th>
                    <th style={{ padding: "12px 16px" }}>Holat</th>
                    <th style={{ padding: "12px 16px" }}>Amal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid #ECEEEF" }}>
                      <td style={{ padding: "16px", fontWeight: 600 }}>{order.customer}</td>
                      <td style={{ padding: "16px", color: "#495057" }}>{order.items}</td>
                      <td style={{ padding: "16px", fontWeight: 600 }}>{order.total.toLocaleString()} so'm</td>
                      <td style={{ padding: "16px", color: "#6C757D" }}>{order.date}</td>
                      <td style={{ padding: "16px" }}>
                        {order.allergens.length > 0 ? (
                          <span style={{ color: "var(--error)", fontWeight: 600, background: "var(--error-light)", padding: "4px 8px", borderRadius: 4, fontSize: 12 }}>
                            {order.allergens.join(", ")}
                          </span>
                        ) : (
                          <span style={{ color: "#6C757D" }}>Yo'q</span>
                        )}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            background:
                              order.status === "Yangi"
                                ? "#FFEFEA"
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
                      </td>
                      <td style={{ padding: "16px" }}>
                        {order.status === "Yangi" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "Tayyorlanmoqda")}
                            style={{
                              padding: "6px 12px",
                              background: "var(--accent)",
                              color: "#fff",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Tasdiqlash
                          </button>
                        )}
                        {order.status === "Tayyorlanmoqda" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "Yetkazildi")}
                            style={{
                              padding: "6px 12px",
                              background: "var(--success)",
                              color: "#fff",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Tugatish
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
