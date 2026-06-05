"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { CreditCard, Truck, Calendar, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [scheduled, setScheduled] = useState(false);
  const [customerName, setCustomerName] = useState("Jamshid Alimov");
  const [customerPhone, setCustomerPhone] = useState("+998");
  const [placedOrderId, setPlacedOrderId] = useState("BC-84920");
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        setCartItems(JSON.parse(cartData));
      } else {
        // Use default fallback mock items
        setCartItems([
          { name: "Maxsus 3D Shokoladli Tort", price: 340000, quantity: 1, allergens: ["Sut", "Tuxum"] },
          { name: "Tovuqli Lavash", price: 320000, quantity: 1, allergens: ["Gluten"] }
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = deliveryMethod === "delivery" ? 15000 : 0;
  const total = subtotal + deliveryFee;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new order object
    const newOrderId = "BC-" + Math.floor(10000 + Math.random() * 90000);
    setPlacedOrderId(newOrderId);

    const newOrder = {
      id: newOrderId,
      customer: customerName,
      items: cartItems.map((i: any) => `${i.name} (x${i.quantity || 1})`).join(", "),
      total: total,
      date: "Bugun, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Yangi",
      allergens: cartItems.reduce((acc: string[], i: any) => {
        if (i.allergens) acc.push(...i.allergens);
        return acc;
      }, []),
    };

    // Save order to localStorage orders list
    try {
      const existingOrdersData = localStorage.getItem("seller-orders");
      const existingOrders = existingOrdersData ? JSON.parse(existingOrdersData) : [
        { id: "BC-84920", customer: "Jamshid Alimov", items: "3D Shokoladli Tort (x1), Lavash (x1)", total: 675000, date: "Bugun, 12:30", status: "Yangi", allergens: ["Sut", "Tuxum"] },
        { id: "BC-84811", customer: "Shahzoda Karimova", items: "Kapkeyk To'plami (x12)", total: 180000, date: "Kecha", status: "Tayyorlanmoqda", allergens: [] },
        { id: "BC-84704", customer: "Sardorbek Albakiev", items: "Bayramona Osh (x2)", total: 240000, date: "03 Iyun", status: "Yetkazildi", allergens: [] },
      ];
      
      existingOrders.unshift(newOrder);
      localStorage.setItem("seller-orders", JSON.stringify(existingOrders));
      
      // Also save this specific order ID as the active customer order
      localStorage.setItem("active-order-id", newOrderId);

      // Save user details to profile/history if they want
      localStorage.setItem("profile-name", customerName);
      localStorage.setItem("profile-phone", customerPhone);
      
      // Clear cart
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error(err);
    }
    
    setStep(2);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {step === 1 ? (
            <>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 32,
                }}
              >
                Buyurtmani rasmiylashtirish
              </h1>

              <form
                onSubmit={handleOrderSubmit}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 280px",
                  gap: 32,
                }}
                id="checkout-layout"
              >
                {/* Form Fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {/* Personal info */}
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-xl)",
                      padding: 24,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      1. Shaxsiy ma'lumotlar
                    </h2>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }} className="form-row">
                      <div style={{ flex: 1 }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            color: "var(--text-secondary)",
                            marginBottom: 6,
                          }}
                        >
                          Ism va Familiya
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Ismingizni kiriting"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-strong)",
                            outline: "none",
                            background: "var(--bg-inset)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            color: "var(--text-secondary)",
                            marginBottom: 6,
                          }}
                        >
                          Telefon raqam
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+998"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-strong)",
                            outline: "none",
                            background: "var(--bg-inset)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery details */}
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-xl)",
                      padding: 24,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      2. Yetkazib berish usuli
                    </h2>

                    <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("delivery")}
                        style={{
                          flex: 1,
                          padding: 16,
                          borderRadius: "var(--radius-lg)",
                          border: "2px solid",
                          borderColor:
                            deliveryMethod === "delivery"
                              ? "var(--accent)"
                              : "var(--border)",
                          background:
                            deliveryMethod === "delivery"
                              ? "var(--accent-light)"
                              : "transparent",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Truck size={20} />
                        Kuryer orqali
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("pickup")}
                        style={{
                          flex: 1,
                          padding: 16,
                          borderRadius: "var(--radius-lg)",
                          border: "2px solid",
                          borderColor:
                            deliveryMethod === "pickup"
                              ? "var(--accent)"
                              : "var(--border)",
                          background:
                            deliveryMethod === "pickup"
                              ? "var(--accent-light)"
                              : "transparent",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Calendar size={20} />
                        Olib ketish (Self-pickup)
                      </button>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div>
                          <label
                            style={{
                              display: "block",
                              fontSize: 13,
                              color: "var(--text-secondary)",
                              marginBottom: 6,
                            }}
                          >
                            Yetkazish manzili
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ko'cha, uy, kvartira raqamini kiriting"
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "var(--radius-md)",
                              border: "1px solid var(--border-strong)",
                              outline: "none",
                            }}
                          />
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                          <button
                            type="button"
                            onClick={() => setScheduled(!scheduled)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "var(--radius-pill)",
                              border: "1px solid var(--border-strong)",
                              background: scheduled
                                ? "var(--accent-light)"
                                : "transparent",
                              color: scheduled
                                ? "var(--accent)"
                                : "var(--text-secondary)",
                              fontSize: 13,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <Clock size={14} /> Rejalashtirilgan vaqt
                          </button>
                        </div>

                        {scheduled && (
                          <div style={{ display: "flex", gap: 12 }} className="form-row">
                            <div style={{ flex: 1 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 13,
                                  color: "var(--text-secondary)",
                                  marginBottom: 6,
                                }}
                              >
                                Kun
                              </label>
                              <input
                                type="date"
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "var(--radius-md)",
                                  border: "1px solid var(--border-strong)",
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 13,
                                  color: "var(--text-secondary)",
                                  marginBottom: 6,
                                }}
                              >
                                Vaqt
                              </label>
                              <input
                                type="time"
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "var(--radius-md)",
                                  border: "1px solid var(--border-strong)",
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Payment */}
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-xl)",
                      padding: 24,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      3. To'lov usuli
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { id: "card", label: "Uzcard / Humo / Visa (Kartadan to'lov)", icon: <CreditCard size={18} /> },
                        { id: "cash", label: "Naqd pul orqali (Kuryerga)", icon: <Truck size={18} /> },
                      ].map((pay) => (
                        <div
                          key={pay.id}
                          onClick={() => setPaymentMethod(pay.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "14px 16px",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid",
                            borderColor:
                              paymentMethod === pay.id
                                ? "var(--accent)"
                                : "var(--border)",
                            background:
                              paymentMethod === pay.id
                                ? "var(--accent-light)"
                                : "transparent",
                            cursor: "pointer",
                            transition: "all 120ms",
                          }}
                        >
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              border: "2px solid",
                              borderColor:
                                paymentMethod === pay.id
                                  ? "var(--accent)"
                                  : "var(--border-strong)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {paymentMethod === pay.id && (
                              <div
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  background: "var(--accent)",
                                }}
                              />
                            )}
                          </div>
                          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
                            {pay.icon} {pay.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar summary */}
                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-xl)",
                    padding: 24,
                    height: "fit-content",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 16,
                    }}
                  >
                    Buyurtma tafsiloti
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      fontSize: 13,
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: 16,
                      marginBottom: 16,
                    }}
                  >
                    {cartItems.map((item, index) => (
                      <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--text-secondary)" }}>
                          {item.name} (x{item.quantity || 1})
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                          {(item.price * (item.quantity || 1)).toLocaleString()} so'm
                        </span>
                      </div>
                    ))}
                    {deliveryMethod === "delivery" && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--text-secondary)" }}>Yetkazib berish</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>15,000 so'm</span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 20,
                    }}
                  >
                    <span>Jami:</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        fontWeight: 700,
                      }}
                    >
                      {total.toLocaleString()} so'm
                    </span>
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
                      fontSize: 15,
                      boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                    }}
                  >
                    Buyurtmani tasdiqlash
                  </button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center",
                padding: "64px 32px",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--success-light)",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <CheckCircle size={40} />
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                Buyurtmangiz qabul qilindi!
              </h1>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 16,
                  maxWidth: 480,
                  margin: "0 auto 32px",
                  lineHeight: 1.6,
                }}
              >
                Buyurtma raqamingiz: <strong>#{placedOrderId}</strong>. Oshpaz buyurtmani
                tasdiqlashi bilan sizga bildirishnoma yuboriladi.
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <a
                  href={`/orders/${placedOrderId}`}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--accent)",
                    color: "#fff",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Buyurtmani kuzatish
                </a>
                <a
                  href="/"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Bosh sahifaga qaytish
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #checkout-layout {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </>
  );
}
