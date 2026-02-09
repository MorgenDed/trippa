'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // validate fields
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const locale = (formData.get('locale') as string) || 'nl'

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/${locale}`, 'layout')
  redirect(`/${locale}`)
}

export async function loginWithProvider(provider: 'google' | 'facebook', locale: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/${locale}`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // validate fields
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const locale = (formData.get('locale') as string) || 'nl'
  
  // Use 'origin' from request headers if possible, or fallback to something default
  // In server actions we don't have direct access to request object unless passed or headers() used.
  // We can assume standard localhost or deployment URL if set in env, or rely on Supabase default.
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/${locale}`, 'layout')
  redirect(`/${locale}`)
}
