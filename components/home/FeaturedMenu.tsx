"use client";

import { motion } from "framer-motion";

const FEATURED_ITEMS = [
    {
        id: "201",
        name: "Paneer Butter Masala",
        description: "Soft paneer cubes in rich tomato gravy.",
        price: 220,
        category: "Curries",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "202",
        name: "Gobi Manchurian Dry",
        description: "Crispy cauliflower tossed in spicy Asian sauce.",
        price: 180,
        category: "Starters",
        image: "/gobi-manchurian.jpg"
    },
    {
        id: "203",
        name: "Masala Dosa",
        description: "Crispy golden crepe with spiced potato filling.",
        price: 120,
        category: "Tiffin",
        image: "/masala-dosa.png"
    },
    {
        id: "204",
        name: "Idli Vada",
        description: "Steamed rice cakes and crispy lentil donuts with chutney.",
        price: 90,
        category: "Tiffin",
        image: "/idli-vada.png"
    },
    {
        id: "205",
        name: "Mushroom Masala",
        description: "Fresh mushrooms cooked in aromatic spices.",
        price: 200,
        category: "Curries",
        image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "206",
        name: "Veg Biryani",
        description: "Aromatic basmati rice cooked with fresh vegetables and exotic spices.",
        price: 240,
        category: "Rice",
        image: "/veg-biryani.jpg"
    }
];

export function FeaturedMenu() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background elements to match the 'dark neon' vibe - Added more blobs for glass effect */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="border-l-4 border-primary pl-4">Choose Our Menu</span>
                    </h2>
                    <p className="text-white/60 max-w-lg">
                        Authentic vegetarian delicacies prepared with love and devotion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_ITEMS.map((item) => (
                        <FeaturedCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

import { useCart } from "@/context/CartContext";
import { Plus, Minus } from "lucide-react";

interface FeaturedItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
    const { addToCart, items, updateQty } = useCart();

    const cartItem = items.find(i => i.id === item.id);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors relative overflow-hidden"
        >
            {/* Circular Image */}
            <div className="w-24 h-24 shrink-0 rounded-full border-2 border-primary/20 overflow-hidden relative group-hover:border-primary transition-colors">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors">{item.name}</h4>
                <p className="text-white/40 text-xs mb-2 truncate">{item.category}</p>
                <div className="text-lg font-bold text-primary">₹{item.price}/-</div>
            </div>

            {cartItem ? (
                <div className="flex flex-col items-center bg-dark-800 rounded-lg border border-white/10">
                    <button
                        onClick={() => updateQty(cartItem.id, cartItem.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-primary active:scale-95"
                    >
                        <Plus size={14} />
                    </button>
                    <span className="text-xs font-bold text-white py-1">{cartItem.qty}</span>
                    <button
                        onClick={() => updateQty(cartItem.id, cartItem.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-primary active:scale-95"
                    >
                        <Minus size={14} />
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
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all active:scale-95"
                >
                    <Plus size={20} />
                </button>
            )}
        </motion.div>
    );
}
