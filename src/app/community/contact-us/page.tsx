import { HeadshotGrid } from "@/app/components/headshot-grid/headshot-grid";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";
import { Headshot } from "@/app/components/headshot/headshot";
import { Metadata } from "next";
import { ExecutiveGrid } from "../leadership/components/executive-grid";

export const metadata: Metadata = { title: "Contact us" };

export default async function ContactPage() {
  return (
    <Page id="contact-page">
      <h1>Reach out</h1>
      <h2>Executives</h2>
      <ExecutiveGrid />
      <h2>Business manager</h2>
      <HeadshotGrid>
        <Headshot
          name="Rose Penner"
          position="Business manager"
          email="rpenner@mathsoc.uwaterloo.ca"
        />
      </HeadshotGrid>
      <h2>Visit us in person</h2>
      <MarkdownSection src="src/app/community/contact-us/contact-us-locations.md" />
      <h2>General inquiries</h2>
      <p>
        React out at{" "}
        <a href="mailto:info@mathsoc.uwaterloo.ca">info@mathsoc.uwaterloo.ca</a>
        .
      </p>
    </Page>
  );
}
