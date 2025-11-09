"use server";

import { Session } from "next-auth";
import { auth } from "../../auth";
import c from "ansi-colors";
import { redirect } from "next/navigation";

export const isAuthDisabled = async (): Promise<boolean> => {
  const isDisabled = process.env.AUTH_DISABLED === "true";

  if (isDisabled) {
    c.yellow(" ! MathSoc authentication DISABLED");
  } else {
    c.green(" ✓ MathSoc authentication enabled");
  }

  return isDisabled;
};

export const isAdmin = async (session: Session | null) => {
  return session?.user?.email?.includes?.("mathsoc.uwaterloo.ca");
};

export async function protectToStudents(): Promise<Session> {
  if (await isAuthDisabled()) {
    console.warn("⚠️ Skipping UW authentication");
  }

  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin/uw-adfs");
  }

  return session;
}

export async function protectToAdmins(): Promise<Session> {
  if (await isAuthDisabled()) {
    console.warn("⚠️ Skipping admin authentication");
  }

  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin/google");
  }

  if (!(await isAdmin(session))) {
    redirect("/api/auth/signout");
  }

  return session;
}
