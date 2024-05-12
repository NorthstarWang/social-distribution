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
    <div className="prose dark:prose-invert mx-auto max-w-[360px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[900px] 2xl:max-w-[1100px]">
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkToc,
          remarkEmoji,
          remarkMath,
          remarkGemoji,
        ]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

