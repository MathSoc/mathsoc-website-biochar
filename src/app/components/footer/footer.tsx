import Link from "next/link";
import "./footer.scss";

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
            <Link href="/contact-us">Contact</Link>
          </div>
          <div className="social-section">
            <div className="socials">
              {/* @todo replace these (broken) images with fontawesome links */}
              <SocialLink
                href="/resources/discord-access"
                imageSrc="/social/discord.svg"
                alt="Discord Icon"
              />
              <SocialLink
                href="https://www.instagram.com/uwmathsoc/"
                imageSrc="/social/instagram.svg"
                alt="Instagram Icon"
              />
              <SocialLink
                href="mailto:info@mathsoc.uwaterloo.ca"
                imageSrc="/social/mail.svg"
                alt="Mail Icon"
                className="mail-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  imageSrc,
  alt,
  className,
}: {
  href: string;
  imageSrc: string;
  alt: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} />
    </Link>
  );
}
