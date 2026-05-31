import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { Headshot } from "@/app/components/headshot/headshot";

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    <Headshot
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
    />
    <Headshot
      name="Mary Li"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
      image="/img/exec-images/maryli.JPG"
    />
    <Headshot
      name="Molly Peng"
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
    />
    <Headshot
      name="Mica Morante"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
      image="/img/exec-images/micamorante.png"
    />
    <Headshot
      name="Chelsea Kim"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
      image="/img/exec-images/chelseakim.webp"
    />
  </HeadshotGrid>
);
