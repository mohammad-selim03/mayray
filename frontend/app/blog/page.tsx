import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts } from "@/lib/getBlogPost";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { getCmsPageMetadata } from "@/lib/cms/getCmsPageMetadata";
import { toBlogPostItem } from "@/lib/blogPostItem";
import { BlogListClient } from "./BlogListClient";
import { BlogNewsletterCTA } from "@/components/sections/blog/BlogNewsletterCTA";

export async function generateMetadata(): Promise<Metadata> {
  return getCmsPageMetadata("blog");
}

export default async function BlogPage() {
  const [posts, content] = await Promise.all([getBlogPosts(20), getCmsDocument("blog")]);

  // getBlogPosts falls back to the default posts, so there is always something to feature.
  const [featuredPost = null, ...cardPosts] = posts.map((p) => toBlogPostItem(p, content.posts));
  const { allLabel, categories, emptyText } = content.listing;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f4f4f5] text-[#18181b]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[822px] overflow-hidden">
        <Image src="/blog/bg-top.webp" alt="" fill sizes="100vw" className="object-cover object-top" priority />
      </div>
      <div className="relative z-10 pt-9">
        <Navbar />
        <BlogListClient
          posts={cardPosts}
          featuredPost={featuredPost}
          allLabel={allLabel}
          categories={categories.map((c) => c.name)}
          emptyText={emptyText}
        />
        <div className="relative py-[120px]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-108px] -z-10 h-[822px] overflow-hidden">
            <Image src="/blog/bg-bottom.webp" alt="" fill sizes="100vw" className="object-cover object-top" />
          </div>
          <BlogNewsletterCTA />
        </div>
        <Footer />
      </div>
    </main>
  );
}
