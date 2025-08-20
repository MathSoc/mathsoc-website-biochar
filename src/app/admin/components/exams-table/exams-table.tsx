import "./exams-table.scss";
import { listExamsAction } from "@/app/util/exam-actions";
import { ExamsTableClient } from "./exams-table-client";

export const ExamsTable: React.FC<{ isAdmin?: boolean }> = async ({
  isAdmin = false,
}) => {
  const exams = await listExamsAction();

  return <ExamsTableClient exams={exams} isAdmin={isAdmin} />;
};
