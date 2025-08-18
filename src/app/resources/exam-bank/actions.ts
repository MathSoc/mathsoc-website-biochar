"use server";

import {
  put,
  list,
  ListBlobResult,
  ListBlobResultBlob,
  head,
  HeadBlobResult,
} from "@vercel/blob";

// @todo clean this up
import mockExamsList from "@/app/resources/exam-bank/mock-exams-list.json";

const EXAM_LIST_NAME = "exams-list.json";

export type ExamFile = {
  url: string;
  name: string;
  uploadedAt: string;
};

export type Exam = {
  name: string;
  uploadedAt: string;

  examUrl?: string;
  solutionUrl?: string;
};

export const listExamsAction = async (): Promise<Exam[]> => {
  if (process.env.NODE_ENV == "development") {
    return mockExamsList as Exam[];
  }

  console.warn(`Querying Vercel for exams list!`);

  const examListMetadata: HeadBlobResult = await head(EXAM_LIST_NAME);

  const exams: Exam[] = await fetch(examListMetadata.url).then((res) =>
    res.json(),
  );

  return exams;
};

// @todo protect this with authentication
// use sparingly; this is an advanced action and we get less of them for free.
export const regenerateExamsListAction = async (): Promise<Exam[]> => {
  if (process.env.NODE_ENV == "development") {
    throw new Error(`Do not regenerate the exam list on development!`);
  }

  const blobs = await fetchAllFiles();

  // get all individual exam files
  const unmatchedExams: ExamFile[] = blobs
    .filter((b) => b.pathname !== EXAM_LIST_NAME)
    .map((b) => ({
      url: b.url,
      name: b.pathname,
      uploadedAt: b.uploadedAt.toISOString(),
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

  // write to Vercel
  put(EXAM_LIST_NAME, JSON.stringify(exams), {
    access: "public",
    allowOverwrite: true,
  });

  console.info(`${exams.length} exams entered into ${EXAM_LIST_NAME}`);
  return exams;
};

const LIST_PAGINATION_LIMIT = 10; // arbitrarily chosen upper limit to prevent accidental infinite loops
const fetchAllFiles = async () => {
  let blobs: ListBlobResultBlob[] = [];
  let cursor: string | undefined = undefined;

  for (let i = 0; i < LIST_PAGINATION_LIMIT; i++) {
    const nextFileList: ListBlobResult = await list({ cursor });
    blobs = blobs.concat(nextFileList.blobs);

    if (!nextFileList.hasMore) {
      break;
    }

    cursor = nextFileList.cursor;
  }

  return blobs;
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

    examUrl: exam?.url,
    solutionUrl: solution?.url,
  };
};
