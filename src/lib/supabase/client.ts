import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        // Return a mock object or handle gracefully to prevent crash
        console.warn('Supabase keys missing. Client-side features may be limited.');
        return null as any;
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}
