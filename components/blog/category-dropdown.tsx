'use client';

import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface Category {
    id: string | number;
    name: string;
}

interface CategoryDropdownProps {
    categories: Category[];
    currentCategoryId?: string | number;
}

export function CategoryDropdown({ categories, currentCategoryId }: CategoryDropdownProps) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'all') {
            router.push('/blog');
        } else {
            router.push(`/blog?category=${value}`);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-primary/60 px-1 uppercase tracking-wider">
                    Filter by Category
                </label>
                <div className="relative group">
                    <select
                        value={currentCategoryId?.toString() || 'all'}
                        onChange={handleChange}
                        className="w-full appearance-none bg-white border-2 border-primary/5 rounded-2xl px-6 py-4 pr-12 text-base font-semibold text-primary focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <option value="all">All Article Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none text-primary/40 group-hover:text-primary/60 transition-colors">
                        <ChevronDown className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
