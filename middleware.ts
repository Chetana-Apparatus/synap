import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public admin routes that don't require authentication
    const publicAdminRoutes = [
        '/admin/login',
        '/admin/forgot-password',
        '/admin/reset-password'
    ];

    // Protect all /admin routes except public ones
    if (pathname.startsWith('/admin') && !publicAdminRoutes.includes(pathname)) {
        // Note: Middleware runs on server, can't access localStorage
        // Client-side authentication check will be done in the component
        // This middleware just ensures the route structure is correct

        // You can add cookie-based auth check here if needed
        // For now, we'll let the client-side handle auth
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
