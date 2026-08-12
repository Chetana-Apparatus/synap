import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    cmsBlogApi,
    getBlogAuthorName,
    getBlogDate,
    getBlogStaticHeroImage,
    type CmsBlog,
} from '@/lib/cms';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPageProps {
    params: Promise<{
        id: string; // Dynamic route parameter (CMS slug)
    }>;
}

// Disable caching to ensure fresh data
export const dynamic = 'force-dynamic';

async function fetchBlogWithIndex(slug: string): Promise<{ blog: CmsBlog; imageIndex: number } | null> {
    try {
        const blogRes = await cmsBlogApi.getAll(1, 1000);
        const blogs = (blogRes.blogs || []).sort(
            (a, b) => new Date(getBlogDate(b)).getTime() - new Date(getBlogDate(a)).getTime()
        );
        const imageIndex = blogs.findIndex((b) => b.slug === slug);
        const blog = blogs[imageIndex] ?? (await cmsBlogApi.getBySlug(slug));
        if (!blog?.title) return null;
        return { blog, imageIndex: imageIndex >= 0 ? imageIndex : 0 };
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { id: slug } = await params;
    const result = await fetchBlogWithIndex(slug);

    if (!result?.blog?.title) {
        return {
            title: 'Blog Not Found | SynapCare',
        };
    }

    const { blog, imageIndex } = result;
    const title = blog.metaTitle || `${blog.title} | SynapCare Blog`;
    const description = blog.metaDescription || blog.shortDescription || undefined;
    const image = getBlogStaticHeroImage(imageIndex);
    const keywords = [
        ...(blog.tags || []),
        ...(blog.focusKeyPhrase || []),
    ].filter(Boolean);

    return {
        title,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,
        openGraph: {
            title: blog.metaTitle || blog.title,
            description,
            type: 'article',
            url: `/blog/${blog.slug}`,
            images: image ? [image] : [],
            publishedTime: blog.publishDate || blog.displayDate || blog.createdAt,
            tags: blog.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.metaTitle || blog.title,
            description,
            images: image ? [image] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
    const { id: slug } = await params;
    const result = await fetchBlogWithIndex(slug);

    if (!result) {
        notFound();
    }

    const { blog, imageIndex } = result;
    const heroImage = getBlogStaticHeroImage(imageIndex);
    const publishedAt = getBlogDate(blog);
    const authorName = getBlogAuthorName(blog);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <article className="container mx-auto px-4 max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                    </Link>

                    <div className="space-y-6 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-4 text-muted-foreground border-y py-4 border-primary/10">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <span>{authorName}</span>
                        </div>
                    </div>

                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-lg bg-muted">
                        <img
                            src={heroImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl">
                        {/*
              Using dangerouslySetInnerHTML because CMS content is authored as HTML.
              Content is rendered exactly as received to preserve rich text structure.
            */}
                        <div
                            className="blog-content leading-relaxed text-foreground"
                            dangerouslySetInnerHTML={{ __html: blog.body || '' }}
                        />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
