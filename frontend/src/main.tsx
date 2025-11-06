import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ConfigPage from "./pages/Config";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents"; // ✅ Nova página RAG

// 💎 Página inicial moderna
// eslint-disable-next-line react-refresh/only-export-components
function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141E30, #243B55)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.8rem",
          marginBottom: "0.5rem",
          letterSpacing: "1px",
          fontWeight: 700,
          background: "linear-gradient(to right, #00b894, #00cec9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Chat de IA com RAG + WhatsApp 💬
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          maxWidth: "600px",
          color: "rgba(255,255,255,0.8)",
          marginBottom: "2rem",
        }}
      >
        Sistema inteligente com integração via Evolution API, processamento de
        documentos (RAG) e interface de chat em tempo real.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          to="/chat"
          style={{
            textDecoration: "none",
            padding: "12px 28px",
            background: "linear-gradient(90deg, #00b894, #00cec9)",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(0, 206, 201, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 4px 25px rgba(0, 206, 201, 0.6)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(0, 206, 201, 0.4)";
          }}
        >
          🚀 Acessar Chat
        </Link>

        <Link
          to="/documents"
          style={{
            textDecoration: "none",
            padding: "12px 28px",
            background: "linear-gradient(90deg, #6366f1, #3b82f6)",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 4px 25px rgba(59, 130, 246, 0.6)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(59, 130, 246, 0.4)";
          }}
        >
          📄 Documentos
        </Link>

        <Link
          to="/config"
          style={{
            textDecoration: "none",
            padding: "12px 28px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
        >
          ⚙️ Configurações
        </Link>
      </div>

      <footer
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Desenvolvido por <strong>Michael De Lima Rocha</strong> 🚀
      </footer>
    </div>
  );
}

// 🌐 Renderização principal
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/documents" element={<Documents />} /> {/* ✅ Nova rota */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
