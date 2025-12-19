"use client";

import { Home, ClipboardList, UtensilsCrossed, Square, User } from "lucide-react";

interface StaffSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function StaffSidebar({ activeTab, setActiveTab }: StaffSidebarProps) {
    const menuItems = [
        { id: "overview", label: "Overview", icon: Home },
        { id: "reservations", label: "Reservations", icon: ClipboardList },
        { id: "orders", label: "Live Orders", icon: UtensilsCrossed },
        { id: "tables", label: "Tables", icon: Square },
        { id: "profile", label: "Profile", icon: User },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 pt-24 pb-8 px-4 hidden md:flex flex-col z-40 bg-black/40 backdrop-blur-xl">
            <div className="mb-8 px-4">
                <h2 className="text-xl font-bold text-white tracking-tight">Staff Portal</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Floor & Kitchen</p>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-white" : "text-white/40 group-hover:text-white transition-colors"} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="px-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5">
                    <p className="text-xs text-white/40 mb-2 font-bold uppercase">Shift Status</p>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Active
                    </div>
                </div>
            </div>
        </aside>
    );
}
