"use client";
import Link from "next/link";
import { useSiteData } from "../../lib/SiteDataContext";
import type { HomeBlogContent } from "../../lib/cms/schema/documents/pages/home";
import { AnimateIn } from "../ui/AnimateIn";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Post = { image: string; title: string; body: string; slug?: string; id?: string };

const FALLBACK_IMAGES = ["/blogs/blog1.png", "/blogs/blog2.png", "/blogs/blog3.png"];

export const Blog = ({ content }: { content: HomeBlogContent }) => {
  const headline = content.title;
  const displayCount = Number(content.count);
  const serverPosts = useSiteData().blog;
  const mapPost = (p: { id: string; slug: string; image: string | null; title: string; excerpt: string }, i: number): Post => ({
    id: p.id,
    slug: p.slug,
    image: p.image ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    title: p.title,
    body: p.excerpt,
  });
  const posts: Post[] = serverPosts.map(mapPost);

  const displayedPosts = posts.slice(0, displayCount);
  const hasMorePosts = posts.length > displayCount;

  return (
    <section className="relative pb-[120px]">
      <Image
        src={content.background?.url ?? "/blogbg.png"}
        alt={content.background?.alt ?? ""}
        fill
        sizes="100vw"
        unoptimized={content.background?.url.endsWith(".svg")}
        className="object-cover object-bottom -z-10"
        priority={false}
      />
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-0">
        <AnimateIn>
          <div className="pt-24 flex items-center justify-between gap-4">
            <h2 className="text-[40px] font-semibold sm:text-[56px] lg:text-[64px]">{headline}</h2>
            {hasMorePosts && (
              <Link
                href="/blog"
                className="flex items-center gap-2 px-6 py-3 bg-[#13a0e7] text-white rounded-lg hover:bg-[#0f8ec4] transition-colors font-medium whitespace-nowrap"
              >
                {content.moreLabel}
                <ChevronRight size={20} />
              </Link>
            )}
          </div>
        </AnimateIn>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {displayedPosts.map((post, idx) => (
            <AnimateIn key={post.title} delay={idx * 0.2} direction="up">
              <article>
                <Link href={post.slug ? `/blog/${post.slug}` : "/blog"} className="group block space-y-6">
                  <div className="overflow-hidden rounded-2xl shadow-md border border-black/5 relative h-[300px]">
                    <Image
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      src={post.image}
                    />
                  </div>
                  <h3 className="text-[20px] font-medium leading-[1.2] group-hover:text-[#13a0e7] transition-colors sm:text-[24px] line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-[#44403c]">{post.body}</p>
                  <motion.div
                    className="w-10 h-1 bg-[#13a0e7] rounded-full"
                    whileInView={{ width: [40, 100, 40] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};
