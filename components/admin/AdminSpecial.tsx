"use client";

import { useState, useEffect } from "react";
import { useSpecial, SpecialItem } from "@/context/SpecialContext";
import { Save, RefreshCw, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AdminSpecial() {
    const { specialItem, updateSpecial } = useSpecial();
    const [formData, setFormData] = useState<SpecialItem>(specialItem);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(specialItem);
    }, [specialItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setIsSaved(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSpecial(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                        Manage Today's Special
                    </h2>
                    <p className="text-white/40 text-sm">Update the special dish shown on the homepage.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Title</label>
                        <input
                            required
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Subtitle</label>
                        <input
                            required
                            name="subtitle"
                            type="text"
                            value={formData.subtitle}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Description</label>
                        <textarea
                            required
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Image URL</label>
                        <input
                            required
                            name="image"
                            type="text"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 font-mono text-xs"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-white/60 uppercase mb-1">Price (₹)</label>
                            <input
                                required
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/60 uppercase mb-1">Spicy (1-3)</label>
                            <input
                                required
                                name="spicyLevel"
                                type="number"
                                min="1"
                                max="3"
                                value={formData.spicyLevel}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/60 uppercase mb-1">Serves</label>
                            <input
                                required
                                name="serves"
                                type="number"
                                value={formData.serves}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full px-6 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            {isSaved ? (
                                <>
                                    <Sparkles size={18} /> Saved Successfully!
                                </>
                            ) : (
                                <>
                                    <Save size={18} /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Star size={20} className="text-secondary" />
                        Live Preview
                    </h2>
                    <p className="text-white/40 text-sm">How it looks on the website.</p>
                </div>

                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center bg-black/20">
                    <div className="w-full max-w-sm pointer-events-none origin-top scale-90">
                        {/* Mini Preview of the Component Design */}
                        <div className="glass-card p-4 relative overflow-hidden border border-white/10">
                            <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                                <img src={formData.image} className="w-full h-full object-cover" />
                                <div className="absolute bottom-2 right-2 glass px-2 py-1 rounded text-xs font-bold text-primary">
                                    ₹{formData.price}
                                </div>
                            </div>
                            <h3 className="text-primary text-[10px] uppercase font-bold mb-1">{formData.subtitle}</h3>
                            <h2 className="text-white font-bold text-lg leading-tight mb-2">{formData.title}</h2>
                            <p className="text-white/60 text-xs line-clamp-2">{formData.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
