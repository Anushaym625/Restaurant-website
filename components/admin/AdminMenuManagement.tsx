"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, Image as ImageIcon, ArrowLeft, ChevronRight, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const INITIAL_MENU = [
    { id: 1, name: "Masala Dosa", category: "South Indian", price: 120, image: "", available: true },
    { id: 2, name: "Idli Sambar", category: "South Indian", price: 80, image: "", available: true },
    { id: 3, name: "Veg Hakka Noodles", category: "Chinese", price: 180, image: "", available: true },
    { id: 4, name: "Gobi Manchurian", category: "Chinese", price: 160, image: "", available: false },
    { id: 5, name: "Paneer Butter Masala", category: "North Indian", price: 240, image: "", available: true },
    { id: 6, name: "Gulab Jamun", category: "Desserts", price: 60, image: "", available: true },
    { id: 7, name: "Watermelon Juice", category: "Fresh Juice", price: 90, image: "", available: true },
];

const CATEGORIES = [
    { id: 1, name: "South Indian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "North Indian", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60" },
    { id: 4, name: "Desserts", image: "https://images.unsplash.com/photo-1517244683847-745431cd67ef?w=500&auto=format&fit=crop&q=60" },
    { id: 5, name: "Fresh Juice", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=60" },
];

export function AdminMenuManagement() {
    const [categories, setCategories] = useState(CATEGORIES);
    const [menuItems, setMenuItems] = useState(INITIAL_MENU);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Modal & Form States
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const [newItem, setNewItem] = useState({ id: 0, name: "", category: "", price: "", image: "", available: true });
    const [newCategory, setNewCategory] = useState({ id: 0, name: "", image: "" });

    const [isEditingItem, setIsEditingItem] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);

    // Computed
    const filteredItems = selectedCategory ? menuItems.filter(item => item.category === selectedCategory) : [];

    // --- Item Handlers ---
    const toggleAvailability = (id: number) => {
        setMenuItems(menuItems.map(item => item.id === id ? { ...item, available: !item.available } : item));
    };

    const handleDeleteItem = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            setMenuItems(menuItems.filter(item => item.id !== id));
        }
    };

    const handleSaveItem = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditingItem) {
            setMenuItems(menuItems.map(item => item.id === newItem.id ? {
                ...item,
                name: newItem.name,
                price: Number(newItem.price),
                image: newItem.image,
                available: newItem.available
            } : item));
        } else {
            const item = {
                id: Date.now(),
                name: newItem.name,
                category: selectedCategory || newItem.category,
                price: Number(newItem.price),
                image: newItem.image,
                available: newItem.available
            };
            setMenuItems([item, ...menuItems]);
        }

        setIsItemModalOpen(false);
        resetItemForm();
    };

    // --- Category Handlers ---
    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditingCategory) {
            setCategories(categories.map(cat => cat.id === newCategory.id ? {
                ...cat,
                name: newCategory.name,
                image: newCategory.image
            } : cat));

            // If we renamed the currently selected category, update the selection too if needed
            // But since we use selection by name in this mock, we might need to update items' category too?
            // For now, let's assume filtering relies on the name string.
            // Ideally, we'd update all items with the old category name to the new name.
            const oldCat = categories.find(c => c.id === newCategory.id);
            if (oldCat && oldCat.name !== newCategory.name) {
                setMenuItems(menuItems.map(item => item.category === oldCat.name ? { ...item, category: newCategory.name } : item));
                if (selectedCategory === oldCat.name) setSelectedCategory(newCategory.name);
            }

        } else {
            setCategories([...categories, {
                id: Date.now(),
                name: newCategory.name,
                image: newCategory.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60"
            }]);
        }

        setIsCategoryModalOpen(false);
        resetCategoryForm();
    };

    const handleDeleteCategory = (e: React.MouseEvent, id: number, name: string) => {
        e.stopPropagation(); // Prevent opening the category
        if (confirm(`Delete '${name}' category? This will also delete all items in it.`)) {
            setCategories(categories.filter(cat => cat.id !== id));
            setMenuItems(menuItems.filter(item => item.category !== name));
            if (selectedCategory === name) setSelectedCategory(null);
        }
    };

    const openAddCategoryModal = () => {
        resetCategoryForm();
        setIsCategoryModalOpen(true);
    };

    const openEditCategoryModal = (e: React.MouseEvent, category: any) => {
        e.stopPropagation();
        setNewCategory(category);
        setIsEditingCategory(true);
        setIsCategoryModalOpen(true);
    };

    // --- Modal Openers & Resets ---
    const openAddItemModal = () => {
        resetItemForm();
        setNewItem(prev => ({ ...prev, category: selectedCategory || categories[0]?.name || "" }));
        setIsItemModalOpen(true);
    };

    const openEditItemModal = (item: any) => {
        setNewItem({ ...item, price: item.price.toString() });
        setIsEditingItem(true);
        setIsItemModalOpen(true);
    };

    const resetItemForm = () => {
        setNewItem({ id: 0, name: "", category: "", price: "", image: "", available: true });
        setIsEditingItem(false);
    };

    const resetCategoryForm = () => {
        setNewCategory({ id: 0, name: "", image: "" });
        setIsEditingCategory(false);
    };

    return (
        <div className="space-y-6">
            {!selectedCategory ? (
                // Category Grid View
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Menu Categories</h3>
                        <button
                            onClick={openAddCategoryModal}
                            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-primary-hover hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                        >
                            <Plus size={16} /> Add Category
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
                        {categories.map((cat) => {
                            const count = menuItems.filter(i => i.category === cat.name).length;
                            return (
                                <div
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className="glass-card group cursor-pointer relative overflow-hidden h-48 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:ring-2 hover:ring-primary/50"
                                >
                                    <div className="absolute inset-0">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                        {/* Action Buttons (Visible on Hover) */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                            <button
                                                onClick={(e) => openEditCategoryModal(e, cat)}
                                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                                                title="Edit Category"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteCategory(e, cat.id, cat.name)}
                                                className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-full backdrop-blur-md transition-colors"
                                                title="Delete Category"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                                            {cat.name} <ChevronRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </h3>
                                        <p className="text-white/60 font-medium">{count} Items</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                // Items List View
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h3 className="font-bold text-lg">{selectedCategory} Menu</h3>
                                <p className="text-xs text-white/40">Manage items for this category</p>
                            </div>
                        </div>
                        <button
                            onClick={openAddItemModal}
                            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-primary-hover hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                        >
                            <Plus size={16} /> Add {selectedCategory} Item
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-white/40 border-b border-white/10 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3 text-center">Available</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredItems.length > 0 ? filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-4 py-3">
                                            <div className="w-10 h-10 rounded bg-white/10 overflow-hidden flex items-center justify-center text-white/20">
                                                <ImageIcon size={20} />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{item.name}</td>
                                        <td className="px-4 py-3 font-bold text-primary">₹{item.price}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => toggleAvailability(item.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${item.available ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                                            >
                                                {item.available ? "Yes" : "No"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2 text-white/60">
                                                <button onClick={() => openEditItemModal(item)} className="hover:text-primary p-1 transition-colors"><Edit size={16} /></button>
                                                <button onClick={() => handleDeleteItem(item.id)} className="hover:text-red-500 p-1 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-white/40">
                                            No items found in this category.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Item Modal */}
            <AnimatePresence>
                {isItemModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsItemModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-800 border border-white/10 w-full max-w-lg p-6 rounded-xl relative z-60 shadow-2xl"
                        >
                            <h3 className="text-xl font-bold mb-6">{isEditingItem ? "Edit Dish" : `Add New ${selectedCategory} Item`}</h3>
                            <form onSubmit={handleSaveItem} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-white/60 uppercase block mb-2">Item Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                                        placeholder="e.g. Special Dish"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-white/60 uppercase block mb-2">Category</label>
                                        <input
                                            type="text"
                                            value={selectedCategory || newItem.category}
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white/40 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-white/60 uppercase block mb-2">Price (₹)</label>
                                        <input
                                            type="number"
                                            required
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                                            placeholder="250"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-white/60 uppercase block mb-2">Image Upload</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                        <ImageIcon className="mx-auto text-white/40 mb-2" size={24} />
                                        <span className="text-sm text-white/60">Click to upload image</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 py-2">
                                    <label className="text-sm font-bold text-white">Available Now?</label>
                                    <button
                                        type="button"
                                        onClick={() => setNewItem({ ...newItem, available: !newItem.available })}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${newItem.available ? "bg-primary" : "bg-white/10"}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${newItem.available ? "left-7" : "left-1"}`} />
                                    </button>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsItemModalOpen(false)}
                                        className="flex-1 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
                                    >
                                        {isEditingItem ? "Save Changes" : "Add Item"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add/Edit Category Modal */}
            <AnimatePresence>
                {isCategoryModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsCategoryModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-800 border border-white/10 w-full max-w-sm p-6 rounded-xl relative z-60 shadow-2xl"
                        >
                            <h3 className="text-xl font-bold mb-6">{isEditingCategory ? "Edit Category" : "Add Category"}</h3>
                            <form onSubmit={handleSaveCategory} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-white/60 uppercase block mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                                        placeholder="e.g. Snacks"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/60 uppercase block mb-2">Cover Image URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={newCategory.image}
                                        onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryModalOpen(false)}
                                        className="flex-1 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
                                    >
                                        {isEditingCategory ? "Save Changes" : "Create"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
