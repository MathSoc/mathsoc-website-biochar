import Link from "next/link";
import "./meetings-tables.scss";

export type Meeting = {
  date: string;
  type?: string;
  agenda?: string;
  minutes?: string;
};

const getMeetingYear = (meeting: Meeting) =>
  new Date(meeting.date).getFullYear().toString();

const getMeetingTerm = (meeting: Meeting) => {
  const date = new Date(meeting.date);
  const month = date.getMonth();
  const year = date.getFullYear();

  if (isNaN(year)) {
    throw new Error(`Bad date ${meeting.date}`);
  }

  if (month < 4) {
    return `Winter ${year}`;
  }

  if (month < 8) {
    return `Spring ${year}`;
  }

  return `Fall ${year}`;
};

export const MeetingsTables: React.FC<{
  meetings: Meeting[];
  divideBy: "year" | "term";
}> = ({ meetings, divideBy }) => {
  const dividedMeetings = Object.groupBy(
    meetings.sort((a, b) => (a.date < b.date ? 1 : -1)),
    divideBy === "year" ? getMeetingYear : getMeetingTerm,
  );

  return (
    <div className="meetings-tables">
      {Object.entries(dividedMeetings)
        .sort(
          ([yearA], [yearB]) =>
            new Date(yearB).getFullYear() - new Date(yearA).getFullYear(),
        )
        .map(([divisor, meetingsGroup]) => (
          <table key={divisor} className="meetings-table table">
            <thead>
              <tr>
                <th colSpan={3}>{divisor}</th>
              </tr>
            </thead>
            <tbody>
              {meetingsGroup
                ?.sort((a, b) => (a.date > b.date ? 1 : -1))
                .map((meeting) => (
                  <tr key={meeting.date}>
                    <td className="meeting-date">
                      {new Date(meeting.date).toLocaleDateString("en-CA", {
                        month: "long",
                        weekday: "long",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </td>
                    <td className="meeting-agenda">
                      {meeting.agenda ? (
                        <Link href={meeting.agenda}>Agenda</Link>
                      ) : null}
                    </td>
                    <td className="meeting-minutes">
                      {meeting.minutes ? (
                        <Link href={meeting.minutes}>Minutes</Link>
                      ) : null}
                    </td>
                  </tr>
                )) ?? null}
            </tbody>
          </table>
        ))}
    </div>
  );
};
