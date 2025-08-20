"use client";

import { termNumberToString } from "@/app/resources/exam-bank/util";
import { Button } from "../../button/button";
import { Button as ClientButton } from "../../button/button.client";
import "./exams-table.scss";
import {
  deleteExamAction,
  Exam,
  regenerateExamsListAction,
} from "@/app/util/exam-actions";
import { Column } from "../../layout/layout-components";
import { useCallback, useState } from "react";

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

            const onDeleteExam = () => {
              const newExam: Exam = { ...exam, examFile: undefined };
              const otherExams = exams.filter((e) => e !== exam);

              if (exam.solutionFile) {
                setExams([...otherExams, newExam]);
              } else {
                setExams(otherExams);
              }
            };

            const onDeleteSolution = () => {
              const newExam: Exam = { ...exam, solutionFile: undefined };
              const otherExams = exams.filter((e) => e !== exam);

              if (exam.examFile) {
                setExams([...otherExams, newExam]);
              } else {
                setExams(otherExams);
              }
            };

            return (
              <ExamRow
                exam={exam}
                key={exam.name}
                isAdmin={isAdmin}
                onDeleteExam={onDeleteExam}
                onDeleteSolution={onDeleteSolution}
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
  onDeleteExam: () => void;
  onDeleteSolution: () => void;
}> = ({ exam, isAdmin, onDeleteExam, onDeleteSolution }) => {
  const [department, coursecode, term, ...typeParts] = exam.name.split("-");

  const name = `${department} ${coursecode}`;
  const type = typeParts.join(" ").split(".")[0];

  console.log(exam);

  const onDelete = useCallback(
    (file: string) => {
      const confirmation = confirm(`Are you sure you want to delete ${file}?`);

      if (!confirmation) {
        return;
      }

      deleteExamAction(file);
      regenerateExamsListAction();

      if (file.includes("-sol")) {
        onDeleteSolution();
      } else {
        onDeleteExam();
      }

      // toast
    },
    [onDeleteExam, onDeleteSolution],
  );

  return (
    <tr key={`${exam.examFile}{exam.solutionUrl}`}>
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
            <Button href={exam.solutionFile} variant="pink" size="small">
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
