"use client";

import { CheckCircle, Clock, Utensils, Users } from "lucide-react";

export function StaffOverview() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-white/60">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute right-[-10px] top-[-10px] bg-primary/20 w-20 h-20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
                    <div>
                        <p className="text-white/60 text-sm font-bold uppercase mb-1">Active Orders</p>
                        <h3 className="text-3xl font-bold text-white">6</h3>
                    </div>
                    <Utensils className="text-primary absolute right-6 bottom-6 opacity-50" size={24} />
                </div>

                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute right-[-10px] top-[-10px] bg-blue-500/20 w-20 h-20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all" />
                    <div>
                        <p className="text-white/60 text-sm font-bold uppercase mb-1">Upcoming Reservations</p>
                        <h3 className="text-3xl font-bold text-white">4</h3>
                    </div>
                    <Clock className="text-blue-500 absolute right-6 bottom-6 opacity-50" size={24} />
                </div>

                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute right-[-10px] top-[-10px] bg-green-500/20 w-20 h-20 rounded-full blur-xl group-hover:bg-green-500/30 transition-all" />
                    <div>
                        <p className="text-white/60 text-sm font-bold uppercase mb-1">Tables Occupied</p>
                        <h3 className="text-3xl font-bold text-white">8 <span className="text-white/40 text-lg">/ 15</span></h3>
                    </div>
                    <Users className="text-green-500 absolute right-6 bottom-6 opacity-50" size={24} />
                </div>
            </div>

            {/* Tasks List */}
            <div className="glass-card p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ClipboardCheckIcon className="text-primary" size={20} />
                    Pending Tasks
                </h2>
                <div className="space-y-4">
                    <TaskItem text="Check Table 4 - Customer Requesting Bill" priority="high" />
                    <TaskItem text="Prepare Table 7 for Reservation (7:30 PM)" priority="medium" />
                    <TaskItem text="Clean Table 2" priority="low" />
                    <TaskItem text="Restock Napkins Station B" priority="low" />
                </div>
            </div>
        </div>
    );
}

function TaskItem({ text, priority }: { text: string; priority: "high" | "medium" | "low" }) {
    const priorityColor =
        priority === "high" ? "bg-red-500/20 text-red-400 border-red-500/30" :
            priority === "medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                "bg-white/10 text-white/60 border-white/10";

    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{text}</span>
            </div>
            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${priorityColor}`}>
                {priority} Priority
            </span>
        </div>
    );
}

function ClipboardCheckIcon({ className, size }: { className?: string; size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="m9 14 2 2 4-4" />
        </svg>
    );
}
