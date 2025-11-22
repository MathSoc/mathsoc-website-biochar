"use server";

import { Session } from "next-auth";
import { auth } from "../../auth";
import c from "ansi-colors";
import { redirect } from "next/navigation";

export const isAuthDisabled = async (): Promise<boolean> => {
  const isDisabled = process.env.AUTH_DISABLED === "true";

  if (process.env.NODE_ENV !== "development") {
    if (isDisabled) {
      throw new Error(`Cannot disable auth on production`);
    }

    return isDisabled;
  }

  if (isDisabled) {
    c.yellow(" ! MathSoc authentication DISABLED");
  } else {
    c.green(" ✓ MathSoc authentication enabled");
  }

  return isDisabled;
};

export const isAuthEnabled = async (): Promise<boolean> =>
  isAuthDisabled().then((res: boolean) => !res);

export const isAdmin = async (session: Session | null) => {
  return session?.user?.email?.includes?.("mathsoc.uwaterloo.ca");
};

// @todo de-duplicate this with the equivalent function in api/utils.
export async function protectToStudents(currentURL: string): Promise<Session> {
  if (await isAuthDisabled()) {
    console.warn("⚠️ Skipping UW authentication");
    return { expires: new Date(2077, 8, 13).toISOString() };
  }

  const session = await auth();
  if (!session) {
    redirect(
      `/api/mathsoc-auth/sign-in/student?redirect_url=${encodeURIComponent(currentURL)}`,
    );
  }

  return session;
}

export async function protectToAdmins(currentURL: string): Promise<Session> {
  if (await isAuthDisabled()) {
    console.warn("⚠️ Skipping admin authentication");
    return {
      expires: new Date(2077, 8, 13).toISOString(),
      user: { email: "localdev.admin@mathsoc.uwaterloo.ca" },
    };
  }

  const session = await auth();
  if (!session) {
    redirect(
      `/api/mathsoc-auth/sign-in/admin?redirect_url=${encodeURIComponent(currentURL)}`,
    );
  }

  if (!(await isAdmin(session))) {
    redirect(
      `/api/mathsoc-auth/sign-out/?redirect_url=${encodeURIComponent(currentURL)}`,
    );
  }

  return session;
}
