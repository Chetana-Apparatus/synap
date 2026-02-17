// Example: Using the API utility in a component
// This shows how to refactor existing code to use lib/api.ts

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authApi } from "@/lib/api"; // Import the API utility

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AdminLoginPageExample() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // BEFORE: Using direct fetch
    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     try {
    //         const response = await fetch("/api/admin/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email, password }),
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //             router.push("/admin/dashboard");
    //         } else {
    //             alert(data.message || "Invalid credentials");
    //         }
    //     } catch (error) {
    //         alert("An error occurred. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // AFTER: Using API utility (Much cleaner!)
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Call the API using the utility function
        const response = await authApi.login(email, password);

        if (response.success) {
            // Show warning if using development fallback
            if (response.data?.warning) {
                alert(response.data.warning);
            }
            router.push("/admin/dashboard");
        } else {
            setError(response.error || "Invalid credentials");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md shadow-lg border-primary/10">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Admin Login
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Using API Utility Example
                    </p>
                </CardHeader>

                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@synap.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-xl pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full rounded-full py-5"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>

                        <div className="text-center text-sm">
                            <a
                                href="/admin/forgot-password"
                                className="text-primary hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
