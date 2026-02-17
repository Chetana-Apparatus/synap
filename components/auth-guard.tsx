"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * AuthGuard Component
 * Protects routes by checking if user is authenticated
 * Redirects to login if not authenticated
 */
export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        if (!authApi.isAuthenticated()) {
            // Redirect to login
            router.push('/admin/login');
        }
    }, [router]);

    // If not authenticated, don't render children
    if (!authApi.isAuthenticated()) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
}
