"use client";

import React from "react";
import Link from "next/link";
import { BlogPostItem } from "./FeaturedPost";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { PostByline } from "./PostByline";

interface BlogHeroProps {
  featuredPost: BlogPostItem | null;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export const BlogHero: React.FC<BlogHeroProps> = ({
  featuredPost: post,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <section className="relative mx-auto w-full max-w-[1170px] px-4 pt-12 sm:px-6 lg:px-0 lg:pt-[85px]">
      {post && (
        <Link
          href={`/blog/${post.slug}`}
          className="group grid gap-6 lg:grid-cols-[717px_1fr] lg:gap-4"
        >
          <AnimateIn>
            <h1 className="text-[36px] font-bold leading-[1.2] text-[#18181b] transition-colors group-hover:text-[#13a0e7] sm:text-[48px] lg:text-[56px]">
              {post.title}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="max-w-[437px] text-[16px] leading-[1.6] text-[#51525c] sm:text-[18px]">
              {post.excerpt}
            </p>
            <PostByline post={post} className="mt-5" />
          </AnimateIn>
        </Link>
      )}

      <AnimateIn delay={0.15}>
        <div className="mt-10 flex flex-wrap items-center gap-2 lg:mt-[73px]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer rounded-full border px-5 py-[9px] text-[16px] font-medium leading-[19.4px] transition-colors ${
                  isActive
                    ? "border-white bg-[#ebf8ff] text-[#13a0e7]"
                    : "border-[#e7e5e4] bg-[#fcfcfc] text-[#26272b] shadow-[0_4px_4px_rgba(0,0,0,0.02)] hover:border-[#d6d3d1]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </AnimateIn>
    </section>
  );
};
