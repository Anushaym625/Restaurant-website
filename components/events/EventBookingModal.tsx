"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventTitle: string;
}

const SEATS = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.7 ? "sold" : "available", // Mock status
}));

export function EventBookingModal({ isOpen, onClose, eventTitle }: BookingModalProps) {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [step, setStep] = useState<"select" | "confirm" | "success">("select");

    const toggleSeat = (id: number) => {
        if (selectedSeats.includes(id)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== id));
        } else {
            setSelectedSeats([...selectedSeats, id]);
        }
    };

    const handleBook = () => {
        setStep("success");
        // Mock API call simulation
        setTimeout(() => {
            // Reset after success
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-dark-900 border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Ticket className="text-primary" />
                            {step === "success" ? "Booking Confirmed" : "Book Seats"}
                        </h3>
                        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8">
                        {step === "select" && (
                            <>
                                <p className="text-white/60 mb-6 text-center">Select your seats for <span className="text-white font-bold">{eventTitle}</span></p>

                                {/* Stage */}
                                <div className="w-full h-8 bg-white/10 rounded-lg mb-8 flex items-center justify-center text-xs text-white/40 uppercase tracking-widest font-bold">
                                    Stage
                                </div>

                                {/* Seats Grid */}
                                <div className="grid grid-cols-5 gap-3 mb-8 justify-items-center">
                                    {SEATS.map((seat) => (
                                        <button
                                            key={seat.id}
                                            disabled={seat.status === "sold"}
                                            onClick={() => toggleSeat(seat.id)}
                                            className={cn(
                                                "w-10 h-10 rounded-t-lg border-b-4 transition-all flex items-center justify-center text-xs font-bold",
                                                seat.status === "sold"
                                                    ? "bg-white/5 text-white/20 border-white/5 cursor-not-allowed"
                                                    : selectedSeats.includes(seat.id)
                                                        ? "bg-primary text-white border-primary-hover shadow-lg shadow-primary/20 scale-105"
                                                        : "bg-white/10 text-white/60 border-white/20 hover:bg-white/20 hover:border-white/30"
                                            )}
                                        >
                                            {seat.id}
                                        </button>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="flex justify-center gap-6 text-xs text-white/40 mb-8">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/10"></div> Available</span>
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary"></div> Selected</span>
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/5 opacity-50"></div> Sold</span>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <div>
                                        <p className="text-xs text-white/40 uppercase">Total Price</p>
                                        <p className="text-2xl font-bold text-primary">${selectedSeats.length * 50}</p>
                                    </div>
                                    <button
                                        onClick={() => setStep("confirm")}
                                        disabled={selectedSeats.length === 0}
                                        className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </>
                        )}

                        {step === "confirm" && (
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold mb-4">Confirm Booking</h4>
                                <div className="bg-white/5 p-4 rounded-lg space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Event</span>
                                        <span className="font-medium text-right">{eventTitle}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Seats</span>
                                        <span className="font-medium">{selectedSeats.join(", ")}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-white/10">
                                        <span className="text-white/60">Total</span>
                                        <span className="font-bold text-primary text-lg">${selectedSeats.length * 50}</span>
                                    </div>
                                </div>

                                {/* Mock Payment UI */}
                                <div className="space-y-3">
                                    <p className="text-xs text-white/40 uppercase font-bold">Payment Method</p>
                                    <div className="flex gap-4">
                                        <div className="flex-1 p-3 border border-primary bg-primary/10 text-primary font-bold text-center rounded-lg text-sm cursor-pointer">Credit Card</div>
                                        <div className="flex-1 p-3 border border-white/10 bg-white/5 text-white/60 font-bold text-center rounded-lg text-sm cursor-pointer hover:bg-white/10">PayPal</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setStep("select")} className="flex-1 py-3 text-white/60 hover:text-white transition-colors font-semibold">Back</button>
                                    <button onClick={handleBook} className="flex-1 py-3 bg-primary text-white text-center font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20">Pay & Book</button>
                                </div>
                            </div>
                        )}

                        {step === "success" && (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle size={40} />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-white/60 mb-8">Your tickets have been sent to your email.</p>
                                <button onClick={onClose} className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-semibold">
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
