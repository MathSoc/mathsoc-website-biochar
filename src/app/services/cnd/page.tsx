import { Banner } from "@/app/components/banner/banner";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./cnd.scss";
import { Metadata } from "next";
import { TodaysSpecial } from "./todays-special-display";

export const metadata: Metadata = { title: "CnD" };

export default async function CndPage() {
  return (
    <Page id="cnd-page" variant="pink">
      <Banner src="/img/banners/cnd.jpg" variant="pink" size="large">
        <TodaysSpecial />
      </Banner>
      <MarkdownSection src="src/app/services/cnd/cnd.md" />
    </Page>
  );
}
