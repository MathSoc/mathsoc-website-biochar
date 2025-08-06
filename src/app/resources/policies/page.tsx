import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Page } from "../../components/page/page-component";
import Link from "next/link";
import { faNewspaper, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./policies.scss";

export default async function PoliciesPage() {
  return (
    <Page id="policies-page">
      <Banner imgPath="/banners/mathsoc-wall.jpeg" variant="pink">
        <BannerTitles title="Policies and Bylaws" />
      </Banner>
      <div className="cards">
        <RulesCard
          icon={faNewspaper}
          name="Policies"
          description="council, clubs"
          path="/documents/policies.pdf"
          lastUpdated={new Date("2024-08-03")}
        />
        <RulesCard
          icon={faNewspaper}
          name="Board procedures"
          description="long-term governance"
          path="/documents/board-procedures.pdf"
          lastUpdated={new Date("2024-11-29")}
        />
        <RulesCard
          icon={faNewspaper}
          name="Bylaws"
          description="the Society at large"
          path="/documents/bylaws.pdf"
          lastUpdated={new Date("2024-11-29")}
        />
      </div>
    </Page>
  );
}

const RulesCard: React.FC<{
  name: string;
  icon: IconDefinition;
  description: string;
  path: string;
  lastUpdated: Date;
}> = ({ name, icon, description, path, lastUpdated }) => {
  return (
    <Link href={path} className="rules-card">
      <FontAwesomeIcon icon={icon} className="rules-icon" />
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
