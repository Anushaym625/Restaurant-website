"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
    {
        id: 1,
        name: "Anusha",
        role: "Food Critic",
        image: "https://i.pravatar.cc/100?img=5",
        rating: 5,
        text: "The ambiance is unmatched. Every dish tells a story, and the flavors are absolutely authentic. A must-visit!"
    },
    {
        id: 2,
        name: "Thejas",
        role: "Regular Customer",
        image: "https://i.pravatar.cc/100?img=11",
        rating: 5,
        text: "Best sushi I've had in the city. The service is impeccable and the staff makes you feel like royalty."
    },
    {
        id: 3,
        name: "Shrusti",
        role: "Food Blogger",
        image: "https://i.pravatar.cc/100?img=9",
        rating: 4,
        text: "Loved the fusion menu! The spicy ramen was a highlight. Great place for a date night."
    }
];

export function Testimonials() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        What They <span className="text-gradient">Say</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-card p-8 relative group border border-white/5 hover:border-primary/30"
                        >
                            <Quote className="absolute top-6 right-6 text-white/10 w-10 h-10 group-hover:text-primary/20 transition-colors" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full border-2 border-primary p-1">
                                    <img src={review.image} alt={review.name} className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{review.name}</h4>
                                    <p className="text-xs text-secondary font-bold uppercase">{review.role}</p>
                                </div>
                            </div>

                            <div className="flex text-secondary mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={i < review.rating ? "fill-secondary" : "text-white/20"} />
                                ))}
                            </div>

                            <p className="text-white/70 italic leading-relaxed">&quot;{review.text}&quot;</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
