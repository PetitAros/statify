import React from "react";

function HistoryRow({ item }) {
    const { track, played_at } = item;

    const formatPlayedAt = (isoString) => {
        const playedDate = new Date(isoString);
        const now = new Date();
        const diffMs = now - playedDate;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "À l'instant";
        if (diffMins < 60) return `Il y a ${diffMins} min`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `Il y a ${diffHours} h`;

        return playedDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    };

    return (
        <div className="w-full flex gap-4 items-start group relative">
            {/* Ligne verticale de la Timeline en arrière-plan */}
            <div className="absolute top-0 bottom-0 left-[23px] w-[2px] bg-white/5 group-last:bottom-1/2" />

            {/* Point de repère de la Timeline qui s'illumine au survol */}
            <div className="w-12 flex justify-center pt-3 shrink-0 z-10">
                <div className="w-3 h-3 rounded-full bg-on-secondary/20 border-2 border-secondary group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
            </div>

            {/* Utilisation de la classe card-glass et hover-shine définies dans ton index.css */}
            <div className="flex-1 card-glass hover-shine p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <img
                        src={track.album.images[2]?.url || track.album.images[0]?.url}
                        alt={track.name}
                        className="w-12 h-12 rounded-lg object-cover shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="min-w-0 text-left">
                        <h3 className="font-bold text-on-secondary truncate group-hover:text-primary transition-colors duration-300">
                            {track.name}
                        </h3>
                        <p className="text-sm text-on-secondary/60 truncate">
                            {track.artists.map(a => a.name).join(", ")}
                        </p>
                    </div>
                </div>

                <div className="shrink-0 text-right">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-on-secondary/60 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                        {formatPlayedAt(played_at)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export { HistoryRow };