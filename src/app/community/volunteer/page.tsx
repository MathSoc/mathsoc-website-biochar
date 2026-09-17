import { Metadata } from "next";
import { Headshot } from "@/app/components/headshot/headshot";
import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { MarkdownSection } from "../../components/markdown-section/markdown-section.server";
import { Page } from "../../components/page/page-component";
import Tabs from "@/app/components/tabs/tabs";

export const metadata: Metadata = { title: "Volunteer" };

export default async function VolunteerPage() {
  return (
    <Page id="volunteer-page">
      <MarkdownSection src="src/app/community/volunteer/body.md" />
      <Tabs
        tabs={[
          {
            title: "Administrative",
            id: "president",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/president.md" />
            ),
          },
          {
            title: "Academic",
            id: "vpa",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/vpa.md" />
            ),
          },
          {
            title: "Operations",
            id: "vpo",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/vpo.md" />
            ),
          },
          {
            title: "Events",
            id: "vpi",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/vpi.md" />
            ),
          },
          {
            title: "Finance",
            id: "vpf",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/vpf.md" />
            ),
          },
          {
            title: "Marketing",
            id: "vpc",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/vpc.md" />
            ),
          },
          {
            title: "Infrastructure",
            id: "infra",
            contents: <InfrastructureTab />,
          },
          {
            title: "Governance",
            id: "governance",
            contents: (
              <MarkdownSection src="src/app/community/volunteer/governance.md" />
            ),
          },
        ]}
      />
    </Page>
  );
}

const InfrastructureTab: React.FC = () => {
  return (
    <>
      <div className="markdown-section">
        <div className="inner-contents">
          <h2>Current Infrastructure Lead</h2>
          <HeadshotGrid>
            <Headshot
              name="Mica Morante"
              position="Current Lead, Infrastructure"
              email="webdev@mathsoc.uwaterloo.ca"
              image="/img/councillor-images/default.png"
            />
          </HeadshotGrid>
        </div>
      </div>
      <MarkdownSection src="src/app/community/volunteer/infra.md" />
    </>
  );
};
