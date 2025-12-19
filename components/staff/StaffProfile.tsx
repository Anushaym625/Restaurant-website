"use client";

import { useAuth } from "@/context/AuthContext";
import { Shield, LogOut, Key, User } from "lucide-react";

export function StaffProfile() {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Staff Profile</h1>
                <p className="text-white/60">Manage your account settings.</p>
            </div>

            <div className="glass-card p-8 space-y-8">
                {/* User Info */}
                <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user?.name || "Staff Member"}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Shield size={14} className="text-blue-400" />
                            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">{user?.role || "Worker"}</span>
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Key size={18} className="text-primary" />
                        Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/40 uppercase">New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/40 uppercase">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm">
                        Update Password
                    </button>
                </div>

                {/* Logout */}
                <div className="pt-8 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-red-900/10"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
