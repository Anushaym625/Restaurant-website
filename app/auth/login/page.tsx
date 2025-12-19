"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Lock, User, Shield, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    // Default to customer, no state needed for role switching anymore
    const role = "customer";

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full" />
            </div>

            <div className="w-full max-w-md p-8 glass-card relative z-10 mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-white/60">Sign in to your account</p>
                </div>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(role);
                    }}
                >
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="block w-full text-center py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-white/40">
                        Don't have an account? <Link href="/auth/register" className="text-white hover:underline font-bold">Sign up</Link>
                    </p>


                </div>
            </div>
        </div>
    );
}
