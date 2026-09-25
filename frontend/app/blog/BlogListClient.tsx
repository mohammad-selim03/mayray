"use client";

import React, { useState, useMemo } from "react";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogPostItem } from "@/components/sections/blog/FeaturedPost";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";

const normalizeCategory = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");

interface BlogListClientProps {
  posts: BlogPostItem[];
  featuredPost: BlogPostItem | null;
  categories: string[];
}

export const BlogListClient: React.FC<BlogListClientProps> = ({
  posts,
  featuredPost,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory === "All") return true;
      return normalizeCategory(post.category) === normalizeCategory(selectedCategory);
    });
  }, [posts, selectedCategory]);

  return (
    <div className="relative">
      <BlogHero
        featuredPost={featuredPost}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <BlogGrid posts={filteredPosts} />
    </div>
  );
};
