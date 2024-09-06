"use client"

import { Button, ButtonProps } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion } from "next-auth/react";

interface ButtonSocialProps extends Pick<ButtonProps, 'variant'> {
    children: React.ReactNode;
    className?: string;
    provider: LiteralUnion<BuiltInProviderType, string>;
}

export default function ButtonSocial({ children, className, variant, provider }: ButtonSocialProps) {

    const handleClick = async () => {
        await signIn(provider)
    }

    return (
        <Button
            onClick={handleClick}
            variant={variant}
            className={className}
        >
            {children}
        </Button>
    )
}