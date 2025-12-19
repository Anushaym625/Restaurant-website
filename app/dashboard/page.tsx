"use client";

import { useState } from "react";
import { Clock, Download, Package, Calendar, Settings, User, ChefHat, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/context/AuthContext";

// Mock Data
const MOCK_ORDERS = [
    { id: "#ORD-2025-88", date: "Dec 18, 2025", items: "Spicy Ramen (2), Gyoza (1)", total: "₹900", status: "Delivered", invoiceUrl: "#" },
    { id: "#ORD-2025-87", date: "Dec 15, 2025", items: "Sushi Platter (1), Miso Soup (2)", total: "₹1,200", status: "Delivered", invoiceUrl: "#" },
    { id: "#ORD-2025-86", date: "Dec 10, 2025", items: "Paneer Tikka (2), Naan (4)", total: "₹850", status: "Delivered", invoiceUrl: "#" },
];

const UPCOMING_EVENTS = [
    { title: "Diwali Special Dinner", date: "Nov 12, 2025", time: "7:00 PM", status: "Confirmed" },
    { title: "Sunday Brunch", date: "Nov 19, 2025", time: "11:00 AM", status: "Pending" }
];

export default function DashboardPage() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "reservations" | "settings">("overview");
    const [showInvoice, setShowInvoice] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const handleViewInvoice = (order: any) => {
        setSelectedOrder(order);
        setShowInvoice(true);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-6 relative">

            {/* Invoice Modal */}
            <AnimatePresence>
                {showInvoice && selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowInvoice(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white text-black w-full max-w-md p-8 rounded-xl relative z-60 shadow-2xl"
                        >
                            <button onClick={() => setShowInvoice(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X size={20} /></button>

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold uppercase tracking-widest">Invoice</h3>
                                <p className="text-sm text-gray-500">Vrindhana Restaurant</p>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-bold">Order ID:</span>
                                    <span>{selectedOrder.id}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-bold">Date:</span>
                                    <span>{selectedOrder.date}</span>
                                </div>
                                <div className="py-2">
                                    <p className="font-bold mb-2">Items:</p>
                                    <p className="pl-4 text-gray-600">{selectedOrder.items}</p>
                                </div>
                                <div className="flex justify-between border-t border-black pt-4 text-lg font-bold">
                                    <span>Total Amount:</span>
                                    <span>{selectedOrder.total}</span>
                                </div>
                            </div>

                            <button onClick={() => setShowInvoice(false)} className="w-full mt-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
                                Download PDF
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-4">
                    <div className="glass-card p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-gray-700 mx-auto mb-4 border-2 border-primary overflow-hidden">
                            <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="font-bold text-lg">Alex Johnson</h2>
                        <p className="text-xs text-white/40">Gold Member</p>
                    </div>

                    <nav className="glass-card p-4 space-y-2">
                        <SidebarBtn label="Overview" icon={User} active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                        <SidebarBtn label="My Orders" icon={Package} active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
                        <SidebarBtn label="Reservations" icon={Calendar} active={activeTab === "reservations"} onClick={() => setActiveTab("reservations")} />
                        <SidebarBtn label="Settings" icon={Settings} active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
                        <div className="pt-4 mt-4 border-t border-white/10">
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <X size={18} />
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-8 min-h-[500px]">

                    {activeTab === "overview" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard label="Total Orders" value="24" color="border-primary" />
                                <StatCard label="Upcoming Events" value="2" color="border-secondary" />
                                <StatCard label="Loyalty Points" value="1,250" color="border-green-500" />
                            </div>

                            {/* Active Order */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="text-primary" /> Active Order</h3>
                                <div className="glass-card p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="font-bold text-lg mb-1">Order #ORD-2025-88</div>
                                            <div className="text-sm text-white/60">Placed 15 mins ago</div>
                                        </div>
                                        <div className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-bold border border-yellow-500/20">Preparing</div>
                                    </div>
                                    <div className="relative pt-6 pb-2">
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[60%] animate-pulse" />
                                        </div>
                                        <div className="flex justify-between text-xs text-white/40 mt-2 font-bold uppercase">
                                            <span>Confirmed</span>
                                            <span className="text-primary">Preparing</span>
                                            <span>Ready</span>
                                            <span>Delivered</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Orders Preview */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2"><Package className="text-primary" /> Recent Orders</h3>
                                    <button onClick={() => setActiveTab("orders")} className="text-xs text-primary hover:underline">View All</button>
                                </div>
                                <div className="glass-card overflow-hidden">
                                    <OrdersTable orders={MOCK_ORDERS.slice(0, 2)} onViewInvoice={handleViewInvoice} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "orders" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-2xl font-bold">Order History</h2>
                            <div className="glass-card overflow-hidden">
                                <OrdersTable orders={MOCK_ORDERS} onViewInvoice={handleViewInvoice} />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "reservations" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-2xl font-bold">Upcoming Reservations</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {UPCOMING_EVENTS.map((event, idx) => (
                                    <div key={idx} className="glass-card p-6 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg">{event.title}</h3>
                                            <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">{event.status}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60 text-sm">
                                            <Calendar size={14} /> {event.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60 text-sm">
                                            <Clock size={14} /> {event.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "settings" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/40 mb-4 border border-white/10">
                                    <Settings size={32} />
                                </div>
                                <h3 className="text-2xl font-bold">Account Settings</h3>
                                <p className="text-white/60">Manage your profile details below.</p>
                            </div>

                            <ProfileSettingsForm />
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
}

// Sub-components for cleaner code
function SidebarBtn({ label, icon: Icon, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${active ? "bg-primary text-white font-bold shadow-lg shadow-primary/20" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
        >
            <Icon size={18} />
            {label}
        </button>
    );
}

function StatCard({ label, value, color }: any) {
    return (
        <div className={`glass-card p-6 border-l-4 ${color}`}>
            <p className="text-white/40 text-xs uppercase font-bold mb-1">{label}</p>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}

function OrdersTable({ orders, onViewInvoice }: any) {
    return (
        <table className="w-full text-sm text-left">
            <thead className="text-white/40 border-b border-white/10 bg-white/5">
                <tr>
                    <th className="px-6 py-4 font-bold uppercase">Date</th>
                    <th className="px-6 py-4 font-bold uppercase">Order ID</th>
                    <th className="px-6 py-4 font-bold uppercase">Items</th>
                    <th className="px-6 py-4 font-bold uppercase">Total</th>
                    <th className="px-6 py-4 font-bold uppercase text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors text-white/80">
                        <td className="px-6 py-4 text-white/60">{order.date}</td>
                        <td className="px-6 py-4 font-mono text-primary">{order.id}</td>
                        <td className="px-6 py-4 max-w-xs truncate" title={order.items}>{order.items}</td>
                        <td className="px-6 py-4 font-bold">{order.total}</td>
                        <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => onViewInvoice(order)}
                                className="text-xs px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors inline-flex items-center gap-2"
                            >
                                <Download size={14} /> Invoice
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function ProfileSettingsForm() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+91 98765 43210",
        address: "123, Green Street, Near Main Square, New Delhi"
    });

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically perform an API call to update the user profile
    };

    return (
        <div className="max-w-md mx-auto relative z-10">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase">Full Name</label>
                    <input
                        type="text"
                        value={profile.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary transition-all ${isEditing ? "border-white/20" : "border-transparent bg-transparent pl-0 text-white/60"}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase">Email Address</label>
                    <input
                        type="email"
                        value={profile.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary transition-all ${isEditing ? "border-white/20" : "border-transparent bg-transparent pl-0 text-white/60"}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase">Phone Number</label>
                    <input
                        type="tel"
                        value={profile.phone}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary transition-all ${isEditing ? "border-white/20" : "border-transparent bg-transparent pl-0 text-white/60"}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase">Saved Delivery Address</label>
                    <textarea
                        value={profile.address}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        placeholder="Enter your default delivery address..."
                        rows={3}
                        className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary transition-all resize-none ${isEditing ? "border-white/20" : "border-transparent bg-transparent pl-0 text-white/60"}`}
                    />
                </div>

                <div className="pt-4 flex gap-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors cursor-pointer relative z-20 shadow-lg"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors cursor-pointer relative z-20"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                console.log("Edit Profile Clicked");
                                setIsEditing(true);
                            }}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors cursor-pointer relative z-20 border border-white/5"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
