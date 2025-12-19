"use client";

import Link from "next/link";
import { Phone, Lock, Briefcase, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function StaffLoginPage() {
    const { login } = useAuth();

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-dark-900">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
            </div>

            <div className="w-full max-w-md p-8 glass-card relative z-10 mx-4 border-primary/20">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
                        <Briefcase className="text-primary w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Staff Portal</h1>
                    <p className="text-white/60">Restricted Access for Employees</p>
                </div>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login("worker");
                    }}
                >
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Staff ID / Phone</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="STF-2024-001"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Access Code</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                        <Link href="/auth/login" className="text-white/40 hover:text-white flex items-center gap-1">
                            <ArrowLeft size={12} /> Back to Home
                        </Link>
                        <Link href="#" className="text-primary hover:underline">Forgot Code?</Link>
                    </div>

                    <button
                        type="submit"
                        className="block w-full text-center py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        Enter Portal
                    </button>
                </form>
            </div>
        </div>
    );
}
