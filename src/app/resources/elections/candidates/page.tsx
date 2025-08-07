import { Page } from "@/app/components/page/page-component";
import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";

export default async function CandidatesPage() {
  return (
    <Page id="candidates-page">
      <MarkdownSection src="src/app/resources/elections/candidates/candidates.md" />
    </Page>
  );
}
