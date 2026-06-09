# 🎫 Ticket Clicker

An IT helpdesk clicker game where the queue grows 📈, production misbehaves 🔥, and every permanent fix requires another procurement request 💸.

## 🖱️ Play

Open [`index.html`](index.html) in a modern browser and click **Resolve Ticket**.

For the best experience, serve the folder locally:

```powershell
python -m http.server 5500
```

Then visit [http://127.0.0.1:5500](http://127.0.0.1:5500).

## 🛠️ How It Works

1. 🖱️ Resolve tickets manually to earn spendable resolved tickets.
2. 🛒 Buy procurement upgrades to improve click power or automate ticket resolution.
3. 🌡️ Keep an eye on the open queue and SLA heat.
4. 🚨 Survive random incidents involving printers, spreadsheets, vendors, production, and management.
5. 🏆 Unlock achievements for permanent productivity bonuses.

## 📊 Dashboard

- 🎫 **Resolved tickets:** Currency available for upgrades.
- ⚙️ **Tickets per second:** Tickets resolved automatically.
- ✅ **Total closed:** Every ticket resolved during the current save.
- 📥 **Open queue:** Incoming work waiting to be resolved.
- 🔥 **SLA heat:** Current queue pressure.
- 🚀 **Productivity bonus:** Permanent bonus earned from achievements.

## 💾 Progress

Progress saves automatically in the browser using `localStorage`.

- 💾 Use the disk button to save immediately.
- 🔄 Use the reset button to start a fresh shift.
- 🌙 Offline automation continues for up to eight hours at reduced efficiency.
- 🖥️ Saves stay in the browser and profile where the game was played.

## ✨ Features

- 🛒 59 IT-themed procurement upgrades
- 🚨 288 random helpdesk incidents
- 🤖 Passive automation and offline progress
- 🏆 Achievements with productivity bonuses
- 🚨 Major-incident lighting and alert effects
- ✅ Animated ticket-resolution stamps
- 📱 Responsive desktop, landscape, and mobile layouts
- 🎫 Randomly wandering tickets
- 🐛 Bonus bugs that roam freely until you squash them
- 🏢 An office that gains equipment as procurement succeeds
- 📦 No dependencies or build step

## 📁 Project Files

- 🖼️ `index.html` contains the game interface.
- 🎨 `styles.css` contains the responsive layout and animations.
- 🧠 `game.js` contains game balance, incidents, upgrades, saving, and gameplay.

## 🧨 Resetting Manually

The reset button is the recommended option. To remove the save manually, clear this site's browser storage for:

```text
ticket-clicker-state-v1
```

> ⚠️ Resetting progress cannot be escalated to another department.
