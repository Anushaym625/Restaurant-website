"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

export function AdminSettings() {
    const { settings, updateSettings } = useRestaurant();
    const [localSettings, setLocalSettings] = useState(settings);

    // Sync local state when context loads (e.g. from local storage)
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleSave = () => {
        updateSettings(localSettings);
        alert("Settings saved successfully!");
    };

    return (
        <div className="glass-card p-8 max-w-3xl">
            <h3 className="text-2xl font-bold mb-6">Restaurant Settings</h3>

            <div className="space-y-8">
                {/* General Info */}
                <section className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary border-b border-white/10 pb-2">General Information</h4>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase">Restaurant Name</label>
                        <input
                            type="text"
                            value={localSettings.name}
                            onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase">Contact Email</label>
                            <input
                                type="email"
                                value={localSettings.email}
                                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase">Contact Phone</label>
                            <input
                                type="tel"
                                value={localSettings.phone}
                                onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase">Address</label>
                        <textarea
                            rows={3}
                            value={localSettings.address}
                            onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none resize-none"
                        />
                    </div>
                </section>

                {/* Timings */}
                <section className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary border-b border-white/10 pb-2">Operational Hours</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase">Opening Time</label>
                            <input
                                type="time"
                                value={localSettings.openingTime}
                                onChange={(e) => setLocalSettings({ ...localSettings, openingTime: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase">Closing Time</label>
                            <input
                                type="time"
                                value={localSettings.closingTime}
                                onChange={(e) => setLocalSettings({ ...localSettings, closingTime: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                            <div className="font-bold">Weekly Holiday</div>
                            <div className="text-xs text-white/60">Automatically block bookings on this day</div>
                        </div>
                        <select
                            value={localSettings.weeklyHoliday}
                            onChange={(e) => setLocalSettings({ ...localSettings, weeklyHoliday: e.target.value })}
                            className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none"
                        >
                            <option>None</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                        </select>
                    </div>
                </section>

                <div className="pt-4 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 shadow-lg"
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
