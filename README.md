# Passbook Savings Spark

# Swasahayak — Build Spec



A microsavings platform for rural India. Tracks daily savings by Self-Help Group (SHG) women, connects NGOs, social entrepreneurs, and village youth, and lets urban individuals do "savings matching" with SHGs. One app, three logged-in experiences: Public Site, SHG Member, Honorary Savings-Matching Partner.



---



## 1. Visual identity



**Concept:** the whole site is styled like a physical SHG bank passbook / ledger — not a generic SaaS look.



- **Paper background:** warm aged-paper tone (`#EAE3D0` light / `#26221C` dark), with a subtle ruled-line texture like ledger paper.

- **Ink color:** deep indigo (`#1C2B44` light / `#EDE6D3` dark) for body text.

- **Accent — stamp red:** `#9A3B26` (light) / `#D67456` (dark) — used like a rubber ink-stamp, for emphasis, CTAs, highlights.

- **Accent — gold:** `#B8862F` (light) / `#D9AE5C` (dark) — used for scheme/yojana checkmarks, stats.

- **Accent — green:** `#3D5B41` (light) / `#7FAE87` (dark) — used for money/savings numbers, SDG tags.

- **Fonts:** display headings in **Rozha One** (serif, Indic-flavoured); body text in **IBM Plex Sans**; all numbers, labels, and data in **IBM Plex Mono** (ledger-digit feel).

- **Recurring motifs:** double borders (`border-bottom:3px double`), dashed dividers, a rotated "stamp" badge, numbered page footers (e.g. "— 01 —"), checkmark rows for schemes, passbook-style "entries."

- Support light/dark mode via `prefers-color-scheme`, plus `data-theme` override.

- Mobile-first: safe-area insets for notches, responsive grids that collapse on narrow screens (e.g. 4-column photo grids become 2-column under 420px).



---



## 2. App structure — three modes



A single app with a top mode-switcher bar: **Public Site | SHG Login | Partner Login**. Each mode has its own internal state; switching modes doesn't lose where you were.



### Navigation inside Public Site

- A dropdown menu: Home · [State 1] · [State 2] · [State 3] · ...

- Below it, a secondary tab row: **Home | State | NGOs | Savings Matching | Youth Savings | Social Ent.**

- Selecting a state keeps whichever secondary tab you're on.

- Deep-linking: a URL hash like `#shg1` should open that specific page directly.

- "Back" links on sub-pages return to their parent state.



---



## 3. Public Site — Home page



- **Hero:** headline + one-line mission statement + a "stamp" badge graphic.

- **Stats strip** (3×N grid of numbers with labels), covering:

  - Villages covered, SHGs saving daily, Women saving individually

  - FPOs covered, Farms in the programme, Village youth entrepreneurs

  - Savers under 25, Savers aged 25–44, Savers aged 45+

  - Youth saving outside any NGO (total, female, male)

  - Total saved till date, Total withdrawn till date

  - Loans availed (total), Enterprises set up, Women running enterprises

- **Stories feed:** filterable cards (filter chips: All / SHGs / Social Entrepreneurs / NGOs / FPOs / Village Youth). Each card: category label, headline, who/where, short story, a "people helped" number with breakdown (e.g. "90 weavers across 6 SHGs"), link into the relevant profile.

- **Photo grids, 4 cards per row** (2 per row on narrow screens), one grid each for:

  - **Our NGO Partners** — photo, name, place, "X women saving in supported SHGs"

  - **Our Social Entrepreneurs** — photo, name, place, "X women saving daily"

  - **Our SHGs** — photo, name, place, "X women · ₹Y/day"

  - Each card is tappable → opens that stakeholder's full page.

- A link into Savings Matching.



---



## 4. SHG detail page (one per SHG)



Order top to bottom:



1. **5-photo thumbnail row**

2. **Identity card:** Name / Place / "X women saving ₹Y/day"

3. Back-link to state, page number, village/district/state grid

4. **Balance:** daily saving amount per member

5. **SHG Goals** (tags) — broad aspirations, e.g. "Financial independence," "Freedom from moneylenders"

6. **NGO Partner** — name + one-line description, tappable chip

7. **Startup Partner** — name + description

8. **Loan Availed & Outstanding** — two-number strip + terms

9. **Enterprises Set Up** — count of enterprises, count of women running them, then each enterprise with its own women-count

10. **Social Entrepreneur** (if any) — name, website, one-line description, "X women of [SHG] in [activity]"

11. **Products They're Making** (if applicable) — tags

12. **Savings Goal** — the specific thing the corpus is building toward

13. **Government Schemes Availed** — checklist style, each with a one-line description and how many members have it

