import { EXAMS_BUCKET_NAME } from "@/app/admin/components/util/exam-config";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

const storage = new Storage();

type NameMapping = { originalFileName: string; constructedFileName: string };

/**
 * Uploads the exams found at the provided route
 *
 * @todo add (google) auth to this
 */
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const files = data.getAll("files") as File[];
    const namesMap = JSON.parse(data.get("names")!.toString()) as NameMapping[];

    for (const { originalFileName, constructedFileName } of namesMap) {
      const file = files.find((f) => f.name === originalFileName);
      if (!file) {
        throw new Error(`Could not find file ${originalFileName}`);
      }

      await storage
        .bucket(EXAMS_BUCKET_NAME)
        .file(constructedFileName)
        .save(Buffer.from(await file.arrayBuffer()));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to post file" }, { status: 500 });
  }
}
