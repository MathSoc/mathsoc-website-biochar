export type ExamFile = {
  name: string;
  uploadedAt: string;
};

export type Exam = {
  name: string;

  examFile?: string;
  solutionFile?: string;
};
