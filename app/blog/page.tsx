import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
    cmsBlogApi,
    cmsCategoryApi,
    getBlogDate,
    getBlogStaticHeroImage,
} from '@/lib/cms';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, ChevronRight } from 'lucide-react';
import { CategoryDropdown } from '@/components/blog/category-dropdown';
import { BlogSearch } from '@/components/blog/blog-search';

export const metadata: Metadata = {
    title: 'Blog | SynapCare Rehabilitation Center',
    description: 'Stay updated with the latest news, articles, and health tips from SynapCare Rehabilitation Center.',
    openGraph: {
        title: 'Blog | SynapCare Rehabilitation Center',
        description: 'Stay updated with the latest news, articles, and health tips from SynapCare Rehabilitation Center.',
        type: 'website',
    },
};

// Disable caching to ensure fresh data
export const dynamic = 'force-dynamic';

interface BlogListPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogListPage(props: BlogListPageProps) {
    const searchParams = await props.searchParams;
    let blogs: Awaited<ReturnType<typeof cmsBlogApi.getAll>>['blogs'] = [];
    let categories: Awaited<ReturnType<typeof cmsCategoryApi.getAll>>['categories'] = [];
    const categoryId = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
    const searchQuery = (searchParams?.search as string)?.toLowerCase() || '';

    try {
        const catRes = await cmsCategoryApi.getAll(1, 100);
        categories = catRes.categories || [];

        const blogRes = await cmsBlogApi.getAll(1, 1000);
        let rawBlogs = blogRes.blogs || [];

        // Redirect to home if no blogs are found at all (all deleted)
        if (rawBlogs.length === 0) {
            redirect('/');
        }

        rawBlogs = rawBlogs.filter((b) => {
            const matchesCategory = !categoryId || b.categoryId === categoryId;
            const matchesSearch =
                !searchQuery ||
                b.title?.toLowerCase().includes(searchQuery) ||
                b.shortDescription?.toLowerCase().includes(searchQuery) ||
                b.tags?.some((tag) => tag.toLowerCase().includes(searchQuery));

            return matchesCategory && matchesSearch;
        });

        blogs = rawBlogs.sort(
            (a, b) => new Date(getBlogDate(b)).getTime() - new Date(getBlogDate(a)).getTime()
        );
    } catch (error) {
        console.error('Failed to fetch blog data:', error);
    }

    const getCategoryName = (id?: string) => {
        return categories.find((c) => c.id === id)?.name;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <section className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Blog</h1>
                        <p className="text-lg text-muted-foreground">
                            Insights, updates, and expert advice from the SynapCare team.
                        </p>
                    </div>


                    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto mb-16 items-start">
                        <div className="flex-grow w-full">
                            <BlogSearch />
                        </div>
                        <div className="w-full md:w-80">
                            <CategoryDropdown categories={categories} currentCategoryId={categoryId} />
                        </div>
                    </div>

                    <div className={blogs.length === 1 ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    key={blog.id}
                                    className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${blogs.length === 1 ? 'max-w-md w-full' : ''}`}
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={getBlogStaticHeroImage(blog.slug)}
                                            alt={blog.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"

                                        />
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(getBlogDate(blog)).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            {blog.categoryId && (
                                                <span className="bg-primary/5 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                                    {getCategoryName(blog.categoryId)}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-xl font-bold text-primary mb-4 line-clamp-2 group-hover:text-primary/80 transition-colors">
                                            {blog.title}
                                        </h2>

                                        <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                                            {blog.shortDescription}
                                        </p>

                                        <div className="flex items-center text-primary font-semibold">
                                            Read More <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-xl text-muted-foreground">No blog posts found. Check back later!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
