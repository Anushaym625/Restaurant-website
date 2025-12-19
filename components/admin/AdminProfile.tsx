"use client";

import { LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AdminProfile() {
    const { logout, user } = useAuth();
    const role = user?.role;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Header */}
            <div className="glass-card p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-32 h-32 rounded-full bg-dark-800 mx-auto mb-6 border-4 border-primary/50 p-1 relative z-10 shadow-xl shadow-primary/20">
                    <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60"
                        alt="Admin"
                        className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-dark-900 rounded-full" title="Online" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight mb-2">Vrindhana Manager</h2>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold border border-primary/20">
                    <Shield size={14} /> {role === 'admin' ? 'Super Administrator' : 'Staff Member'}
                </div>

                <p className="text-white/40 text-sm mt-4 max-w-sm mx-auto">
                    Manage your restaurant settings, menu, orders, and staff access from this secure dashboard.
                </p>
            </div>

            {/* Security Settings */}
            <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <div className="p-2 bg-white/5 rounded-lg">
                        <Shield className="text-primary" size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Security Settings</h3>
                        <p className="text-xs text-white/40">Update your password and security preferences</p>
                    </div>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Confirm Password</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none transition-colors" />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-lg transition-all hover:scale-[1.01]">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            {/* Sign Out Action */}
            <button
                onClick={logout}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 border border-red-500/20 group shadow-lg shadow-red-500/5"
            >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Sign Out Securely
            </button>
        </div>
    );
}
