import { Banner, BannerTitles } from "@/app/components/banner/banner";
import {
  DocumentCard,
  DocumentCardRow,
} from "@/app/components/documents-card/document-card";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Metadata } from "next";
import { Page } from "../../components/page/page-component";
import "./policies.scss";

export const metadata: Metadata = { title: "Policies" };

async function getLatestReleaseDate() {
  const response = await fetch(
    "https://api.github.com/repos/MathSoc/mathSocDocuments/releases/latest",
  );

  if (!response.ok) {
    return undefined;
  }

  const release = (await response.json()) as { created_at: string };
  return new Date(release.created_at);
}

export default async function PoliciesPage() {
  const lastUpdated = await getLatestReleaseDate();

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
          path="https://github.com/MathSoc/mathSocDocuments/releases/download/latest-docs/policies-public.pdf"
          lastUpdated={lastUpdated}
        />
        <DocumentCard
          icon={faNewspaper}
          name="Board procedures"
          description="long-term governance"
          path="https://github.com/MathSoc/mathSocDocuments/releases/download/latest-docs/board-procedures-public.pdf"
          lastUpdated={lastUpdated}
        />
        <DocumentCard
          icon={faNewspaper}
          name="Bylaws"
          description="the Society at large"
          path="https://github.com/MathSoc/mathSocDocuments/releases/download/latest-docs/bylaws-public.pdf"
          lastUpdated={lastUpdated}
        />
      </DocumentCardRow>
    </Page>
  );
}
