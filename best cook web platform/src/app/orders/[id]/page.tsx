"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Check,
  ChefHat,
  Truck,
  PackageCheck,
  Send,
  MessageSquare,
} from "lucide-react";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.id || "BC-84920";

  // Active tracking state
  const [currentStep, setCurrentStep] = useState(1); // 1: Accepted, 2: Preparing, 3: In Transit, 4: Delivered
  const [messages, setMessages] = useState([
    { sender: "cook", text: "Assalomu alaykum, buyurtmangizni tayyorlashni boshladik. Allergiya sozlamalaringiz inobatga olindi.", time: "12:32" },
  ]);
  const [inputText, setInputText] = useState("");

  // Sync tracking step with localStorage/seller-dashboard status
  useEffect(() => {
    const syncStatus = () => {
      try {
        const stored = localStorage.getItem("seller-orders");
        if (stored) {
          const ordersList = JSON.parse(stored);
          const matchedOrder = ordersList.find((o: any) => o.id === orderId);
          if (matchedOrder) {
            if (matchedOrder.status === "Yangi") {
              setCurrentStep(1);
            } else if (matchedOrder.status === "Tayyorlanmoqda") {
              setCurrentStep(2);
            } else if (matchedOrder.status === "Yetkazildi") {
              setCurrentStep(4);
            }
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    syncStatus();
    window.addEventListener("storage", syncStatus);
    return () => {
      window.removeEventListener("storage", syncStatus);
    };
  }, [orderId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setInputText("");

    // Simulate chef answer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "cook", text: "Tushunarli, buyurtmangiz o'z vaqtida yetkazib beriladi.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 2000);
  };

  const steps = [
    { label: "Qabul qilindi", desc: "Buyurtma oshpaz tomonidan tasdiqlandi", icon: <Check size={18} /> },
    { label: "Tayyorlanmoqda", desc: "Shaxsiy retseptingiz bo'yicha taom tayyorlanmoqda", icon: <ChefHat size={18} /> },
    { label: "Yo'lda", desc: "Kuryer buyurtmani yetkazib bermoqda", icon: <Truck size={18} /> },
    { label: "Yetkazib berildi", desc: "Yoqimli ishtaha!", icon: <PackageCheck size={18} /> },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh" }}>
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
              Buyurtmani kuzatish
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Buyurtma ID: <strong style={{ color: "var(--text-primary)" }}>#{orderId}</strong>
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 32,
            }}
            id="tracking-layout"
          >
            {/* Live Tracking Timeline & Map */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Timeline Card */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 24,
                  }}
                >
                  Buyurtma holati
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                    position: "relative",
                  }}
                >
                  {/* Vertical connector line */}
                  <div
                    style={{
                      position: "absolute",
                      left: 17,
                      top: 10,
                      bottom: 10,
                      width: 2,
                      background: "var(--border-strong)",
                      zIndex: 0,
                    }}
                  />

                  {steps.map((step, index) => {
                    const isDone = index < currentStep;
                    const isActive = index === currentStep - 1;

                    return (
                      <div
                        key={step.label}
                        style={{
                          display: "flex",
                          gap: 20,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: isDone
                              ? "var(--accent)"
                              : isActive
                              ? "var(--accent-light)"
                              : "var(--bg-inset)",
                            border: "2px solid",
                            borderColor: isDone || isActive
                              ? "var(--accent)"
                              : "var(--border-strong)",
                            color: isDone
                              ? "#fff"
                              : isActive
                              ? "var(--accent)"
                              : "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 300ms",
                          }}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <h3
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 16,
                              fontWeight: 600,
                              color: isDone || isActive
                                ? "var(--text-primary)"
                                : "var(--text-muted)",
                              marginBottom: 2,
                            }}
                          >
                            {step.label}
                          </h3>
                          <p
                            style={{
                              fontSize: 13,
                              color: "var(--text-secondary)",
                            }}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map simulator */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {/* Simulated grid lines to look like a map */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "80%",
                    height: 2,
                    background: "var(--accent)",
                    transform: "rotate(-10deg)",
                    opacity: 0.3,
                  }}
                />

                {/* Delivery Pin */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                      animation: "bounce 2s infinite ease-in-out",
                    }}
                  >
                    🛵
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 600,
                      marginTop: 8,
                    }}
                  >
                    Kuryer Chilonzor metrosi yaqinida
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    Yetib kelish vaqti: taxminan 15-20 daqiqa
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Box */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
                height: 520,
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: 20,
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  👩‍🍳
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    Dilnoza (Oshpaz)
                  </h3>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--success)",
                      fontWeight: 500,
                    }}
                  >
                    Tarmoqda
                  </span>
                </div>
              </div>

              {/* Messages Area */}
              <div
                style={{
                  flex: 1,
                  padding: 20,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  background: "var(--bg-elevated)",
                }}
              >
                {messages.map((msg, i) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={i}
                      style={{
                        alignSelf: isUser ? "flex-end" : "flex-start",
                        maxWidth: "80%",
                      }}
                    >
                      <div
                        style={{
                          background: isUser ? "var(--accent)" : "#fff",
                          color: isUser ? "#fff" : "var(--text-primary)",
                          padding: "10px 16px",
                          borderRadius: isUser
                            ? "16px 16px 2px 16px"
                            : "16px 16px 16px 2px",
                          border: isUser ? "none" : "1px solid var(--border)",
                          boxShadow: "var(--shadow-sm)",
                          fontSize: 14.5,
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          marginTop: 4,
                          textAlign: isUser ? "right" : "left",
                        }}
                      >
                        {msg.time}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: 16,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: 10,
                }}
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Xabar yozing..."
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--border-strong)",
                    outline: "none",
                    fontSize: 14.5,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(232, 98, 43, 0.2)",
                  }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 900px) {
          #tracking-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
