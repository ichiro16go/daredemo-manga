"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AuthFormState } from "@/app/login/actions";

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (password.length < 8) {
    return { error: "パスワードは8文字以上で入力してください。" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return { error: "このメールアドレスは既に登録されています。" };
    }
    return { error: "登録に失敗しました。時間をおいて再度お試しください。" };
  }

  redirect("/");
}
