import { NextRequest } from "next/server";
import { signIn } from "../../../../../auth";

export async function signInFromRequest(
  request: NextRequest,
  provider: "uw-adfs" | "google",
) {
  const redirectUrl = request.nextUrl.searchParams.get("redirect_url");
  if (!redirectUrl) {
    throw new Error("No redirect URL given");
  }

  await signIn(provider, {
    redirectTo: decodeURIComponent(redirectUrl),
  });
}
