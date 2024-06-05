'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  // const { error } = await supabase.auth.signUp(data)

  const { user, session, error } = await supabase.auth.signUp({
    email: 'example@example.com',
    password: 'example-password',
  }, {
    sendConfirmationEmail: false
  });

  console.log('error:', error)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/notification')
}