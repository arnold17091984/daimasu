import {createReader} from '@keystatic/core/reader';
import config from '../../../../../keystatic.config';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Markdoc from '@markdoc/markdoc';
import React from 'react';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();
  return posts.map((post) => ({slug: post.slug}));
}

export default async function PostPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    notFound();
  }

  const content = await post.content();
  const transformed = Markdoc.transform(content.node);
  const rendered = Markdoc.renderers.react(transformed, React, {
    components: {}
  });

  return (
    <div className="min-h-screen bg-neutral-950 py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          href={`/${locale}/posts`}
          className="mb-8 inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to posts
        </Link>

        <article>
          {post.coverImage && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-white">{post.title}</h1>
            {post.publishedDate && (
              <p className="text-neutral-500">
                {new Date(post.publishedDate).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
            {post.summary && (
              <p className="mt-4 text-lg text-neutral-400">{post.summary}</p>
            )}
          </header>

          <div className="prose prose-invert prose-amber max-w-none prose-headings:text-white prose-p:text-neutral-300 prose-a:text-amber-500 prose-strong:text-white prose-code:text-amber-400">
            {rendered}
          </div>
        </article>
      </div>
    </div>
  );
}
