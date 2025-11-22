import "./admin.scss";
import { Page } from "../components/page/page-component";
import { ExamsTable } from "./components/exams-table/exams-table";
import { ExamUploads } from "./components/exam-uploads/exam-uploads";
import { protectToAdmins } from "../auth.actions";

export default async function Admin() {
  const session = await protectToAdmins("/admin");

  return (
    <Page id="admin-page" size="large">
      <h1>MathSoc Admin</h1>
      <p>Hello {session.user?.name ?? "mathie"},</p>
      <h2>Add to exam bank</h2>
      <ExamUploads />
      <h2>Manage exam bank</h2>
      <ExamsTable isAdmin />
    </Page>
  );
}
