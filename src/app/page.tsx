import "./home.scss";

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
          <a className="social-button" href="/resources/discord-access">
            <i className="fa-brands fa-discord social-icon fa-3x"></i>
            <span>Discord</span>
          </a>
          <a
            className="social-button"
            href="https://www.instagram.com/uwmathsoc/"
          >
            <i className="fa fa-instagram social-icon fa-3x"></i>
            <span>Instagram</span>
          </a>
          <a className="social-button" href="mailto:info@mathsoc.uwaterloo.ca">
            <i className="fa fa-envelope-o social-icon fa-3x"></i>
            <span>Mail</span>
          </a>
        </div>
      </div>
    </div>
  );
}
