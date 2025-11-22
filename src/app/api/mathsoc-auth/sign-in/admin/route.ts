import { NextRequest } from "next/server";
import { signInFromRequest } from "../util";

export async function GET(request: NextRequest) {
  await signInFromRequest(request, "google");
}
