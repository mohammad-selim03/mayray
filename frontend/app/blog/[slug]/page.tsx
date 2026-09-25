import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteDataProvider, EMPTY_SITE_DATA } from "@/lib/SiteDataContext";
import { getBlogPost } from "@/lib/getBlogPost";
import { getPageContent } from "@/lib/getPageContent";
import { PageContentProvider } from "@/lib/PageContentContext";
import { BlogDetailClient } from "./BlogDetailClient";
import { BlogNewsletterCTA } from "@/components/sections/blog/BlogNewsletterCTA";
import type { BlogPostItem } from "@/components/sections/blog/FeaturedPost";
import type { ApiBlogPost } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    return { title: "Article Not Found | Mayray AI Blog" };
  }

  return {
    title: `${post.title} | Mayray AI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function fromApi(p: ApiBlogPost): BlogPostItem {
  const author = p.author || "Mayray AI Team";
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "",
    readTime: p.readTime || "5 min read",
    author: { name: author, role: "Mayray AI Team", avatar: initials(author) },
    image: p.image || "/blogs/real-estate-gap.jpg",
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [apiPost, pageContent] = await Promise.all([
    getBlogPost(slug),
    getPageContent("blog_detail")
  ]);

  const post = apiPost ? fromApi(apiPost) : null;

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f4f4f5] text-[#18181b]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[822px] overflow-hidden">
        <Image src="/blog/bg-top.webp" alt="" fill sizes="100vw" className="object-cover object-top" priority />
      </div>
      <SiteDataProvider value={EMPTY_SITE_DATA}>
        <div className="relative z-10 pt-9">
          <Navbar />
          <PageContentProvider value={pageContent}>
            <BlogDetailClient post={post} />
          </PageContentProvider>
          <div className="relative pt-20 pb-[130px]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-138px] -z-10 h-[822px] overflow-hidden">
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
