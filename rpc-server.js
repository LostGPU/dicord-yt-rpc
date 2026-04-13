const express = require("express");
const RPC = require("@xhayper/discord-rpc");

const app = express();
app.use(express.json());

const CLIENT_ID = "1492575025201676429";

let rpc;
let isReady = false;
let lastData = null;

// 🔁 CONNECT FUNCTION
function connectRPC() {

    rpc = new RPC.Client({ clientId: CLIENT_ID });

    rpc.on("ready", () => {
        isReady = true;
        console.log("🚀 Discord RPC verbunden!");

        // 🔥 letzten State wieder setzen
        if (lastData) updateActivity(lastData);
    });

    // 💥 DISCONNECT DETECT
    rpc.on("disconnected", () => {
        console.log("❌ Discord getrennt → reconnect...");
        isReady = false;

        setTimeout(connectRPC, 5000);
    });

    rpc.on("error", () => {
        console.log("⚠️ RPC Fehler → reconnect...");
        isReady = false;

        setTimeout(connectRPC, 5000);
    });

    rpc.login().catch(() => {
        console.log("❌ Login fehlgeschlagen → retry...");
        setTimeout(connectRPC, 5000);
    });
}

connectRPC();

// 🌐 CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

// 🧠 STATE
global.rpcState = global.rpcState || {
    start: Date.now()
};

// 🎬 UPDATE
function updateActivity(data) {

    if (!isReady) return;

    if (data.type === "youtube") {

        const title = (data.title || "YouTube").replace(" - YouTube", "");
        const channel = data.channel || "YouTube";

        const current = Number(data.current || 0);
        const duration = Number(data.duration || 0);
        const paused = data.paused;

        const now = Date.now();

        if (!paused) {
            global.rpcState.start = now - current * 1000;
        }

        const start = global.rpcState.start;
        const end = start + duration * 1000;

        rpc.user.setActivity({
            type: 3,
            details: title,
            state: paused ? "⏸ Paused - " + channel : channel,
            largeImageKey: "youtube",
            startTimestamp: paused ? undefined : start,
            endTimestamp: paused ? undefined : end
        });

        return;
    }

    rpc.user.setActivity({
        type: 0,
        details: data.title || "Browsing",
        state: "Brave",
        largeImageKey: "lostgpu"
    });
}

// 📡 ENDPOINT
app.post("/update", (req, res) => {

    const data = req.body;
    lastData = data;

    if (isReady) {
        updateActivity(data);
    }

    res.sendStatus(200);
});

// 🚀 START
app.listen(3000, () => {
    console.log("🌐 Server läuft auf http://localhost:3000");
});