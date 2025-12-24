"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles, ChefHat, Clock, Check, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useSpecial } from "@/context/SpecialContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function TodaysSpecial() {
    const { specialItem } = useSpecial();
    const { addToCart, items, updateQty } = useCart();

    // Create a consistent ID for this special item
    const specialId = `special-${specialItem.title.toLowerCase().replace(/\s+/g, '-')}`;
    const cartItem = items.find(item => item.id === specialId);
    const qty = cartItem ? cartItem.qty : 0;

    const handleAdd = () => {
        addToCart({
            id: specialId,
            name: specialItem.title,
            price: specialItem.price,
            image: specialItem.image
        });
    };

    const handleIncrement = () => {
        if (cartItem) {
            updateQty(specialId, qty + 1);
        } else {
            handleAdd();
        }
    };

    const handleDecrement = () => {
        if (cartItem && qty > 0) {
            updateQty(specialId, qty - 1);
        }
    };

    return (
        <section className="relative py-4 px-4 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

            <div className="container mx-auto">
                <div className="text-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                        <Sparkles className="text-primary" size={20} />
                        Today's <span className="text-primary">Special</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card max-w-4xl mx-auto p-4 md:p-6 relative overflow-hidden border border-white/10"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Sparkles size={100} className="text-primary" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
                        {/* Image Side */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-all duration-500" />
                            <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
                                <div className="absolute top-3 left-3 z-30 flex gap-2">
                                    <div className="glass px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 border-primary/30">
                                        <Sparkles size={10} className="text-secondary" />
                                        Exclusive
                                    </div>
                                    <div className="glass px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 border-white/20">
                                        <Clock size={10} className="text-primary" />
                                        Limited
                                    </div>
                                </div>
                                <img
                                    src={specialItem.image}
                                    alt={specialItem.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Price Badge - Adjusted z-index and position */}
                                <div className="absolute bottom-3 right-3 z-30 glass px-4 py-2 rounded-lg border border-primary/30 shadow-lg backdrop-blur-md">
                                    <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider">Only</p>
                                    <p className="text-xl font-bold text-primary">₹{specialItem.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-1 flex items-center gap-1">
                                    <ChefHat size={12} />
                                    {specialItem.subtitle}
                                </h3>
                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                    {specialItem.title}
                                </h2>
                            </div>

                            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                {specialItem.description}
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="glass p-3 rounded-lg border-white/5 bg-white/5">
                                    <h4 className="text-white text-xs font-bold mb-1">Spicy Level</h4>
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full ${i < specialItem.spicyLevel ? "bg-primary" : "bg-white/20"}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="glass p-3 rounded-lg border-white/5 bg-white/5">
                                    <h4 className="text-white text-xs font-bold mb-1">Serves</h4>
                                    <p className="text-xs text-white/60">{specialItem.serves} People</p>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-wrap gap-3">
                                {qty === 0 ? (
                                    <button
                                        onClick={handleAdd}
                                        className="px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 duration-300"
                                    >
                                        Order Now <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <div className="flex items-center bg-primary text-white rounded-lg shadow-lg shadow-primary/20 overflow-hidden">
                                        <button
                                            onClick={handleDecrement}
                                            className="px-4 py-3 hover:bg-primary-hover transition-colors flex items-center justify-center"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-2 font-bold min-w-[30px] text-center">{qty}</span>
                                        <button
                                            onClick={handleIncrement}
                                            className="px-4 py-3 hover:bg-primary-hover transition-colors flex items-center justify-center"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                )}
                                <Link
                                    href="/menu"
                                    className="px-6 py-3 glass text-white rounded-lg font-bold text-sm hover:bg-white/10 hover:border-primary/50 transition-all border border-white/20 hover:-translate-y-0.5 active:translate-y-0 duration-300 block text-center"
                                >
                                    View Full Menu
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
