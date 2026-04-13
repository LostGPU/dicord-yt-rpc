let lastState = {
    paused: null,
    time: 0
};

// 🧼 Titel Cleaner
function cleanTitle(text) {
    if (!text) return "YouTube";

    return text
        .replace(/\(\d+\)\s*/g, "")
        .replace("- YouTube", "")
        .trim();
}

function getShortsChannel() {

    // 🥇 1. Try ytInitialData (BESTE Quelle bei Shorts)
    try {
        const data = window.ytInitialData;

        const metadata =
            data?.contents?.twoColumnWatchNextResults
                ?.results?.results?.contents;

        if (metadata) {
            for (const item of metadata) {

                const channel =
                    item?.videoPrimaryInfoRenderer
                        ?.viewCount?.videoOwner?.videoOwnerRenderer
                        ?.title?.runs?.[0]?.text;

                if (channel) return channel;
            }
        }
    } catch (e) {}

    // 🥈 2. ytInitialPlayerResponse fallback
    try {
        const p = window.ytInitialPlayerResponse;
        const ch = p?.videoDetails?.author;
        if (ch) return ch;
    } catch (e) {}

    // 🥉 3. UI fallback (wenn alles fertig geladen ist)
    const ui =
        document.querySelector("ytd-channel-name #text")?.textContent;

    if (ui) return ui.trim();

    return "YouTube";
}

// 📺 Normal Video Channel
function getVideoChannel() {

    return (
        document.querySelector("ytd-video-owner-renderer #text a")?.textContent ||
        document.querySelector("#owner #channel-name a")?.textContent ||
        "YouTube"
    ).trim();
}

// 🎬 MAIN DATA
function getVideoData() {

    const video = document.querySelector("video");
    if (!video) return null;

    const isShorts = window.location.pathname.startsWith("/shorts");

    let title = "";
    let channel = "";

    if (isShorts) {

        title =
            document.querySelector("h2")?.textContent ||
            document.title ||
            "YouTube Shorts";

        channel = getShortsChannel();

    } else {

        title =
            document.querySelector("h1 yt-formatted-string")?.textContent ||
            document.title;

        channel = getVideoChannel();
    }

    title = cleanTitle(title);

    return {
        type: "youtube",
        title,
        channel,
        current: Number(video.currentTime || 0),
        duration: Number(video.duration || 0),
        paused: video.paused === true
    };
}

// 📡 SEND LOGIC
function sendData() {

    const data = getVideoData();
    if (!data) return;

    const changed =
        data.paused !== lastState.paused ||
        Math.abs(data.current - lastState.time) > 2;

    if (!changed) return;

    lastState = {
        paused: data.paused,
        time: data.current
    };

    chrome.runtime.sendMessage(data);
}

// 🔁 LOOP
setInterval(sendData, 2000);

console.log("🎬 YouTube + Shorts FINAL FIX aktiv");