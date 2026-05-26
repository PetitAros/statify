import React, { useEffect, useState } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from '/src/service/spotifyAuth.js';

import { FeatureCard } from "./shared/components/FeatureCard.jsx";
import { Hero } from "./shared/components/Hero.jsx";
import { Navbar } from "./shared/components/Navbar.jsx";

export default function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const savedToken = window.localStorage.getItem("spotify_token");

            if (savedToken) {
                setToken(savedToken);
                return;
            }

            if (code) {
                try {
                    const newToken = await getAccessToken(code);
                    setToken(newToken);
                    window.localStorage.setItem("spotify_token", newToken);
                    window.history.replaceState({}, document.title, "/");
                } catch (error) {
                    logout();
                }
            }
        };

        checkAuth();
    }, []);

    const logout = () => {
        setToken(null);
        window.localStorage.removeItem("spotify_token");
        window.localStorage.removeItem("verifier");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-secondary text-on-secondary selection:bg-primary selection:text-on-primary transition-colors duration-300 flex flex-col">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center flex-1 flex flex-col items-center justify-center w-full">

                        <Hero token={token} onLogin={redirectToAuthCodeFlow} onLogout={logout} />

                        {token && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
                                <div onClick={() => null} className="cursor-pointer">
                                    <FeatureCard
                                        title="En direct"
                                        description="Découvrez instantanément ce que vous écoutez, synchronisé directement avec votre compte Spotify."
                                    />
                                </div>
                                <div onClick={() => null} className="cursor-pointer">
                                    <FeatureCard
                                        title="Titres les plus écoutés"
                                        description="Analysez vos morceaux et artistes favoris des 4 dernières semaines pour voir vos tendances du moment."
                                    />
                                </div>
                                <div onClick={() => null} className="cursor-pointer">
                                    <FeatureCard
                                        title="Historique récent"
                                        description="Retrouvez les 10 dernières chansons qui ont rythmé votre journée et redécouvrez vos coups de cœur."
                                    />
                                </div>
                            </div>
                        )}
            </main>

            <footer className="text-center py-8 text-on-secondary/40 text-sm border-t border-surface mt-auto w-full">
                <p>© {new Date().getFullYear()} Statify App. Non affilié à Spotify AB.</p>
            </footer>
        </div>
    );
}