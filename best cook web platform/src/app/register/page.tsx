"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("profile-name", name);
      localStorage.setItem("profile-phone", phone);
      router.push("/profile");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64, display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: 460 }}>
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "40px 32px",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: "0 0 8px",
                textAlign: "center",
              }}
            >
              Ro'yxatdan o'tish
            </h1>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>
              Best Cook loyihasida o'z profilingizni yarating
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                  Ism va Familiya
                </label>
                <div style={{ position: "relative" }}>
                  <User size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    required
                    placeholder="Ismingizni kiriting"
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
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                  Telefon raqam
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="tel"
                    required
                    placeholder="+998"
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
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                  Parol
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Parol yarating"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 42px 12px 42px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-strong)",
                      background: "var(--bg-inset)",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontSize: 14,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14.5,
                  border: "none",
                  cursor: "pointer",
                  marginTop: 12,
                  boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                  transition: "background 120ms",
                }}
              >
                Hisob yaratish
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
