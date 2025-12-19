"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type UserRole = "customer" | "admin" | "worker";

interface User {
    name: string;
    email: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("vrindhana_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (role: UserRole) => {
        // Mock user data based on role
        const mockUser: User = {
            name: role === "admin" ? "Admin User" : role === "worker" ? "Staff Member" : "Alex Johnson",
            email: role === "admin" ? "admin@vrindhana.com" : role === "worker" ? "staff@vrindhana.com" : "alex@example.com",
            role: role
        };

        setUser(mockUser);
        localStorage.setItem("vrindhana_user", JSON.stringify(mockUser));

        // Redirect based on role
        if (role === "admin") router.push("/admin");
        else if (role === "worker") router.push("/staff");
        else router.push("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("vrindhana_user");
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
