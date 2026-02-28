"use client";

import { useState } from "react";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("998");

  return (
    <div style={overlay}>
      <div style={modal}>
        <button style={closeBtn}>✕</button>

        <h1 style={title}>Tizimga kirish</h1>

        <p style={subtitle}>Telefon raqamini kiriting</p>

        <div style={phoneRow}>
          <select
            value={code}
            onChange={(e) => setCode(e.target.value)} 
            style={codeSelect}
          >
            <option value="998">998</option>
            <option value="7">7</option>
            <option value="90">90</option>
            <option value="90">933</option>
            
          </select>

          <input
            type="tel"
            placeholder="telefon raqamingiz"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={phoneInput}
          />
        </div>

        <button style={mainBtn}>Davom etish</button>

        <p style={orText}>yoki bilan</p>

        <button style={socialBtn}>
          <span style={{ fontWeight: 600 }}>Google</span>
          bilan davom eting 
        </button>

        <button style={socialBtn}>
          <span style={{ fontWeight: 600 }}>✉ Bilan davom eting</span>
        </button>
      </div>
    </div>
  );
}

const overlay = {
  minHeight: "100vh",
  background: "#f2f2f2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  width: 480,
  background: "#fff",
  borderRadius: 24,
  padding: 40,
  position: "relative" as const,
  display: "flex",
  flexDirection: "column" as const,
  gap: 20,
};

const closeBtn = {
  position: "absolute" as const,
  right: 20,
  top: 20,
  border: "none",
  background: "#eee",
  width: 40,
  height: 40,
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: 18,
};

const title = {
  textAlign: "center" as const,
  fontSize: 28,
  fontWeight: 700,
};

const subtitle = {
  textAlign: "center" as const,
  fontSize: 18,
  marginBottom: 10,
};

const phoneRow = {
  display: "flex",
  gap: 12,
};

const codeSelect = {
  width: 100,
  padding: 14,
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 16,
};

const phoneInput = {
  flex: 1,
  padding: 14,
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 16,
};

const mainBtn = {
  marginTop: 10,
  padding: "16px",
  borderRadius: 50,
  border: "none",
  background: "#e4002b",
  color: "#fff",
  fontSize: 18,
  fontWeight: 600,
  cursor: "pointer",
};

const orText = {
  textAlign: "center" as const,
  marginTop: 10,
  marginBottom: 10,
  fontSize: 16,
};

const socialBtn = {
  padding: "14px",
  borderRadius: 14,
  border: "1px solid #ddd",
  background: "#fafafa",
  fontSize: 16,
  cursor: "pointer",
  display: "flex",
  gap: 10,
  justifyContent: "center",
  alignItems: "center",
};