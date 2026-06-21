import { NextResponse } from "next/server";

const POLICY_TYPES = ["policies", "board-procedures", "bylaws"];

export async function GET(
  _: Request,
  context: RouteContext<"/api/resources/policies/[type]">,
): Promise<Response> {
  const { type } = await context.params;

  if (!POLICY_TYPES.includes(type)) {
    return NextResponse.json({ error: "Unknown policy type" }, { status: 404 });
  }

  const res = await fetch(
    `https://github.com/MathSoc/mathSocDocuments/releases/download/latest-docs/${type}-public.pdf`,
    {},
  );

  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
