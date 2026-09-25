import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPost } from "@/lib/getBlogPost";
import { getCmsDocument } from "@/lib/cms/getCmsDocument";
import { toBlogPostItem } from "@/lib/blogPostItem";
import { BlogDetailClient } from "./BlogDetailClient";
import { BlogNewsletterCTA } from "@/components/sections/blog/BlogNewsletterCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, content] = await Promise.all([getBlogPost(slug), getCmsDocument("blog")]);
  const suffix = content.posts.titleSuffix ? ` | ${content.posts.titleSuffix}` : "";

  if (!post) {
    return { title: `Article Not Found${suffix}` };
  }

  const title = post.metaTitle || `${post.title}${suffix}`;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [apiPost, content] = await Promise.all([getBlogPost(slug), getCmsDocument("blog")]);
  if (!apiPost) {
    notFound();
  }
  const post = toBlogPostItem(apiPost, content.posts);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f4f4f5] text-[#18181b]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[822px] overflow-hidden">
        <Image src="/blog/bg-top.webp" alt="" fill sizes="100vw" className="object-cover object-top" priority />
      </div>
      <div className="relative z-10 pt-9">
        <Navbar />
        <BlogDetailClient post={post} />
        <div className="relative pt-20 pb-[130px]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-138px] -z-10 h-[822px] overflow-hidden">
            <Image src="/blog/bg-bottom.webp" alt="" fill sizes="100vw" className="object-cover object-top" />
          </div>
          <BlogNewsletterCTA />
        </div>
        <Footer />
      </div>
    </main>
  );
}
