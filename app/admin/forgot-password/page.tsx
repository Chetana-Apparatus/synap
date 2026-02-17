"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authApi } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [step, setStep] = useState<"email" | "otp" | "reset">("email");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ===============================
    // STEP 1 - SEND OTP
    // ===============================
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await authApi.forgotPassword(email);
            setStep("otp");
        } catch (error: any) {
            alert(error.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    // ===============================
    // OTP INPUT HANDLING
    // ===============================
    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            prev?.focus();
        }
    };

    // ===============================
    // STEP 2 - VERIFY OTP
    // ===============================
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Note: Your backend combines OTP verification with password reset
        // So we just move to the next step here
        // The actual verification happens in handleResetPassword
        setStep("reset");
        setIsLoading(false);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be 8-12 characters, include 1 uppercase letter, 1 number, and 1 special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setPasswordError("");
        setIsLoading(true);

        try {
            const fullOtp = otp.join("");
            await authApi.resetPassword(email, fullOtp, password);
            alert('Password updated successfully');
            router.push('/admin/login');
        } catch (error: any) {
            setPasswordError(error.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md shadow-lg border-primary/10">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">
                        Forgot Password
                    </CardTitle>
                    <CardDescription>
                        {step === "email" && "Enter your registered email"}
                        {step === "otp" && "Enter the 6-digit OTP sent to your email"}
                        {step === "reset" && "Create a new password"}
                    </CardDescription>
                </CardHeader>

                {/* ===============================
            STEP 1 - EMAIL
        =============================== */}
                {step === "email" && (
                    <form onSubmit={handleSendOtp}>
                        <CardContent className="space-y-6 pb-2">
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="pt-6">
                            <Button
                                type="submit"
                                className="w-full rounded-full py-5 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </CardFooter>
                    </form>
                )}

                {/* ===============================
            STEP 2 - OTP
        =============================== */}
                {step === "otp" && (
                    <form onSubmit={handleVerifyOtp}>
                        <CardContent className="space-y-6 pb-2">
                            <div className="text-center space-y-4">
                                <Label>Enter 6 Digit OTP</Label>

                                <div className="flex justify-center gap-3">
                                    {otp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) =>
                                                handleOtpChange(e.target.value, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                            className="w-12 h-12 text-center text-lg font-semibold rounded-xl"
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-6">
                            <Button
                                type="submit"
                                className="w-full rounded-full py-5 cursor-pointer"
                                disabled={isLoading || otp.some((d) => d === "")}
                            >
                                {isLoading ? "Verifying..." : "Verify OTP"}
                            </Button>
                        </CardFooter>
                    </form>
                )}

                {/* ===============================
            STEP 3 - RESET PASSWORD
        =============================== */}
                {step === "reset" && (
                    <form onSubmit={handleResetPassword}>
                        <CardContent className="space-y-6 pb-2">
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError("");
                                        }}
                                        required
                                        className="rounded-xl pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>

                                {passwordError && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {passwordError}
                                    </p>
                                )}

                                <p className="text-xs text-muted-foreground mt-1">
                                    8–12 characters, 1 uppercase letter, 1 number,
                                    1 special character.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Confirm Password</Label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="pt-6">
                            <Button
                                type="submit"
                                className="w-full rounded-full py-5 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Password"}
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    );
}
