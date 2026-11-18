import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOGS } from '@/lib/blogs-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPageProps {
    params: Promise<{
        id: string; // Dynamic route parameter (blog slug)
    }>;
}

export function generateStaticParams() {
    return BLOGS.map((blog) => ({ id: blog.slug }));
}

async function findBlog(params: BlogPageProps['params']) {
    const { id } = await params;
    // Old CMS links had a leading space in the slug (/blog/%20adult-...).
    const slug = decodeURIComponent(id).trim();
    return BLOGS.find((blog) => blog.slug === slug);
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const blog = await findBlog(params);

    if (!blog) {
        return {
            title: 'Blog Not Found | SynapCare',
        };
    }

    const title = blog.metaTitle || `${blog.title} | SynapCare Blog`;
    const description = blog.metaDescription || blog.shortDescription || undefined;
    const image = blog.image;
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
            publishedTime: blog.publishDate,
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
    const blog = await findBlog(params);

    if (!blog) {
        notFound();
    }

    const heroImage = blog.image;
    const publishedAt = blog.displayDate;
    const authorName = 'SynapCare Health Team';

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

                    <div
                        className="blog-content text-base md:text-lg"
                        dangerouslySetInnerHTML={{ __html: blog.body || '' }}
                    />
                </article>
            </main>

            <Footer />
        </div>
    );
}
