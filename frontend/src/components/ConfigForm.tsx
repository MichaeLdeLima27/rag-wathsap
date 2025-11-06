import React, { useState } from "react";

type Config = {
  openrouter_api_key?: string | null;
  openrouter_chat_model?: string | null;
  openrouter_embed_model?: string | null;
  system_prompt?: string | null;
};

export default function ConfigForm({
  initial,
  onSave,
}: {
  initial?: Config;
  onSave: (c: Config, admin: string) => Promise<void>;
}) {
  const [config, setConfig] = useState<Config>({
    openrouter_api_key: initial?.openrouter_api_key ?? "",
    openrouter_chat_model: initial?.openrouter_chat_model ?? "gpt-4",
    openrouter_embed_model:
      initial?.openrouter_embed_model ?? "text-embedding-3-small",
    system_prompt:
      initial?.system_prompt ??
      "You are a helpful assistant connected to RAG + WhatsApp integration.",
  });
  const [adminSecret] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await onSave(config, adminSecret);
      alert("✅ Configurações salvas com sucesso!");
    } catch (e: unknown) {
      console.error(e);
      alert("❌ Erro ao salvar: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
    }
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#fff",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    fontSize: "1rem",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141E30, #243B55)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "2rem",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: 700,
            background: "linear-gradient(to right, #00b894, #00cec9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1.5rem",
          }}
        >
          ⚙️ Painel de Configurações
        </h2>

        {/* Campo: OpenRouter API Key */}
        <label style={labelStyle}>OpenRouter API Key</label>
        <input
          type="password"
          value={config.openrouter_api_key ?? ""}
          onChange={(e) =>
            setConfig({ ...config, openrouter_api_key: e.target.value })
          }
          style={inputStyle}
        />

        <label style={labelStyle}>Modelo de Chat</label>
        <select
                value={config.openrouter_chat_model ?? "gpt-4"}
                onChange={(e) =>
                  setConfig({ ...config, openrouter_chat_model: e.target.value })
                }
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                {/* Add other options as needed */}
              </select>

              {/* Add other form fields here as needed */}

              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#00b894",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: "1rem",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Salvando..." : "Salvar Configurações"}
                        </button>
                      </div>
                    </div>
                  );
          }
