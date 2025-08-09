import "./home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Banner } from "./components/banner/banner";
import { Button } from "./components/button/button";
import Link from "next/link";
import { Page } from "./components/page/page-component";
import Image from "next/image";

export default function Home() {
  return (
    <Page id="homepage" variant="pink">
      <Banner src="/img/banners/mathsoc-wall.jpeg" variant="pink" size="large">
        <div id="logo">
          <Image
            src="/img/logos/horizontal-logo-white.svg"
            alt="Mathsoc Logo"
            fill
          />
        </div>
        <div className="home-content">
          <div className="homepage-buttons">
            <Button href="/community/volunteer">Get Involved</Button>
            <Button href="https://services.mathsoc.uwaterloo.ca/resources/exam-bank">
              Exam Bank
            </Button>
          </div>
        </div>
      </Banner>

      <div className="home-content">
        <h1 className="section-head">Hear about our upcoming events!</h1>
        <div className="social-buttons">
          <SocialButton
            href="/resources/discord"
            icon={faDiscord}
            label="Discord"
          />
          <SocialButton
            href="https://www.instagram.com/uwmathsoc/"
            icon={faInstagram}
            label="Instagram"
          />
          <SocialButton
            href="mailto:info@mathsoc.uwaterloo.ca"
            icon={faEnvelope}
            label="Mail"
          />
        </div>
      </div>
    </Page>
  );
}

const SocialButton: React.FC<{
  href: string;
  icon: IconDefinition;
  label: string;
}> = ({ href, icon, label }) => {
  return (
    <Link className="social-button" href={href}>
      <FontAwesomeIcon icon={icon} className="social-icon" size="3x" />
      <span>{label}</span>
    </Link>
  );
};
