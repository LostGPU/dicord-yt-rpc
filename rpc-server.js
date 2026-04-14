const express = require("express");
const RPC = require("@xhayper/discord-rpc");

const app = express();
app.use(express.json());

const CLIENT_ID = "YOUR_CLIENT_ID";

let rpc;
let isReady = false;
let lastData = null;

function connectRPC() {

    rpc = new RPC.Client({ clientId: CLIENT_ID });

    rpc.on("ready", () => {
        isReady = true;
        console.log("🚀 Discord RPC connected!");

        if (lastData) updateActivity(lastData);
    });

    rpc.on("disconnected", () => {
        console.log("❌ Discord disconnected → reconnect...");
        isReady = false;

        setTimeout(connectRPC, 5000);
    });

    rpc.on("error", () => {
        console.log("⚠️ RPC Error → reconnect...");
        isReady = false;

        setTimeout(connectRPC, 5000);
    });

    rpc.login().catch(() => {
        console.log("❌ Login failed → retry...");
        setTimeout(connectRPC, 5000);
    });
}

connectRPC();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

global.rpcState = global.rpcState || {
    start: Date.now()
};

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

app.post("/update", (req, res) => {

    const data = req.body;
    lastData = data;

    if (isReady) {
        updateActivity(data);
    }

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("🌐 Server is running on http://localhost:3000");
});
