import { MeetingsTables } from "@/app/components/meetings-tables/meetings-tables";
import { Page } from "../../components/page/page-component";
import "./meetings.scss";
import { generalMeetings } from "./general-meetings";
import { MarkdownSection } from "@/app/components/markdown-section/markdown-section";
import { councilMeetings } from "./council-meetings";
import { boardMeetings } from "./board-meetings";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Meetings" };

export default async function MeetingsPage() {
  return (
    <Page id="meetings-page">
      <h1>Meetings</h1>
      <h2>Quick links</h2>
      <MarkdownSection src="src/app/resources/meetings/meetings-quicklinks.md" />
      <h2 id="general-meetings">General meetings</h2>
      <MeetingsTables meetings={generalMeetings} divideBy="year" />
      <h2 id="board-meetings">Board</h2>
      <MeetingsTables meetings={boardMeetings} divideBy="term" />
      <h2 id="council-meetings">Council</h2>
      <MeetingsTables meetings={councilMeetings} divideBy="term" />
    </Page>
  );
}
