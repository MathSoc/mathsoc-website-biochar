import { Page } from "../../components/page/page-component";
import "./budgets.scss";
import { BudgetsTable } from "@/app/resources/budgets/components/budgets-table/budgets-table";
import { budgets } from "./budgets";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Budgets" };

export default async function BudgetsPage() {
  return (
    <Page id="budgets-page">
      <h1>Budgets</h1>
      <BudgetsTable budgets={budgets} />
    </Page>
  );
}
