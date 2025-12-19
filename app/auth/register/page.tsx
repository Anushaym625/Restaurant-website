"use client";

import Link from "next/link";
import { Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50 pointer-events-none" />

            <div className="w-full max-w-md p-8 glass-card relative z-10 mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-white/60">Join Vrindhana today</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
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

                    <Link href="/dashboard" className="block w-full text-center py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg mt-2">
                        Create Account
                    </Link>
                </form>

                <div className="mt-8 text-center text-sm text-white/40">
                    Already have an account? <Link href="/auth/login" className="text-primary hover:underline font-bold">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
