# Tilted Tickets
### Botswana's Smartest Way to Event

> ICT205 Entrepreneurship Project | Botswana Accountancy College | 2026

---

## What this is

Tilted Tickets is a fully functional static event ticketing prototype built for Botswana.
It runs entirely in the browser — no backend, no server, no build tools required.

Customers discover events, buy tickets, and receive QR-style tickets instantly.
Organizers create events, track sales, and validate tickets at the gate.

---

## Live demo

**GitHub Pages URL:** `https://BIDA23-202.github.io/tilted-tickets/`

> Reset demo data in the Demo Panel the first time you load after updating files — this clears old localStorage and loads the new 14-event seed.
---

## How to run locally

1. Download or clone this repository.
2. Open `index.html` in any browser (Chrome, Firefox, Edge).
3. No installation, no `npm install`, no `npm start` required.

```
tilted-tickets/
├── index.html      ← Open this file
├── style.css
├── script.js
└── README.md
```

---

## Demo accounts

| Role       | Email                    | Password |
|------------|--------------------------|----------|
| Customer   | demo@tilted.bw           | demo123  |
| Organizer  | organizer@tilted.bw      | org123   |

---

## Promo code

`TILTED2026` — applies 15% discount at checkout

---

## Lecturer demo flow (10 steps)

Follow this exact sequence during your presentation:

1. Open the site. The homepage shows real Botswana events with a search bar and filters.
2. Use the search bar to search "Music" or filter by city "Maun".
3. Click **View event** on any event card to open the Event Detail page.
4. Select a ticket tier, adjust quantity, and click **Continue**.
5. Fill in purchaser details (or click **Autofill checkout** in the Demo Panel).
6. On the payment screen, select **Orange Money** and enter promo code `TILTED2026`.
7. Click **Process payment** — a 2-second simulation runs and tickets are issued.
8. The Confirmation screen shows an order number (TT-XXXXXX) and QR-style ticket codes.
9. Click **Go to My Tickets** and show the live QR canvas cards.
10. Click **Jump to organizer mode** in the Demo Panel, open the Organizer Dashboard, then open **Ticket Validation**, click **Scan latest sold ticket**, and show the VALID result.

---

## Demo Panel

A floating panel in the bottom-right corner provides these controls:

| Button                    | What it does                                      |
|---------------------------|---------------------------------------------------|
| Autofill checkout         | Pre-fills all checkout forms instantly            |
| Simulate customer purchase| Runs a full order without going through steps     |
| Jump to customer mode     | Logs in as demo customer                          |
| Jump to organizer mode    | Logs in as demo organizer                         |
| Force payment success     | Sets payment simulation to always succeed         |
| Force payment failure     | Sets payment simulation to always fail (for demo) |
| Simulate sold out         | Marks first event's tiers as sold out             |
| Reset demo data           | Clears all orders, tickets, and resets events     |

---

## Features

- 14 seeded Botswana events (Gaborone, Francistown, Maun, Palapye, Lobatse)
- Event search, filter by category, city, date, price
- 3-step checkout (ticket details → payment → confirmation)
- Orange Money, MyZaka, Bank Card, Cash Deposit payment options
- QR-style ticket generation using HTML5 Canvas
- Promo code: TILTED2026 = 15% off
- Service fee: 7%, Transaction fee: 3%
- Customer dashboard (tickets, history, stats)
- Organizer dashboard (metrics, attendees, revenue, payout)
- Create event form (saves to browser, appears instantly)
- Ticket validation screen (valid / invalid / used / wrong event)
- CSV export for attendees
- Dark mode toggle
- Mobile-responsive layout
- Toast notifications, modals, loading states

---


---

## Deploying via Git CLI (recommended — auto-deploy on every push)

This repo includes a GitHub Actions workflow. Once set up, every `git push` to `main`
automatically deploys to GitHub Pages. No manual Settings click needed.

### Step 1 — Enable Pages with GitHub Actions as source

- Go to your repo → **Settings** → **Pages**
- Under **Source**, select **GitHub Actions** (not "Deploy from branch")
- Click **Save**

That is the only manual step. Everything after this is automatic.

### Step 2 — First upload via Git CLI

```bash
# 1. Clone or init
git init
git remote add origin https://github.com/BIDA23-202/tilted-tickets.git

# 2. Stage everything
git add .

# 3. Commit
git commit -m "Initial deploy: Tilted Tickets v1"

# 4. Push to main — this triggers the workflow automatically
git push -u origin main
```

### Step 3 — Watch it deploy

- Go to your repo → **Actions** tab
- You will see the "Deploy Tilted Tickets to GitHub Pages" workflow running
- When it shows a green tick, your site is live
- URL: `https://YOUR-USERNAME.github.io/tilted-tickets/`

### Every future update

```bash
git add .
git commit -m "describe what you changed"
git push
```

That is all. The workflow redeploys automatically within 30–60 seconds.

---

## What the .gitignore covers

The included `.gitignore` excludes:
- macOS `.DS_Store` and Windows `Thumbs.db` system files
- Editor config folders (`.vscode/`, `.idea/`)
- Any `.env` files if you ever add them
- `node_modules/` in case you ever test with a local server
- Archive files like `.zip` and `.tar.gz`

None of these should ever land in your GitHub repo.

---
## Deploying to GitHub Pages (manual drag-and-drop alternative)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up if you do not have an account.

### Step 2 — Create a new repository
- Click the **+** icon → **New repository**
- Name it: `tilted-tickets`
- Set it to **Public**
- Do NOT initialise with a README (you already have one)
- Click **Create repository**

### Step 3 — Upload files
- Click **uploading an existing file** on the empty repo page
- Drag and drop: `index.html`, `style.css`, `script.js`, `README.md`
- Scroll down and click **Commit changes**

### Step 4 — Enable GitHub Pages
- Go to **Settings** → **Pages** (left sidebar)
- Under **Source**, select **Deploy from a branch**
- Branch: `main`, Folder: `/ (root)`
- Click **Save**

### Step 5 — Get your live URL
- Wait 1–2 minutes
- GitHub Pages will show your URL: `https://YOUR-USERNAME.github.io/tilted-tickets/`
- Paste this into your presentation

---

## Business concept summary

**Problem:** Event discovery in Botswana is fragmented. Manual ticket sales are slow and fraud-prone. Paper proofs are easy to fake.

**Solution:** Tilted Tickets gives buyers one place to find and buy tickets with locally relevant payment methods. Organizers get a real-time dashboard and QR gate validation without needing a backend infrastructure investment.

**Revenue model:** Service fee (7%) + transaction fee (3%) per ticket sold. Premium organizer tiers planned for scale.

---

## Academic context

- **Module:** ICT205 — Entrepreneurship Development
- **Institution:** Botswana Accountancy College
- **Year:** 2026
- **Stack:** HTML, CSS, Vanilla JavaScript — no frameworks, no backend, no build tools
- **Storage:** Browser localStorage with in-memory fallback

---

**Built with Tilted Tickets — Botswana's Smartest Way to Event**

THANK YOU.
~SHEWABO JONATHAN ZIKHALI
