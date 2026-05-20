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
          name="Lisa Bolsinger"
          position="Actuarial Science Representative"
          email="lbolsinger@uwaterloo.ca"
        />
        <Headshot
          name="Alex Lavallee"
          position="Pure Mathematics, Applied Mathematics, and Combinatorics and Optimization Representative"
          email="a2lavallee@uwaterloo.ca"
        />
        <Headshot
          name="E-Therng Lee"
          position="Pure Mathematics, Applied Mathematics, and Combinatorics and Optimization Representative"
          email="e-therng.lee@uwaterloo.ca"
        />
        <Headshot
          name="River Stanley"
          position="Computer Science Representative"
          email="river.stanley@uwaterloo.ca"
        />
        <Headshot
          name="Sai Jilla"
          position="Computer Science Representative"
          email="sljilla@uwaterloo.ca"
        />
        <Headshot
          name="Valery Lai"
          position="Computer Science Representative"
          email="hqlai@uwaterloo.ca"
        />
        <Headshot
          name="Cristian Moretto"
          position="Computer Science Representative"
          email="cristian.moretto@uwaterloo.ca"
        />
        <Headshot
          name="Nicholas Rebello"
          position="Business Representative"
          email="nrebello@uwaterloo.ca"
        />
        <Headshot
          name="Vincent Chung"
          position="Software Engineering Representative"
          email="yhchung@uwaterloo.ca"
        />
        <Headshot
          name="Qinkai Li"
          position="Software Engineering Representative"
          email="q95li@uwaterloo.ca"
        />
        <Headshot
          name="Aeshaan Kumarm"
          position="First Year Representative"
          email="a386kumar@uwaterloo.ca"
        />
        <Headshot
          name="Angela Li"
          position="First Year Representative"
          email="ay28li@uwaterloo.ca"
        />
        <Headshot
          name="Catherine Chen"
          position="First Year Representative"
          email="c623chen@uwaterloo.ca"
        />
        <Headshot
          name="Ryan Qiao"
          position="First Year Representative"
          email="y22qiao@uwaterloo.ca"
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
          name="Amir Dadpour"
          position="At-Large Director"
          email="amirhossein.dadpour@gmail.com"
        />
        <Headshot
          name="Nihal Mir"
          position="At-Large Director"
          email="n2mir@uwaterloo.ca"
        />
        <Headshot
          name="Avish Kathpal"
          position="At-Large Director"
          email="akathpal@uwaterloo.ca"
        />
        <Headshot
          name="Saivenkat Jilla"
          position="At-Large Director"
          email="sljilla@uwaterloo.ca"
        />
        <Headshot
          name="E-Therng Lee"
          position="At-Large Director"
          email="e-therng.lee@uwaterloo.ca"
        />
        <Headshot
          name="Isabela Souza"
          position="At-Large Director"
          email="isabelacefrin@gmail.com"
        />
        <Headshot
          name="Leo Chai"
          position="At-Large Director"
          email="j23chai@uwaterloo.ca"
        />
        <Headshot
          name="Alex Lavallee"
          position="At-Large Director"
          email="a2lavallee@uwaterloo.ca"
        />
        <Headshot
          name="River Stanley"
          position="Councillor-Director"
          email="river.stanley@uwaterloo.ca"
        />
        <Headshot
          name="Ryan Qiao"
          position="Councillor-Director"
          email="y22qiao@uwaterloo.ca"
        />
        <Headshot
          name="Grace Feng"
          position="Community Representative"
          email="g27feng@uwaterloo.ca"
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
