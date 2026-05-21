"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/dashboard");

  if (!email || !password) {
    return redirect(`/login?error=${encodeURIComponent("Preencha e-mail e senha")}`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const msg = error.message.includes("Invalid")
      ? "E-mail ou senha incorretos"
      : error.message;
    return redirect(`/login?error=${encodeURIComponent(msg)}`);
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
