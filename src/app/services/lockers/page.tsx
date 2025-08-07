import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import { Page } from "@/app/components/page/page-component";

export default async function LockersPage() {
  return (
    <Page id="lockers-page">
      <MarkdownSection src="src/app/services/lockers/lockers.md" />
    </Page>
  );
}
