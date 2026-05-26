import React from "react";

function Hero({ token, onLogin, onLogout }) {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl text-center">
                Découvrez vos véritables <br className="hidden md:block" />
                <span className="text-primary">habitudes d'écoute.</span>
            </h1>

            {!token ? (
                <>
                    <p className="text-lg md:text-xl text-on-secondary/70 max-w-2xl mb-10 leading-relaxed text-center">
                        Accédez à des statistiques en temps réel sur la musique que vous écoutez, vos titres préférés du mois et vos derniers morceaux favoris.
                    </p>

                    <button
                        onClick={onLogin}
                        className="btn-spotify"
                    >
                        Se connecter avec Spotify
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center gap-6 mt-4">
                    <p className="text-xl md:text-2xl text-primary font-bold">
                        Connecté avec succès !
                    </p>
                    <button
                        onClick={onLogout}
                        className="border border-white/20 hover:border-primary/50 text-on-secondary px-8 py-3 rounded-full transition-all duration-300 cursor-pointer"
                    >
                        Se déconnecter
                    </button>
                </div>
            )}
        </div>
    );
}

export { Hero };