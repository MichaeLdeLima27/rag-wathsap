import React, { useState, useEffect } from "react";
import axios from "axios";

interface DocumentItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export default function DocumentManager() {
  const [files, setFiles] = useState<DocumentItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function fetchDocuments() {
    const res = await axios.get("/api/documents");
    setFiles(res.data);
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function handleUpload() {
    if (!selectedFile) {
      alert("Selecione um arquivo primeiro.");
      return;
    }

    const allowed = ["application/pdf", "text/plain", "text/markdown"];
    if (!allowed.includes(selectedFile.type)) {
      alert("Tipo de arquivo inválido. Apenas PDF, TXT ou MD são permitidos.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);
    try {
      await axios.post("/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Arquivo enviado com sucesso!");
      setSelectedFile(null);
      fetchDocuments();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar arquivo.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja realmente excluir este documento?")) return;
    await axios.delete(`/api/documents/${id}`);
    fetchDocuments();
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "white",
        padding: "2rem",
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2563eb" }}>📄 Gerenciador de Documentos (RAG)</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          gap: 10,
        }}
      >
        <input
          type="file"
          accept=".pdf,.txt,.md"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {uploading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      <h3 style={{ marginTop: 30 }}>📚 Documentos Enviados</h3>
      {files.length === 0 ? (
        <p style={{ color: "#666" }}>Nenhum documento enviado ainda.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 10,
          }}
        >
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Nome</th>
              <th>Tamanho</th>
              <th>Tipo</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "8px" }}>{f.name}</td>
                <td style={{ textAlign: "center" }}>
                  {(f.size / 1024).toFixed(1)} KB
                </td>
                <td style={{ textAlign: "center" }}>{f.type}</td>
                <td style={{ textAlign: "center" }}>
                  {new Date(f.uploadedAt).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(f.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
