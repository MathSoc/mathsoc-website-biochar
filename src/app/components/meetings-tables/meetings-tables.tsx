import Link from "next/link";
import "./meetings-tables.scss";

export type Meeting = {
  date: string;
  agenda?: string;
  minutes?: string;
};

export const MeetingsTables: React.FC<{ meetings: Meeting[] }> = ({
  meetings,
}) => {
  const meetingsByYear = Object.groupBy(
    meetings.sort((a, b) => (a.date < b.date ? 1 : -1)),
    ({ date }) => new Date(date).getFullYear(),
  );

  return (
    <div className="meetings-tables">
      {Object.entries(meetingsByYear)
        .sort(
          ([yearA], [yearB]) =>
            new Date(yearB).getFullYear() - new Date(yearA).getFullYear(),
        )
        .map(([year, meetings]) => (
          <table key={year} className="meetings-table table">
            <thead>
              <tr>
                <th colSpan={3}>{year}</th>
              </tr>
            </thead>
            <tbody>
              {meetings?.map((meeting) => (
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
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="meeting-minutes">
                    {meeting.minutes ? (
                      <Link href={meeting.minutes}>Minutes</Link>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              )) ?? null}
            </tbody>
          </table>
        ))}
    </div>
  );
};
