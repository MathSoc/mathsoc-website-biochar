import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";

export default async function CouncilPage() {
  return (
    <Page>
      <MarkdownSection markdownFilePath="src/app/community/governance/council.md" />
    </Page>
  );
}
