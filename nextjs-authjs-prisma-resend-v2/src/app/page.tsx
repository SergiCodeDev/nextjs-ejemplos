import { Button, buttonVariants } from "@/components/ui/button"

import Link from "next/link";

export default function Home() {
  return (
    <main className="grid place-content-center min-h-screen">
      <h1 className="font-extrabold text-4xl mb-6">Next.js + Auth.js V5</h1>
      <div className="flex justify-center gap-4">
        <Link className={buttonVariants()} href="/login">
          Login
        </Link>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </main>
  );
}
