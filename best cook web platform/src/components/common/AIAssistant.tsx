"use client";

import { useState } from "react";
import { MessageSquare, X, Sparkles, MessageCircleCode } from "lucide-react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(232, 98, 43, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms",
        }}
        className="ai-fab-btn"
        aria-label="AI Yordamchi"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Pulsing indicator */}
        {!isOpen && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#10B981",
              border: "2.5px solid var(--bg-surface, #fff)",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
            }}
            className="pulse-badge"
          />
        )}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: "clamp(320px, 90vw, 400px)",
            height: "clamp(480px, 75vh, 640px)",
            borderRadius: "var(--radius-2xl)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            animation: "slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="ai-chat-window"
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, rgba(232, 98, 43, 0.08) 0%, rgba(232, 98, 43, 0.02) 100%)",
              borderBottom: "1px solid rgba(232, 98, 43, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                  AI Yordamchi
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Onlayn</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: 4,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <X size={18} />
            </button>
          </div>

          {/* Iframe Body */}
          <div style={{ flex: 1, position: "relative", background: "#f9f9f9" }}>
            <iframe
              src="https://api.swipies.app/chats/share?shared_id=286645a260ae11f1af294d2ae566e6c9&from=chat&auth=Scxk-UKe-ej0cbHqbILPF40ISy4i7APu&theme=light"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "transparent",
              }}
              allow="microphone"
            />
          </div>
        </div>
      )}

      {/* Global CSS styles for animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .ai-fab-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(232, 98, 43, 0.5);
        }
        .ai-fab-btn:active {
          transform: scale(0.95);
        }
        
        .pulse-badge {
          animation: pulseGlow 2s infinite;
        }
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        @media (max-width: 550px) {
          .ai-chat-window {
            bottom: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            border: none !important;
          }
        }
      `}</style>
    </>
  );
}
