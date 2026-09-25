import React from "react";
import { BlogPostItem } from "./FeaturedPost";

const Dot = () => <span aria-hidden className="size-[3px] shrink-0 rounded-full bg-[#a0a0ab]" />;

export const PostByline: React.FC<{ post: BlogPostItem; className?: string }> = ({ post, className = "" }) => {
  const parts = [post.author.name, post.readTime, post.date].filter(Boolean);
  return (
    <div className={`flex flex-wrap items-center gap-[14px] pt-6 ${className}`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#13a0e7] text-[12px] leading-[18px] text-white">
        {post.author.avatar}
      </span>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Dot />}
          <span className="text-[13px] leading-[19.5px] text-[#70707b]">{part}</span>
        </React.Fragment>
      ))}
    </div>
  );
};
