"use client";

import { useState } from "react";
import { Bell, AlertTriangle, Clock, CreditCard, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    id: number;
    type: 'alert' | 'warning' | 'info';
    title: string;
    message: string;
    time: string;
    read: boolean;
    icon: any;
    color: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        type: 'alert',
        title: 'Payment Failed',
        message: 'Order #8992 payment of ₹1,200 failed. Customer requested retry.',
        time: '2 mins ago',
        read: false,
        icon: CreditCard,
        color: 'text-red-500'
    },
    {
        id: 2,
        type: 'warning',
        title: 'Low Table Availability',
        message: 'Table #4, #7, and #12 are the only ones free for tonight.',
        time: '15 mins ago',
        read: false,
        icon: AlertTriangle,
        color: 'text-orange-500'
    },
    {
        id: 3,
        type: 'info',
        title: 'New Reservation',
        message: 'Booking request for Table #5 (6 Pax) requires approval.',
        time: '1 hour ago',
        read: false,
        icon: Clock,
        color: 'text-blue-500'
    },
    {
        id: 4,
        type: 'info',
        title: 'System Update',
        message: 'Menu prices updated for "Specials" category successfully.',
        time: '2 hours ago',
        read: true,
        icon: Check,
        color: 'text-green-500'
    }
];

export function AdminNotifications() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white/60 hover:text-white transition-colors hover:bg-white/5 rounded-full"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-dark-900 animate-pulse" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 md:w-96 bg-dark-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold text-sm">Notifications</h3>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={handleClearAll}
                                        className="text-xs text-white/40 hover:text-white transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-white/40 text-sm">
                                        <Bell size={24} className="mx-auto mb-2 opacity-50" />
                                        <p>No new notifications</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 hover:bg-white/5 transition-colors relative group ${notification.read ? 'opacity-60' : 'bg-white/[0.02]'}`}
                                            >
                                                {!notification.read && (
                                                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                                                )}
                                                <div className="flex gap-3">
                                                    <div className={`mt-1 p-2 rounded-full bg-white/5 h-fit ${notification.color}`}>
                                                        <notification.icon size={16} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-bold mb-1 pr-6">{notification.title}</h4>
                                                        <p className="text-xs text-white/60 leading-relaxed mb-2">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[10px] text-white/40">{notification.time}</span>
                                                            {!notification.read && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleMarkAsRead(notification.id);
                                                                    }}
                                                                    className="text-[10px] text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    Mark as read
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-t border-white/10 bg-white/5 text-center">
                                <button className="text-xs text-white/60 hover:text-white transition-colors">
                                    View Notification Settings
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
