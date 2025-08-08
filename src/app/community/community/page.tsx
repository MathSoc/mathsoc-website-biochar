import { Page } from "@/app/components/page/page-component";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";

export default async function CommunityPage() {
  return (
    <Page id="community-page">
      <MarkdownSection src="src/app/community/community/community.md" />
    </Page>
  );
}
