import { Banner } from "@/app/components/banner/banner";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";

export default async function CndPage() {
  return (
    <Page>
      <Banner imgPath="/banners/board-games.jpeg" variant="pink">
        <h1>Today's Special: Chili</h1>
      </Banner>
      <MarkdownSection markdownFilePath="src/app/community/volunteer/overview.md" />
    </Page>
  );
}
