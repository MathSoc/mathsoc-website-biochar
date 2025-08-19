"use server";

import { EXAMS_BUCKET_NAME } from "./exam-config";
import mockExamsList from "./mock-exams-list.json";
import { Storage } from "@google-cloud/storage";

const EXAM_LIST_NAME = "exams-list.json";

export type ExamFile = {
  name: string;
  uploadedAt: string;
};

export type Exam = {
  name: string;
  uploadedAt: string;

  examFile?: string;
  solutionFile?: string;
};

export const voidAction = async () => {};

const storage = new Storage();

export const listExamsAction = async (): Promise<Exam[]> => {
  if (process.env.NODE_ENV == "development") {
    return mockExamsList as Exam[];
  }

  console.warn(`Querying Google for exams list!`);
  const examList = await storage
    .bucket(EXAMS_BUCKET_NAME)
    .file(EXAM_LIST_NAME)
    .download()
    .then((res) => res.toString());

  return JSON.parse(examList);
};

// @todo protect this with authentication
// use sparingly; this is an advanced action and we get less of them for free.
export const regenerateExamsListAction = async (): Promise<Exam[]> => {
  if (process.env.NODE_ENV == "development") {
    throw new Error(`Do not regenerate the exam list on development!`);
  }

  // get all individual exam files
  const [examFiles] = await storage.bucket(EXAMS_BUCKET_NAME).getFiles();

  const unmatchedExams: ExamFile[] = examFiles.map((file) => ({
    name: file.name,
    uploadedAt: file.metadata.timeCreated!,
  }));

  // group by most of the exam name, minus whether they are solutions or not
  const fileGroups = Object.groupBy(unmatchedExams, (exam) =>
    exam.name.replace("-sol", ""),
  );

  // merge solution file, exam file, into one Exam object
  const exams: Exam[] = Object.entries(fileGroups).map(([examName, files]) => {
    // identify exam file, solution file, based on whether they have "-sol" in their name
    const exam: ExamFile | undefined = files!.filter(
      (file) => !file.name.includes("-sol"),
    )[0];
    const solution: ExamFile | undefined = files!.filter((file) =>
      file.name.includes("-sol"),
    )[0];

    return mergeExamAndSolution(examName, exam, solution);
  });

  // write to Google
  await storage
    .bucket(EXAMS_BUCKET_NAME)
    .file(EXAM_LIST_NAME)
    .save(JSON.stringify(exams));

  console.info(`${exams.length} exams entered into ${EXAM_LIST_NAME}`);
  return exams;
};

const mergeExamAndSolution = (
  name: string,
  exam?: ExamFile,
  solution?: ExamFile,
) => {
  const uploadedAt = [exam, solution]!
    .filter((f) => !!f)
    .map((f) => f.uploadedAt)
    .reduce((latestDate, date) =>
      new Date(latestDate) < new Date(date) ? date : latestDate,
    );

  return {
    name,
    uploadedAt,

    examUrl: exam?.name,
    solutionUrl: solution?.name,
  };
};
