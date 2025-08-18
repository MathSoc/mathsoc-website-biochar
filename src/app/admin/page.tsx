import "./admin.scss";
import { Page } from "../components/page/page-component";
import { Button } from "../components/button/button";
import { regenerateExamsListAction } from "../util/exam-actions";
import { ExamsTable } from "../components/tables/exams-table/exams-table";
import { ExamUploads } from "./components/exam-uploads";

// @todo protect this page
export default function Home() {
  return (
    <Page id="admin-home">
      <h1>MathSoc Admin</h1>
      <h2>Add to exam bank</h2>
      <ExamUploads />
      <h2>Manage exam bank</h2>
      <ExamsTable isAdmin />
      <Button action={regenerateExamsListAction} variant="pink">
        regenerate exams list (danger!)
      </Button>
    </Page>
  );
}
