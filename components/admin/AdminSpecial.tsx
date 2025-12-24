import { useState, useRef } from "react";
import { useSpecial, SpecialItem } from "@/context/SpecialContext";
import { Save, Star, Sparkles, Trash2, Plus, Edit3, X, Upload, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_FORM: Omit<SpecialItem, 'id'> = {
    title: "",
    subtitle: "",
    description: "",
    image: "",
    price: 0,
    spicyLevel: 1,
    serves: 1
};

export function AdminSpecial() {
    const { specialItems, addSpecial, updateSpecial, removeSpecial } = useSpecial();
    const [isEditing, setIsEditing] = useState<string | null>(null); // ID of item being edited
    const [previewId, setPreviewId] = useState<string | null>(null); // ID of item selected for preview
    const [formData, setFormData] = useState<Omit<SpecialItem, 'id'>>(EMPTY_FORM);
    const [isSaved, setIsSaved] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setFormData(EMPTY_FORM);
        setIsEditing(null);
        setShowForm(false);
        setIsSaved(false);
        setPreviewId(null);
    };

    const handleEditClick = (item: SpecialItem, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent preview click
        setFormData(item);
        setIsEditing(item.id);
        setShowForm(true);
    };

    const handlePreviewClick = (id: string) => {
        setPreviewId(id);
    };

    const handleCreateClick = () => {
        setFormData(EMPTY_FORM);
        setIsEditing(null);
        setShowForm(true);
        setPreviewId(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            updateSpecial(isEditing, formData);
        } else {
            addSpecial(formData);
        }
        setIsSaved(true);
        setTimeout(() => resetForm(), 1000); // Close after 1s success
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Remove this special?")) {
            removeSpecial(id);
            if (isEditing === id) resetForm();
            if (previewId === id) setPreviewId(null);
        }
    };

    // Determine what to show in preview
    const previewItem = showForm ? formData : (specialItems.find(i => i.id === previewId) || null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* List & Form Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Manage Specials
                        </h2>
                        <p className="text-white/40 text-sm">You have {specialItems.length} active specials.</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={handleCreateClick}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-all"
                        >
                            <Plus size={16} /> Add New
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
                            <h3 className="text-lg font-bold text-white mb-4">
                                {isEditing ? "Edit Special" : "Create New Special"}
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Title</label>
                                <input required name="title" type="text" placeholder="Dish Name" value={formData.title} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Subtitle</label>
                                <input required name="subtitle" type="text" placeholder="Tagline" value={formData.subtitle} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/60 uppercase mb-1">Description</label>
                                <textarea required name="description" rows={3} placeholder="Details..." value={formData.description} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
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

                            <div className="grid grid-cols-3 gap-4">
                                <div><label className="block text-xs font-bold text-white/60 uppercase mb-1">Price</label><input required name="price" type="number" value={formData.price} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" /></div>
                                <div><label className="block text-xs font-bold text-white/60 uppercase mb-1">Spicy</label><input required name="spicyLevel" type="number" min="1" max="3" value={formData.spicyLevel} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" /></div>
                                <div><label className="block text-xs font-bold text-white/60 uppercase mb-1">Serves</label><input required name="serves" type="number" value={formData.serves} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white" /></div>
                            </div>

                            <button type="submit" className="w-full px-6 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
                                {isSaved ? <><Sparkles size={18} /> Saved!</> : <><Save size={18} /> {isEditing ? "Update" : "Create"}</>}
                            </button>
                        </motion.form>
                    ) : (
                        <div className="space-y-3">
                            {specialItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={item.id}
                                    onClick={() => handlePreviewClick(item.id)}
                                    className={`glass p-4 rounded-xl flex items-center gap-4 group cursor-pointer transition-all ${previewId === item.id ? "border-primary/50 bg-primary/10" : "border-white/5 hover:bg-white/5"}`}
                                >
                                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-bold truncate">{item.title}</h4>
                                        <p className="text-primary text-sm font-bold">₹{item.price}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => handleEditClick(item, e)} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors" title="Edit">
                                            <Edit3 size={18} />
                                        </button>
                                        <button onClick={(e) => handleDelete(item.id, e)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                            {specialItems.length === 0 && (
                                <div className="text-center py-10 text-white/40 border-2 border-dashed border-white/10 rounded-xl">
                                    No specials active. Add one!
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Star size={20} className="text-secondary" />
                        Preview
                    </h2>
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center bg-black/20 min-h-[300px]">
                    {/* Show preview of whatever is selected */}
                    <div className="w-full max-w-sm pointer-events-none origin-top scale-90">
                        {(previewItem && previewItem.title) ? (
                            <div className="glass-card p-4">
                                <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-white/5">
                                    {previewItem.image && <img src={previewItem.image} className="w-full h-full object-cover" />}
                                </div>
                                <h3 className="text-primary text-[10px] font-bold">{previewItem.subtitle}</h3>
                                <h2 className="text-white font-bold">{previewItem.title}</h2>
                                <p className="text-white/60 text-xs mt-2 line-clamp-2">{previewItem.description}</p>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                                    <span className="text-white font-bold">₹{previewItem.price}</span>
                                    <span className="text-[10px] glass px-2 py-1 rounded">Serves {previewItem.serves}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-white/50">
                                {showForm ? "Start typing..." : "Select an item to preview"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
