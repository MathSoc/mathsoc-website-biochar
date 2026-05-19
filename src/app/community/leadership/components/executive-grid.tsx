import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { Headshot } from "@/app/components/headshot/headshot";

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    <Headshot
      name="Remington Zhi"
      position="President"
      email="president@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="E-Therng Lee"
      position="Vice-President, Academic"
      email="vpa@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Mary Li"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name=""
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Mica Morante"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Chelsea Kim"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
    />
  </HeadshotGrid>
);
