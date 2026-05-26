import React from "react";

function TrackRow({ track, index }) {
    const durationMin = Math.floor(track.duration_ms / 60000);
    const durationSec = ((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0');

    return (
        <div className="w-full bg-surface/30 hover:bg-surface/60 border border-white/5 hover:border-primary/20 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-300 group">
            <div className="flex items-center gap-4 min-w-0">
                <span className="text-2xl font-black text-on-secondary/20 group-hover:text-primary/40 w-8 text-center transition-colors">
                    {index + 1}
                </span>

                <img
                    src={track.album.images[2]?.url || track.album.images[0]?.url}
                    alt={track.name}
                    className="w-12 h-12 rounded-lg object-cover shadow-md shrink-0 group-hover:scale-105 transition-transform"
                />

                <div className="min-w-0 text-left">
                    <h3 className="font-bold text-on-secondary truncate group-hover:text-primary transition-colors">
                        {track.name}
                    </h3>
                    <p className="text-sm text-on-secondary/60 truncate">
                        {track.artists.map(a => a.name).join(", ")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
                <span className="text-sm font-mono text-on-secondary/40">
                    {durationMin}:{durationSec}
                </span>
            </div>
        </div>
    );
}

export { TrackRow };