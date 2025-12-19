"use client";

import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
    {
        id: "#8823",
        table: "Table 5",
        time: "2m ago",
        status: "pending",
        items: [
            { name: "Spicy Ramen", qty: 2, notes: "No onions" },
            { name: "Gyoza", qty: 1 }
        ]
    },
    {
        id: "#8820",
        table: "Table 2",
        time: "15m ago",
        status: "cooking",
        items: [
            { name: "Wagyu Burger", qty: 1, notes: "Medium rare" },
            { name: "Fries", qty: 1 }
        ]
    },
    {
        id: "#8819",
        table: "Table 8",
        time: "22m ago",
        status: "ready",
        items: [
            { name: "Caesar Salad", qty: 1 }
        ]
    }
];

export function StaffOrders() {
    const [orders, setOrders] = useState(MOCK_ORDERS);

    const advanceStatus = (id: string, currentStatus: string) => {
        const nextStatus =
            currentStatus === "pending" ? "cooking" :
                currentStatus === "cooking" ? "ready" :
                    "served";

        if (nextStatus === "served") {
            // Remove served orders from view for simplicity or move to a separate tab
            setOrders(prev => prev.filter(o => o.id !== id));
        } else {
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Live Orders</h1>
                <p className="text-white/60">Manage kitchen workflow and order status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className={cn("glass-card border-t-4 p-6 flex flex-col h-full",
                        order.status === "pending" ? "border-red-500" :
                            order.status === "cooking" ? "border-yellow-500" : "border-green-500"
                    )}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{order.id}</h3>
                                <p className="text-white/60 text-sm font-bold">{order.table}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                                <Clock size={12} /> {order.time}
                            </div>
                        </div>

                        <div className="space-y-3 mb-6 flex-1">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start text-sm">
                                    <div className="text-white/90">
                                        <span className="font-bold text-lg mr-2 text-primary">{item.qty}x</span>
                                        <span>{item.name}</span>
                                    </div>
                                    {item.notes && (
                                        <div className="text-red-400 text-xs italic mt-1 block w-full pl-8">Note: {item.notes}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs uppercase font-bold text-white/40">Status</span>
                                <span className={cn("text-xs font-bold uppercase px-2 py-1 rounded",
                                    order.status === "pending" ? "bg-red-500/20 text-red-400" :
                                        order.status === "cooking" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                                )}>
                                    {order.status}
                                </span>
                            </div>

                            <button
                                onClick={() => advanceStatus(order.id, order.status)}
                                className={cn(
                                    "w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                                    order.status === "pending" ? "bg-white/10 hover:bg-white/20 text-white" :
                                        order.status === "cooking" ? "bg-primary hover:bg-primary-hover text-white shadow-primary/20" :
                                            "bg-green-600 hover:bg-green-700 text-white shadow-green-900/20"
                                )}>
                                {order.status === "pending" ? "Start Cooking" :
                                    order.status === "cooking" ? "Mark Ready" :
                                        <><CheckCircle size={18} /> Serve Order</>}
                            </button>
                        </div>
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="col-span-full py-12 text-center text-white/40 glass-card">
                        <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
                        <p>All clear! No active orders.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
