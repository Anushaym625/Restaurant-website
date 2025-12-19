import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

export function Footer() {
    const { settings } = useRestaurant();

    return (
        <footer className="bg-dark-900 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tighter">
                            <Link href="/auth/admin/login">
                                VRINDHANA<span className="text-primary">.</span>
                            </Link>
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            {settings.name} - Experience the finest culinary journey ensuring quality and taste in every bite.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Twitter} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/booking" className="hover:text-primary transition-colors">Table Reservation</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>{settings.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>{settings.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
                        <p className="text-white/60 text-sm mb-4">
                            Subscribe to get latest updates and exclusive offers.
                        </p>
                        <form className="flex navbar-glass rounded-lg overflow-hidden border border-white/10 p-1 bg-white/5">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
                            />
                            <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md transition-colors text-sm font-medium">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>&copy; {new Date().getFullYear()} Vrindhana Restaurant. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/auth/staff/login" className="hover:text-white transition-colors">Staff Portal</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <Icon size={18} />
        </a>
    );
}
