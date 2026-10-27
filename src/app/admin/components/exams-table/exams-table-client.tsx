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

  // ADDED: Remember the user's filter choices.
  // An empty string means "show all".
  const [term, setTerm] = useState("");
  const [year, setYear] = useState("");
  const [hasBoth, setHasBoth] = useState(false);

  // ADDED: Remember which date order the user wants.
  const [sortOrder, setSortOrder] = useState("newest");

  const examMatchesQuery = (exam: Exam) => {
    return (
      query === "" ||
      exam.name
        .toLowerCase()
        .replaceAll(/\s/g, "-")
        .includes(query.toLowerCase().replace(/\s/g, "-"))
    );
  };

    // ADDED: Build the year dropdown from the exams we actually have.
  const years = exams.map((exam) => {
    // Filenames follow: department-course-term-type (e.g. math-135-1259-final).
    // Array positions start at 0, so [2] gives us the term code.
    const termCode = Number(exam.name.split("-")[2]);

    return 1900 + Math.floor(termCode / 10);
  });

  // Set removes repeated years. Sort puts the newest year first.
  const availableYears = [...new Set(years)].sort((a, b) => b - a);

  // ADDED: Apply all filters before displaying the rows.
  const filteredExams = exams
    .filter((exam) => {
      const termCode = Number(exam.name.split("-")[2]);

      // Example: 1259 becomes year 2025 and term 9 (Fall).
      const examYear = 1900 + Math.floor(termCode / 10);
      const examTerm = termCode % 10;

      // Each condition must pass for this exam to appear.
      return (
        examMatchesQuery(exam) &&
        (term === "" || examTerm === Number(term)) &&
        (year === "" || examYear === Number(year)) &&
        (!hasBoth || Boolean(exam.examFile && exam.solutionFile))
      );
    })
    .sort((a, b) => {
      const termA = Number(a.name.split("-")[2]);
      const termB = Number(b.name.split("-")[2]);

      // Larger term codes are more recent.
      // Sort according to the dropdown selection.
      return sortOrder === "newest" ? termB - termA : termA - termB;
    });

  return (
    <Column className="exams-table-container">
      <input
        className="exams-query"
        placeholder="CS 452"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* ADDED: Changing a control updates its state above.
          React then updates the filtered results automatically. */}
      <div className="exams-filters">
        {/* ADDED: Choose the date order. */}
        <label>
          Sort by{" "}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
        
        <label>
          Term{" "}
          <select value={term} onChange={(e) => setTerm(e.target.value)}>
            <option value="">All terms</option>
            {/* These values match the last digit of a term code. */}
            <option value="9">Fall</option>
            <option value="1">Winter</option>
            <option value="5">Spring</option>
          </select>
        </label>

        <label>
          Year{" "}
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All years</option>
            {availableYears.map((availableYear) => (
              <option key={availableYear} value={availableYear}>
                {availableYear}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={hasBoth}
            onChange={(e) => setHasBoth(e.target.checked)}
          />
          {" "}Has exam + solutions
        </label>
      </div>

      <table className="exams-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Term</th>
            <th>Assessment type</th>
            <th>Exam</th>
            <th>Solutions</th>
          </tr>
        </thead>
        <tbody>
          {/* CHANGED: Display the results after filtering and sorting. */}
          {filteredExams.map((exam) => (
            <ExamRow
              exam={exam}
              key={exam.name}
              isAdmin={isAdmin}
              setExams={setExams}
            />
          ))}
        
          {filteredExams.length === 0 && (
            <tr>
              <td colSpan={5}>
                No exams match. Try changing your search or filters.
              </td>
            </tr>
          )}
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
