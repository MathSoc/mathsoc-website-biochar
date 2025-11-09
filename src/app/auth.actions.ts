"use server";

import { Session } from "next-auth";
import { auth, isAuthDisabled, signIn, signOut } from "../../auth";

export const isAdmin = async (session: Session | null) => {
  return session?.user?.email?.includes?.("mathsoc.uwaterloo.ca");
};

export const protectToStudents = async (): Promise<Session> => {
  if (isAuthDisabled()) {
    console.warn("⚠️ Skipping UW authentication");
  }

  const session = await auth();
  if (!session) {
    await signIn("uw-adfs");
    throw new Error("unreachable");
  }

  return session;
};

export const protectToAdmins = async (): Promise<Session> => {
  if (isAuthDisabled()) {
    console.warn("⚠️ Skipping admin authentication");
  }

  const session = await auth();
  if (!session) {
    await signIn("google");
    throw new Error("unreachable");
  }

  if (!isAdmin(session)) {
    await signOut();
    throw new Error("unreachable");
  }

  return session;
};
