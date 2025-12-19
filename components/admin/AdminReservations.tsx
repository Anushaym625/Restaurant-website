"use client";

import { useState } from "react";
import { Calendar, Clock, Users, Search, Check, X } from "lucide-react";

const INITIAL_BOOKINGS = [
    { id: 1, name: "John Doe", date: "Dec 20, 2025", time: "7:00 PM", guests: 4, status: "Confirmed", table: "T-12" },
    { id: 2, name: "Jane Smith", date: "Dec 21, 2025", time: "8:30 PM", guests: 2, status: "Pending", table: "--" },
    { id: 3, name: "Mike Ross", date: "Dec 22, 2025", time: "6:00 PM", guests: 6, status: "Confirmed", table: "T-05" },
    { id: 4, name: "Sarah Connor", date: "Dec 23, 2025", time: "1:00 PM", guests: 3, status: "Pending", table: "--" },
];

export function AdminReservations() {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

    const updateStatus = (id: number, newStatus: string) => {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    };

    return (
        <div className="glass-card p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h3 className="font-bold text-lg">Reservation Management</h3>
                    <p className="text-white/60 text-sm">Manage table bookings and approvals.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search guest name..."
                        className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-primary outline-none w-64"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                                {booking.name[0]}
                            </div>
                            <div>
                                <div className="font-bold text-lg">{booking.name}</div>
                                <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {booking.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {booking.time}</span>
                                    <span className="flex items-center gap-1"><Users size={14} /> {booking.guests} Guests</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right mr-4">
                                <div className="text-xs text-white/40 uppercase font-bold">Status</div>
                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${booking.status === "Confirmed" ? "bg-green-500/20 text-green-500" :
                                        booking.status === "Cancelled" ? "bg-red-500/20 text-red-500" :
                                            "bg-yellow-500/20 text-yellow-500"
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>

                            {booking.status === "Pending" && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateStatus(booking.id, "Confirmed")}
                                        className="p-2 bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                                        title="Approve"
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        onClick={() => updateStatus(booking.id, "Cancelled")}
                                        className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                        title="Reject"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}
                            {booking.status !== "Pending" && (
                                <div className="text-white/40 text-sm italic min-w-[80px] text-center">
                                    {booking.status === "Confirmed" ? "Approved" : "Rejected"}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
