import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import { Headshot } from "@/app/components/headshot/headshot";

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
          position="PMAMC&O Representative"
          email="s5nayar@uwaterloo.ca"
        />
        <Headshot
          name="Amol Venkataraman"
          position="Computer Science Representative"
          email="avenkataraman@uwaterloo.ca"
        />
        <Headshot
          name="Cristian Moretto"
          position="Computer Science Representative"
          email="cmoretto@uwaterloo.ca"
        />
        <Headshot
          name="Grace Feng"
          position="Computer Science Representative"
          email="g27feng@uwaterloo.ca"
        />
        <Headshot
          name="Faraan Hadi"
          position="Computer Science Representative"
          email="faraan.hadi@uwaterloo.ca"
        />
        <Headshot
          name="Saivenkat Jilla"
          position="Computer Science Representative"
          email="sljilla@uwaterloo.ca"
        />
        <Headshot
          name="Alex Lavallee"
          position="At-Large Representative"
          email="a2lavallee@uwaterloo.ca"
        />
        <Headshot
          name="Alina Hu"
          position="At-Large Representative"
          email="alina.hu@uwaterloo.ca"
        />
        <Headshot
          name="River Stanley"
          position="At-Large Representative"
          email="river.stanley@uwaterloo.ca"
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
          name="Awab Qureshi"
          position="Chair, At-Large Director"
          email="chair@mathsoc.uwaterloo.ca"
        />
        <Headshot
          name="Grace Feng"
          position="At-Large Director"
          email="g27feng@uwaterloo.ca"
        />
        <Headshot
          name="Jack Whittick"
          position="At-Large Director"
          email="jbwhitti@uwaterloo.ca"
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

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    <Headshot
      name="Alex Lavalee"
      position="President"
      email="president@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Patrik Buhring"
      position="Vice-President, Academic"
      email="vpa@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Lydia Li"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Ivana Tanasijevic"
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Danny Liu"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Sarah Philippon"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
    />
  </HeadshotGrid>
);
