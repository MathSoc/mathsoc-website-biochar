import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Button } from "@/app/components/button/button";
import { Page } from "@/app/components/page/page-component";
import { Metadata } from "next";
import { Exam, listExamsAction, regenerateExamsListAction } from "./actions";
import React from "react";
import { TermNumberToString } from "./util";
import "./exam-bank.scss";

export const metadata: Metadata = { title: "Exam Bank" };

export default async function ExamBankPage() {
  const exams = await listExamsAction();

  return (
    <Page id="exam-bank-page">
      <Banner src="/img/banners/pinktie-mc.jpeg" variant="pink">
        <BannerTitles title="Exam Bank" />
      </Banner>
      <section className="table-section">
        <ExamsTable exams={exams} />

        {process.env.NODE_ENV == "development" ? (
          <Button action={regenerateExamsListAction} variant="pink">
            regenerate exams list (danger!)
          </Button>
        ) : null}
      </section>
    </Page>
  );
}

const ExamsTable: React.FC<{ exams: Exam[] }> = ({ exams }) => {
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
          <ExamRow exam={exam} key={exam.name} />
        ))}
      </tbody>
    </table>
  );
};

const ExamRow: React.FC<{ exam: Exam }> = ({ exam }) => {
  const [department, coursecode, term, ...typeParts] = exam.name.split("-");

  const name = `${department} ${coursecode}`;
  const type = typeParts.join(" ").split(".")[0];

  return (
    <tr key={`${exam.examUrl}{exam.solutionUrl}`}>
      <td className="exam-name">{name}</td>
      <td className="exam-term">{TermNumberToString(parseInt(term))}</td>
      <td className="exam-type">{type}</td>
      <td className="exam-url">
        {exam.examUrl ? (
          <Button href={exam.examUrl} variant="pink small">
            Exam
          </Button>
        ) : null}
      </td>
      <td className="exam-sol">
        {exam.solutionUrl ? (
          <Button href={exam.solutionUrl} variant="pink small">
            Solution
          </Button>
        ) : null}
      </td>
    </tr>
  );
};
