"use client";

import { useState } from "react";
import { MapPin, Navigation, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SetLocationPage() {
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "eligible" | "standard">("idle");

    const checkDelivery = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("checking");

        // Mock API validation
        setTimeout(() => {
            // Logic: Randomly decide or check strictly
            // For demo: if address length is > 10, we say it's FREE (close by)
            const isFree = Math.random() > 0.3;
            setStatus(isFree ? "eligible" : "standard");
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop')",
                    filter: "blur(8px) brightness(0.6)",
                    transform: "scale(1.05)"
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg glass-card p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin size={32} />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Delivery Location</h1>
                    <p className="text-white/60">Enter your address to check for Free Delivery eligibility.</p>
                </div>

                {status === "idle" || status === "checking" ? (
                    <form onSubmit={checkDelivery} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase ml-1">Delivery Address</label>
                            <div className="relative">
                                <Navigation className="absolute left-3 top-3 text-white/40 w-5 h-5" />
                                <textarea
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="e.g. 123, Green Street, Near Main Square..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none min-h-[100px] resize-none"
                                />
                            </div>
                        </div>

                        <button
                            disabled={status === "checking"}
                            className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "checking" ? (
                                <span className="animate-pulse">Checking availability...</span>
                            ) : (
                                <>Check Delivery Status</>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center space-y-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`p-6 rounded-xl border ${status === "eligible" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-yellow-500/10 border-yellow-500 text-yellow-500"}`}
                        >
                            {status === "eligible" ? (
                                <>
                                    <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                                    <h3 className="text-xl font-bold">Free Delivery Available!</h3>
                                    <p className="text-sm opacity-80 mt-1">Your location is within our free delivery zone.</p>
                                </>
                            ) : (
                                <>
                                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                                    <h3 className="text-xl font-bold">Standard Delivery</h3>
                                    <p className="text-sm opacity-80 mt-1">Distance is over 2km. Standard charges apply.</p>
                                </>
                            )}
                        </motion.div>

                        <div className="pt-4">
                            <Link
                                href="/menu"
                                className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                Proceed to Menu <ArrowRight size={18} />
                            </Link>
                        </div>

                        <button
                            onClick={() => setStatus("idle")}
                            className="text-white/40 text-sm hover:text-white hover:underline"
                        >
                            Change Address
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
