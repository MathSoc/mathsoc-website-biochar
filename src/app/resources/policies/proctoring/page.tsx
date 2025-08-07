import { Page } from "@/app/components/page/page-component";
import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";

export default async function ProctoringPage() {
  return (
    <Page id="proctoring-page">
      <MarkdownSection src="src/app/resources/policies/proctoring/proctoring.md" />
    </Page>
  );
}
