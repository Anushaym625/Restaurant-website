"use client";

import { useState, useRef } from "react";
import { useBestDelivered, BestDeliveredItem } from "@/context/BestDeliveredContext";
import { Save, Trash2, Plus, Edit3, X, Upload, Image as ImageIcon, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_FORM: Omit<BestDeliveredItem, 'id'> = {
    name: "",
    description: "",
    price: 0,
    image: "",
    reverse: false
};

export function AdminBestDelivered() {
    const { items, addItem, updateItem, removeItem } = useBestDelivered();
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [previewId, setPreviewId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<BestDeliveredItem, 'id'>>(EMPTY_FORM);
    const [showForm, setShowForm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setFormData(EMPTY_FORM);
        setIsEditing(null);
        setShowForm(false);
        setPreviewId(null);
    };

    const handleEditClick = (item: BestDeliveredItem, e: React.MouseEvent) => {
        e.stopPropagation();
        setFormData(item);
        setIsEditing(item.id);
        setShowForm(true);
    };

    const handleCreateClick = () => {
        setFormData(EMPTY_FORM);
        setIsEditing(null);
        setShowForm(true);
        setPreviewId(null);
    };

    const handlePreviewClick = (id: string) => {
        setPreviewId(id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateItem(isEditing, formData);
        } else {
            addItem(formData);
        }
        resetForm();
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Remove this item?")) {
            removeItem(id);
            if (isEditing === id) resetForm();
            if (previewId === id) setPreviewId(null);
        }
    };

    // Determine what to show in preview
    const previewItem = showForm ? formData : (items.find(i => i.id === previewId) || null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* List & Form */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Managed Delivered Items
                        </h2>
                        <p className="text-white/40 text-sm">{items.length} items active.</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={handleCreateClick}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-all"
                        >
                            <Plus size={16} /> Add Item
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {showForm ? (
                        <motion.form
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleSubmit}
                            className="glass-card p-6 space-y-4 relative"
                        >
                            <button
                                type="button"
                                onClick={resetForm}
                                className="absolute top-4 right-4 text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-lg font-bold text-white mb-4">{isEditing ? "Edit Item" : "New Item"}</h3>

                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Item Name</label>
                                <input required name="name" type="text" placeholder="e.g. Masala Dosa" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Description</label>
                                <textarea required name="description" rows={3} placeholder="Tasty description..." value={formData.description} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Price</label>
                                <input required name="price" type="number" value={formData.price} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                            </div>

                            {/* Image Upload Area */}
                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Image</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-32 border-2 border-dashed border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                    {formData.image ? (
                                        <div className="relative w-full h-full p-2">
                                            <img src={formData.image} className="w-full h-full object-contain rounded" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                                                <p className="text-white text-xs font-bold flex items-center gap-1"><Upload size={14} /> Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                                <ImageIcon size={20} className="text-white/40 group-hover:text-primary" />
                                            </div>
                                            <p className="text-xs text-white/40 font-bold group-hover:text-white">Click to upload image</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="reverse"
                                    checked={formData.reverse || false}
                                    onChange={(e) => setFormData({ ...formData, reverse: e.target.checked })}
                                    className="accent-primary w-4 h-4"
                                />
                                <label htmlFor="reverse" className="text-sm text-white/80 cursor-pointer select-none">Reverse Layout (Image on Right)</label>
                            </div>

                            <button type="submit" className="w-full px-6 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
                                <Save size={18} /> {isEditing ? "Update Item" : "Create Item"}
                            </button>
                        </motion.form>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={item.id}
                                    onClick={() => handlePreviewClick(item.id)}
                                    className={`glass p-4 rounded-xl flex items-center gap-4 group cursor-pointer transition-all ${previewId === item.id ? "border-primary/50 bg-primary/10" : "border-white/5 hover:bg-white/5"}`}
                                >
                                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                        <img src={item.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-bold truncate">{item.name}</h4>
                                        <p className="text-primary text-sm font-bold">₹{item.price}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => handleEditClick(item, e)} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"><Edit3 size={18} /></button>
                                        <button onClick={(e) => handleDelete(item.id, e)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Preview */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-2">Live Preview</h2>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 bg-black/20 min-h-[400px] flex items-center justify-center">
                    {previewItem && previewItem.name ? (
                        <div className={`w-full max-w-lg glass-card p-6 flex flex-col-reverse md:flex-row items-center gap-6 ${previewItem.reverse ? 'flex-col-reverse md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-bold text-white">{previewItem.name}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">{previewItem.description}</p>
                                <div className="text-lg font-bold text-primary">₹{previewItem.price}/-</div>
                                <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold mt-2 flex items-center gap-2">
                                    Add Item <Plus size={14} />
                                </button>
                            </div>
                            <div className="w-32 h-32 relative shrink-0">
                                <img src={previewItem.image} className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-xl" />
                            </div>
                        </div>
                    ) : (
                        <div className="text-white/30 text-center">Select an item to preview</div>
                    )}
                </div>
            </div>
        </div>
    );
}
