"use client";

import { currentTerm } from "@/app/resources/exam-bank/util";
import React, { useRef, useState } from "react";
import "./exam-uploads.scss";
import { Button } from "@/app/components/button/button";
import { voidAction } from "@/app/util/exam-actions";

export const ExamUploads: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="exam-uploads">
      <UploadElement files={files} setFiles={setFiles} />
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
              {files.map((file) => {
                return (
                  <tr key={file.name}>
                    <td className="file-name">{file.name}</td>
                    <td>
                      <input className="file-department" placeholder="MATH" />
                    </td>
                    <td className="file-course-code">
                      <input className="file-department" placeholder="135" />
                    </td>
                    <td className="file-term-number">
                      <input
                        placeholder={currentTerm().toString()}
                        defaultValue={currentTerm().toString()}
                      />
                    </td>
                    <td className="file-type">
                      <input placeholder="MIDTERM" />
                    </td>
                    <td>
                      <Button variant="pink" size="small" href="/">
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Button action={voidAction} variant="pink">
            {`Upload ${files.length} files`}
          </Button>
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
