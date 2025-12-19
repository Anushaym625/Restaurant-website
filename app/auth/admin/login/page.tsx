"use client";

import Link from "next/link";
import { Lock, Shield, ArrowLeft, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
    const { login } = useAuth();

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black" />
            </div>

            <div className="w-full max-w-md p-8 glass-card relative z-10 mx-4 border-red-500/20">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                        <Shield className="text-red-500 w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Admin Control</h1>
                    <p className="text-red-400/80 text-sm font-bold uppercase tracking-widest">Authorized Personnel Only</p>
                </div>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login("admin");
                    }}
                >
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Admin User</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="admin@vrindhana.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-red-500/50 outline-none focus:ring-1 focus:ring-red-500/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-white/60 uppercase ml-1">Secure Key</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-red-500/50 outline-none focus:ring-1 focus:ring-red-500/50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                        <Link href="/auth/login" className="text-white/40 hover:text-white flex items-center gap-1">
                            <ArrowLeft size={12} /> Back to Home
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="block w-full text-center py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 cursor-pointer"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
}
