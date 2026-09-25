import React from "react";
import { BlogPostItem } from "./FeaturedPost";

type H2Block = { type: "h2"; text: string };
type H3Block = { type: "h3"; text: string };
type Block = H2Block | H3Block | { type: "p"; lines: string[] } | { type: "ul"; items: string[] };

type Subsection = { heading: H3Block; blocks: Block[] };
type Section = { heading?: H2Block; items: (Block | Subsection)[] };

const H2 = "text-[26px] font-semibold leading-[1.2] text-[#26272b] sm:text-[32px]";
const H3 = "text-[20px] font-medium leading-[1.2] text-[#3f3f46] sm:text-[24px]";
const BODY = "text-[16px] leading-[1.6] text-[#70707b] sm:text-[18px]";
const LIST = "list-disc pl-[27px]";

const HTML_STYLES = [
  BODY,
  "[&_h1]:text-[32px] [&_h1]:font-semibold [&_h1]:leading-[1.2] [&_h1]:text-[#26272b]",
  "[&_h2]:text-[26px] sm:[&_h2]:text-[32px] [&_h2]:font-semibold [&_h2]:leading-[1.2] [&_h2]:text-[#26272b]",
  "[&_h3]:text-[20px] sm:[&_h3]:text-[24px] [&_h3]:font-medium [&_h3]:leading-[1.2] [&_h3]:text-[#3f3f46]",
  "[&_ul]:list-disc [&_ul]:pl-[27px] [&_ol]:list-decimal [&_ol]:pl-[27px]",
  "[&_a]:text-[#13a0e7] [&_a]:underline [&_strong]:font-semibold [&_strong]:text-[#3f3f46]",
  "[&_img]:h-auto [&_img]:max-w-full [&_blockquote]:border-l-2 [&_blockquote]:border-[#13a0e7] [&_blockquote]:pl-4",
  "[&>*+*]:mt-4 [&>:is(h1,h2):not(:first-child)]:mt-10 [&>h3:not(:first-child)]:mt-6 [&>h3+*]:mt-3",
].join(" ");

const LIST_ITEM = /^[-*]\s+/;

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of content.replace(/\r\n/g, "\n").split(/\n\s*\n/)) {
    const text = chunk.trim();
    if (!text || /^#\s/.test(text)) continue;
    if (text.startsWith("### ")) { blocks.push({ type: "h3", text: text.slice(4).trim() }); continue; }
    if (text.startsWith("## ")) { blocks.push({ type: "h2", text: text.slice(3).trim() }); continue; }

    let para: string[] = [];
    let list: string[] = [];
    const flush = () => {
      if (para.length) blocks.push({ type: "p", lines: para });
      if (list.length) blocks.push({ type: "ul", items: list });
      para = [];
      list = [];
    };
    for (const line of text.split("\n").map((l) => l.trim()).filter(Boolean)) {
      if (LIST_ITEM.test(line)) {
        if (para.length) flush();
        list.push(line.replace(LIST_ITEM, ""));
      } else {
        if (list.length) flush();
        para.push(line);
      }
    }
    flush();
  }
  return blocks;
}

function groupSections(blocks: Block[]): Section[] {
  const sections: Section[] = [{ items: [] }];
  let sub: Subsection | null = null;
  for (const block of blocks) {
    const section = sections[sections.length - 1];
    if (block.type === "h2") {
      sections.push({ heading: block, items: [] });
      sub = null;
    } else if (block.type === "h3") {
      sub = { heading: block, blocks: [] };
      section.items.push(sub);
    } else if (sub) {
      sub.blocks.push(block);
    } else {
      section.items.push(block);
    }
  }
  return sections.filter((s) => s.heading || s.items.length);
}

function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[#3f3f46]">{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

function renderBlock(block: Block, key: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={key} className={H2}>{block.text}</h2>;
    case "h3":
      return <h3 key={key} className={H3}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={key} className={`${BODY} ${LIST}`}>
          {block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      );
    case "p":
      return (
        <p key={key} className={BODY}>
          {block.lines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {renderInline(line)}
            </React.Fragment>
          ))}
        </p>
      );
  }
}

const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

export const BlogDetailContent: React.FC<{ post: BlogPostItem }> = ({ post }) => {
  const content = post.content?.trim() || post.excerpt;

  return (
    <article className="mx-auto mt-10 w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
      {isHtml(content) ? (
        <div className={`max-w-[900px] ${HTML_STYLES}`} dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div className="flex max-w-[900px] flex-col gap-10">
          {groupSections(parseBlocks(content)).map((section, si) => (
            <section key={si} className="flex flex-col gap-4">
              {section.heading && renderBlock(section.heading, -1)}
              {section.items.map((item, ii) =>
                "blocks" in item ? (
                  <div key={ii} className="flex flex-col gap-3">
                    {renderBlock(item.heading, -1)}
                    {item.blocks.map(renderBlock)}
                  </div>
                ) : (
                  renderBlock(item, ii)
                )
              )}
            </section>
          ))}
        </div>
      )}
    </article>
  );
};
