"use client";

import { currentTerm } from "@/app/resources/exam-bank/util";
import React, { useRef, useState } from "react";
import "./exam-uploads.scss";
import { Button } from "@/app/components/button/button.client";
import { Centered } from "@/app/components/layout/layout-components";
import { regenerateExamsListAction } from "../../actions";
import { toast } from "react-toastify";

export const ExamUploads: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setUploading] = useState<boolean>(false);

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const uploadFiles = async () => {
    const rows = Array.from(document.querySelectorAll(".exam-file-upload-row"));

    const formData = new FormData();

    const namesMap = rows.map((row) => constructFilenameFromRow(row));
    formData.append("names", JSON.stringify(namesMap));

    for (const { originalFileName } of namesMap) {
      const file = files.find((f) => f.name === originalFileName)!;

      formData.append(`files`, file);
    }

    setUploading(true);
    await fetch("/api/exams", { method: "POST", body: formData });
    await regenerateExamsListAction();

    setFiles([]);

    toast(`Exams uploaded!`);
    location.reload();

    setUploading(false);
  };

  const constructFilenameFromRow = (row: Element) => {
    // extract into helper
    const originalFileName = (
      row.querySelector(".file-name") as HTMLInputElement
    ).innerText;

    // @todo require all fields be filled; maybe make each row a form?
    const department = (
      row.querySelector(".file-department") as HTMLInputElement
    ).value;
    const courseCode = (
      row.querySelector(".file-course-code") as HTMLInputElement
    ).value;
    const term = (row.querySelector(".file-term-number") as HTMLInputElement)
      .value;
    const type = (row.querySelector(".file-type") as HTMLInputElement).value;
    const isSolution = (row.querySelector(".file-is-sol") as HTMLInputElement)
      .checked;

    return {
      originalFileName,
      constructedFileName: `${department}-${courseCode}-${term}-${type}${isSolution ? "-sol" : ""}`,
    };
  };

  return (
    <div className="exam-uploads">
      <Centered>
        <UploadElement
          files={files}
          setFiles={setFiles}
          disabled={isUploading}
        />
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
                <th>Is Solution</th>
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
            <Button onClick={uploadFiles} variant="pink" disabled={isUploading}>
              {`Upload ${files.length} file${files.length === 1 ? "" : "s"}`}
            </Button>
          </Centered>
        </>
      ) : null}
    </div>
  );
};

const UploadElement: React.FC<{
  files: File[];
  setFiles: (files: File[]) => void;
  disabled: boolean;
}> = ({ files, setFiles, disabled }) => {
  const inputElement = useRef<HTMLInputElement>(null);

  return (
    <input
      type="file"
      ref={inputElement}
      name="file"
      accept=".pdf"
      disabled={(files.length ?? 0) > 0 || disabled}
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
  const nameParts = file.name.toLowerCase().split("-");
  const [department, courseCode, term, ...typeAndFormat] = nameParts;
  const type = typeAndFormat?.join("-").replace("-sol", "").split(".")[0];
  const isSolution: boolean = typeAndFormat.join("-").includes("-sol");

  // assume that if a type could be extracted, the name started in the correct format
  const preformattedNameExists = !!type;

  return (
    <tr key={file.name} className="exam-file-upload-row">
      <td className="file-name">{file.name}</td>
      <td>
        <input
          className="file-department"
          placeholder="MATH"
          defaultValue={preformattedNameExists ? department : undefined}
        />
      </td>
      <td>
        <input
          className="file-course-code"
          placeholder="135"
          defaultValue={preformattedNameExists ? courseCode : undefined}
        />
      </td>
      <td>
        <input
          className="file-term-number"
          placeholder={currentTerm().toString()}
          defaultValue={
            preformattedNameExists ? term : currentTerm().toString()
          }
        />
      </td>
      <td>
        <input
          className="file-type"
          placeholder="MIDTERM"
          defaultValue={preformattedNameExists ? type : undefined}
        />
      </td>
      <td>
        <input
          className="file-is-sol"
          type="checkbox"
          defaultChecked={preformattedNameExists ? isSolution : false}
        />
      </td>
      <td>
        <Button variant="pink" size="small" onClick={() => deleteRow(file)}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};
