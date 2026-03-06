import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/**
 * Returns a singleton Supabase browser client for the docs site.
 * Uses cookies with domain `.suprvisr.ai` in production so the session
 * is shared with app.suprvisr.ai / cumulus.suprvisr.ai automatically.
 */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  client = createBrowserClient(url, key, {
    cookieOptions: {
      domain: process.env.NODE_ENV === 'production' ? '.suprvisr.ai' : undefined,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    },
  })

  return client
}
