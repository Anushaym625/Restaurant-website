"use client";

import { useState } from "react";
import { Users, Clock, CheckCircle, ArrowRight } from "lucide-react";

const START_RESERVATIONS = [
    { id: 1, name: "Arjun Reddy", time: "19:00", guests: 4, table: "", status: "Pending" },
    { id: 2, name: "Priya Sharma", time: "19:30", guests: 2, table: "4", status: "Arrived" },
    { id: 3, name: "Rahul Verma", time: "20:00", guests: 6, table: "", status: "Pending" },
    { id: 4, name: "Sneha Gupta", time: "18:30", guests: 3, table: "7", status: "Seated" },
];

export function StaffReservations() {
    const [reservations, setReservations] = useState(START_RESERVATIONS);

    const updateStatus = (id: number, newStatus: string) => {
        setReservations(prev => prev.map(res =>
            res.id === id ? { ...res, status: newStatus } : res
        ));
    };

    const assignTable = (id: number, tableNum: string) => {
        setReservations(prev => prev.map(res =>
            res.id === id ? { ...res, table: tableNum } : res
        ));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Today's Reservations</h1>
                <p className="text-white/60">Manage guest arrivals and table assignments.</p>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/40 text-xs uppercase font-bold border-b border-white/10">
                            <tr>
                                <th className="p-6">Guest Name</th>
                                <th className="p-6">Time & Guests</th>
                                <th className="p-6">Table Assignment</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {reservations.map((res) => (
                                <tr key={res.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-white">{res.name}</div>
                                        <div className="text-xs text-white/40">ID: #{1000 + res.id}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded text-white/80">
                                                <Clock size={14} className="text-primary" /> {res.time}
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded text-white/80">
                                                <Users size={14} className="text-blue-400" /> {res.guests}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <input
                                            type="text"
                                            placeholder="Table #"
                                            className="bg-black/20 border border-white/10 rounded px-3 py-1.5 text-sm text-white w-20 focus:border-primary outline-none text-center font-bold"
                                            defaultValue={res.table}
                                            onBlur={(e) => assignTable(res.id, e.target.value)}
                                        />
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${res.status === "Seated" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                                res.status === "Arrived" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                                                    res.status === "Completed" ? "bg-white/10 text-white/40 border-white/10" :
                                                        "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                            }`}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        {res.status === "Pending" && (
                                            <button
                                                onClick={() => updateStatus(res.id, "Arrived")}
                                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded flex items-center gap-1 ml-auto transition-colors"
                                            >
                                                Mark Arrived <ArrowRight size={12} />
                                            </button>
                                        )}
                                        {res.status === "Arrived" && (
                                            <button
                                                onClick={() => updateStatus(res.id, "Seated")}
                                                className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded flex items-center gap-1 ml-auto transition-colors shadow-lg shadow-primary/20"
                                            >
                                                Mark Seated <CheckCircle size={12} />
                                            </button>
                                        )}
                                        {res.status === "Seated" && (
                                            <button
                                                onClick={() => updateStatus(res.id, "Completed")}
                                                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded flex items-center gap-1 ml-auto transition-colors"
                                            >
                                                Finish Dining <CheckCircle size={12} />
                                            </button>
                                        )}
                                        {res.status === "Completed" && (
                                            <span className="text-white/20 text-xs italic">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
