"use client";

import React, { useState, useMemo } from "react";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogPostItem } from "@/components/sections/blog/FeaturedPost";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";

const normalizeCategory = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");

interface BlogListClientProps {
  posts: BlogPostItem[];
  featuredPost: BlogPostItem | null;
  /** The tab that shows every post. */
  allLabel: string;
  categories: string[];
  emptyText: string;
}

export const BlogListClient: React.FC<BlogListClientProps> = ({ posts, featuredPost, allLabel, categories, emptyText }) => {
  const [selectedCategory, setSelectedCategory] = useState(allLabel);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory === allLabel) return true;
      return normalizeCategory(post.category) === normalizeCategory(selectedCategory);
    });
  }, [posts, selectedCategory, allLabel]);

  return (
    <div className="relative">
      <BlogHero
        featuredPost={featuredPost}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={[allLabel, ...categories]}
      />
      <BlogGrid posts={filteredPosts} emptyText={emptyText} />
    </div>
  );
};
