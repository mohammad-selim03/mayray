"use client";

import React from "react";
import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, Sparkles, User } from "lucide-react";

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
}

interface FeaturedPostProps {
  post: BlogPostItem;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <section className="bg-[#0b0b12] py-8 text-white">
      <div className="mx-auto max-w-[1235px] px-4 sm:px-6 lg:px-8">
        
        <AnimateIn>
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Featured Article Spotlight</h2>
          </div>

          <Link href={`/blog/${post.slug}`} className="block">
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#141422] transition-all hover:border-[#13a0e7]/40 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-0">
                
                {/* Image side */}
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141422] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141422]" />
                  
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#13a0e7] px-3.5 py-1 text-xs font-bold text-white shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    {post.category}
                  </div>
                </div>

                {/* Text side */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-4">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#13a0e7]" /> {post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#13a0e7]" /> {post.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold leading-[1.25] text-white group-hover:text-[#13a0e7] transition-colors sm:text-3xl">
                      {post.title}
                    </h3>

                    <p className="mt-4 text-sm leading-[1.7] text-gray-300">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#13a0e7]/20 border border-[#13a0e7]/30 flex items-center justify-center text-lg font-bold text-[#13a0e7]">
                        {post.author.avatar ? post.author.avatar : <User className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{post.author.name}</p>
                        <p className="text-[11px] text-gray-400">{post.author.role}</p>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-[#13a0e7] group-hover:border-[#13a0e7] transition-all">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                </div>

              </div>
            </article>
          </Link>
        </AnimateIn>

      </div>
    </section>
  );
};
