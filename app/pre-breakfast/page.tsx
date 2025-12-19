"use client";

import { useState, useEffect } from "react";
import { MENU_ITEMS } from "@/lib/data";
import { Moon, Sun, Clock, MapPin, User, ShoppingBag, Plus, Minus, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreBreakfastPage() {
    const [isNight, setIsNight] = useState(false);
    const [bypassMode, setBypassMode] = useState(false); // For demo purposes
    const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({});
    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        phone: "",
        deliveryTime: "08:00"
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const hour = new Date().getHours();
            // Night hours: 8 PM (20) to 5 AM (5)
            // Logic: hour >= 20 OR hour < 5
            const isNightTime = hour >= 20 || hour < 5;
            setIsNight(isNightTime);
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const breakfastItems = MENU_ITEMS.filter(item => item.category === "Breakfast");

    const updateQty = (id: string, delta: number) => {
        setOrderItems(prev => {
            const currentQty = prev[id] || 0;
            const newQty = Math.max(0, currentQty + delta);
            if (newQty === 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: newQty };
        });
    };

    const totalAmount = Object.entries(orderItems).reduce((sum, [id, qty]) => {
        const item = MENU_ITEMS.find(i => i.id === id);
        return sum + (item ? item.price * qty : 0);
    }, 0);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderPlaced(true);
        // Simulate API call
        console.log("Order Placed:", { userDetails, orderItems, totalAmount });
    };

    if (!isNight && !bypassMode) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="glass-card max-w-md w-full text-center p-8">
                    <Sun className="w-16 h-16 text-secondary mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-4">Good Day!</h1>
                    <p className="text-white/60 mb-8">
                        Our pre-breakfast ordering service is only available at night (8 PM - 5 AM).
                        Please come back later to place your order for tomorrow morning!
                    </p>
                    <button
                        onClick={() => setBypassMode(true)}
                        className="text-xs text-white/30 hover:text-white/60 underline"
                    >
                        (Dev: Bypass Time Check)
                    </button>
                    <div className="mt-8 text-sm text-primary">
                        Current Time: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="glass-card max-w-md w-full text-center p-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-white/60 mb-8">
                        Your breakfast has been scheduled for delivery tomorrow at <span className="text-primary">{userDetails.deliveryTime}</span>.
                    </p>
                    <button
                        onClick={() => {
                            setOrderPlaced(false);
                            setOrderItems({});
                            setUserDetails(prev => ({ ...prev, name: "", address: "", phone: "" }));
                        }}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
                    >
                        Place Another Order
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 pt-24 px-6 md:px-12 container mx-auto">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Moon className="text-primary w-6 h-6" />
                        <span className="text-sm font-semibold tracking-wider uppercase text-primary">Night Owl Service</span>
                    </div>
                    <h1 className="text-4xl font-bold">Pre-Order Breakfast</h1>
                    <p className="text-white/60 mt-2">Schedule your delivery for tomorrow morning.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Menu Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <ShoppingBag size={20} /> Select Items
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {breakfastItems.map(item => {
                            const qty = orderItems[item.id] || 0;
                            return (
                                <div key={item.id} className="glass-card flex gap-4 p-4 hover:border-primary/30 transition-colors">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-dark-800" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold">{item.name}</h3>
                                                <span className="text-primary font-bold">₹{item.price}</span>
                                            </div>
                                            <p className="text-xs text-white/50 line-clamp-2 mt-1">{item.description}</p>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-3">
                                            {qty > 0 ? (
                                                <>
                                                    <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><Minus size={18} /></button>
                                                    <span className="font-bold w-4 text-center">{qty}</span>
                                                    <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><Plus size={18} /></button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => updateQty(item.id, 1)}
                                                    className="px-3 py-1.5 bg-white/5 hover:bg-primary hover:text-white rounded text-xs font-semibold transition-all border border-white/10"
                                                >
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* specific Order Form */}
                <div className="lg:col-span-1">
                    <div className="glass-card sticky top-24">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Clock size={20} /> Order Details
                        </h2>

                        <form onSubmit={handleOrder} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1.5">Delivery Time (Tomorrow)</label>
                                <div className="relative">
                                    <select
                                        value={userDetails.deliveryTime}
                                        onChange={e => setUserDetails({ ...userDetails, deliveryTime: e.target.value })}
                                        className="w-full bg-dark-900/50 border border-white/10 rounded-lg px-4 py-2.5 appearance-none focus:border-primary focus:outline-none transition-colors"
                                    >
                                        {Array.from({ length: 6 }, (_, i) => i + 6).map(hour => (
                                            <>
                                                <option key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>{`${hour}:00 AM`}</option>
                                                <option key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>{`${hour}:30 AM`}</option>
                                            </>
                                        ))}
                                    </select>
                                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        value={userDetails.name}
                                        onChange={e => setUserDetails({ ...userDetails, name: e.target.value })}
                                        className="w-full bg-dark-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:border-primary focus:outline-none transition-colors placeholder:text-white/20"
                                    />
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                                    <textarea
                                        placeholder="Full Address"
                                        required
                                        rows={2}
                                        value={userDetails.address}
                                        onChange={e => setUserDetails({ ...userDetails, address: e.target.value })}
                                        className="w-full bg-dark-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:border-primary focus:outline-none transition-colors placeholder:text-white/20 resize-none"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 text-xs flex items-center justify-center">📞</span>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        required
                                        value={userDetails.phone}
                                        onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })}
                                        className="w-full bg-dark-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:border-primary focus:outline-none transition-colors placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-white/10 my-4 pt-4">
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-white/60">Subtotal</span>
                                    <span>₹{totalAmount}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-white/60">Delivery Fee</span>
                                    <span>₹40</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-4 text-primary">
                                    <span>Total</span>
                                    <span>₹{totalAmount + 40}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={totalAmount === 0}
                                className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-lg shadow-primary/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Place Order for Tomorrow
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
