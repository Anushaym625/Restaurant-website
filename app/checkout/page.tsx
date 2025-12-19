"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CreditCard, MapPin, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const { items: cartItems, total, updateQty, removeFromCart } = useCart();

    const handleNext = () => setStep(step + 1);

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-6">
            {/* Steps Indicator */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4 text-sm font-bold">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-white/40'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-current'}`}>1</span>
                        Cart
                    </div>
                    <div className="w-12 h-px bg-white/10" />
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-white/40'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-current'}`}>2</span>
                        Checkout
                    </div>
                    <div className="w-12 h-px bg-white/10" />
                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-white/40'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-current'}`}>3</span>
                        Finish
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Your Cart ({cartItems.length})</h2>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-12 glass-card">
                                    <ShoppingBag size={48} className="mx-auto text-white/20 mb-4" />
                                    <p className="text-white/60">Your cart is empty.</p>
                                    <Link href="/menu" className="text-primary hover:underline mt-4 inline-block font-bold">Browse Menu</Link>
                                </div>
                            ) : (
                                <div className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                                <p className="text-primary font-bold">₹{item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2">
                                                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:text-white transition-colors">-</button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:text-white transition-colors">+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-red-500 transition-colors">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {cartItems.length > 0 && (
                                <div className="flex justify-end pt-6">
                                    <div className="text-right space-y-2">
                                        <div className="text-white/60 text-sm">Subtotal</div>
                                        <div className="text-3xl font-bold text-primary">₹{total.toFixed(2)}</div>
                                        <p className="text-xs text-white/40 mb-4">Taxes and shipping calculated at checkout</p>
                                        <button onClick={handleNext} className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-card p-6 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2"><MapPin size={20} className="text-primary" /> Delivery Address</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none" />
                                        <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none" />
                                    </div>
                                    <input type="text" placeholder="Street Address" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="City" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none" />
                                        <input type="text" placeholder="ZIP Code" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none" />
                                    </div>
                                </form>

                                <h3 className="text-xl font-bold flex items-center gap-2 pt-6"><CreditCard size={20} className="text-primary" /> Payment Method</h3>
                                <div className="space-y-3">
                                    <div className="p-4 border border-primary bg-primary/10 rounded-lg flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <CreditCard size={20} />
                                            <span className="font-bold">Credit Card</span>
                                        </div>
                                        <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                    </div>
                                    <div className="p-4 border border-white/10 bg-white/5 rounded-lg flex items-center justify-between cursor-pointer opacity-50">
                                        <div className="flex items-center gap-3">
                                            <span>PayPal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 h-fit">
                                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                                <div className="space-y-3 mb-6">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-white/60">{item.qty}x {item.name}</span>
                                            <span className="font-medium">₹{item.price * item.qty}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">₹{total}</span>
                                    </div>
                                </div>
                                <button onClick={handleNext} className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all">
                                    Place Order
                                </button>
                                <button onClick={() => setStep(1)} className="w-full py-2 text-white/40 hover:text-white text-sm mt-2">
                                    Back to Cart
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 glass-card max-w-lg mx-auto">
                            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
                            <p className="text-white/60 mb-8 max-w-md mx-auto">
                                Your order <span className="text-primary font-bold">#ORD-2025-88</span> has been placed successfully. You can track its status in your dashboard.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link href="/dashboard" className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors">
                                    View Order
                                </Link>
                                <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-bold">
                                    Continue Ordering
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
