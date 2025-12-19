"use client";

import { useState, useEffect } from "react";
import { BarChart, Users, ShoppingBag, DollarSign, Calendar, Settings, Edit, Bell, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminMenuManagement } from "@/components/admin/AdminMenuManagement";
import { AdminReservations } from "@/components/admin/AdminReservations";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminProfile } from "@/components/admin/AdminProfile";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminNotifications } from "@/components/admin/AdminNotifications";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h2>
                    <p className="text-white/60">You do not have permission to view this page.</p>
                    <button onClick={() => router.push("/dashboard")} className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg">Go to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex text-white relative">
            {/* Sidebar */}
            <aside className="w-64 bg-black/50 backdrop-blur border-r border-white/10 flex-shrink-0 fixed h-full z-20 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tighter">
                        VRINDHANA<span className="text-primary">.</span> <span className="text-xs text-white/40 block mt-1 font-normal tracking-normal">Admin Panel</span>
                    </h1>
                </div>
                <nav className="px-4 space-y-2">
                    {[
                        { id: "overview", icon: LayoutDashboard, label: "Overview" },
                        { id: "orders", icon: ShoppingBag, label: "Orders" },
                        { id: "menu", icon: Edit, label: "Menu Management" },
                        { id: "bookings", icon: Calendar, label: "Reservations" },
                        { id: "settings", icon: Settings, label: "Settings" },
                        { id: "profile", icon: Users, label: "Profile" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                activeTab === item.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-white/60 hover:text-white hover:bg-white/10 hover:pl-5 transition-all duration-300"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
                        <span className="md:hidden"><LayoutDashboard /></span>
                        {activeTab}
                    </h2>
                    <div className="flex items-center gap-4">
                        <AdminNotifications />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-bold text-white">Admin User</div>
                                <div className="text-xs text-white/40">Super Admin</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/10 relative group cursor-pointer" onClick={() => setActiveTab("profile")}>
                                <img src="https://i.pravatar.cc/100?img=33" alt="Admin" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {activeTab === "overview" && <AdminOverview onNavigate={setActiveTab} />}
                {activeTab === "orders" && <AdminOrders />}
                {activeTab === "menu" && <AdminMenuManagement />}
                {activeTab === "bookings" && <AdminReservations />}
                {activeTab === "settings" && <AdminSettings />}
                {activeTab === "profile" && <AdminProfile />}

            </main>
        </div>
    );
}
