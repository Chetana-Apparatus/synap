'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function BlogSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');

    // Update query if URL search param changes
    useEffect(() => {
        setQuery(searchParams.get('search') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
            params.set('search', query.trim());
        } else {
            params.delete('search');
        }
        router.push(`/blog?${params.toString()}`);
    };

    const clearSearch = () => {
        setQuery('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-primary/60 px-1 uppercase tracking-wider">
                    Search Articles
                </label>
                <form onSubmit={handleSearch} className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search articles by title or keyword..."
                        className="w-full bg-white border-2 border-primary/5 rounded-2xl px-12 py-4 text-base font-medium text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm hover:shadow-md"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary/40 group-hover:text-primary/60 transition-colors">
                        <Search className="h-5 w-5" />
                    </div>
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary/40 hover:text-primary/60 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
