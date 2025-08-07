import Link from "next/link";
import "./footer.scss";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div id="inner-footer">
        <div className="section">
          <b>© {currentYear} Mathsoc</b>
        </div>
        <hr />
        <div className="section">
          <div className="link-section">
            <Link href="/">Home</Link>
            <Link href="/community/contact-us">Contact</Link>
          </div>
          <div className="social-section">
            <div className="socials">
              <SocialLink href="/resources/discord" icon={faDiscord} />
              <SocialLink
                href="https://www.instagram.com/uwmathsoc/"
                icon={faInstagram}
              />
              <SocialLink
                href="mailto:info@mathsoc.uwaterloo.ca"
                icon={faEnvelope}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialLink: React.FC<{
  href: string;
  icon: IconDefinition;
  className?: string;
}> = ({ href, icon, className }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <FontAwesomeIcon icon={icon} size="1x" className="social-icon" />
    </Link>
  );
};
