import "./admin.scss";
import { Page } from "../components/page/page-component";
import { Button } from "../components/button/button.server";
import { regenerateExamsListAction } from "./actions";
import { ExamsTable } from "./components/exams-table/exams-table";
import { ExamUploads } from "./components/exam-uploads/exam-uploads";
import { Centered } from "../components/layout/layout-components";

// @todo protect this page
export default function Home() {
  return (
    <Page id="admin-page" size="large">
      <h1>MathSoc Admin</h1>
      <h2>Add to exam bank</h2>
      <ExamUploads />
      <h2>Manage exam bank</h2>
      <ExamsTable isAdmin />
      <Centered>
        {/* @todo remove this and make it automatic */}
        <Button action={regenerateExamsListAction} variant="pink">
          Regenerate exams list (danger!)
        </Button>
      </Centered>
    </Page>
  );
}
