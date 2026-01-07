import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Page } from "../../components/page/page-component";
import "./advocacy.scss";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { Metadata } from "next";
import {
  DocumentCard,
  DocumentCardRow,
} from "@/app/components/documents-card/document-card";

export const metadata: Metadata = { title: "Advocacy" };

export default async function AdvocacyPage() {
  return (
    <Page id="stances-page">
      <Banner src="/img/banners/mathsoc-wall.jpeg" variant="pink">
        <BannerTitles title="Advocacy" />
      </Banner>
      <DocumentCardRow>
        <DocumentCard
          icon={faEye}
          name="On Proctoring Software"
          path="/resources/advocacy/proctoring"
          lastUpdated={new Date("2022-04-20 EST")}
        />
      </DocumentCardRow>
    </Page>
  );
}
