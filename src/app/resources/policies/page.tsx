import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Page } from "../../components/page/page-component";
import Link from "next/link";
import { faNewspaper, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./policies.scss";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

export default async function PoliciesPage() {
  return (
    <Page id="policies-page">
      <Banner src="/img/banners/mathsoc-wall.jpeg" variant="pink">
        <BannerTitles title="Policies and Bylaws" />
      </Banner>
      <div className="cards">
        <DocumentsCard
          icon={faNewspaper}
          name="Policies"
          description="council, clubs"
          path="/documents/policies-public.pdf"
          lastUpdated={new Date("2024-08-03")}
        />
        <DocumentsCard
          icon={faNewspaper}
          name="Board procedures"
          description="long-term governance"
          path="/documents/board-procedures-public.pdf"
          lastUpdated={new Date("2024-11-29")}
        />
        <DocumentsCard
          icon={faNewspaper}
          name="Bylaws"
          description="the Society at large"
          path="/documents/bylaws-public.pdf"
          lastUpdated={new Date("2024-11-29")}
        />
      </div>
      <h1>Reports</h1>
      <div className="cards">
        <DocumentsCard
          icon={faEye}
          name="On Proctoring Software"
          path="/resources/policies/proctoring"
          lastUpdated={new Date("2022-04-20")}
        />
      </div>
    </Page>
  );
}

const DocumentsCard: React.FC<{
  name: string;
  icon: IconDefinition;
  description?: string;
  path: string;
  lastUpdated: Date;
}> = ({ name, icon, description, path, lastUpdated }) => {
  return (
    <Link href={path} className="document-card">
      <FontAwesomeIcon icon={icon} className="document-icon" />
      <div className="gap"></div>
      <span className="name">{name}</span>
      <span className="description">{description}</span>
      <span className="last-updated">
        Last updated:
        <br />
        {/* @todo fix the off-by-one timezone-related date errors here(??) */}
        {lastUpdated.toLocaleDateString("en-CA", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </span>
    </Link>
  );
};
