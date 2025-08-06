import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";

export default async function VolunteerPage() {
  return (
    <Page>
      <MarkdownSection markdownFilePath="src/app/community/volunteer/overview.md" />

      <PositionSection title="Office">
        <Position
          name="Office worker"
          descriptionPath="src/app/community/volunteer/positions/office-worker.md"
        />
        <Position
          name="Office manager"
          descriptionPath="src/app/community/volunteer/positions/office-manager.md"
        />
      </PositionSection>
    </Page>
  );
}

const PositionSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="position-section">
      <h2>{title}</h2>
      <div className="positions">{children}</div>
    </div>
  );
};

// @todo make these accordions; client components
const Position: React.FC<{ name: string; descriptionPath: string }> = ({
  name,
  descriptionPath,
}) => {
  return (
    <div className="position">
      <h3 className="position-name">{name}</h3>
      <MarkdownSection markdownFilePath={descriptionPath} />
    </div>
  );
};
