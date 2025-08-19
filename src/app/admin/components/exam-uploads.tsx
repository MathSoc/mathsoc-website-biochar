"use client";

import { currentTerm } from "@/app/resources/exam-bank/util";
import React, { useRef, useState } from "react";
import "./exam-uploads.scss";
import { Button as ClientButton } from "@/app/components/button/button.client";
import { Button as ServerButton } from "@/app/components/button/button";
import { voidAction } from "@/app/util/exam-actions";
import { Centered } from "@/app/components/layout/layout-components";

export const ExamUploads: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div className="exam-uploads">
      <Centered>
        <UploadElement files={files} setFiles={setFiles} />
      </Centered>
      {files.length > 0 ? (
        <>
          <table className="file-uploads-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Department</th>
                <th>Course code</th>
                <th>Term</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <FileRow file={file} key={file.name} deleteRow={removeFile} />
              ))}
            </tbody>
          </table>

          <Centered>
            <ServerButton action={voidAction} variant="pink">
              {`Upload ${files.length} files`}
            </ServerButton>
          </Centered>
        </>
      ) : null}
    </div>
  );
};

const UploadElement: React.FC<{
  files: File[];
  setFiles: (files: File[]) => void;
}> = ({ files, setFiles }) => {
  const inputElement = useRef<HTMLInputElement>(null);

  return (
    <input
      type="file"
      ref={inputElement}
      name="file"
      accept=".pdf"
      disabled={(files.length ?? 0) > 0}
      onChange={(event) => {
        setFiles(Array.from(event.target.files ?? []));
      }}
      multiple
      className="file-input"
      id="exam-file-input"
    />
  );
};

const FileRow: React.FC<{ file: File; deleteRow: (file: File) => void }> = ({
  file,
  deleteRow,
}) => {
  const nameParts = file.name.split("-");
  const [department, courseCode, term, typeAndFormat] = nameParts;
  const type = typeAndFormat?.split(".")[0];

  // assume that if a type could be extracted, the name started in the correct format
  const preformattedNameExists = !!type;

  return (
    <tr key={file.name}>
      <td className="file-name">{file.name}</td>
      <td>
        <input
          className="file-department"
          placeholder="MATH"
          defaultValue={preformattedNameExists ? department : undefined}
        />
      </td>
      <td className="file-course-code">
        <input
          className="file-department"
          placeholder="135"
          defaultValue={preformattedNameExists ? courseCode : undefined}
        />
      </td>
      <td className="file-term-number">
        <input
          placeholder={currentTerm().toString()}
          defaultValue={
            preformattedNameExists ? term : currentTerm().toString()
          }
        />
      </td>
      <td className="file-type">
        <input
          placeholder="MIDTERM"
          defaultValue={preformattedNameExists ? type : undefined}
        />
      </td>
      <td>
        <ClientButton
          variant="pink"
          size="small"
          onClick={() => deleteRow(file)}
        >
          Cancel
        </ClientButton>
      </td>
    </tr>
  );
};
