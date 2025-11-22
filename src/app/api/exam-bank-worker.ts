import { Session } from "next-auth";
import { ConfigurationError, ExamBankError } from "./errors";
import crypto from "crypto";

export const fetchFromExamBankWorker = async (
  session: Session,
  payload: {
    method: string;
    [argument: string]: unknown; // payload takes any number of additional params
  },
  init: RequestInit = {},
): Promise<Response> => {
  const url = getExamBankWorkerURL({ uid: session.user?.email, ...payload });

  const res = await fetch(url.toString(), init);
  if (!res.ok) {
    console.error(`Exam bank threw an error: ${await res.text()}`);
    throw new ExamBankError();
  }

  return res;
};

const getExamBankWorkerURL = (payload: object): URL => {
  const token = encodeMessage(payload);

  const hostname = process.env.EXAM_BANK_WORKER_HOSTNAME;
  if (!hostname) {
    throw new ConfigurationError("No exam bank worker hostname set");
  }

  const url = new URL(hostname);
  url.searchParams.set("t", token);

  return url;
};

const encodeMessage = (payload: object) => {
  const msg = Buffer.from(JSON.stringify(payload));
  const sig = crypto
    .createHmac("sha256", Buffer.from(getSigningSecret()))
    .update(msg)
    .digest();

  return `${bytesToHex(msg)},${bytesToHex(sig)}`;
};

const getSigningSecret = (): string => {
  const signingSecret = process.env.EXAM_BANK_WORKER_SIGNING_SECRET;
  if (!signingSecret) {
    throw new ConfigurationError("Missing secret");
  }
  return signingSecret;
};

const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
