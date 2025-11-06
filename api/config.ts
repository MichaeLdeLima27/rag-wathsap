// api/config.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1)
        .single()
      if (error && error.code !== 'PGRST116')
        return res.status(500).json({ error: error.message })
      return res.status(200).json({ data: data || null })
    }

    if (req.method === 'POST') {
      // require admin secret header for write
      const adminSecret =
        req.headers['x-admin-secret'] || req.body?.admin_secret
      if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return res
          .status(403)
          .json({ error: 'Forbidden: invalid admin secret' })
      }

      const payload = {
        openrouter_api_key: req.body.openrouter_api_key ?? null,
        openrouter_chat_model: req.body.openrouter_chat_model ?? null,
        openrouter_embed_model: req.body.openrouter_embed_model ?? null,
        system_prompt: req.body.system_prompt ?? null,
        updated_at: new Date().toISOString()
      }

      // upsert into app_settings (id = 1)
      const { error } = await supabase
        .from('app_settings')
        .upsert([{ id: 1, ...payload }])
      if (error) return res.status(500).json({ error: error.message })

      return res.status(200).json({ ok: true, data: payload })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || String(err) })
  }
}
