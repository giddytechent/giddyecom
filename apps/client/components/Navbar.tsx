import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./Shopping-carticon";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between border-b border-gray-200 py-2">
            {/* Left  */}
            <Link href="/" className="flex items-center">
                <Image
                    src="/mylogo123.png"
                    alt="Giddytech Gadgets"
                    width={36}
                    height={36}
                    className="w-full h-6 md:w-12 md:h-12 mb-0 p-1"
                />
                <p className="hidden font-semibold  md:block text-md text-2xl text-gray-600 hover:text-yellow-700 hover:-translate-y-0.5 px-2 transition-all duration-300 mb-1"><span className="font-(--font-playfair)">GIDDYTECH </span></p>
            </Link>
            {/* Right  */}
            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href="/" className="ml-4">
                    <Home className="w-4 h-4 text-gray-600" />
                </Link>
                <Bell className="w-4 h-4 text-gray-600" />
                <ShoppingCartIcon />
                <Show when="signed-out">
                    <SignInButton />
                </Show>
                <Show when="signed-in">
                    <ProfileButton />
                </Show>
            </div>
        </nav>
    )
}