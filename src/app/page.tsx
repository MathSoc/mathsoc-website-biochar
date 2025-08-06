import "./home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Banner } from "./components/banner/banner";

export default function Home() {
  return (
    <div id="homepage">
      <Banner
        imgPath="/img/banners/mathsoc-wall.jpeg"
        variant="pink"
        size="large"
      >
        <div className="home-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/horizontal-logo-white.svg"
            alt="Mathsoc Logo"
            id="logo"
            // fill
          />
          <div className="homepage-buttons">
            <a className="homepage-button" href="/get-involved/volunteer">
              Get Involved
            </a>
            <a className="homepage-button" href="/resources/exam-bank">
              Exam Bank
            </a>
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
    </div>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: IconDefinition;
  label: string;
}) {
  return (
    <a className="social-button" href={href}>
      <FontAwesomeIcon icon={icon} className="social-icon" size="3x" />
      <span>{label}</span>
    </a>
  );
}
