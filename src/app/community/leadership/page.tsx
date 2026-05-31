import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { MarkdownSection } from "../../components/markdown-section/markdown-section.server";
import { Page } from "../../components/page/page-component";
import { Headshot } from "@/app/components/headshot/headshot";
import { Metadata } from "next";
import { ExecutiveGrid } from "./components/executive-grid";

export const metadata: Metadata = { title: "Leadership" };

export default async function CouncilPage() {
  return (
    <Page id="council-page">
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
      <MarkdownSection src="src/app/community/leadership/council.md" />
      <h2>Councillors</h2>
      <HeadshotGrid>
        <Headshot
          name="Sara Nayar"
          position="Speaker, Pure Mathematics, Applied Mathematics, and Combinatorics and Optimization Representative"
          email="s5nayar@uwaterloo.ca"
          image="/img/director-images/saranayar.webp"
        />
        <Headshot
          name="Alex Lavallee"
          position="Pure Mathematics, Applied Mathematics, and Combinatorics and Optimization Representative"
          email="a2lavallee@uwaterloo.ca"
          image="/img/councillor-images/alexlavallee.webp"
        />
        <Headshot
          name="Saivenkat Jilla"
          position="Computer Science Representative"
          email="sljilla@uwaterloo.ca"
          image="/img/councillor-images/saijilla.jpg"
        />
        <Headshot
          name="Valery Lai"
          position="Computer Science Representative"
          email="hqlai@uwaterloo.ca"
          image="/img/councillor-images/valerylai.webp"
        />
        <Headshot
          name="Tengyi Xu"
          position="Computer Science Representative"
          email="t48xu@uwaterloo.ca"
          image="/img/councillor-images/tengyixu.webp"
        />
        <Headshot
          name="Vera Misic"
          position="Software Engineering Representative"
          email="a2misic@uwaterloo.ca"
        />
        <Headshot
          name="Anvay Mukim"
          position="At-Large Representative"
          email="amukim@uwaterloo.ca"
        />
      </HeadshotGrid>
    </div>
  );
};

const Board: React.FC = () => {
  return (
    <div className="board-section">
      <h1>Board</h1>
      <MarkdownSection src="src/app/community/leadership/board.md" />
      <h2>Directors</h2>
      <HeadshotGrid>
        <Headshot
          name="Andy Chang"
          position="Chair, At-Large Director"
          email="chair@mathsoc.uwaterloo.ca"
        />
        <Headshot
          name="Aubrie Chan"
          position="At-Large Director"
          email="a342chan@uwaterloo.ca"
        />
        <Headshot
          name="Leo Chai"
          position="At-Large Director"
          email="j23chai@uwaterloo.ca"
        />
        <Headshot
          name="Saivenkat Jilla"
          position="At-Large Director"
          email="sljilla@uwaterloo.ca"
          image="/img/director-images/saijilla.jpg"
        />
        <Headshot
          name="Alex Lavallee"
          position="At-Large Director"
          email="a2lavallee@uwaterloo.ca"
          image="/img/director-images/alexlavallee.webp"
        />
        <Headshot
          name="Nihal Mir"
          position="At-Large Director"
          email="n2mir@uwaterloo.ca"
        />
        <Headshot
          name="Sarah Mei"
          position="At-Large Director"
          email="sarah.mei@uwaterloo.ca"
        />
        <Headshot
          name="Isabela Souza"
          position="At-Large Director"
          email="isabelacefrin@gmail.com"
        />
        <Headshot
          name="Sara Nayar"
          position="Speaker, Councillor-Director"
          email="s5nayar@uwaterloo.ca"
          image="/img/director-images/saranayar.webp"
        />
        <Headshot
          name="Grace Feng"
          position="Community Representative"
          email="g27feng@uwaterloo.ca"
          image="/img/director-images/gfeng.jpg"
        />
        <Headshot
          name="Danya Matlin"
          position="Community Representative"
          email="dmatlin@uwaterloo.ca"
        />
      </HeadshotGrid>
    </div>
  );
};

const Executives: React.FC = () => {
  return (
    <div className="executive-section">
      <h1>Executives</h1>
      <MarkdownSection src="src/app/community/leadership/executives.md" />
      <h2>Your executives</h2>
      <ExecutiveGrid />
    </div>
  );
};
