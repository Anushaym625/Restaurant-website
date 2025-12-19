"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, CheckCircle, Smartphone, Mail, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: 2,
        name: "",
        email: "",
        phone: "",
        specialRequest: "",
        seatingPreference: "indoor"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2); // Success state
    };

    return (
        <div className="min-h-screen py-20 px-6 relative flex items-center justify-center overflow-hidden">
            {/* Specific Blurred Background for Booking Page */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop')",
                    filter: "blur(8px) brightness(0.5)",
                    transform: "scale(1.05)"
                }}
            />

            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="text-white space-y-6 hidden md:block">
                    <h1 className="text-5xl font-bold leading-tight">
                        Reserve Your <br />
                        <span className="text-primary">Table Now</span>
                    </h1>
                    <p className="text-white/60 text-lg">
                        Experience world-class dining with us. Whether it's a romantic dinner, a business meeting, or a family gathering, we have the perfect spot for you.
                    </p>
                    <div className="flex gap-4 p-4 glass-card bg-white/5 border-white/10 rounded-xl">
                        <div>
                            <div className="text-2xl font-bold text-primary">4.9</div>
                            <div className="text-xs text-white/40">Google Reviews</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <div className="text-2xl font-bold text-primary">15k+</div>
                            <div className="text-xs text-white/40">Happy Guests</div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-black/70 backdrop-blur-md p-8 border border-white/10 shadow-2xl relative"
                >
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Book a Table</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/60 uppercase">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/60 uppercase">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                        <select
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        >
                                            <option value="" className="bg-dark-900">Select Time</option>
                                            <option value="09:00" className="bg-dark-900">09:00 AM</option>
                                            <option value="10:00" className="bg-dark-900">10:00 AM</option>
                                            <option value="11:00" className="bg-dark-900">11:00 AM</option>
                                            <option value="12:00" className="bg-dark-900">12:00 PM</option>
                                            <option value="13:00" className="bg-dark-900">01:00 PM</option>
                                            <option value="14:00" className="bg-dark-900">02:00 PM</option>
                                            <option value="15:00" className="bg-dark-900">03:00 PM</option>
                                            <option value="16:00" className="bg-dark-900">04:00 PM</option>
                                            <option value="17:00" className="bg-dark-900">05:00 PM</option>
                                            <option value="18:00" className="bg-dark-900">06:00 PM</option>
                                            <option value="19:00" className="bg-dark-900">07:00 PM</option>
                                            <option value="20:00" className="bg-dark-900">08:00 PM</option>
                                            <option value="21:00" className="bg-dark-900">09:00 PM</option>
                                            <option value="22:00" className="bg-dark-900">10:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase">Guests</label>
                                <div className="grid grid-cols-6 gap-2">
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, guests: num })}
                                            className={cn(
                                                "py-2 rounded-lg text-sm font-bold border transition-colors",
                                                formData.guests === num
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                                            )}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                                    <input
                                        type="text" placeholder="Full Name" required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                                    <input
                                        type="email" placeholder="Email Address" required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                                    <input
                                        type="tel" placeholder="Phone Number" required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white placeholder:text-white/30 text-sm focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <label className="text-xs font-bold text-white/60 uppercase">Seating Preference</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, seatingPreference: "indoor" })}
                                        className={cn(
                                            "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                                            formData.seatingPreference === "indoor"
                                                ? "bg-primary/20 border-primary text-white"
                                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="font-bold">Indoor</div>
                                        <div className="text-xs text-primary font-bold">₹50 Charge</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, seatingPreference: "outdoor" })}
                                        className={cn(
                                            "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                                            formData.seatingPreference === "outdoor"
                                                ? "bg-primary/20 border-primary text-white"
                                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="font-bold">Outdoor</div>
                                        <div className="text-xs text-primary font-bold">₹100 Charge</div>
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] flex justify-between px-8 items-center">
                                <span>Confirm Reservation</span>
                                <span className="text-sm bg-black/20 px-2 py-1 rounded">
                                    Pay ₹{formData.seatingPreference === "indoor" ? "50" : "100"}
                                </span>
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-12 px-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle size={48} />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-white mb-4">Reservation Confirmed!</h3>
                            <p className="text-white/60 mb-8">
                                Thank you for choosing Vrindhana. We have sent a confirmation email to you.
                            </p>
                            <Link href="/" className="inline-block px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-semibold">
                                Back to Home
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