14. **Members' Insurance & Scheme Coverage** — every member named, with tags for which specific schemes she individually has (not just the aggregate count)

15. **Saved & Withdrawn Till Date** — two numbers

16. **Problems the Group Faces** — bullet list

17. **SDG Goals Applied** — tags

18. **Working With** chip row near the top (village, NGO, social entrepreneur) for quick scanning

19. Footer with page number



A "Working With" summary (village + NGO chip + entrepreneur chip) should also appear in the SHG's row wherever it's listed inside a state page.



---



## 5. NGO detail page (one per NGO)



1. 5-photo thumbnail row

2. Identity card: Name / State / "X women saving in supported SHGs"

3. Website link

4. **Collaboration box** (gold border) — names our point of contact (POC) at the NGO, and states plainly this is a collaboration where they are our POC and we help them align their work with our savings/SDG goals

5. Stats: villages worked in, SHGs supported, women reached

6. **Their Work** — short description + bullet list of activities

7. **SDGs They Work Under** — tags

8. **Schemes & Yojanas They've Helped With** — checklist of 4–5 government schemes they facilitate access to across all their villages/SHGs (broader than just their one featured SHG), each with a short description

9. **What They're Looking For** — bullet list (what kind of help/partners they need)

10. **Targets** — bullet list (future goals with a timeframe)

11. **Achievements** — bullet list (what's been accomplished so far)

12. **Photos** — 3-photo placeholder row, labelled as placeholders

13. Link to the SHG(s) they support



---



## 6. Social Entrepreneur detail page (one per entrepreneur, where applicable)



Same shape as the NGO page, substituting:

- "Their Work" described from the entrepreneur's angle

- **Products & Where to Buy** block — product tags + a line on where to purchase (village outlet, online, retail partner)

- SDGs, Looking For, Targets, Achievements, Photos — same as NGO page

- A lighter summary version of all this (SDGs, looking for, targets, achievements) should *also* appear directly in the Social Ent. tab of that entrepreneur's state, not just on their full profile page, with a "Full profile →" link to the complete page for photos and collaboration details.

- Some SHGs won't have a social entrepreneur yet — show a plain note instead of an empty section, e.g. "No social entrepreneur is currently working with SHGs in [state]."



---



## 7. State tab contents



For each state, four tab panels:

- **State (overview):** villages covered, SHGs saving daily, women in SHGs, saved/day, youth saving + saved/day; loans & enterprises summary; list/cards of SHGs and NGO partners in that state (photo-card style, same as Home page grid)

- **NGOs:** NGO partner card(s), photo-card style

- **Savings Matching:** see section 8

- **Youth Savings:** youth saver counts (female/male), average saved/day, saved & withdrawn till date, a "start saving" CTA

- **Social Ent.:** entrepreneur summary card(s) (see section 6)



---



## 8. Savings Matching (per state, SHG-only)



- Framing: **this is an investment in the SHG, not a donation.** Matched savings build the SHG's own corpus; the partner becomes an ongoing collaborator, not a one-time donor.

- Money flow: partner pays by UPI → funds go into the SHG's **joint corpus** (pooled with the group's own savings) held in a bank account (e.g. State Bank of India) → the NGO only **facilitates transactions and cannot withdraw** → only the **SHG itself initiates withdrawals**, which go to the SHG's own account.

- The matched amount is **non-refundable and earns no interest for the partner.** It is not returned to them.

- Partner **can stop matching at any time**, with no penalty; money already given stays with the SHG.

- What the partner gets in return (non-financial): regular updates on the SHG's savings/loans/enterprise activity, two-way communication to share ideas with the women, and the option to separately invest in the group's business on agreed terms.

- Matching is explicitly **for SHGs only** — not available for individual/youth savers (label this clearly).

- Include a worked example (e.g. "Aubrey joins"): shows the SHG's existing daily group saving, the partner's daily match, the new combined daily total, and per-day/month/year totals for the partner's contribution. Show SHG details (village, NGO, entrepreneur, loan info, enterprises, members) inline so the partner can see exactly who they're matching with.



---



## 9. SHG Member login (mode 2)



- Simple login gate (select SHG / mock auth for now).

