"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-dark-900">
            <div className="w-full max-w-md p-8 glass-card border border-white/10 mx-4">
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Check your email</h2>
                        <p className="text-white/60 mb-8">
                            We have sent a password reset link to your email address.
                        </p>
                        <Link href="/auth/login" className="text-primary font-bold hover:underline">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                            <p className="text-white/60">Enter your email to reset your password</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-white/60 uppercase ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <button className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg">
                                Send Reset Link
                            </button>

                            <div className="text-center">
                                <Link href="/auth/login" className="text-sm text-white/60 hover:text-white flex items-center justify-center gap-2">
                                    <ArrowLeft size={16} /> Back to Login
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
