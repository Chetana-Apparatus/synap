import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogApi, getImageUrl } from '@/lib/api';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPageProps {
    params: {
        id: string; // Dynamic route parameter
    };
}

// Disable caching to ensure fresh data
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const response = await blogApi.getById(parseInt(id));
        const blog = response.blog || response.data || response;

        if (!blog || !blog.title) {
            return {
                title: 'Blog Not Found | SynapCare',
            };
        }

        return {
            title: `${blog.title} | SynapCare Blog`,
            description: blog.shortDescription,
            openGraph: {
                title: blog.title,
                description: blog.shortDescription,
                type: 'article',
                images: blog.image ? [blog.image] : [],
                publishedTime: blog.createdAt,
            },
        };
    } catch (error) {
        return {
            title: 'Error | SynapCare',
        };
    }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
    const { id } = await params;
    let blog = null;

    try {
        const response = await blogApi.getById(parseInt(id));
        // console.log("Blog API Response:", response); // Uncomment for debugging

        if (response) {
            blog = response.blog || response.data || response;
            // Verify it looks like a blog (has title)
            if (!blog || !blog.title) blog = null;
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
    }

    if (!blog) {
        notFound();
    }


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
                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <span>SynapCare Health Team</span>
                        </div>
                    </div>

                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-lg bg-muted">
                        <img
                            src={blog.image ? getImageUrl(blog.image) : "/images/Placeholder%20image.png"}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl">
                        {/* 
              Using dangerouslySetInnerHTML because we allowed HTML content in the admin dashboard.
              In a production app with user-generated content, you'd want to sanitize this (e.g., with DOMPurify).
            */}
                        <div
                            className="blog-content leading-relaxed text-foreground"
                            dangerouslySetInnerHTML={{ __html: blog.longDescription }}
                        />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
