"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, blogApi, categoryApi, getImageUrl } from "@/lib/api";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, LogOut, Loader2, X, Upload, Search } from "lucide-react";
import { RichTextEditor } from "@/components/blog/rich-text-editor";


interface Blog {
    id: number;
    title: string;
    shortDescription: string;
    longDescription: string;
    categoryId: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'blogs' | 'categories'>('blogs');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [blogSearch, setBlogSearch] = useState("");

    // Blog Form State
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [isEditingBlog, setIsEditingBlog] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState<number | null>(null);
    const [blogFormData, setBlogFormData] = useState({
        title: "",
        shortDescription: "",
        longDescription: "",
        categoryId: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Category Form State
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);
    const [categoryName, setCategoryName] = useState("");

    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const blogRes = await blogApi.getAll(1, 100);
            if (blogRes.success) {
                setBlogs(blogRes.blogs || blogRes.data || []);
            } else if (Array.isArray(blogRes)) {
                setBlogs(blogRes);
            } else if (blogRes.data && Array.isArray(blogRes.data)) {
                setBlogs(blogRes.data);
            }

            const catRes = await categoryApi.getAll(1, 100);
            if (catRes.success) {
                setCategories(catRes.categories || catRes.data || []);
            } else if (Array.isArray(catRes)) {
                setCategories(catRes);
            } else if (catRes.data && Array.isArray(catRes.data)) {
                setCategories(catRes.data);
            }
        } catch (error: any) {
            console.error("Failed to fetch data", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlogCreate = () => {
        setBlogFormData({ title: "", shortDescription: "", longDescription: "", categoryId: "" });
        setImageFile(null);
        setImagePreview("");
        setCurrentBlogId(null);
        setIsEditingBlog(false);
        setShowBlogForm(true);
    };

    const handleBlogEdit = (blog: Blog) => {
        setBlogFormData({
            title: blog.title,
            shortDescription: blog.shortDescription,
            longDescription: blog.longDescription,
            categoryId: blog.categoryId.toString(),
        });
        setImagePreview(blog.image);
        setImageFile(null);
        setCurrentBlogId(blog.id);
        setIsEditingBlog(true);
        setShowBlogForm(true);
    };

    const handleBlogDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            await blogApi.delete(id);
            setBlogs(prev => prev.filter(b => b.id !== id));
        } catch (error: any) {
            alert(error.message || "Failed to delete blog");
        }
    };

    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!blogFormData.categoryId) {
                throw new Error("Please select a category");
            }
            if (!blogFormData.longDescription || blogFormData.longDescription === "<br>" || blogFormData.longDescription === "<div><br></div>") {
                throw new Error("Please enter the full content");
            }

            const submitData = {
                title: blogFormData.title,
                shortDescription: blogFormData.shortDescription,
                longDescription: blogFormData.longDescription,
                categoryId: parseInt(blogFormData.categoryId),
                image: imageFile || undefined
            };

            if (isEditingBlog && currentBlogId) {
                await blogApi.update(currentBlogId, submitData);
            } else {
                await blogApi.create({ ...submitData, image: imageFile });
            }
            setShowBlogForm(false);
            fetchData();
        } catch (error: any) {
            console.error("Blog submit error:", error);
            if (error.message.includes("Unauthorized")) {
                alert("Your session has expired. Please log in again.");
                authApi.logout();
                router.push("/admin/login");
                return;
            }
            alert(error.message || "Failed to save blog");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                if (img.width !== 300 || img.height !== 300) {
                    alert(`Validation Error: Image must be exactly 300x300 pixels.\nDetected size: ${img.width}x${img.height}px`);
                    e.target.value = '';
                    URL.revokeObjectURL(url);
                    return;
                }
                setImageFile(file);
                setImagePreview(url);
            };
            img.onerror = () => {
                alert("Failed to load image file.");
                URL.revokeObjectURL(url);
            };
            img.src = url;
        }
    };

    const handleCategoryCreate = () => {
        setCategoryName("");
        setCurrentCategoryId(null);
        setIsEditingCategory(false);
        setShowCategoryForm(true);
    };

    const handleCategoryEdit = (category: Category) => {
        setCategoryName(category.name);
        setCurrentCategoryId(category.id);
        setIsEditingCategory(true);
        setShowCategoryForm(true);
    };

    const handleCategoryDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await categoryApi.delete(id);
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (error: any) {
            alert(error.message || "Failed to delete category");
        }
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditingCategory && currentCategoryId) {
                await categoryApi.update(currentCategoryId, categoryName);
            } else {
                await categoryApi.create(categoryName);
            }
            setShowCategoryForm(false);
            fetchData();
        } catch (error: any) {
            alert(error.message || "Failed to save category");
        }
    };

    const handleLogout = () => {
        authApi.logout();
        router.push("/admin/login");
    };

    const getCategoryName = (id?: number) => {
        if (!id) return "Unknown";
        return categories.find(c => c.id === id)?.name || "Unknown";
    };

    const filteredBlogs = blogs.filter(b =>
        b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.shortDescription.toLowerCase().includes(blogSearch.toLowerCase())
    );

    return (
        <AuthGuard>
            <div className="min-h-screen bg-muted/20 p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-primary/5 gap-6">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
                            <p className="text-muted-foreground">Manage blogs and categories</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {/* Tabs */}
                            <div className="bg-muted p-1 rounded-full flex shrink-0">
                                <Button
                                    onClick={() => setActiveTab('blogs')}
                                    variant={activeTab === 'blogs' ? 'secondary' : 'ghost'}
                                    className="rounded-full px-6 cursor-pointer"
                                >
                                    Blogs
                                </Button>
                                <Button
                                    onClick={() => setActiveTab('categories')}
                                    variant={activeTab === 'categories' ? 'secondary' : 'ghost'}
                                    className="rounded-full px-6 cursor-pointer"
                                >
                                    Categories
                                </Button>
                            </div>

                            {/* Search (only for blogs) */}
                            {activeTab === 'blogs' && (
                                <div className="relative w-full sm:w-64">
                                    <Input
                                        placeholder="Search articles..."
                                        value={blogSearch}
                                        onChange={(e) => setBlogSearch(e.target.value)}
                                        className="pl-9 h-10 rounded-full bg-muted/5 border-none focus-visible:ring-primary/20"
                                    />
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                        <Search className="h-4 w-4" />
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <Button
                                onClick={activeTab === 'blogs' ? handleBlogCreate : handleCategoryCreate}
                                className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all cursor-pointer"
                            >
                                <Plus className="mr-2 h-4 w-4" /> New {activeTab === 'blogs' ? 'Article' : 'Category'}
                            </Button>

                            <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full text-muted-foreground hover:text-destructive shrink-0 cursor-pointer">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-xs uppercase font-semibold text-muted-foreground">
                                        <tr>
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">{activeTab === 'blogs' ? 'Title' : 'Name'}</th>
                                            <th className="px-6 py-4 text-center">Created At</th>
                                            {activeTab === 'blogs' && <th className="px-6 py-4">Category</th>}
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {activeTab === 'blogs' ? (
                                            filteredBlogs.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No blogs found.</td>
                                                </tr>
                                            ) : (
                                                filteredBlogs.map((blog) => (
                                                    <tr key={blog.id} className="hover:bg-muted/5 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => handleBlogEdit(blog)} className="font-medium text-primary hover:underline cursor-pointer">
                                                                #{blog.id}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                                                    <img
                                                                        src={blog.image ? getImageUrl(blog.image) : "/images/Placeholder%20image.png"}
                                                                        alt=""
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <span className="line-clamp-1">{blog.title}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-muted-foreground text-center">
                                                            {new Date(blog.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">
                                                                {getCategoryName(blog.categoryId)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleBlogEdit(blog)} className="h-8 w-8 rounded-full cursor-pointer">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleBlogDelete(blog.id)} className="h-8 w-8 rounded-full text-destructive cursor-pointer">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        ) : (
                                            categories.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No categories found.</td>
                                                </tr>
                                            ) : (
                                                categories.map((cat) => (
                                                    <tr key={cat.id} className="hover:bg-muted/5 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => handleCategoryEdit(cat)} className="font-medium text-primary hover:underline cursor-pointer">
                                                                #{cat.id}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium">{cat.name}</td>
                                                        <td className="px-6 py-4 text-muted-foreground text-center">
                                                            {new Date(cat.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button variant="ghost" size="icon" onClick={() => handleCategoryEdit(cat)} className="h-8 w-8 rounded-full cursor-pointer">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" onClick={() => handleCategoryDelete(cat.id)} className="h-8 w-8 rounded-full text-destructive cursor-pointer">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Blog Modal */}
            {showBlogForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl bg-white">
                        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                            <CardTitle>{isEditingBlog ? "Edit Article" : "New Article"}</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setShowBlogForm(false)} className="rounded-full cursor-pointer">
                                <X className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <form onSubmit={handleBlogSubmit} className="flex-1 overflow-y-auto">
                            <CardContent className="p-6 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={blogFormData.title}
                                                onChange={e => setBlogFormData({ ...blogFormData, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <select
                                                value={blogFormData.categoryId}
                                                onChange={e => setBlogFormData({ ...blogFormData, categoryId: e.target.value })}
                                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Featured Image</Label>
                                        <div className="border border-dashed p-4 rounded-md text-center cursor-pointer" onClick={() => document.getElementById('blog-img')?.click()}>
                                            {imagePreview ? (
                                                <img src={imagePreview.startsWith('blob:') ? imagePreview : getImageUrl(imagePreview)} className="max-h-32 mx-auto object-contain" />
                                            ) : (
                                                <div className="py-8"><Upload className="mx-auto h-8 w-8 text-muted-foreground" /></div>
                                            )}
                                            <input type="file" id="blog-img" hidden onChange={handleImageChange} accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Short Description</Label>
                                    <Textarea
                                        value={blogFormData.shortDescription}
                                        onChange={e =>
                                            setBlogFormData({
                                                ...blogFormData,
                                                shortDescription: e.target.value,
                                            })
                                        }
                                        rows={2} required placeholder="Brief summary..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Full Content</Label>
                                    <RichTextEditor
                                        value={blogFormData.longDescription}
                                        onChange={value =>
                                            setBlogFormData({
                                                ...blogFormData,
                                                longDescription: value,
                                            })
                                        }
                                        minHeight="300px"
                                        placeholder="Write your article content here (supports formatting and copy-paste)..."
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/5 flex justify-end gap-2 px-6 py-4">
                                <Button type="button" variant="outline" onClick={() => setShowBlogForm(false)} className="cursor-pointer">Cancel</Button>
                                <Button type="submit" className="cursor-pointer">{isEditingBlog ? "Update" : "Publish"}</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md shadow-2xl bg-white">
                        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                            <CardTitle>{isEditingCategory ? "Edit Category" : "New Category"}</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setShowCategoryForm(false)} className="rounded-full cursor-pointer">
                                <X className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <form onSubmit={handleCategorySubmit}>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label>Category Name</Label>
                                    <Input value={categoryName} onChange={e => setCategoryName(e.target.value)} required placeholder="e.g. Technology" />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/5 flex justify-end gap-2 px-6 py-4">
                                <Button type="button" variant="outline" onClick={() => setShowCategoryForm(false)} className="cursor-pointer">Cancel</Button>
                                <Button type="submit" className="cursor-pointer">{isEditingCategory ? "Update" : "Create"}</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            )}
        </AuthGuard>
    );
}
