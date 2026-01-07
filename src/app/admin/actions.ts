"use server";

import mockExamsList from "./components/util/mock-exams-list.json";
import { Exam } from "./types";
import { fetchFromExamBankWorker } from "../api/exam-bank-worker";
import { protectToAdmins, protectToStudents } from "../auth.actions";

const shouldUseMockData = () => {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  return process.env.USE_LIVE_DATA_ON_DEV === "true";
};

export const listExamsAction = async (): Promise<Exam[]> => {
  if (shouldUseMockData()) {
    return mockExamsList as Exam[];
  }

  const session = await protectToStudents("/resources/exam-bank");
  const res = await fetchFromExamBankWorker(session, {
    method: "list-exams",
    uid: session.user?.email,
  });

  const { exams } = JSON.parse(await res.text());
  return exams;
};

export const postExamsAction = async (formData: FormData) => {
  const session = await protectToAdmins("/admin");

  const res = await fetchFromExamBankWorker(
    session,
    {
      method: "upload-exams",
    },
    { body: formData, method: "POST" },
  );

  const { exams } = JSON.parse(await res.text());
  return exams;
};

export const deleteExamAction = async (file: string): Promise<Exam[]> => {
  const session = await protectToAdmins("/admin");

  const res = await fetchFromExamBankWorker(
    session,
    {
      method: "delete-exam",
      k: file,
    },
    { method: "DELETE" },
  );

  const { exams } = JSON.parse(await res.text());
  return exams;
};
