# TILTED TICKETS — Presentation Script
## ICT205 Entrepreneurship Development | Botswana Accountancy College | 2026

---

## PRE-PRESENTATION CHECKLIST (do this 5 minutes before)

- [ ] Open index.html in Chrome or Firefox
- [ ] Open the site on a second tab as backup
- [ ] Make sure Demo Panel is visible (bottom-right corner)
- [ ] Click **Reset demo data** to start clean
- [ ] Set screen resolution to at least 1280px wide
- [ ] Increase browser font size to 110% (Ctrl + on Windows, Cmd + on Mac)
- [ ] Disable browser notifications

---

## OPENING (30 seconds)

> "This is Tilted Tickets. It is a ticket sales platform built specifically for Botswana.
> The problem is simple: if you want to go to a concert or a corporate event in Gaborone,
> you currently have to ask around, send money via WhatsApp, and show a screenshot at the gate.
> That is not a system. That is hope. We built the alternative."

---

## PART 1 — HOMEPAGE AND DISCOVERY (1 minute)

**Action:** Show the homepage. Scroll slowly.

> "The homepage shows live Botswana events across Gaborone, Francistown and Maun.
> There are categories for music, comedy, campus, sports, theatre and business events.
> Every card shows the date, venue, city, and starting ticket price in BWP."

**Action:** Type "Music" in the search bar. Watch cards filter live.

> "Search filters are instant. No page reload. The logic is entirely browser-side."

**Action:** Change city filter to "Maun". Show Maun Sunset Jazz.

> "Events are seeded with realistic local data. This is not placeholder content."

---

## PART 2 — EVENT DETAIL (1 minute)

**Action:** Click **View event** on the Gaborone International Music Festival.

> "Each event has a detail page with ticket tiers, quantity controls, and live price calculation.
> There is a General tier at BWP 250, and a VIP Pit at BWP 650 with specific perks listed."

**Action:** Select VIP Pit. Change quantity to 2. Watch live total update.

> "The total updates in real time. No form submission needed."

**Action:** Click **Continue**.

---

## PART 3 — CHECKOUT FLOW (2 minutes)

**Action:** In the Demo Panel, click **Autofill checkout**.

> "In the Demo Panel we can autofill all form fields. In a real scenario the customer types their
> Botswana phone number and national ID."

**Action:** Show the filled form. Point out phone and ID fields.

> "The form validates Botswana phone format. If you put a random number in, it rejects it."

**Action:** Click **Continue to payment**.

> "Step 2 is payment. The options are Orange Money, MyZaka, Bank Card, and Cash Deposit reference.
> These are the actual payment methods Botswana buyers expect."

**Action:** Select **Orange Money**. Type promo code `TILTED2026`.

> "We support promo codes. TILTED2026 gives 15% off the subtotal.
> The summary updates to show the discount live."

> "Service fee is 7%. Transaction fee is 3%. That is our revenue model in this demo."

**Action:** Click **Process payment**. Watch the 2-second simulation.

> "The system simulates a real payment delay. In a live integration this is where Orange Money
> or a bank gateway would respond."

---

## PART 4 — TICKET CONFIRMATION AND QR (1 minute)

**Action:** Show the confirmation screen.

> "The order number is generated in TT-XXXXXX format. The customer gets a QR-style code for
> each ticket, drawn using HTML5 Canvas. No external library."

**Action:** Point to the QR canvas and the ticket code below it.

> "Each code is unique. The same code cannot be used twice. That is the fraud prevention logic."

**Action:** Click **Go to My Tickets**.

> "The ticket appears in the customer's account immediately. There is no delay, no refresh."

---

## PART 5 — CUSTOMER DASHBOARD (30 seconds)

**Action:** Click **My Account** in the navigation.

> "The customer dashboard shows tickets owned, upcoming events, total spent, and a purchase history.
> Everything is sourced from browser storage."

---

## PART 6 — ORGANIZER SIDE (2 minutes)

**Action:** In Demo Panel, click **Jump to organizer mode**.

> "We switch to the organizer view. The button at the top now shows 'Logout (organizer)'."

**Action:** Navigate to **Organizer** in the nav or the dashboard.

> "The organizer dashboard shows total tickets sold, tickets remaining, revenue, attendance rate,
> and the most popular ticket tier. These metrics update every time a purchase is made."

**Action:** Click **Analytics**.

> "The analytics page breaks down sales, revenue and check-in rates per event.
> There is also an Export CSV button which downloads a real spreadsheet of attendee data."

**Action:** Click **Export CSV** for any event. File downloads.

**Action:** Click **Create event** in the nav.

> "An organizer can create new events directly in the browser. They set the title, date, venue,
> ticket tier, and price. When they click Save, the event appears on the homepage instantly."

---

## PART 7 — TICKET VALIDATION AT THE GATE (1 minute)

**Action:** In the organizer dashboard, click **Validate tickets**.

> "This is the gate validation screen. In a real deployment this would be a mobile device
> at the entrance."

**Action:** Click **Scan latest sold ticket**.

> "This simulates scanning the QR code of the last purchased ticket. The code fills in automatically."

**Action:** Watch the VALID result appear in green.

> "The system confirms the attendee name, ticket tier, and timestamp. The ticket is now marked
> as used. If you try to scan the same code again..."

**Action:** Click **Scan latest sold ticket** again.

> "It returns ALREADY USED. In red. No second entry."

---

## PART 8 — DEMO PANEL BUSINESS LOGIC (30 seconds)

**Action:** Point to the Demo Panel note at the bottom.

> "The Demo Panel is designed for presentations like this one. It lets us force payment failure,
> simulate sold-out events, reset all data, and jump between customer and organizer views.
> This is how we can demonstrate every business scenario in a live academic environment."

---

## CLOSING (30 seconds)

> "Tilted Tickets solves a real Botswana problem with a real working prototype.
> It runs on GitHub Pages at zero hosting cost. The stack is HTML, CSS, and JavaScript only.
> No backend. No subscription. No framework lock-in.
> The business model is clear: we take 10% per transaction in fees.
> The next stage would be integrating the actual Orange Money and MyZaka APIs,
> adding a lightweight backend for persistent user accounts, and onboarding three to five
> real Gaborone event organisers as launch partners."

> "That is Tilted Tickets. Thank you."

---

## LIKELY QUESTIONS AND ANSWERS

**Q: How do you prevent fraud in a real version?**
A: Each ticket code is server-generated and single-use. The validation endpoint marks it
used the moment it is scanned. Screenshots do not work because the code is invalidated on first scan.

**Q: How does the revenue model work?**
A: We charge a 7% service fee and 3% transaction fee on every ticket. At 1,000 tickets sold
at BWP 250 each, that is BWP 25,000 revenue with BWP 2,500 going to Tilted Tickets.

**Q: Can you really use Orange Money?**
A: Orange Money has a published REST API for merchant payments. Integration requires a
registered merchant account. This prototype simulates that step.

**Q: What stops someone from buying tickets for a sold-out event?**
A: Stock is tracked in browser storage per tier. When quantityRemaining hits zero, the button
disables and shows Sold out. In a production database this would be a row-level lock.

**Q: Why not use React or a framework?**
A: The brief required a zero-dependency static site that deploys on GitHub Pages by uploading
three files. This approach also demonstrates understanding of core JavaScript fundamentals,
which is more relevant for an ICT coursework assessment than framework knowledge.

**Q: Is any data stored?**
A: All data lives in browser localStorage. It persists across page refreshes but is isolated
to that browser. There is no server, no user data leaves the device.

---

*Tilted Tickets | ICT205 Entrepreneurship Project | BAC 2026*
