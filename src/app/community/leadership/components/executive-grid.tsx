import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { Headshot } from "@/app/components/headshot/headshot";

export const ExecutiveGrid: React.FC = () => (
  <HeadshotGrid>
    <Headshot
      name=""
      position="President"
      email="president@mathsoc.uwaterloo.ca"
      description="Coordinates MathSoc-wide priorities, supports the executive team, and helps connect work across portfolios."
    />
    <Headshot
      name=""
      position="Vice-President, Academic"
      email="vpa@mathsoc.uwaterloo.ca"
      description="Leads academic advocacy, academic events, exam bank support, textbook library support, and other academic resources."
    />
    <Headshot
      name="Cynthia Sun"
      position="Vice-President, Finance"
      email="vpf@mathsoc.uwaterloo.ca"
      image="/img/exec-images/cynthiasun.jpg"
      description="Oversees budgets, reimbursements, deposits, finance records, and financial processes for MathSoc and clubs."
    />
    <Headshot
      name="Nihal Mir"
      position="Vice-President, Internal"
      email="vpi@mathsoc.uwaterloo.ca"
      image="/img/exec-images/nihalmir.png"
      description="Leads student-facing events, club support, event planning, and day-of logistics."
    />
    <Headshot
      name="Leon Yang"
      position="Vice-President, Operations"
      email="vpo@mathsoc.uwaterloo.ca"
      image="/img/exec-images/leonyang.jpg"
      description="Oversees office services, rentals, lockers, novelties, board games, equipment, and physical spaces."
    />
    <Headshot
      name="Jiamiao Zeng"
      position="Vice-President, Communications"
      email="vpc@mathsoc.uwaterloo.ca"
      image="/img/exec-images/jiamiaozeng.JPG"
      description="Leads public-facing communication, marketing, posters, social media, website content updates, and notices."
    />
  </HeadshotGrid>
);
