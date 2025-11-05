import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
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
          name="Avish Kathpal"
          position="Computer Science Representative"
          email="akathpal@uwaterloo.ca"
        />
        <Headshot
          name="Elyn Huang"
          position="Computer Science Representative"
          email="e73huang@uwaterloo.ca"
        />
        <Headshot
          name="Xiangru Mo"
          position="Business Representative"
          email="x6mo@uwaterloo.ca"
        />
        <Headshot
          name="Aleksa Misic"
          position="Software Engineering Representative"
          email="a2misic@uwaterloo.ca"
        />
        <Headshot
          name="Maggie Chen"
          position="Software Engineering Representative"
          email="m29chen@uwaterloo.ca"
        />
        <Headshot
          name="E-Therng Lee"
          position="At-Large Representative"
          email="e-therng.lee@uwaterloo.ca"
        />
        <Headshot
          name="Shalev Manor"
          position="At-Large Representative"
          email="smanor@uwaterloo.ca"
        />
        <Headshot
          name="Shayan Jizan"
          position="At-Large Representative"
          email="sjizan@uwaterloo.ca"
        />
        <Headshot
          name="Nicholas Rebello"
          position="At-Large Representative"
          email="nrebello@uwaterloo.ca"
        />
        <Headshot
          name="Samantha Pater"
          position="At-Large Representative"
          email="snpater@uwaterloo.ca"
        />
        <Headshot
          name="Wendy Yang"
          position="At-Large Representative"
          email="wz2yang@uwaterloo.ca"
        />
        <Headshot
          name="Samir Sharma"
          position="At-Large Representative"
          email="samir.sharma@uwaterloo.ca"
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
        <Headshot
          name="Suri Tian"
          position="First Year Representative"
          email="s48tian@uwaterloo.ca"
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
          name="Jack Whittick"
          position="Chair, At-Large Director"
          email="chair@mathsoc.uwaterloo.ca"
          image="/img/councillor-images/jwhittick.jpg"
        />
        <Headshot
          name="Awab Qureshi"
          position="At-Large Director"
          email="a9quresh@uwaterloo.ca"
          image="/img/councillor-images/aqureshi.webp"
        />
        <Headshot
          name="Saivenkat Jilla"
          position="At-Large Director"
          email="sljilla@uwaterloo.ca"
        />
        <Headshot
          name="Nihal Mir"
          position="At-Large Director"
          email="n2mir@uwaterloo.ca"
        />
        <Headshot
          name="Isabela Souza"
          position="At-Large Director"
          email="isabelacefrin@gmail.com"
        />
        <Headshot
          name="Amir Dadpour"
          position="At-Large Director"
          email="amirhossein.dadpour@gmail.com"
        />
        <Headshot
          name="Avish Kathpal"
          position="At-Large Director"
          email="akathpal@uwaterloo.ca"
        />
        <Headshot
          name="Patrik Buhring"
          position="At-Large Director"
          email="patrikbuhring@gmail.com"
        />
        <Headshot
          name="Elyn Huang"
          position="Councillor-Director"
          email="elyn.huang@uwaterloo.ca"
        />
        <Headshot
          name="E-Therng Lee"
          position="Councillor-Director"
          email="e-therng.lee@uwaterloo.ca"
        />
        <Headshot
          name="Danya Matlin"
          position="Community Representative"
          email="dmatlin@uwaterloo.ca"
        />
        <Headshot
          name="John Hunte"
          position="Community Representative"
          email="jphunte@uwaterloo.ca"
          image="/img/councillor-images/jhunte.jpg"
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
