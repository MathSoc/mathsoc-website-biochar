"use client";

import { termNumberToString } from "@/app/resources/exam-bank/util";
import { Button } from "../../../components/button/button.server";
import { Button as ClientButton } from "../../../components/button/button.client";
import "./exams-table.scss";
import { deleteExamAction } from "@/app/admin/actions";
import { Column } from "../../../components/layout/layout-components";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Exam } from "../../types";

export const ExamsTableClient: React.FC<{
  isAdmin?: boolean;
  exams: Exam[];
}> = ({ isAdmin = false, exams: initialExams }) => {
  const [query, setQuery] = useState<string>("");
  const [exams, setExams] = useState<Exam[]>(initialExams);

  const examMatchesQuery = (exam: Exam) => {
    return (
      query === "" ||
      exam.name
        .toLowerCase()
        .replaceAll(/\s/g, "-")
        .includes(query.toLowerCase().replace(/\s/g, "-"))
    );
  };

  return (
    <Column className="exams-table-container">
      <input
        className="exams-query"
        placeholder="CS 452"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="exams-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Type</th>
            <th>Offering</th>
            <th>Exam</th>
            <th>Solutions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => {
            if (!examMatchesQuery(exam)) {
              return null;
            }

            return (
              <ExamRow
                exam={exam}
                key={exam.name}
                isAdmin={isAdmin}
                setExams={setExams}
              />
            );
          })}
        </tbody>
      </table>
    </Column>
  );
};

const ExamRow: React.FC<{
  exam: Exam;
  isAdmin: boolean;
  setExams: (exams: Exam[]) => void;
}> = ({ exam, isAdmin, setExams }) => {
  const [department, coursecode, term, ...typeParts] = exam.name.split("-");

  const name = `${department} ${coursecode}`;
  const type = typeParts.join(" ").split(".")[0];

  const onDelete = useCallback(
    async (file: string) => {
      const confirmation = confirm(`Are you sure you want to delete ${file}?`);

      if (!confirmation) {
        return;
      }

      const updatedList = await deleteExamAction(file);
      setExams(updatedList);

      toast(`${file} deleted successfully`);
    },
    [setExams],
  );

  return (
    <tr key={`${exam.examFile}{exam.solutionFile}`}>
      <td className="exam-name">{name}</td>
      <td className="exam-term">{termNumberToString(parseInt(term))}</td>
      <td className="exam-type">{type}</td>
      <td className="exam-url">
        {exam.examFile ? (
          <>
            <Button
              href={`/api/exams/${exam.examFile}`}
              variant="pink"
              size="small"
              prefetch={false}
            >
              {isAdmin ? "See exam" : "Exam"}
            </Button>

            {isAdmin ? (
              <ClientButton
                onClick={() => onDelete(exam.examFile!)}
                variant="pink"
                size="small"
              >
                Delete exam
              </ClientButton>
            ) : null}
          </>
        ) : null}
      </td>
      <td className="exam-sol">
        {exam.solutionFile ? (
          <>
            <Button
              href={`/api/exams/${exam.solutionFile}`}
              variant="pink"
              size="small"
              prefetch={false}
            >
              {isAdmin ? "See solution" : "Solution"}
            </Button>

            {isAdmin ? (
              <ClientButton
                onClick={() => onDelete(exam.solutionFile!)}
                variant="pink"
                size="small"
              >
                Delete solution
              </ClientButton>
            ) : null}
          </>
        ) : null}
      </td>
    </tr>
  );
};
