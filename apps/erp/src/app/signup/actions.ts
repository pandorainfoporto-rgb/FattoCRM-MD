"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signupAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();

  if (!email || !password || !nome) {
    return redirect(`/signup?error=${encodeURIComponent("Preencha todos os campos")}`);
  }
  if (password.length < 8) {
    return redirect(`/signup?error=${encodeURIComponent("Senha deve ter pelo menos 8 caracteres")}`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nome },
    },
  });

  if (error) {
    const msg = error.message.includes("already")
      ? "Esse e-mail já tem conta. Tenta entrar."
      : error.message;
    return redirect(`/signup?error=${encodeURIComponent(msg)}`);
  }

  revalidatePath("/", "layout");
  // Após signup, vai pro onboarding ativar o primeiro tenant.
  redirect("/onboarding");
}
