import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import "./markdown-page.scss";

export const MarkdownPage: React.FC<{ markdownFilePath: string }> = async ({
  markdownFilePath,
}) => {
  const contents = await readFile(path.join(process.cwd(), markdownFilePath));

  return (
    <div className="markdown-page">
      <div className="inner-contents">
        <ReactMarkdown children={contents.toString()} />
      </div>
    </div>
  );
};
