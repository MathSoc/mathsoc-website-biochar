import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import "./cartoons-course.scss";
import { Metadata } from "next";
import { Page } from "@/app/components/page/page-component";

type URLParams = {
  params: { course: string };
};

export async function generateMetadata({
  params,
}: URLParams): Promise<Metadata> {
  const course = params.course;
  return {
    title: `Cartoons | ${course.toUpperCase()}`,
  };
}

export default async function CartoonsCoursePage({ params }: URLParams) {
  const course = params.course;

  return (
    <Page id="cartoons-course-page">
      <h1>{course}</h1>
      <MarkdownSection
        src={`src/app/resources/cartoons/[course]/course-pages/${course}.md`}
      />
    </Page>
  );
}
