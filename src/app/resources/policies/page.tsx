import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Page } from "../../components/page/page-component";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import "./policies.scss";
import { Metadata } from "next";
import {
  DocumentCard,
  DocumentCardRow,
} from "@/app/components/documents-card/document-card";

export const metadata: Metadata = { title: "Policies" };

export default async function PoliciesPage() {
  return (
    <Page id="policies-page">
      <Banner src="/img/banners/mathsoc-wall.jpeg" variant="pink">
        <BannerTitles title="Policies and Bylaws" />
      </Banner>
      <DocumentCardRow>
        <DocumentCard
          icon={faNewspaper}
          name="Policies"
          description="council, clubs"
          path="/documents/policies-public.pdf"
          lastUpdated={new Date("2025-08-18 EST")}
        />
        <DocumentCard
          icon={faNewspaper}
          name="Board procedures"
          description="long-term governance"
          path="/documents/board-procedures-public.pdf"
          lastUpdated={new Date("2025-10-22 EST")}
        />
        <DocumentCard
          icon={faNewspaper}
          name="Bylaws"
          description="the Society at large"
          path="/documents/bylaws-public.pdf"
          lastUpdated={new Date("2025-08-18 EST")}
        />
      </DocumentCardRow>
    </Page>
  );
}
