import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import remarkGemoji from "remark-gemoji";

export function CustomMarkdown({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown
        children={content}
        remarkPlugins={[
          remarkGfm,
          remarkToc,
          remarkEmoji,
          remarkMath,
          remarkGemoji,
        ]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
      />
    </div>
  );
}
