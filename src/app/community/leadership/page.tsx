import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import { Headshot } from "@/app/components/headshot/headshot";

export default async function CouncilPage() {
  return (
    <Page>
      <Council />
      <Board />
      <Executives />
    </Page>
  );
}

const Council: React.FC = () => {
  return (
    <div className="council-section">
      <h1>Council</h1>
      <MarkdownSection markdownFilePath="src/app/community/leadership/council.md" />
      <h2>Councillors</h2>
      <HeadshotGrid>
        <Headshot
          name="Sara Nayar"
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
        <Headshot
          name="Sara Nayar"
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
        <Headshot
          name="Sara Nayar"
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
        <Headshot
          name="Sara Nayar"
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
        <Headshot
          name="Sara Nayar"
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
        <Headshot
          name="Sara Nayar"
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
      </HeadshotGrid>
    </div>
  );
};

const Board: React.FC = () => {
  return (
    <div className="board-section">
      <h1>Board</h1>
      <MarkdownSection markdownFilePath="src/app/community/leadership/board.md" />
      <h2>Directors</h2>
      <HeadshotGrid>
        <Headshot
          name="Awab Qureshi"
          position="Chair, At-Large Director"
          email="chair@mathsoc.uwaterloo.ca"
        />
      </HeadshotGrid>
    </div>
  );
};

const Executives: React.FC = () => {
  return (
    <div className="executive-section">
      <h1>Executives</h1>
      <MarkdownSection markdownFilePath="src/app/community/leadership/executives.md" />
      <h2>Your executives</h2>
      <HeadshotGrid>
        <Headshot
          name="Arnav Gupta"
          position="President"
          email="president@mathsoc.uwaterloo.ca"
        />
      </HeadshotGrid>
    </div>
  );
};
