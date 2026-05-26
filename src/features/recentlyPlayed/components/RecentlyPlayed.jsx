import React, { useEffect, useState } from "react";
import { fetchRecentlyPlayed } from "/src/service/spotifyApi.js";
import { HistoryRow } from "./HistoryRow.jsx";

function RecentlyPlayed({ token, onBack, onLogout }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const getHistory = async () => {
            try {
                const data = await fetchRecentlyPlayed(token);
                if (data && data.items) {
                    setHistory(data.items.slice(0, 10));
                }
                setLoading(false);
            } catch (error) {
                if (error.message === "TOKEN_EXPIRED") {
                    onLogout();
                }
            }
        };

        getHistory();
    }, [token, onLogout]);

    return (
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-start gap-8">

            <button
                onClick={onBack}
                className="flex items-center gap-2 text-on-secondary/70 hover:text-primary transition-colors duration-300 font-medium group cursor-pointer"
            >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à l'accueil
            </button>

            <div className="text-left md:pl-12">
                <h1 className="text-4xl font-black tracking-tight mb-2">
                    Votre <span className="text-primary">Historique récent</span>
                </h1>
                <p className="text-on-secondary/60 text-sm">Les 10 dernières chansons qui ont rythmé vos écoutes.</p>
            </div>

            {loading ? (
                <div className="w-full flex flex-col gap-4 animate-pulse md:pl-12">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-full h-20 bg-surface/50 rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="w-full flex flex-col">
                    {history.map((item) => (
                        <HistoryRow key={item.played_at + item.track.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export { RecentlyPlayed };