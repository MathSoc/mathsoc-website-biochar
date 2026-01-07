import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { Headshot } from "@/app/components/headshot/headshot";

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    <Headshot
      name="Veertej Sehdave"
      position="President"
      email="president@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Samantha Pater"
      position="Vice-President, Academic"
      email="vpa@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Ivana Tanasijevic"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Amy Zhuo"
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Andy Chang"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Brook Khoo"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
    />
  </HeadshotGrid>
);
