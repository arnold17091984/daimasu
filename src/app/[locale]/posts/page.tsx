import {createReader} from '@keystatic/core/reader';
import config from '../../../../keystatic.config';
import Image from 'next/image';
import Link from 'next/link';

const reader = createReader(process.cwd(), config);

export default async function PostsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const posts = await reader.collections.posts.all();

  return (
    <div className="min-h-screen bg-neutral-950 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-white">
          Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-neutral-400">
            <p className="mb-4">No posts yet.</p>
            <p>
              Go to{' '}
              <a
                href="/keystatic"
                className="text-amber-500 underline hover:text-amber-400"
              >
                /keystatic
              </a>{' '}
              to create your first post.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/posts/${post.slug}`}
                className="group overflow-hidden rounded-lg bg-neutral-900 transition-transform hover:scale-[1.02]"
              >
                {post.entry.coverImage && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={post.entry.coverImage}
                      alt={post.entry.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-semibold text-white group-hover:text-amber-500">
                    {post.entry.title}
                  </h2>
                  {post.entry.publishedDate && (
                    <p className="mb-3 text-sm text-neutral-500">
                      {new Date(post.entry.publishedDate).toLocaleDateString(
                        locale,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }
                      )}
                    </p>
                  )}
                  {post.entry.summary && (
                    <p className="line-clamp-3 text-neutral-400">
                      {post.entry.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
