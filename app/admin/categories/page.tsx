"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryApi } from "@/lib/api";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, ArrowLeft, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
}

export default function CategoryManagementPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        fetchCategories();
    }, [page]);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            // Note: Update to handle { categories: [], meta: { total: ... } } response
            const res = await categoryApi.getAll(page, limit);

            if (res.categories || res.data) {
                setCategories(res.categories || res.data);
                setTotal(res.meta?.total || res.total || 0);
            }
        } catch (error: any) {
            console.error("Failed to fetch categories:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = () => {
        setCategoryName("");
        setCurrentId(null);
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (category: Category) => {
        setCategoryName(category.name);
        setCurrentId(category.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            await categoryApi.delete(id);
            fetchCategories();
        } catch (error: any) {
            alert(error.message || "Failed to delete category");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing && currentId) {
                await categoryApi.update(currentId, categoryName);
            } else {
                await categoryApi.create(categoryName);
            }

            setShowForm(false);
            fetchCategories();
        } catch (error: any) {
            alert(error.message || "Failed to save category");
        }
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <AuthGuard>
            <div className="min-h-screen bg-muted/20 p-6">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-primary">Categories</h1>
                                <p className="text-muted-foreground">Manage blog categories</p>
                            </div>
                        </div>
                        <Button onClick={handleCreate} className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/80">
                            <Plus className="mr-2 h-4 w-4" /> New Category
                        </Button>
                    </div>

                    {/* List */}
                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {categories.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                                    <p className="text-muted-foreground">No categories found. Create your first one!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {categories.map((category) => (
                                        <Card key={category.id} className="border-primary/5 shadow-sm hover:border-primary/20 transition-all">
                                            <div className="flex items-center justify-between p-4">
                                                <span className="font-medium text-lg">{category.name}</span>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)} className="rounded-full">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)} className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/5">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 py-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="rounded-full"
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="rounded-full"
                                    >
                                        Next <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Form Overlay */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <Card className="w-full max-w-md shadow-2xl">
                            <CardHeader className="flex flex-row items-center justify-between border-b bg-white">
                                <CardTitle>{isEditing ? "Edit Category" : "New Category"}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)} className="rounded-full">
                                    <X className="h-5 w-5" />
                                </Button>
                            </CardHeader>
                            <form onSubmit={handleSubmit}>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cat-name">Category Name</Label>
                                        <Input
                                            id="cat-name"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            required
                                            placeholder="e.g. Health, Fitness, Updates"
                                            className="rounded-xl"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t bg-muted/10 flex justify-end gap-3 p-6">
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="rounded-full px-8 bg-gradient-to-r from-primary to-primary/80">
                                        {isEditing ? "Update" : "Create"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                )}
            </div>
        </AuthGuard>
    );
}
