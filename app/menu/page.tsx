"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ShoppingBag, Plus, Minus } from "lucide-react";
import { MenuTabs } from "@/components/menu/MenuTabs";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

// Mock Data
import { MENU_ITEMS, CATEGORIES } from "@/lib/data";

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const { items, addToCart, updateQty } = useCart();

    const filteredItems = MENU_ITEMS.filter((item) => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-dark-800 pb-12 pt-12 border-b border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-primary">Menu</span></h1>
                    <p className="text-white/60 max-w-xl mx-auto mb-8">
                        Explore our diverse menu featuring dishes from around the globe, crafted with passion and the finest ingredients.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative group">
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-primary transition-colors" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-12">
                {/* Cateogry Tabs */}
                <MenuTabs
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => {
                            const cartItem = items.find(i => i.id === item.id);

                            return (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="glass-card group hover:bg-white/10 p-4"
                                >
                                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded">
                                            ⭐ {item.rating}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <span className="text-primary font-bold">₹{item.price}</span>
                                    </div>
                                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{item.description}</p>

                                    {cartItem ? (
                                        <div className="flex items-center justify-between w-full py-2 bg-primary/20 border border-primary/30 rounded-lg px-4">
                                            <button
                                                onClick={() => updateQty(cartItem.id, cartItem.qty - 1)}
                                                className="w-6 h-6 flex items-center justify-center text-white hover:text-primary active:scale-90 transition-transform"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="font-bold text-primary">{cartItem.qty} Added</span>
                                            <button
                                                onClick={() => updateQty(cartItem.id, cartItem.qty + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-white hover:text-primary active:scale-90 transition-transform"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => addToCart({
                                                id: item.id,
                                                name: item.name,
                                                price: item.price,
                                                image: item.image
                                            })}
                                            className="w-full py-2 bg-white/5 hover:bg-primary hover:text-white border border-white/10 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <ShoppingBag size={16} /> Add Item
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-white/40">
                        No items found for "{searchQuery}".
                    </div>
                )}
            </div>
        </div>
    );
}
