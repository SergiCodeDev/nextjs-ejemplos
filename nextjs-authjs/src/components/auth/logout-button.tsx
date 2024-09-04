"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const handleClick = async () => {
        // await signOut()
        await signOut({
            callbackUrl: "/login"
        })
    }
    return (
        <Button onClick={handleClick}>Cerrar sesión</Button>
    )
}