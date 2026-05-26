import React from "react";
import {ModeToggleButton, ThemeToggleButton} from "./themeButtons.jsx";

function Navbar() {
    return (
        <nav className="flex items-center justify-between p-6 w-[100%] max-w-7xl mx-auto">
            <div className="text-2xl font-black tracking-tighter text-primary">
                Statify.
        </div>
            <div className="flex items-center justify-between gap-4">
            <ModeToggleButton />
            <ThemeToggleButton />
        <button className="hidden sm:block text-on-secondary/70 hover:text-primary transition-colors font-medium">
            Infos Créateur
        </button>
            </div>
    </nav>);
}

export { Navbar };