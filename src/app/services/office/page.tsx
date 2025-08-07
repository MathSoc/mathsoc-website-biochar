import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./office.scss";

export default async function CndPage() {
  return (
    <Page id="cnd-page">
      <Banner src="/img/banners/board-games.jpeg" variant="pink">
        <BannerTitles pretitle="The MathSoc Office" title="MC 3038" />
      </Banner>
      <MarkdownSection src="src/app/services/office/office.md" />
    </Page>
  );
}
