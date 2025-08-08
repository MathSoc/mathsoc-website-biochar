import { Metadata } from "next";
import { MarkdownSection } from "../../components/markdown-section/markdown-section";
import { Page } from "../../components/page/page-component";

export const metadata: Metadata = { title: "Volunteer" };

export default async function VolunteerPage() {
  return (
    <Page id="volunteer-page">
      <MarkdownSection src="src/app/community/volunteer/volunteer.md" />
    </Page>
  );
}
