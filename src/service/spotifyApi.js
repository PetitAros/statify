export async function fetchCurrentPlayback(token) {
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (result.status === 401) {
        throw new Error("TOKEN_EXPIRED");
    }

    if (result.status === 204 || result.status > 400) {
        return null;
    }

    return await result.json();
}

export async function fetchTopTracks(token, timeRange = "short_term") {
    const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (result.status === 401) {
        throw new Error("TOKEN_EXPIRED");
    }

    if (result.status > 400) {
        return null;
    }

    return await result.json();
}

export async function fetchRecentlyPlayed(token) {
    const result = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (result.status === 401) {
        throw new Error("TOKEN_EXPIRED");
    }

    if (result.status > 400) {
        return null;
    }

    return await result.json();
}