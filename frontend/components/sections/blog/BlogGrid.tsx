"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPostItem } from "./FeaturedPost";
import { AnimateIn } from "@/components/ui/AnimateIn";

interface BlogGridProps {
  posts: BlogPostItem[];
  emptyText: string;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, emptyText }) => {
  return (
    <section className="relative z-10 mx-auto mt-[35px] w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
      {posts.length === 0 ? (
        <p className="rounded-2xl bg-white py-16 text-center text-[16px] text-[#70707b]">
          {emptyText}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post, idx) => (
            <AnimateIn key={post.id} delay={idx * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="flex flex-col-reverse gap-6 rounded-2xl bg-white px-6 py-4 md:min-h-[282px] md:pr-7 md:flex-row md:items-center md:justify-between md:gap-0">
                  <div className="md:w-[718px] md:max-w-[calc(100%-400px)] md:pr-8">
                    <p className="pt-[5px] pb-[13px] text-[14px] leading-[16.9px] text-[#51525c]">{post.category}</p>
                    <h2 className="max-w-[654px] text-[24px] font-semibold leading-[1.2] text-[#3f3f46] transition-colors group-hover:text-[#13a0e7] md:text-[32px]">
                      {post.title}
                    </h2>
                    <p className="max-w-[654px] pt-3 text-[16px] leading-[1.6] text-[#70707b] line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-[14px] pt-[18px] text-[14px] leading-[16.9px] text-[#a0a0ab]">
                      <span>{post.readTime}</span>
                      {post.date && (
                        <>
                          <span aria-hidden className="size-[3px] rounded-full bg-[#a0a0ab]" />
                          <span>{post.date}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="relative aspect-[8/5] w-full shrink-0 overflow-hidden rounded-2xl md:h-[250px] md:w-[400px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </article>
              </Link>
            </AnimateIn>
          ))}
        </div>
      )}
    </section>
  );
};
