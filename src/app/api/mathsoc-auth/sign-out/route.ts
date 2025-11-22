import { NextRequest } from "next/server";
import { signOut } from "../../../../../auth";

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.searchParams.get("redirect_url");
  if (!redirectUrl) {
    throw new Error("No redirect URL given");
  }

  await signOut({
    redirectTo: decodeURIComponent(redirectUrl),
  });
}
