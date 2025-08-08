import { readFile } from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown-section.scss";

export const MarkdownSection: React.FC<{ src: string }> = async ({ src }) => {
  const contents = await readFile(path.join(process.cwd(), src));

  return (
    <div className="markdown-section">
      <div className="inner-contents">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contents.toString()}
        </ReactMarkdown>
      </div>
    </div>
  );
};
