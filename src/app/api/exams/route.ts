import { NextResponse } from "next/server";
import { requireStudentAuthentication, withErrorHandling } from "../utils";
import { fetchFromExamBankWorker } from "../exam-bank-worker";

/**
 * Returns an exam found at the provided route
 */
export async function GET(): Promise<NextResponse> {
  return withErrorHandling(async () => {
    const session = await requireStudentAuthentication();

    const res = await fetchFromExamBankWorker(session, {
      method: "list-exams",
    });

    return new NextResponse(res.body, {
      status: 200,
    });
  });
}
