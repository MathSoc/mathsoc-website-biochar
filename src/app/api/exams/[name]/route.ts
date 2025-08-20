import { EXAMS_BUCKET_NAME } from "@/app/admin/components/util/exam-config";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

const storage = new Storage();

/**
 * Returns an exam found at the provided route
 *
 * @todo add auth to this
 */
export async function GET(
  _: Request,
  { params }: { params: { name: string } },
) {
  try {
    const file = storage.bucket(EXAMS_BUCKET_NAME!).file((await params).name);

    const [contents] = await file.download();

    return new NextResponse(new Uint8Array(contents), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
  }
}
