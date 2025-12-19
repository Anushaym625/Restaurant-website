"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function GlobalFooter() {
    const pathname = usePathname();

    const isSidebarPage = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard");

    return (
        <div className={isSidebarPage ? "md:pl-64" : ""}>
            <Footer />
        </div>
    );
}
