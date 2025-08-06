import { Page } from "../../components/page/page-component";
import "./budgets.scss";
import { BudgetsTable } from "@/app/components/budgets-table/budgets-table";
import { budgets } from "./budgets";

export default async function BudgetsPage() {
  return (
    <Page id="budgets-page">
      <h1>Budgets</h1>
      <BudgetsTable budgets={budgets} />
    </Page>
  );
}
