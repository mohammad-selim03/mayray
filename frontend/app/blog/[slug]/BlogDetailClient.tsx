"use client";

import React, { useEffect } from "react";
import { BlogDetailHero } from "@/components/sections/blog/BlogDetailHero";
import { BlogDetailContent } from "@/components/sections/blog/BlogDetailContent";
import { BlogPostItem } from "@/components/sections/blog/FeaturedPost";
import { api } from "@/lib/api";

export const BlogDetailClient: React.FC<{ post: BlogPostItem }> = ({ post }) => {
  useEffect(() => {
    api.blog.trackView(post.id);
  }, [post.id]);

  return (
    <>
      <BlogDetailHero post={post} />
      <BlogDetailContent post={post} />
    </>
  );
};
