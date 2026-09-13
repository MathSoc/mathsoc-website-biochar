import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { Headshot } from "@/app/components/headshot/headshot";

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    {/*<Headshot
      name="Remington Aginskaya-Zhi"
      position="President"
      email="president@mathsoc.uwaterloo.ca"
      image="/img/exec-images/remingtonaginsakayazhi.JPG"
    />
    <Headshot
      name="E-Therng Lee"
      position="Vice-President, Academic"
      email="vpa@mathsoc.uwaterloo.ca"
      image="/img/exec-images/ethernglee.webp"
    />*/}
    <Headshot
      name="Cynthia Sun"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Nihal Mir"
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Leon Yang"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
      image="/img/exec-images/leonyang.jpg"
    />
    <Headshot
      name="Jiamiao Zeng"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
      image="/img/exec-images/jiamiaozeng.JPG"
    />
  </HeadshotGrid>
);
