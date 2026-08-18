import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase env variables are missing. Using mock client.");
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: { message: "Mock client" } }),
        signUp: async () => ({ data: {}, error: { message: "Mock client" } }),
        signOut: async () => ({ error: null })
      },
      from: () => ({ select: () => ({ data: [], error: null }) })
    };
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
