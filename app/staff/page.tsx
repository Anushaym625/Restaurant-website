"use client";

import { useState } from "react";
import { StaffSidebar } from "@/components/staff/StaffSidebar";
import { StaffOverview } from "@/components/staff/StaffOverview";
import { StaffReservations } from "@/components/staff/StaffReservations";
import { StaffOrders } from "@/components/staff/StaffOrders";
import { StaffTables } from "@/components/staff/StaffTables";
import { StaffProfile } from "@/components/staff/StaffProfile";

export default function StaffPortal() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-dark-900 relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
            </div>

            <StaffSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="md:pl-64 min-h-screen relative z-10 transition-all duration-300">
                <div className="container mx-auto p-8 pt-24 md:pt-8">
                    {activeTab === "overview" && <StaffOverview />}
                    {activeTab === "reservations" && <StaffReservations />}
                    {activeTab === "orders" && <StaffOrders />}
                    {activeTab === "tables" && <StaffTables />}
                    {activeTab === "profile" && <StaffProfile />}
                </div>
            </main>
        </div>
    );
}
