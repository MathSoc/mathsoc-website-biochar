import { Page } from "@/app/components/page/page-component";
import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Election Results" };

export default async function ResultsPage() {
  return (
    <Page id="candidates-page">
      <MarkdownSection src="src/app/resources/elections/results/results.md" />
    </Page>
  );
}
