"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const DELIVERED_ITEMS = [
    {
        id: "101",
        name: "Special Masala Dosa",
        description: "Crispy golden crepe filled with spiced potato mash, served with coconut chutney and sambar.",
        price: 120,
        image: "/masala-dosa.png",
        reverse: false
    },
    {
        id: "102",
        name: "Idli Vada Combo",
        description: "Steamed fluffy rice cakes and crispy lentil donuts, the perfect traditional breakfast duo.",
        price: 90,
        image: "/idli-vada.png",
        reverse: true
    },
    {
        id: "103",
        name: "Hyderabadi Veg Biryani",
        description: "Aromatic basmati rice cooked with fresh vegetables and exotic spices in traditional dum style.",
        price: 240,
        image: "/veg-biryani.jpg",
        reverse: false
    }
];

export function BestDelivered() {
    const { addToCart, items, updateQty, removeFromCart } = useCart();

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-primary">Our Best Delivered</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary rounded-full" />
                </div>

                <div className="space-y-12 flex flex-col items-center">
                    {DELIVERED_ITEMS.map((item, idx) => {
                        const cartItem = items.find(i => i.id === item.id);
                        // Stagger from left (-50) or right (50) based on index
                        const xOffset = idx % 2 === 0 ? -50 : 50;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: xOffset }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="w-full max-w-4xl glass-card p-6 flex flex-col md:flex-row items-center gap-8 group hover:bg-white/5 transition-all duration-300"
                            >
                                {/* Text Content */}
                                <div className={`flex-1 space-y-3 ${item.reverse ? 'md:order-2' : ''}`}>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                                    <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="text-xl font-bold text-primary">₹{item.price}/-</div>

                                    <div className="flex items-center gap-4 pt-2">
                                        {cartItem ? (
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center bg-dark-800 rounded-lg border border-white/10 p-1">
                                                    <button
                                                        onClick={() => updateQty(cartItem.id, cartItem.qty - 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors active:scale-95"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-white">{cartItem.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(cartItem.id, cartItem.qty + 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors active:scale-95"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart({
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.price,
                                                    image: item.image
                                                })}
                                                className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2 active:scale-95"
                                            >
                                                Add Item <Plus size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Image - "Graphic" Style (No Frame) */}
                                <div className={`w-full md:w-64 relative shrink-0 ${item.reverse ? 'md:order-1' : ''}`}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-auto object-cover drop-shadow-2xl transition-transform duration-500 rounded-full aspect-square border-4 border-white/20 hover:scale-110 animate-in zoom-in spin-in-3 hover:rotate-6"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
