import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import { Page } from "@/app/components/page/page-component";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Lockers" };

export default async function LockersPage() {
  return (
    <Page id="lockers-page">
      <MarkdownSection src="src/app/services/lockers/lockers.md" />
    </Page>
  );
}
