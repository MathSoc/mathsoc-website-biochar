"use client";

import { termNumberToString } from "@/app/resources/exam-bank/util";
import { Button } from "../../button/button";
import "./exams-table.scss";
import { Exam, voidAction } from "@/app/util/exam-actions";
import { Column } from "../../layout/layout-components";
import { useState } from "react";

export const ExamsTableClient: React.FC<{
  isAdmin?: boolean;
  exams: Exam[];
}> = ({ isAdmin = false, exams }) => {
  const [query, setQuery] = useState<string>("");

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

            return <ExamRow exam={exam} key={exam.name} isAdmin={isAdmin} />;
          })}
        </tbody>
      </table>
    </Column>
  );
};

const ExamRow: React.FC<{ exam: Exam; isAdmin: boolean }> = ({
  exam,
  isAdmin,
}) => {
  const [department, coursecode, term, ...typeParts] = exam.name.split("-");

  const name = `${department} ${coursecode}`;
  const type = typeParts.join(" ").split(".")[0];

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
              <>
                <Button action={voidAction} variant="pink" size="small">
                  Hide exam
                </Button>
                <Button action={voidAction} variant="pink" size="small">
                  Delete exam
                </Button>
              </>
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
              <>
                <Button action={voidAction} variant="pink" size="small">
                  Hide solution
                </Button>
                <Button action={voidAction} variant="pink" size="small">
                  Delete solution
                </Button>
              </>
            ) : null}
          </>
        ) : null}
      </td>
    </tr>
  );
};
