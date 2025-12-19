"use client";

import { useState } from "react";
import { Users } from "lucide-react";

// Generate 15 tables
const INITIAL_TABLES = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    capacity: i < 5 ? 2 : i < 10 ? 4 : 6,
    status: ["occupied", "available", "available", "occupied", "available"][i % 5] as "occupied" | "available"
}));

export function StaffTables() {
    const [tables, setTables] = useState(INITIAL_TABLES);

    const toggleStatus = (id: number) => {
        setTables(prev => prev.map(t =>
            t.id === id ? { ...t, status: t.status === "occupied" ? "available" : "occupied" } : t
        ));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Table Management</h1>
                <p className="text-white/60">Tap a table to toggle its occupancy status.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tables.map((table) => (
                    <button
                        key={table.id}
                        onClick={() => toggleStatus(table.id)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 relative group overflow-hidden ${table.status === "occupied"
                                ? "bg-red-500/20 border-2 border-red-500/50 hover:bg-red-500/30"
                                : "bg-green-500/10 border-2 border-green-500/30 hover:bg-green-500/20"
                            }`}
                    >
                        {/* Status Indicator Dot */}
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${table.status === "occupied" ? "bg-red-500 animate-pulse" : "bg-green-500"
                            }`} />

                        <div className="text-3xl font-bold text-white">{table.id}</div>

                        <div className="flex items-center gap-1 text-xs font-medium text-white/50">
                            <Users size={12} />
                            <span>{table.capacity} Seats</span>
                        </div>

                        <div className={`mt-2 text-xs font-bold uppercase px-2 py-0.5 rounded ${table.status === "occupied" ? "bg-red-500 text-white" : "bg-green-500/20 text-green-400"
                            }`}>
                            {table.status}
                        </div>
                    </button>
                ))}
            </div>

            <div className="glass-card p-6 flex justify-around">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border-2 border-green-500/30"></div>
                    <div>
                        <p className="font-bold text-white">Available</p>
                        <p className="text-xs text-white/40">Ready for guests</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 border-2 border-red-500/50"></div>
                    <div>
                        <p className="font-bold text-white">Occupied</p>
                        <p className="text-xs text-white/40">Guests seated</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
