import { Metadata } from "next";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./forms.scss";

export const metadata: Metadata = { title: "Forms" };

export default async function FormsPage() {
  return (
    <Page id="forms-page">
      <MarkdownSection src="src/app/resources/forms/forms.md" />
    </Page>
  );
}
