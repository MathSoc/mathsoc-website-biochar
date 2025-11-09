"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import "./markdown-section.scss";
import remarkToc from "remark-toc";
import { useEffect, useState } from "react";

export const MarkdownSection: React.FC<{ src: string }> = ({ src }) => {
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [src]);

  return (
    <div className="markdown-section">
      <div className="inner-contents">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkToc]}
          rehypePlugins={[rehypeSlug]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};
