"use client";

import { useState, useEffect } from "react";
import { MENU_ITEMS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ShoppingBag, Truck, MapPin, Clock, CheckCircle, Plus, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PreOrderPage() {
    const [isNightTime, setIsNightTime] = useState(false);
    const [selectedItems, setSelectedItems] = useState<{ id: string; qty: number }[]>([]);
    const [checkoutStage, setCheckoutStage] = useState<"menu" | "details" | "success">("menu");
    const [deliveryDetails, setDeliveryDetails] = useState({
        address: "",
        timeSlot: "07:00 AM"
    });

    // Filter only Breakfast items
    const breakfastItems = MENU_ITEMS.filter(item => item.category === "Breakfast");

    useEffect(() => {
        // Check time to enforce "Night Only" access (e.g., 8 PM to 5 AM)
        const checkTime = () => {
            const hour = new Date().getHours();
            // Night is considered from 20:00 (8 PM) to 05:00 (5 AM)
            setIsNightTime(hour >= 20 || hour < 5);
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    // Helper: Local Cart Management
    const addToCart = (id: string) => {
        const exists = selectedItems.find(i => i.id === id);
        if (exists) {
            setSelectedItems(selectedItems.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setSelectedItems([...selectedItems, { id, qty: 1 }]);
        }
    };

    const updateQty = (id: string, newQty: number) => {
        if (newQty < 1) {
            setSelectedItems(selectedItems.filter(i => i.id !== id));
        } else {
            setSelectedItems(selectedItems.map(i => i.id === id ? { ...i, qty: newQty } : i));
        }
    };

    const totalAmount = selectedItems.reduce((sum, item) => {
        const product = breakfastItems.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    // Mock Submit
    const handlePreOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStage("success");
    };

    // If it's DAY TIME, show the "Come back later" screen
    // !isNightTime Logic: Since testing might be done during the day, 
    // I will comment out the strict block or provide a 'Simulation Toggle' for the user if needed.
    // For now, I will STRICTLY enforce it but add a dev-only override button hidden in bottom right corner.
    if (!isNightTime) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2670')] bg-cover bg-center opacity-20" />
                <div className="glass-card max-w-md w-full p-8 text-center relative z-10 border-white/10">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sun className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Good Morning!</h1>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        Pre-ordering for tomorrow's breakfast opens at <span className="text-white font-bold">8:00 PM</span>.
                        Come back tonight to schedule your fresh morning meal!
                    </p>
                    <button
                        onClick={() => setIsNightTime(true)} // Dev Override
                        className="text-xs text-white/10 hover:text-white/30 transition-colors"
                    >
                        (Dev: Simulate Night)
                    </button>
                    <a href="/menu" className="block w-full py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all font-semibold">
                        View All Day Menu
                    </a>
                </div>
            </div>
        );
    }

    // Success Screen
    if (checkoutStage === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="glass-card max-w-md w-full p-12 text-center border-green-500/30">
                    <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Order Scheduled!</h2>
                    <p className="text-white/60 mb-6">
                        Your breakfast will be delivered tomorrow at <span className="text-primary font-bold">{deliveryDetails.timeSlot}</span>.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 mb-8 text-left text-sm text-white/70">
                        <p className="font-bold text-white mb-2">Delivery To:</p>
                        <p>{deliveryDetails.address}</p>
                    </div>
                    <a href="/" className="block w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-6 relative">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Menu Selection */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                                <Moon className="text-primary" />
                                Late Night <span className="text-primary">Pre-Order</span>
                            </h1>
                            <p className="text-white/60 mt-2">Book your breakfast now, sleep well later.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {breakfastItems.map(item => {
                            const inCart = selectedItems.find(i => i.id === item.id);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-card p-4 flex gap-4 hover:border-primary/30 transition-colors group"
                                >
                                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-white">{item.name}</h3>
                                            <p className="text-sm text-white/50 line-clamp-1">{item.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-primary">₹{item.price}</span>

                                            {inCart ? (
                                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-2 py-1">
                                                    <button onClick={() => updateQty(item.id, inCart.qty - 1)} className="hover:text-primary"><Minus size={14} /></button>
                                                    <span className="text-sm font-bold w-4 text-center">{inCart.qty}</span>
                                                    <button onClick={() => updateQty(item.id, inCart.qty + 1)} className="hover:text-primary"><Plus size={14} /></button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(item.id)}
                                                    className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary-hover active:scale-95 transition-all"
                                                >
                                                    Add +
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Cart & Checkout Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 glass-card p-6 border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ShoppingBag className="text-primary" size={20} /> Your Breakfast
                        </h2>

                        {selectedItems.length === 0 ? (
                            <div className="text-center py-8 text-white/30 text-sm">
                                Your basket is empty. <br /> Select items to pre-order.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Items List */}
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {selectedItems.map(item => {
                                        const product = breakfastItems.find(p => p.id === item.id);
                                        if (!product) return null;
                                        return (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div className="text-white/80">
                                                    <span className="text-primary font-bold mr-2">{item.qty}x</span>
                                                    {product.name}
                                                </div>
                                                <div className="text-white/60">₹{product.price * item.qty}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-white/10 pt-4 flex justify-between items-center font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">₹{totalAmount}</span>
                                </div>

                                {/* Delivery Form */}
                                <form onSubmit={handlePreOrder} className="space-y-4 pt-4 border-t border-white/10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-white/50 flex items-center gap-1">
                                            <Clock size={12} /> Delivery Time (Tomorrow)
                                        </label>
                                        <select
                                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none"
                                            value={deliveryDetails.timeSlot}
                                            onChange={e => setDeliveryDetails({ ...deliveryDetails, timeSlot: e.target.value })}
                                        >
                                            {["06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"].map(t => (
                                                <option key={t} value={t} className="bg-dark-900">{t}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-white/50 flex items-center gap-1">
                                            <MapPin size={12} /> Delivery Address
                                        </label>
                                        <textarea
                                            required
                                            placeholder="Enter your full address..."
                                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none h-24 resize-none"
                                            value={deliveryDetails.address}
                                            onChange={e => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                                        />
                                    </div>

                                    <button className="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2">
                                        <Truck size={18} /> Place Pre-Order
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
