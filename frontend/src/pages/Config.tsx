// frontend/src/pages/Config.tsx
import React, { useEffect, useState } from 'react';
import ConfigForm from '../components/ConfigForm';
import { getConfig, saveConfig } from '../api';

type Config = object

export default function ConfigPage() {
  const [initial, setInitial] = useState<Config | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getConfig();
        setInitial(resp.data ?? null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSave(data: unknown, adminSecret: string): Promise<void> {
    await saveConfig(data, adminSecret);
    // reload
    const resp = await getConfig();
    setInitial(resp.data ?? null);
  }

  if (loading) return <div>Carregando configurações...</div>;

  return <ConfigForm initial={initial} onSave={handleSave} />;
}
