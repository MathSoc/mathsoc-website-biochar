import "./home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function Home() {
  return (
    <div id="home-container">
      <div id="banner-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/img/banners/mathsoc-wall.jpeg" alt="" id="banner" />
        <div id="banner-gradient"></div>
      </div>
      <div id="home-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/icons/horizontal-logo-white.svg"
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
        <h1 className="section-head">Hear about our upcoming events!</h1>
        <div className="social-buttons">
          <SocialButton
            href="/resources/discord-access"
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
