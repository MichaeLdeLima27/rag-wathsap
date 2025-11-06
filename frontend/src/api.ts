// frontend/src/api.ts
export const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function getConfig() {
  const res = await fetch(`${API_BASE}/api/config`);
  if (!res.ok) throw new Error('Failed to fetch config');
  return res.json();
}

export async function saveConfig(payload: unknown, adminSecret: string) {
  const res = await fetch(`${API_BASE}/api/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to save config: ${text}`);
  }
  return res.json();
}
