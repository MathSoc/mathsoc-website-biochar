"use server";

import { signIn } from "@/../auth";

export async function CustomSignIn() {
  "use server";
  await signIn("google");
}
