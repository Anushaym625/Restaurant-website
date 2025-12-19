"use client";

import { useState } from "react";
import { DollarSign, ShoppingBag, Users, Calendar, Clock, X, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminOverviewProps {
    onNavigate: (tab: string) => void;
}

export function AdminOverview({ onNavigate }: AdminOverviewProps) {
    const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Menu Items"
                    value="48"
                    icon={ShoppingBag}
                    color="text-blue-500"
                    onClick={() => onNavigate('menu')}
                />
                <StatsCard
                    title="Today's Reservations"
                    value="8"
                    icon={Calendar}
                    color="text-purple-500"
                    onClick={() => onNavigate('bookings')}
                />
                <StatsCard
                    title="Pending Orders"
                    value="12"
                    icon={Clock}
                    color="text-orange-500"
                    onClick={() => onNavigate('orders')}
                />
                <StatsCard
                    title="Total Revenue"
                    value="₹24,500"
                    icon={DollarSign}
                    color="text-green-500"
                    onClick={() => setIsRevenueModalOpen(true)}
                />
            </div>

            {/* Recent Activity Table */}
            <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Recent Activity</h3>
                    <button className="text-xs text-primary hover:text-primary-hover font-bold uppercase tracking-wider">View All</button>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="text-white/40 border-b border-white/10 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Action</th>
                            <th className="px-4 py-3">Details</th>
                            <th className="px-4 py-3">User/Table</th>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[
                            { action: "New Order", details: "Order #8821 - Masala Dosa x2", user: "Table 4", time: "2 mins ago", status: "Pending", color: "text-orange-500" },
                            { action: "Reservation", details: "Booking for 4 Pax", user: "Arjun Kumar", time: "15 mins ago", status: "Confirmed", color: "text-green-500" },
                            { action: "New Order", details: "Order #8820 - Veg Noodles", user: "Delivery", time: "25 mins ago", status: "Delivered", color: "text-blue-500" },
                            { action: "Menu Update", details: "Added 'Paneer Tikka'", user: "Admin", time: "1 hour ago", status: "Completed", color: "text-white/60" },
                            { action: "Reservation", details: "Booking for 2 Pax", user: "Sneha R.", time: "2 hours ago", status: "Pending", color: "text-orange-500" },
                        ].map((item, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-bold text-white/80">{item.action}</td>
                                <td className="px-4 py-3 text-white/60">{item.details}</td>
                                <td className="px-4 py-3 font-medium">{item.user}</td>
                                <td className="px-4 py-3 text-white/40 text-xs">{item.time}</td>
                                <td className={`px-4 py-3 text-right font-bold text-xs ${item.color}`}>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Revenue Stats Modal */}
            <AnimatePresence>
                {isRevenueModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsRevenueModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-900 border border-white/10 w-full max-w-4xl p-8 rounded-2xl relative z-60 shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
                                            <DollarSign size={24} />
                                        </div>
                                        Revenue Statistics
                                    </h2>
                                    <p className="text-white/60 text-sm ml-12">Detailed financial breakdown and performance metrics.</p>
                                </div>
                                <button
                                    onClick={() => setIsRevenueModalOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <RevenueMetricCard
                                    title="Today's Revenue"
                                    amount="24,500"
                                    change="+12%"
                                    isPositive={true}
                                    period="vs Yesterday"
                                />
                                <RevenueMetricCard
                                    title="This Month"
                                    amount="4,85,200"
                                    change="+8.5%"
                                    isPositive={true}
                                    period="vs Last Month"
                                />
                                <RevenueMetricCard
                                    title="Annual Revenue"
                                    amount="52,40,000"
                                    change="-2.1%"
                                    isPositive={false}
                                    period="vs Last Year"
                                />
                            </div>

                            <div className="glass-card p-6 border border-white/5 bg-white/5">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-primary" /> Daily Revenue Trend (Last 7 Days)
                                </h3>
                                {/* Mock Bar Chart Visualization */}
                                <div className="h-48 flex items-end justify-between gap-2 px-2">
                                    {[65, 45, 75, 55, 85, 95, 70].map((height, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                                            <div className="w-full relative">
                                                <div
                                                    className="w-full bg-primary/20 hover:bg-primary transition-all rounded-t-sm"
                                                    style={{ height: `${height * 1.5}px` }}
                                                />
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    ₹{height * 100}
                                                </div>
                                            </div>
                                            <span className="text-xs text-white/40 font-medium">Day {i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm">
                                    Download Report (PDF)
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface StatsCardProps {
    title: string;
    value: string;
    icon: any;
    color: string;
    onClick?: () => void;
}

function StatsCard({ title, value, icon: Icon, color, onClick }: StatsCardProps) {
    return (
        <div
            onClick={onClick}
            className={`glass-card p-6 flex items-start justify-between transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${onClick ? 'cursor-pointer hover:bg-white/5 ring-1 ring-white/0 hover:ring-primary/50 hover:shadow-xl hover:shadow-primary/10' : ''}`}
        >
            <div>
                <p className="text-white/40 text-xs font-bold uppercase mb-1">{title}</p>
                <h4 className="text-2xl font-bold">{value}</h4>
            </div>
            <div className={`p-3 rounded-lg ${color} bg-white/5`}>
                <Icon size={24} />
            </div>
        </div>
    );
}

function RevenueMetricCard({ title, amount, change, isPositive, period }: { title: string, amount: string, change: string, isPositive: boolean, period: string }) {
    return (
        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
            <h4 className="text-white/60 text-xs font-bold uppercase mb-2">{title}</h4>
            <div className="text-3xl font-bold mb-2">₹{amount}</div>
            <div className="flex items-center gap-2 text-xs">
                <span className={`flex items-center font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {change}
                </span>
                <span className="text-white/40">{period}</span>
            </div>
        </div>
    );
}
