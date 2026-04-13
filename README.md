# 🎬 Discord YouTube Rich Presence

A lightweight tool that shows what you're watching on YouTube (including Shorts) in your Discord status.

It uses a browser extension and a local Node.js server to sync video title, channel, and progress in real-time.

---

## ✨ Features

* 🎥 YouTube video detection
* 📱 YouTube Shorts support
* ⏱ Live progress bar
* 🔄 Auto reconnect to Discord
* ⚡ Real-time updates

---

## 📦 Requirements

* Node.js (v18+)
* Discord desktop app
* Chrome or any Chromium-based browser

---

## 🚀 Setup

### 1. Clone the repo

```bash
git clone https://github.com/LostGPU/dicord-yt-rpc.git
cd dicord-yt-rpc
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create Discord Application

1. Go to https://discord.com/developers/applications
2. Create a new application
3. Copy the **Client ID**
4. Open `rpc-server.js` and replace:

```js
const CLIENT_ID = "YOUR_CLIENT_ID";
```

---

### 4. Add Rich Presence Images

Go to **Rich Presence → Art Assets** and upload:

* `youtube`
* `twitch` (optional for Twitch support in a few days)

---

### 5. Start the server

```bash
node rpc-server.js
```

---

### 6. Load the extension

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the extension folder

---

## ✅ Usage

* Open YouTube
* Play any video or Shorts
* Your Discord status updates automatically 🎉

---

## ⚠️ Notes

* Discord must be running
* Works locally (only your own status)
* YouTube UI changes may affect detection

---

## 🛠 Troubleshooting

**No activity?**

* Restart Discord
* Restart the server
* Reload the extension

---

## 📄 License

MIT
