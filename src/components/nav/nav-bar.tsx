"use client";

import Link from "next/link";

import { NavSidebar } from "./nav-sidebar";

export default function NavBar() {
    return (
        <header className="top-0 bg-background/90 backdrop-blur-sm border-b sticky z-50">
            <nav className="flex justify-between tems-center max-w-screen-xl px-5 py-2 mx-auto">
                <Link href="/" className="text-lg font-semibold">
                    <div className="flex flex-row gap-1 items-center">
                        <img
                            src="/logo.png"
                            alt="wanderer.moe"
                            className="translate-y-[2px]"
                            width={32}
                            height={32}
                        />
                    </div>
                </Link>
                <NavSidebar />
            </nav>
        </header>
    );
}
