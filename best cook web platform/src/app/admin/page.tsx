"use client";

import { useState } from "react";
import {
  Users,
  Store,
  AlertTriangle,
  TrendingUp,
  Settings,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("sellers");
  const [sellers, setSellers] = useState([
    { id: "S1", name: "Dilnoza Bakery", specialty: "Cakes & Desserts", region: "Tashkent", status: "Pending Approval" },
    { id: "S2", name: "Sherzod's Shashlik", specialty: "Milliy Taomlar", region: "Samarkand", status: "Pending Approval" },
    { id: "S3", name: "Osh Markazi", specialty: "Milliy Taomlar", region: "Tashkent", status: "Approved" },
  ]);

  const approveSeller = (id: string) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Approved" } : s))
    );
  };

  const rejectSeller = (id: string) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Rejected" } : s))
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F111A",
        color: "#E2E8F0",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#08090E",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          borderRight: "1px solid #1E293B",
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
              color: "#fff",
              fontSize: 18,
            }}
          >
            A
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
            Admin Portal
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "sellers", label: "Approve Sellers", icon: <Store size={16} /> },
            { id: "users", label: "Users & Customers", icon: <Users size={16} /> },
            { id: "safety", label: "Safety Flags", icon: <AlertTriangle size={16} /> },
            { id: "settings", label: "System Settings", icon: <Settings size={16} /> },
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
                color: activeTab === tab.id ? "#fff" : "#94A3B8",
                background: activeTab === tab.id ? "#1E293B" : "transparent",
                fontSize: 14,
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
            { title: "Total Platform Sales", val: "148,290,000 UZS", icon: <TrendingUp size={24} />, color: "#10B981" },
            { title: "Active Sellers", val: "48", icon: <Store size={24} />, color: "#3B82F6" },
            { title: "Safety Audits / Flags", val: "0 Warnings", icon: <AlertTriangle size={24} />, color: "#F59E0B" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#1E293B",
                borderRadius: 16,
                padding: 24,
                border: "1px solid #334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 6 }}>
                  {stat.title}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#F8FAFC" }}>
                  {stat.val}
                </div>
              </div>
              <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "sellers" && (
          <div
            style={{
              background: "#1E293B",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#F8FAFC" }}>
                Seller Approvals & Verification
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0F111A",
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid #334155",
                }}
              >
                <Search size={16} style={{ color: "#94A3B8" }} />
                <input
                  type="text"
                  placeholder="Search sellers..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#F8FAFC",
                    fontSize: 13.5,
                  }}
                />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #334155", textAlign: "left", color: "#94A3B8" }}>
                    <th style={{ padding: "12px 16px" }}>Seller Name</th>
                    <th style={{ padding: "12px 16px" }}>Specialty</th>
                    <th style={{ padding: "12px 16px" }}>Region</th>
                    <th style={{ padding: "12px 16px" }}>Verification Status</th>
                    <th style={{ padding: "12px 16px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.map((seller) => (
                    <tr key={seller.id} style={{ borderBottom: "1px solid #334155" }}>
                      <td style={{ padding: "16px", fontWeight: 600, color: "#F8FAFC" }}>
                        {seller.name}
                      </td>
                      <td style={{ padding: "16px", color: "#94A3B8" }}>{seller.specialty}</td>
                      <td style={{ padding: "16px", color: "#94A3B8" }}>{seller.region}</td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            background:
                              seller.status === "Approved"
                                ? "#064E3B"
                                : seller.status === "Rejected"
                                ? "#7F1D1D"
                                : "#78350F",
                            color:
                              seller.status === "Approved"
                                ? "#34D399"
                                : seller.status === "Rejected"
                                ? "#F87171"
                                : "#FBBF24",
                          }}
                        >
                          {seller.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px", display: "flex", gap: 8 }}>
                        {seller.status === "Pending Approval" && (
                          <>
                            <button
                              onClick={() => approveSeller(seller.id)}
                              style={{
                                padding: "6px 12px",
                                background: "#059669",
                                color: "#fff",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <CheckCircle size={14} /> Approve
                            </button>
                            <button
                              onClick={() => rejectSeller(seller.id)}
                              style={{
                                padding: "6px 12px",
                                background: "#DC2626",
                                color: "#fff",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </>
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
