"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                    We'd love to hear from you. Whether you have a question about our menu, pricing, or anything else, our team is ready to answer all your questions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Info & Map */}
                <div className="space-y-8">
                    <div className="glass-card p-8 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="p-2 bg-primary/20 text-primary rounded-lg"><MapPin /></span>
                                Visit Us
                            </h3>
                            <p className="text-white/60 pl-14">
                                123 Culinary Avenue,<br />
                                Food District, FD 90210
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="p-2 bg-primary/20 text-primary rounded-lg"><Mail /></span>
                                Email Us
                            </h3>
                            <p className="text-white/60 pl-14">
                                contact@vrindhana.com<br />
                                support@vrindhana.com
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="p-2 bg-primary/20 text-primary rounded-lg"><Phone /></span>
                                Call Us
                            </h3>
                            <p className="text-white/60 pl-14">
                                +1 (555) 123-4567<br />
                                +1 (555) 987-6543
                            </p>
                        </div>
                    </div>

                    {/* Fake Map */}
                    <div className="glass-card p-2 h-64 relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                            alt="Map Location"
                            className="w-full h-full object-cover rounded-lg opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                <MapPin size={16} className="text-primary" /> View on Google Maps
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass-card p-8">
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <Send size={40} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-white/60">We'll get back to you shortly.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-8 text-primary hover:text-white transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase ml-1">First Name</label>
                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase ml-1">Last Name</label>
                                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/50 uppercase ml-1">Email Address</label>
                                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/50 uppercase ml-1">Subject</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none bg-dark-900">
                                    <option>General Inquiry</option>
                                    <option>Reservation Support</option>
                                    <option>Event Booking</option>
                                    <option>Feedback</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/50 uppercase ml-1">Message</label>
                                <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none resize-none" placeholder="How can we help you?" />
                            </div>

                            <button className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2">
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}
