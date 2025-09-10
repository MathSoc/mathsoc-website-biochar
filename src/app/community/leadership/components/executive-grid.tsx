import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { Headshot } from "@/app/components/headshot/headshot";

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    <Headshot
      name="Alex Lavallee"
      position="President"
      email="president@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Valery Lai"
      position="Vice-President, Academic"
      email="vpa@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Jinki Onabolu"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Nazra Adam"
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Luna Wu"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Lorena Guo"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
    />
  </HeadshotGrid>
);
