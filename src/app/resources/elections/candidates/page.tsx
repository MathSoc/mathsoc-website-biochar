import { Page } from "@/app/components/page/page-component";
import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Election Candidates" };

export default async function CandidatesPage() {
  return (
    <Page id="candidates-page">
      <MarkdownSection src="src/app/resources/elections/candidates/candidates.md" />
    </Page>
  );
}
