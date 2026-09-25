import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteDataProvider, EMPTY_SITE_DATA } from "@/lib/SiteDataContext";
import { getBlogPosts } from "@/lib/getBlogPost";
import { getPageContent } from "@/lib/getPageContent";
import { PageContentProvider } from "@/lib/PageContentContext";
import { BlogListClient } from "./BlogListClient";
import { BlogNewsletterCTA } from "@/components/sections/blog/BlogNewsletterCTA";
import { FIGMA_CATEGORIES } from "@/lib/blogFallbackData";

export const metadata = {
  title: "Blog | Mayray AI",
  description:
    "Discover actionable strategies, technical breakdowns, and industry case studies on scaling business operations with autonomous AI agents.",
};

export default async function BlogPage() {
  const [posts, pageContent] = await Promise.all([
    getBlogPosts(20),
    getPageContent("blog")
  ]);

  const blogPostItems = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "",
    readTime: p.readTime || "5 min read",
    author: {
      name: p.author || "Jamie Ruiz",
      role: "AI Automation Team",
      avatar: (p.author || "JR")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    },
    image: p.image || "/blogs/real-estate-gap.jpg",
  }));

  // getBlogPosts falls back to the default posts, so there is always something to feature.
  const [featuredPost = null, ...cardPosts] = blogPostItems;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f4f4f5] text-[#18181b]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[822px] overflow-hidden">
        <Image src="/blog/bg-top.webp" alt="" fill sizes="100vw" className="object-cover object-top" priority />
      </div>
      <SiteDataProvider value={EMPTY_SITE_DATA}>
        <div className="relative z-10 pt-9">
          <Navbar />
          <PageContentProvider value={pageContent}>
            <BlogListClient
              posts={cardPosts}
              featuredPost={featuredPost}
              categories={FIGMA_CATEGORIES}
            />
          </PageContentProvider>
          <div className="relative py-[120px]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-108px] -z-10 h-[822px] overflow-hidden">
              <Image src="/blog/bg-bottom.webp" alt="" fill sizes="100vw" className="object-cover object-top" />
            </div>
            <BlogNewsletterCTA />
          </div>
          <Footer />
        </div>
      </SiteDataProvider>
    </main>
  );
}
