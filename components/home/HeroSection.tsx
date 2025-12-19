"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
            {/* Background with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dark-900 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=2670&auto=format&fit=crop')" }}
                />
            </motion.div>

            {/* Main Glass Card Container - Transparent Frame Only */}
            <div className="container relative z-10 mx-auto px-6">
                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-white/20 backdrop-blur-md rounded-3xl shadow-2xl bg-transparent">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium">
                            <Star className="w-4 h-4 fill-primary" />
                            <span>Premium Vegetarian Dining</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                            Experience the <br />
                            <span className="text-gradient">Taste of Luxury</span>
                        </h1>

                        <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                            Indulge in a culinary journey where authentic South Indian flavors meet modern aesthetics.
                            Vrindhana offers an unforgettable pure vegetarian dining atmosphere.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/delivery/set-location"
                                className="group px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 duration-300"
                            >
                                Delivery <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/menu"
                                className="px-8 py-4 glass text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all border border-white/20 active:scale-95 duration-300"
                            >
                                Menu
                            </Link>
                            <Link
                                href="/booking"
                                className="px-8 py-4 glass text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all border border-white/20 active:scale-95 duration-300"
                            >
                                Book a Table
                            </Link>
                            <Link
                                href="/dine-in"
                                className="px-8 py-4 glass bg-white/5 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all border border-white/20 flex items-center gap-2 active:scale-95 duration-300"
                            >
                                Dine In
                            </Link>
                        </div>
                    </motion.div>

                    {/* Rotating Food Animation */}
                    <motion.div
                        style={{ y: y2 }}
                        className="relative hidden lg:block w-full max-w-lg aspect-square"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />

                            {/* Main Fixed Bowl */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-full rounded-full shadow-2xl overflow-hidden border-4 border-white/10 p-0 z-20 bg-black/20 backdrop-blur-sm"
                            >
                                <img
                                    src="/hero-main.jpg"
                                    alt="Vrindhana Special Thali"
                                    className="w-full h-full object-cover shadow-2xl scale-110"
                                />
                            </motion.div>

                            {/* Text Badge (Static or Floating) */}
                            <div className="absolute -bottom-6 -right-6 glass-card p-4 flex items-center gap-4 animate-float z-30">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    <Star className="fill-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold whitespace-nowrap">
                                        Signature Thali
                                    </p>
                                    <p className="text-xs text-white/60">Chef's Special</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
