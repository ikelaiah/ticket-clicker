# 🎫 Ticket Clicker

An IT helpdesk clicker game where the queue grows 📈, production misbehaves 🔥, and every permanent fix requires another procurement request 💸.

## 🖱️ Play

Play the published game at [ikelaiah.github.io/ticket-clicker](https://ikelaiah.github.io/ticket-clicker/) or open [`index.html`](index.html) in a modern browser.

For local development, serve the folder:

```powershell
python -m http.server 5500
```

Then visit [http://127.0.0.1:5500](http://127.0.0.1:5500).

## 🛠️ How It Works

1. 🖱️ Resolve tickets manually to earn spendable resolved tickets.
2. 🛒 Buy procurement upgrades to improve click power or automate ticket resolution.
3. 🌡️ Keep an eye on the open queue and SLA heat.
4. 🚨 Survive random incidents involving printers, spreadsheets, vendors, production, and management.
5. ⚡ Use temporary operational boosts before management notices.
6. 🏆 Unlock achievements for permanent productivity bonuses.

## 📊 Dashboard

- 🎫 **Resolved tickets:** Currency available for upgrades.
- ⚙️ **Tickets per second:** Tickets resolved automatically.
- ✅ **Total closed:** Every ticket resolved during the current save.
- 📥 **Open queue:** Incoming work waiting to be resolved.
- 🔥 **SLA heat:** Current queue pressure.
- 🚀 **Productivity bonus:** Permanent bonus earned from achievements.
- 📊 **Queue composition:** Where the current trouble is coming from.
- 📜 **Ops timeline:** Recent incidents, milestones, purchases, and bug squashes.

## 🛒 Procurement

- Use **Buy 1**, **Buy 10**, or **Buy Max** for faster purchasing.
- Filter upgrades by affordability, click power, automation, or enterprise-grade budget damage.
- Newly affordable upgrades briefly highlight without rebuilding the cards under your pointer.

## 💾 Progress

Progress saves automatically in the browser using `localStorage`.

- 💾 Use the disk button to save immediately.
- 🔄 Use the reset button to start a fresh shift.
- 🌙 Offline automation continues for up to eight hours at reduced efficiency.
- 🖥️ Saves stay in the browser and profile where the game was played.

## ✨ Features

- 🛒 500 IT-themed procurement upgrades
- 🚨 500 random helpdesk incidents
- 🤖 Passive automation and offline progress
- ⚡ Temporary boosts that change click power, automation, or incoming queue pressure
- 🏆 500 emoji desk reputations with productivity bonuses
- 🗄️ A compact achievement drawer with next-milestone progress
- 🚨 Categorized active incidents with impact summaries
- 🎫 An SLA-driven ticket conveyor that becomes increasingly concerned
- ✅ Animated ticket-resolution stamps
- 📱 Responsive desktop, landscape, and mobile layouts
- 🎫 Randomly wandering tickets
- 🐛 Bonus bugs that roam freely until you squash them
- 🏢 An office that gains named, inspectable equipment as procurement succeeds
- 📦 No dependencies or build step

## 📁 Project Files

- 🖼️ `index.html` contains the game interface.
- 🎨 `styles.css` contains the responsive layout and animations.
- 🔢 `numbers.js` formats large values with full short-scale unit names.
- 🏅 `reputations.js` contains the 492 data-driven reputations added to the 8 core achievements.
- 🚨 `incidents.js` contains the expanded real-life incident catalog.
- 🛒 `procurements.js` contains the expanded procurement catalog and scaling.
- 🧠 `game.js` contains core balance, saving, and gameplay.

## 🧨 Resetting Manually

The reset button is the recommended option. To remove the save manually, clear this site's browser storage for:

```text
ticket-clicker-state-v1
```

> ⚠️ Resetting progress cannot be escalated to another department.
