"use client";

import { motion } from "framer-motion";
import { QrCode, UtensilsCrossed, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DineInPage() {
    const [tableNum, setTableNum] = useState("");

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Dine In <span className="text-gradient">Experience</span></h1>
                    <p className="text-white/60">Select your table or scan the QR code to proceed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Option 1: QR Scan */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 flex flex-col items-center text-center group cursor-pointer border border-white/10 hover:border-primary/50 transition-colors"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <QrCode size={40} className="text-white group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Scan QR Code</h3>
                        <p className="text-white/60 mb-8">Scan the code on your table to instantly view menu and order.</p>
                        <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold w-full transition-colors">
                            Open Scanner
                        </button>
                    </motion.div>

                    {/* Option 2: Manual Entry */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 flex flex-col items-center text-center group border border-white/10 hover:border-secondary/50 transition-colors"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                            <UtensilsCrossed size={40} className="text-white group-hover:text-secondary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Enter Table Number</h3>
                        <p className="text-white/60 mb-6">Already seated? Enter your table number to start ordering.</p>

                        <div className="w-full space-y-4">
                            <input
                                type="number"
                                placeholder="Ex: 12"
                                value={tableNum}
                                onChange={(e) => setTableNum(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-center text-xl font-bold focus:border-secondary outline-none transition-colors"
                            />
                            <Link href="/menu?mode=dine-in" className="block w-full">
                                <button className="px-6 py-3 rounded-full bg-secondary text-black font-bold w-full hover:bg-secondary-hover transition-colors flex items-center justify-center gap-2">
                                    Start Ordering <ArrowRight size={18} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
