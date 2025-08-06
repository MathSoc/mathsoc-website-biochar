import { MeetingsTables } from "@/app/components/meetings-tables/meetings-tables";
import { Page } from "../../components/page/page-component";
import "./meetings.scss";
import { boardMeetings, councilMeetings, generalMeetings } from "./meetings";

export default async function MeetingsPage() {
  return (
    <Page id="meetings-page">
      <h1>Meetings</h1>
      <h2>Council</h2>
      <MeetingsTables meetings={councilMeetings} />
      <h2>Board</h2>
      <MeetingsTables meetings={boardMeetings} />
      <h2>General meetings</h2>
      <MeetingsTables meetings={generalMeetings} />
    </Page>
  );
}
