"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function LocationSection() {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-2 md:p-4 overflow-hidden"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {/* Map Area */}
                        <div className="md:col-span-2 h-[400px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750939503923!2d77.5912993143343!3d12.923722790887108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150d75497217%3A0xc3f58a36d2460e4a!2sJayanagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="absolute top-4 left-4 glass-card px-4 py-2 flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-white">Open Now</span>
                            </div>
                        </div>

                        {/* Info Pad */}
                        <div className="bg-black/40 backdrop-blur-md p-8 flex flex-col justify-center gap-8 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none border-t md:border-t-0 md:border-l border-white/10">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Visit <span className="text-primary">Us</span></h3>
                                <p className="text-white/60 text-sm">Experience the divine aura and authentic flavors at our flagship location.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Location</h4>
                                        <p className="text-white/60 text-sm">123 Temple Street, Vrindavan Gardens,<br />Bangalore, KA 560041</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Contact</h4>
                                        <p className="text-white/60 text-sm">+91 98765 43210<br />hello@vrindhana.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Hours</h4>
                                        <p className="text-white/60 text-sm">Mon - Sun: 11:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
