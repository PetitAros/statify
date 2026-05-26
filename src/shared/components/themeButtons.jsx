import React, { useState } from 'react';

function ModeToggleButton() {
    const [isLight, setIsLight] = useState(false);

    const handleToggle = () => {
        const nextMode = !isLight;
        setIsLight(nextMode);

        if (nextMode) {
            document.documentElement.setAttribute('data-mode', 'light');
        } else {
            document.documentElement.removeAttribute('data-mode');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="p-3 rounded-full bg-surface border border-white/10 hover:border-primary/50 text-on-secondary hover:text-primary transition-all duration-300 shadow-md cursor-pointer"
            aria-label="Changer de mode"
        >
            {isLight ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
}

function ThemeToggleButton() {
    const [isPurple, setIsPurple] = useState(false);

    const handleToggle = () => {
        const nextTheme = !isPurple;
        setIsPurple(nextTheme);

        if (nextTheme) {
            document.documentElement.setAttribute('data-theme', 'purple');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-white/10 hover:border-primary/50 font-medium text-sm transition-all duration-300 shadow-md cursor-pointer"
        >
            <span className={`w-3 h-3 rounded-full transition-colors duration-300 ${isPurple ? 'bg-[#7C3AED]' : 'bg-[#1DB954]'}`} />
            <span className="text-on-secondary">
        Thème : {isPurple ? 'Violet' : 'Vert'}
      </span>
        </button>
    );
}

export { ModeToggleButton, ThemeToggleButton };