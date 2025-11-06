import React, { useState } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Olá! 👋 Sou sua assistente IA com RAG + WhatsApp. Como posso ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { role: "user" as const, text: input.trim() };
    setMessages([...messages, newMessage, { role: "ai", text: "🤖 Processando sua mensagem..." }]);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(135deg, #141E30, #243B55)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "16px 24px",
          background: "rgba(0, 0, 0, 0.2)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "1.2rem",
          letterSpacing: "0.5px",
        }}
      >
        💬 Chat de IA com RAG + WhatsApp
      </header>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#00b894" : "rgba(255,255,255,0.1)",
              padding: "12px 16px",
              borderRadius: "16px",
              maxWidth: "70%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer
        style={{
          padding: "16px",
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Digite sua mensagem..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: "#00b894",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => ((e.currentTarget.style.background = "#00cec9"))}
          onMouseOut={(e) => ((e.currentTarget.style.background = "#00b894"))}
        >
          Enviar
        </button>
      </footer>
    </div>
  );
};

export default Chat;
