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
* `twitch` (optional)

📁 The YouTube image used in this project is located in the root folder as:

```
youtube.png
```

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

## ▶️ Auto Start (Optional)

### Create VBS file (runs silently)

Create a file named `start.vbs`:

```vbscript
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d C:\PATH\TO\YOUR\PROJECT && node rpc-server.js", 0
Set WshShell = Nothing
```

Replace `C:\PATH\TO\YOUR\PROJECT` with your project path.

---

### Add to Windows Startup

1. Press `Win + R`
2. Type:

```
shell:startup
```

3. Put the `start.vbs` file into this folder

Now the RPC server starts automatically with Windows 🎉

---

## ✅ Usage

* Open YouTube
* Play any video or Shorts
* Your Discord status updates automatically

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
