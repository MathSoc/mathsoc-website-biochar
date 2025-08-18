import "./admin.scss";
import { Page } from "../components/page/page-component";
import { Button } from "../components/button/button";
import { regenerateExamsListAction } from "../util/exam-actions";
import { ExamsTable } from "../components/tables/exams-table/exams-table";

// @todo protect this page
export default function Home() {
  return (
    <Page id="admin-home">
      <h1>MathSoc Admin</h1>
      <h2>Exam bank</h2>
      <ExamsTable isAdmin />
      <Button action={regenerateExamsListAction} variant="pink">
        regenerate exams list (danger!)
      </Button>
    </Page>
  );
}
