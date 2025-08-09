"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const handleLogout = async () => {
        try {
            await authClient.signOut();
            window.location.reload(); // Reload the page to reflect the logout state
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <Button variant={'outline'} onClick={handleLogout} className="btn btn-primary cursor-pointer">
            Logout <LogOut className="ml-2 size-4" />
        </Button>
    );
}