import React, { useEffect, useState } from "react";
import { fetchCurrentPlayback } from "/src/service/spotifyApi.js";

function LivePlayback({ token, onBack, onLogout }) {
    const [playback, setPlayback] = useState(null);

    useEffect(() => {
        if (!token) return;

        const getPlayback = async () => {
            try {
                const data = await fetchCurrentPlayback(token);
                setPlayback(data);
            } catch (error) {
                if (error.message === "TOKEN_EXPIRED") {
                    onLogout();
                }
            }
        };

        getPlayback();
        const interval = setInterval(getPlayback, 10000);

        return () => clearInterval(interval);
    }, [token, onLogout]);

    return (
        <div className="w-full max-w-2xl mx-auto px-4 flex flex-col items-start gap-8 animate-fade-in">

            <button
                onClick={onBack}
                className="flex items-center gap-2 text-on-secondary/70 hover:text-primary transition-colors duration-300 font-medium group cursor-pointer"
            >
                <svg
                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à l'accueil
            </button>

            {!playback || !playback.is_playing ? (
                <div className="w-full bg-surface/30 backdrop-blur-md rounded-3xl p-12 border border-white/5 shadow-xl text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-2xl mb-4 animate-pulse">
                        💤
                    </div>
                    <h2 className="text-xl font-bold mb-1">Aucune musique en cours</h2>
                    <p className="text-on-secondary/60 text-sm">Lancez un morceau sur Spotify pour le voir apparaître ici.</p>
                </div>
            ) : (
                <div className="w-full bg-surface/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_var(--color-primary)]/10 hover:border-primary/30 transition-all duration-500 group flex flex-col sm:flex-row items-center gap-6 text-left">

                    <div className="relative w-40 h-40 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img src={playback.item.album.images[0]?.url} alt={playback.item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                            <span className="text-xs text-white font-medium tracking-wide">Spotify Live</span>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            En direct
                        </div>

                        <h2 className="text-2xl font-black tracking-tight text-on-secondary truncate mb-1 group-hover:text-primary transition-colors duration-300">
                            {playback.item.name}
                        </h2>
                        <p className="text-on-secondary/70 font-medium truncate mb-4">
                            {playback.item.artists.map(a => a.name).join(", ")}
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-1 h-6 w-full">
                            <div className="w-1 bg-primary rounded-full h-2 animate-bounce [animation-duration:0.8s]" />
                            <div className="w-1 bg-primary rounded-full h-5 animate-bounce [animation-duration:0.5s]" />
                            <div className="w-1 bg-primary rounded-full h-3 animate-bounce [animation-duration:0.7s]" />
                            <div className="w-1 bg-primary rounded-full h-6 animate-bounce [animation-duration:0.4s]" />
                            <div className="w-1 bg-primary rounded-full h-2 animate-bounce [animation-duration:0.6s]" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { LivePlayback };