- Dashboard shows:

  - Total saved till date, available to withdraw, loan still available to take (eligibility), loan outstanding

  - **Loan Ledger:** loan taken, repaid, a progress bar, amount still owed, lender + terms

  - **Members & Their Projects:** every member listed with avatar initials, what she's saved, and what enterprise/project she's part of (or "no project yet" for newer members)

  - **Your Honorary Savings Match:** honorary partner's name, rate/day, totals (day/month/matched-till-date), a line clarifying the money stays with the group

  - **Messages from Honorary Members:** a live feed of recommendations/comments sent by partners (see section 10 — this must be the *same* underlying data as what partners send, since it's one shared app)



---



## 10. Honorary Partner login (mode 3)



- Login gate (mock).

- **Overview stats on login:** total amount matched/saved across all SHGs, number of SHGs saved with, number of SHGs they're a "part of" (honorary member of).

- **SHGs You're Saving With:** one card per SHG, tappable to expand into full detail — village, group's own daily saving, loan availed/outstanding, NGO partner, social entrepreneur (or none), enterprises, SDG tags, member list, and a "View SHG page →" link that jumps to that SHG's full public page (internal navigation, not an external link, since it's one app).

- **Send a Recommendation or Comment:** choose which SHG, choose type (Recommendation / Comment), free-text box, send button. This must write to **shared, live storage** keyed by SHG id (plus sender name and type), so it immediately appears on that SHG's own dashboard (section 9) — not just locally.

- **Your Messages So Far:** live list of everything this partner has sent, each tagged with which SHG it went to and a link back to that SHG.

- **Preview: What the SHG Sees:** a read-only view of the live message feed for a chosen SHG, so the partner can check what their message looks like from the SHG's side.



> Implementation note: messages must be stored in a shared backend/database keyed by SHG id, read by both the partner UI and the SHG dashboard UI, so a message sent in one view appears in the other in real time. If you build this as static pages instead of one connected app, you'll need an actual backend (even a simple one) to make this cross-view behaviour work — two independent pages with their own local storage cannot share data.



---



## 11. Content rules to carry through everywhere



- **Government schemes / yojanas** should appear at three levels: (a) aggregate on each SHG page ("X of Y members have Ayushman Bharat"), (b) per-member on each SHG page (named list with tags for which schemes each woman individually has), (c) broader on each NGO page (schemes they help facilitate across all their villages, not just the featured SHG).

- **Insurance coverage** is one of the scheme tags per member (e.g. Ayushman Bharat = health insurance, PM Fasal Bima Yojana = crop insurance) — make clear in the member list who is and isn't currently covered.

- **Loan figures** always show both availed and outstanding, never just one.

- **"Saved" and "withdrawn"** should always be shown as a pair, not savings alone, wherever a savings figure appears (SHG page, state page, youth tab, landing stats).

- **Photos:** since this is a static, self-contained web app, you likely can't fetch remote images — either embed real photos as base64/data URIs (resize small, e.g. 300–400px, compress to keep the page light) or use clearly-labelled placeholder thumbnails ("Placeholders — real photos to be added") until real photos are supplied.

- **SDG tags**, loan figures, scheme names, "looking for / targets / achievements," and collaboration/POC framing should appear consistently on every stakeholder type (SHG, NGO, Social Entrepreneur) — not just some of them.

- Every SHG/NGO/Entrepreneur card, wherever it appears (Home grid, state tab, index list), should be visually consistent: thumbnail photo (or placeholder) + name + place + a relevant headline number (women saving / women reached), using the same card component everywhere rather than one-off list rows.



---



## 12. Sample data used while building (replace with real data)



- **3 states:** Madhya Pradesh (Jyoti Mahila SHG, Barwani), Odisha (Saraswati SHG, Koraput), Maharashtra (Annapurna Bachat Gat, Yavatmal)

- **3 NGOs:** Gram Utthan Trust (MP), Nari Vikas Sansthan (Odisha), Kisan Mitra Trust (Maharashtra)

- **2 Social Entrepreneurs:** Meera Joshi / EcoKhad Ventures (MP, compost), Anjali Patra / Koraput Weaves (Odisha, weaving) — Maharashtra intentionally has none yet, to test the "no tie-up" empty state

- **Honorary partner example:** "Aubrey," matching ₹10/day

- Government schemes referenced: PM Jan Dhan Yojana, DAY-NRLM, Ayushman Bharat, PM Ujjwala Yojana, PM Awas Yojana, Mission Shakti (Odisha), PM Matru Vandana Yojana, Janani Suraksha Yojana, PM Fasal Bima Yojana, PM-SVANidhi, PM Krishi Sinchai Yojana



---



## 13. Legal/compliance language to keep in mind (not legal advice)



- Be explicit that honorary-member funds go directly into the SHG's own bank account, are non-refundable, earn no interest for the partner, and that the NGO only facilitates — never holds or controls — the funds. This framing (investment in the SHG, not a donation; no promise of return) was chosen deliberately to avoid looking like an unregulated deposit-taking scheme. Have an actual lawyer confirm this before launch, especially once UPI collection and a bank partner (e.g. SBI) are finalized.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5dfbf8ae-32bb-4d45-9091-21459fbd028c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
