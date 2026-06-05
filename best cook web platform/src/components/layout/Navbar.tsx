"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Heart,
  Clock,
  Bell,
} from "lucide-react";

const navLinks = [
  { label: "Bosh sahifa", href: "/" },
  {
    label: "Konstruktorlar",
    href: "#",
    children: [
      {
        label: "🎂 3D Tort Konstruktor",
        desc: "Tortni 3D muharrirda yarating",
        href: "/constructor/cake",
      },
      {
        label: "🧁 Desert Konstruktor",
        desc: "Kapkeyk, makaron, shokolad",
        href: "/constructor/dessert",
      },
      {
        label: "🍔 Fast Food Konstruktor",
        desc: "Burger, pizza, hot dog",
        href: "/constructor/fastfood",
      },
      {
        label: "🍽️ Milliy Taomlar",
        desc: "Osh, manti, somsa, shashlik",
        href: "/constructor/milliy",
      },
    ],
  },
  { label: "Oshpazlar", href: "/sellers" },
  { label: "Kategoriyalar", href: "/categories" },
  { label: "Sotuvchi paneli", href: "/seller-dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          const items = JSON.parse(cartData);
          setCartCount(items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
        } else {
          // Initialize mock cart in localStorage if empty on first load
          const mockCart = [
            {
              id: "item1",
              name: "Maxsus 3D Shokoladli Tort",
              details: "Shakl: Dumaloq | Qavatlar: 2 | Krem: Shokoladli | Bezak: Mevalar",
              price: 340000,
              quantity: 1,
              image: "🎂",
              allergens: ["Sut", "Tuxum"],
            },
            {
              id: "item2",
              name: "Tovuqli Lavash",
              details: "Tovuq go'shti, pishloq, bodring, pomidor, maxsus sous",
              price: 320000,
              quantity: 1,
              image: "🌯",
              allergens: ["Gluten"],
            },
          ];
          localStorage.setItem("cart", JSON.stringify(mockCart));
          setCartCount(2);
        }
      } catch (e) {
        console.error(e);
      }
    };
    updateCartCount();

    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", updateCartCount); // Sync across tabs
    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        id="main-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: scrolled
            ? "rgba(250, 247, 242, 0.92)"
            : "rgba(250, 247, 242, 0)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--space-6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              BC
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              Best Cook
            </span>
          </a>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() =>
                  link.children ? setDropdownOpen(link.label) : null
                }
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <a
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "var(--text-primary)",
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "8px 0",
                    transition: "color 120ms",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 200ms",
                        transform:
                          dropdownOpen === link.label
                            ? "rotate(180deg)"
                            : "rotate(0)",
                      }}
                    />
                  )}
                </a>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && dropdownOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: -16,
                        background: "var(--bg-surface)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-xl)",
                        border: "1px solid var(--border)",
                        padding: 8,
                        width: 320,
                        overflow: "hidden",
                      }}
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            padding: "12px 16px",
                            borderRadius: "var(--radius-md)",
                            textDecoration: "none",
                            transition:
                              "background 120ms",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                              "var(--bg-inset)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                              "transparent")
                          }
                        >
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 500,
                              color: "var(--text-primary)",
                            }}
                          >
                            {child.label}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              color: "var(--text-muted)",
                            }}
                          >
                            {child.desc}
                          </span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Search button */}
            <button
              id="search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "var(--radius-pill)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                transition: "background 120ms",
                background: searchOpen ? "var(--bg-inset)" : "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-inset)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = searchOpen
                  ? "var(--bg-inset)"
                  : "transparent")
              }
              aria-label="Qidirish"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            {/* Wishlist */}
            <button
              id="wishlist-btn"
              style={{
                width: 42,
                height: 42,
                borderRadius: "var(--radius-pill)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                transition: "background 120ms",
              }}
              className="desktop-only"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-inset)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              aria-label="Sevimlilar"
            >
              <Heart size={20} strokeWidth={2} />
            </button>

            {/* Cart */}
            <a
              href="/cart"
              id="cart-btn"
              style={{
                width: 42,
                height: 42,
                borderRadius: "var(--radius-pill)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                transition: "background 120ms",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-inset)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              aria-label="Savat"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {cartCount}
              </span>
            </a>

            {/* Profile */}
            <a
              href="/profile"
              id="profile-btn"
              style={{
                width: 42,
                height: 42,
                borderRadius: "var(--radius-pill)",
                background: "var(--bg-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-on-dark)",
                transition: "transform 120ms",
              }}
              className="desktop-only"
              aria-label="Profil"
            >
              <User size={18} strokeWidth={2} />
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "var(--radius-pill)",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
              }}
              className="mobile-toggle"
              aria-label="Menyu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                overflow: "hidden",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-surface)",
              }}
            >
              <div
                style={{
                  maxWidth: 680,
                  margin: "0 auto",
                  padding: "16px 24px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "var(--bg-inset)",
                    borderRadius: "var(--radius-pill)",
                    padding: "14px 20px",
                    border: "2px solid transparent",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "transparent")
                  }
                >
                  <Search
                    size={20}
                    strokeWidth={2}
                    style={{ color: "var(--text-muted)", flexShrink: 0 }}
                  />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Tort, desert, oshpaz yoki restaurant qidiring..."
                    style={{
                      flex: 1,
                      border: "none",
                      background: "none",
                      outline: "none",
                      fontSize: 16,
                      color: "var(--text-primary)",
                    }}
                    autoFocus
                  />
                  <MapPin
                    size={18}
                    strokeWidth={2}
                    style={{ color: "var(--text-muted)", flexShrink: 0 }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    "Tort",
                    "Kapkeyk",
                    "Burger",
                    "Osh",
                    "Pizza",
                    "Manti",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--bg-inset)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "all 120ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent-light)";
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--bg-inset)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 199,
              background: "rgba(26, 24, 20, 0.4)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(340px, 85vw)",
                background: "var(--bg-surface)",
                padding: "80px 24px 24px",
                overflowY: "auto",
                boxShadow: "var(--shadow-xl)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "14px 16px",
                        borderRadius: "var(--radius-md)",
                        fontSize: 17,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        transition: "background 120ms",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--bg-inset)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {link.label}
                    </a>
                    {link.children?.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: "10px 16px 10px 32px",
                          borderRadius: "var(--radius-md)",
                          fontSize: 15,
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          transition: "background 120ms",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--bg-inset)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              {/* Mobile menu bottom */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  marginTop: 24,
                  paddingTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <a
                  href="/profile"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  <User size={20} /> Profil
                </a>
                <a
                  href="/orders"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  <Clock size={20} /> Buyurtmalar
                </a>
                <a
                  href="/allergies"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  <Bell size={20} /> Allergiya sozlamalari
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for responsive nav */}
      <style jsx global>{`
        .desktop-nav {
          display: flex !important;
        }
        .desktop-only {
          display: flex !important;
        }
        .mobile-toggle {
          display: none !important;
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
