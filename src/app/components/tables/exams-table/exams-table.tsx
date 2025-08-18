import { termNumberToString } from "@/app/resources/exam-bank/util";
import { Button } from "../../button/button";
import "./exams-table.scss";
import { Exam, listExamsAction, voidAction } from "@/app/util/exam-actions";

export const ExamsTable: React.FC<{ isAdmin?: boolean }> = async ({
  isAdmin = false,
}) => {
  const exams = await listExamsAction();

  return (
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
        {exams.map((exam) => (
          <ExamRow exam={exam} key={exam.name} isAdmin={isAdmin} />
        ))}
      </tbody>
    </table>
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
    <tr key={`${exam.examUrl}{exam.solutionUrl}`}>
      <td className="exam-name">{name}</td>
      <td className="exam-term">{termNumberToString(parseInt(term))}</td>
      <td className="exam-type">{type}</td>
      <td className="exam-url">
        {exam.examUrl ? (
          <>
            <Button href={exam.examUrl} variant="pink" size="small">
              Exam
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
        {exam.solutionUrl ? (
          <>
            <Button href={exam.solutionUrl} variant="pink" size="small">
              Solution
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
