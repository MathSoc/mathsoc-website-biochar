import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import "./document-card.scss";

/**
 * Note: if lastUpdated is not provided with a timezone, you'll see an off-by-one
 * error due to timezone issues.
 *
 * The ideal way to pass in a date is `new Date("YYYY/MM/DD EST")`
 */
export const DocumentCard: React.FC<{
  name: string;
  icon: IconDefinition;
  description?: string;
  path: string;
  lastUpdated?: Date;
}> = ({ name, icon, description, path, lastUpdated }) => {
  return (
    <Link href={path} className="document-card">
      <FontAwesomeIcon icon={icon} className="document-icon" />
      <div className="gap"></div>
      <span className="name">{name}</span>
      <span className="description">{description}</span>
      {lastUpdated ? (
        <span className="last-updated">
          Last updated:
          <br />
          {lastUpdated.toLocaleDateString("en-CA", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </span>
      ) : null}
    </Link>
  );
};

export const DocumentCardRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="document-cards">{children}</div>;
};
