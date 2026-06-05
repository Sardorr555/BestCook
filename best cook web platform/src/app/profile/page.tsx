"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { User, Phone, MapPin, Bell, ShieldAlert, CheckCircle, Save } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Jamshid Alimov");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [address, setAddress] = useState("Toshkent shahri, Chilonzor tumani, 2-daha");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem("profile-name");
      const storedPhone = localStorage.getItem("profile-phone");
      const storedAddress = localStorage.getItem("profile-address");
      const storedAllergies = localStorage.getItem("allergies");

      if (storedName) setName(storedName);
      if (storedPhone) setPhone(storedPhone);
      if (storedAddress) setAddress(storedAddress);
      if (storedAllergies) setAllergies(JSON.parse(storedAllergies));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("profile-name", name);
      localStorage.setItem("profile-phone", phone);
      localStorage.setItem("profile-address", address);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Mening Profilim
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "4px 0 0" }}>
              Shaxsiy ma'lumotlar va hisob sozlamalari
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 32,
            }}
            id="profile-layout"
          >
            {/* Sidebar Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    fontWeight: 700,
                    margin: "0 auto 16px",
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>
                  {name}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                  Mijoz
                </p>
              </div>

              {/* Allergy Quick Status */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 20,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <ShieldAlert size={16} style={{ color: "var(--accent)" }} />
                  Allergiya sozlamalari
                </h4>
                {allergies.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {allergies.map((allergy) => (
                      <span
                        key={allergy}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "4px 8px",
                          borderRadius: 4,
                          background: "var(--error-light)",
                          color: "var(--error)",
                        }}
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                    Hech qanday allergiya belgilanmagan.
                  </p>
                )}
                <a
                  href="/allergies"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  Tahrirlash →
                </a>
              </div>
            </div>

            {/* Profile Form */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: 32,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 8,
                    }}
                  >
                    Ism va Familiya
                  </label>
                  <div style={{ position: "relative" }}>
                    <User
                      size={18}
                      style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
                    />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 42px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-strong)",
                        background: "var(--bg-inset)",
                        color: "var(--text-primary)",
                        outline: "none",
                        fontSize: 14.5,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 8,
                    }}
                  >
                    Telefon raqam
                  </label>
                  <div style={{ position: "relative" }}>
                    <Phone
                      size={18}
                      style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 42px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-strong)",
                        background: "var(--bg-inset)",
                        color: "var(--text-primary)",
                        outline: "none",
                        fontSize: 14.5,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 8,
                    }}
                  >
                    Yetkazib berish manzili
                  </label>
                  <div style={{ position: "relative" }}>
                    <MapPin
                      size={18}
                      style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
                    />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 42px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-strong)",
                        background: "var(--bg-inset)",
                        color: "var(--text-primary)",
                        outline: "none",
                        fontSize: 14.5,
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 12 }}>
                  <button
                    type="submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 28px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--accent)",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14.5,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                    }}
                  >
                    <Save size={16} /> Saqlash
                  </button>

                  {saved && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--success)",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircle size={16} /> Muvaffaqiyatli saqlandi!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 768px) {
          #profile-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
