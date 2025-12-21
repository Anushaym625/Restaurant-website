"use client";

import { motion } from "framer-motion";
import { ChefHat, Coffee, Award, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-6">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-gradient">Story</span></h1>
                <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
                    Opening its doors in 2026, Vrindhana is a thoughtfully crafted pure vegetarian dining destination inspired by the timeless values and divine aura of Lord Krishna. Every element — from the interiors to the menu — is designed to reflect peace, purity, and warmth, offering guests a calm escape from the city’s rush.
                </p>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8" />
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <img
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
                        alt="Restaurant Interior"
                        className="relative z-10 rounded-2xl border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold text-white">Pure <span className="text-primary">Vegetarian</span></h2>
                    <p className="text-white/70 leading-relaxed">
                        We proudly serve a wide range of 100% vegetarian Chinese cuisine, along with carefully selected multi-cuisine vegetarian specialties. Our chefs focus on authentic flavors, fresh ingredients, and consistent quality, ensuring every dish is both flavorful and satisfying.
                    </p>
                    <p className="text-white/70 leading-relaxed">
                        Our restaurant stands out for its beautiful ambience, Krishna-themed design, and welcoming atmosphere. Whether it’s a family dinner, a casual meetup, or a peaceful solo meal, we aim to deliver an experience that delights the senses and nourishes the soul.
                    </p>

                    <div className="glass-card p-6 mt-6 border-l-4 border-primary">
                        <p className="text-xl font-medium text-white italic">
                            "At our core, we believe great food should be pure, soulful, and memorable — and that’s exactly what we serve."
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Values Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose <span className="text-primary">Us?</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {values.map((val, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-6 text-center hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <val.icon className="text-primary w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{val.title}</h3>
                            <p className="text-white/50 text-sm">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Meet the Founders */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">🌿 Meet the <span className="text-primary">Founders</span></h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        The visionaries behind Vrindhana, united by a belief that food should be served with devotion and purity.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {founders.map((founder, idx) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/5 transition-colors relative overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/30 mb-6 p-1 relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    className="w-full h-full object-cover rounded-full relative z-10"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Founder & Visionary</p>

                            <p className="text-white/60 text-sm italic leading-relaxed">
                                "{founder.quote}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

const values = [
    {
        title: "Krishna Inspired",
        desc: "Designed to reflect peace, purity, and a divine aura.",
        icon: ChefHat
    },
    {
        title: "100% Vegetarian",
        desc: "Pure vegetarian Chinese and multi-cuisine specialties.",
        icon: Award
    },
    {
        title: "Soulful Ambience",
        desc: "A calm, welcoming escape from the city's rush.",
        icon: Coffee
    },
    {
        title: "Pure & Fresh",
        desc: "Focused on authentic flavors and consistent quality.",
        icon: Users
    }
];

const founders = [
    {
        name: "Shiva Kumar",
        image: "/shiva-kumar.jpg",
        quote: "This restaurant was born from a simple belief — that food should be pure, soulful, and served with devotion. Inspired by the values of Lord Krishna, our vision is to offer a peaceful space where every guest feels welcomed and every meal feels special."
    },
    {
        name: "Vinay",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
        quote: "With a deep passion for vegetarian cuisine and hospitality, Vinay envisioned a dining experience that combines authentic flavors, serene ambience, and mindful living. Every detail — from the menu to the interiors — reflects this philosophy."
    },
    {
        name: "unknown ",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        quote: "We believe in the power of mindfulness. Every detail, from our ingredients to our interiors, is curated to reflect a lifestyle of peace and simple elegance."
    }
];
