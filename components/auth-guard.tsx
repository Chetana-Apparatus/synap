"use client";

import { useEffect, useState } from 'react';
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
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authenticated = authApi.isAuthenticated();
        setIsAuthenticated(authenticated);
        setIsCheckingAuth(false);

        if (!authenticated) {
            router.push('/admin/login');
        }
    }, [router]);

    // Keep initial markup stable across server and client.
    if (isCheckingAuth || !isAuthenticated) {
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
