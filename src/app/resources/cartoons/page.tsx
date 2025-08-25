import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import "./cartoons.scss";
import { Metadata } from "next";
import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Row } from "@/app/components/layout/layout-components";
import { Button } from "@/app/components/button/button";

export const metadata: Metadata = { title: "Cartoons" };

export default async function CartoonsPage() {
  const courses = [
    "actsc371",
    "cs135",
    "cs136l",
    "cs245",
    "cs341",
    "math136",
    "math138",
    "math237",
    "pmath352",
    "stat231",
    "co250",
    "cs136",
    "cs145",
    "cs246",
    "math135",
    "math137",
    "math235",
    "math239",
    "stat230",
  ];

  const coursesByDepartment = Object.entries(
    Object.groupBy(courses, (course) => course.match(/[a-z]+/)![0]),
  ).sort(([deptA], [deptB]) => (deptA < deptB ? -1 : 1));

  return (
    <Page id="cartoons-page">
      <Banner src="/img/banners/cartoons.jpg" variant="pink">
        <BannerTitles title="Cartoons"></BannerTitles>
      </Banner>
      <MarkdownSection src="src/app/resources/cartoons/about-cartoons.md" />
      <h1>Cartoons archive</h1>
      <div id="cartoons-list">
        {coursesByDepartment.map(([department, courses]) => {
          return (
            <section className="department-section" key={department}>
              <h2>{department}</h2>
              <Row className="button-section">
                {courses!
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((course) => (
                    <Button
                      variant="pink"
                      href={`/resources/cartoons/${course}`}
                      key={course}
                    >
                      {course}
                    </Button>
                  ))}
              </Row>
            </section>
          );
        })}
      </div>
    </Page>
  );
}
