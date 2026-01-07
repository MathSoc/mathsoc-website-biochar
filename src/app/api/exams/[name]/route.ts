import { NextResponse } from "next/server";
import { requireStudentAuthentication, withErrorHandling } from "../../utils";
import { fetchFromExamBankWorker } from "../../exam-bank-worker";

/**
 * Returns an exam found at the provided route
 */
export async function GET(
  _: Request,
  context: RouteContext<"/api/exams/[name]">,
): Promise<NextResponse> {
  return withErrorHandling(async () => {
    const session = await requireStudentAuthentication();

    const { params } = context;
    const examName = (await params).name;

    const res = await fetchFromExamBankWorker(session, {
      method: "get-exam",
      k: examName,
    });

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      },
    });
  });
}
