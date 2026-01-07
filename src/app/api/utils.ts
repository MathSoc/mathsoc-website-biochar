import { NextResponse } from "next/server";
import { HTTPError, UnauthorizedError } from "./errors";
import { Session } from "next-auth";
import { auth } from "../../../auth";
import { isAuthDisabled } from "../auth.actions";

export const requireStudentAuthentication = async (): Promise<Session> => {
  if (await isAuthDisabled()) {
    return { expires: new Date(2077).toISOString() };
  }

  const session = await auth();
  if (!session) {
    throw new UnauthorizedError();
  }

  return session;
};

export const withErrorHandling = async (
  fn: () => Promise<NextResponse>,
): Promise<NextResponse> => {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof HTTPError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    } else {
      throw e;
    }
  }
};
