import { boardMeetings } from "@/app/resources/meetings/board-meetings";
import { councilMeetings } from "@/app/resources/meetings/council-meetings";
import { generalMeetings } from "@/app/resources/meetings/general-meetings";
import { NextResponse } from "next/server";
import { withErrorHandling } from "../utils";

/**
 * Returns all MathSoc meetings. Used by some external services to crawl MathSoc minutes documents.
 */
export async function GET(): Promise<NextResponse> {
  return withErrorHandling(async () => {
    return new NextResponse(
      {
        boardMeetings,
        councilMeetings,
        generalMeetings,
      },
      {
        status: 200,
      },
    );
  });
}
