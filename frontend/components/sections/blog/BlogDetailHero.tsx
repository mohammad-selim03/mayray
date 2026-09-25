"use client";

import React from "react";
import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { BlogPostItem } from "./FeaturedPost";
import { PostByline } from "./PostByline";

export const BlogDetailHero: React.FC<{ post: BlogPostItem }> = ({ post }) => {
  return (
    <section className="relative mx-auto w-full max-w-[1170px] px-4 pt-12 sm:px-6 lg:px-0 lg:pt-[85px]">
      <AnimateIn>
        <h1 className="max-w-[970px] text-[36px] font-bold leading-[1.2] text-[#18181b] sm:text-[48px] lg:text-[56px]">
          {post.title}
        </h1>
        <PostByline post={post} />
      </AnimateIn>
      <div className="relative mt-10 aspect-[970/450] w-full max-w-[970px] overflow-hidden bg-[#e4e4e7]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 970px"
          className="object-cover"
        />
      </div>
    </section>
  );
};
