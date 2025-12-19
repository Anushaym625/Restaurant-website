"use client";

import { useState } from "react";
import { Search, Eye, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const MOCK_ORDERS = [
    {
        id: "ORD-8821",
        customer: "Arjun Kumar",
        items: [
            { name: "Masala Dosa", quantity: 2, price: 120 },
            { name: "Filter Coffee", quantity: 2, price: 40 }
        ],
        amount: 320,
        paymentStatus: "Paid",
        orderStatus: "Cooking",
        date: "Dec 19, 2025 - 7:30 PM",
        type: "Dine-in",
        table: "T-04"
    },
    {
        id: "ORD-8820",
        customer: "Sneha R.",
        items: [
            { name: "Veg Hakka Noodles", quantity: 1, price: 180 },
            { name: "Gobi Manchurian", quantity: 1, price: 160 }
        ],
        amount: 340,
        paymentStatus: "Pending",
        orderStatus: "Pending",
        date: "Dec 19, 2025 - 7:15 PM",
        type: "Delivery",
        address: "123, Palm Grove Apts, MG Road"
    },
    {
        id: "ORD-8819",
        customer: "Rahul V.",
        items: [
            { name: "Paneer Butter Masala", quantity: 1, price: 240 },
            { name: "Butter Naan", quantity: 3, price: 45 }
        ],
        amount: 375,
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        date: "Dec 19, 2025 - 6:45 PM",
        type: "Delivery",
        address: "45, Green Park, Indiranagar"
    },
    {
        id: "ORD-8818",
        customer: "Priya S.",
        items: [
            { name: "Idli Sambar", quantity: 2, price: 80 },
            { name: "Vada", quantity: 1, price: 60 }
        ],
        amount: 220,
        paymentStatus: "Failed",
        orderStatus: "Cancelled",
        date: "Dec 19, 2025 - 6:30 PM",
        type: "Dine-in",
        table: "T-08"
    },
];

export function AdminOrders() {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [filter, setFilter] = useState("All");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Paid": return "text-green-500 bg-green-500/10";
            case "Pending": return "text-orange-500 bg-orange-500/10";
            case "Failed": return "text-red-500 bg-red-500/10";
            case "Delivered": return "text-blue-500 bg-blue-500/10";
            case "Cooking": return "text-yellow-500 bg-yellow-500/10";
            case "Cancelled": return "text-red-500 bg-red-500/10";
            default: return "text-white/60 bg-white/5";
        }
    };

    return (
        <div className="glass-card p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="font-bold text-lg">Orders & Payments</h3>

                <div className="flex gap-4">
                    <div className="flex bg-black/20 rounded-lg p-1">
                        {["All", "Pending", "Cooking", "Delivered"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? "bg-primary text-white shadow-lg" : "text-white/60 hover:text-white"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Order ID..."
                            className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-primary outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="text-white/40 border-b border-white/10 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Items Summary</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Payment</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.filter(o => filter === "All" || o.orderStatus === filter).map((order) => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3 font-medium text-white/80">{order.id}</td>
                                <td className="px-4 py-3 text-white/60 truncate max-w-[200px]">
                                    {order.items.map(i => i.name).join(", ")}
                                </td>
                                <td className="px-4 py-3 font-bold">₹{order.amount}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 hover:bg-white/10 text-primary rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedOrder(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-dark-800 border border-white/10 w-full max-w-2xl rounded-xl relative z-60 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <div>
                                    <h3 className="text-xl font-bold">Order Details</h3>
                                    <p className="text-white/60 text-sm">{selectedOrder.id} • {selectedOrder.date}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-white/40 uppercase mb-3">Customer Info</h4>
                                        <div className="space-y-1">
                                            <div className="font-bold text-lg">{selectedOrder.customer}</div>
                                            <div className="text-white/60 text-sm">{selectedOrder.type} • {selectedOrder.type === "Dine-in" ? selectedOrder.table : selectedOrder.address}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-white/40 uppercase mb-3">Payment Info</h4>
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded text-sm font-bold flex items-center gap-2 ${getStatusColor(selectedOrder.paymentStatus)}`}>
                                                {selectedOrder.paymentStatus === "Paid" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                                {selectedOrder.paymentStatus}
                                            </div>
                                            <div className="text-sm text-white/60">via UPI</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-white/40 uppercase mb-3">Order Items</h4>
                                    <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                        {selectedOrder.items.map((item: any, idx: number) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <div className="flex gap-2">
                                                    <span className="text-primary font-bold">{item.quantity}x</span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="font-medium">₹{item.price * item.quantity}</div>
                                            </div>
                                        ))}
                                        <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>₹{selectedOrder.amount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end gap-3">
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">Download Invoice</button>
                                <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold transition-colors">Mark as Completed</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
