import React, { useEffect, useState } from "react";
import { fetchTopTracks } from "/src/service/spotifyApi.js";
import { TrackRow } from "./TrackRow.jsx";

function TopTracks({ token, onBack, onLogout }) {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState("short_term"); // short_term, medium_term, long_term
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!token) return;

        const getTopTracks = async () => {
            setIsTransitioning(true);
            try {
                const data = await fetchTopTracks(token, timeRange);
                if (data && data.items) {
                    setTracks(data.items.slice(0, 10));
                }
                setLoading(false);
                // Petit délai pour l'animation de réapparition
                setTimeout(() => setIsTransitioning(false), 150);
            } catch (error) {
                if (error.message === "TOKEN_EXPIRED") {
                    onLogout();
                }
            }
        };

        getTopTracks();
    }, [token, timeRange, onLogout]);

    const ranges = [
        { id: "short_term", label: "4 semaines" },
        { id: "medium_term", label: "6 mois" },
        { id: "long_term", label: "Plusieurs années" }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-start gap-8 animate-fade-in">

            <button onClick={onBack} className="flex items-center gap-2 text-on-secondary/70 hover:text-primary transition-colors duration-300 font-medium group cursor-pointer">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à l'accueil
            </button>

            {/* Header + Mini Navbar intégrée */}
            <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
                <div className="text-left">
                    <h1 className="text-4xl font-black tracking-tight mb-2">
                        Vos <span className="text-gradient">Titres favoris</span>
                    </h1>
                    <p className="text-on-secondary/60 text-sm">Découvrez votre classement basé sur vos habitudes d'écoute.</p>
                </div>

                {/* Sélecteur style Pill-Navbar */}
                <div className="flex bg-surface/50 border border-white/5 p-1 rounded-full shrink-0 shadow-inner backdrop-blur-md">
                    {ranges.map((range) => {
                        const isActive = timeRange === range.id;
                        return (
                            <button
                                key={range.id}
                                onClick={() => !isActive && setTimeRange(range.id)}
                                className={`px-4 py-2 text-xs md:text-sm font-bold rounded-full transition-all duration-300 cursor-pointer ${
                                    isActive
                                        ? "bg-primary text-on-primary shadow-md scale-100"
                                        : "text-on-secondary/60 hover:text-on-secondary"
                                }`}
                            >
                                {range.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {loading ? (
                <div className="w-full flex flex-col gap-3 animate-pulse">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-full h-20 bg-surface/50 rounded-2xl" />)}
                </div>
            ) : (
                /* Conteneur animé pour le changement de data */
                <div className={`w-full flex flex-col gap-3 transition-all duration-300 ${
                    isTransitioning ? "opacity-0 translate-y-4 scale-98" : "opacity-100 translate-y-0 scale-100"
                }`}>
                    {tracks.map((track, index) => (
                        <TrackRow key={track.id} track={track} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}

export { TopTracks };