# LaneVal — Business Plan

**AI margin assistant for independent truckload freight brokers**

*Prepared: October 3, 2026 · Status: Pre-seed / MVP*

---

## 1. Executive Summary

**LaneVal** is an AI margin assistant for independent truckload freight brokers. It reads an incoming RFQ, extracts the lane, equipment, and volume, and returns a quote recommendation: a customer sell price, an expected carrier buy range, an expected margin range, and a risk level with reasons.

Truckload brokerage is a spread business — profit is the difference between what the shipper pays and what the carrier is paid. The buy side is the part brokers can't see clearly. Today a quote is built from a load-board average plus experience, phone calls, and gut feel. LaneVal replaces the guess with a margin guardrail grounded in the broker's own data, so they stop leaving margin on the table and stop taking loads that lose money.

**Positioning (deliberately honest):** LaneVal does *not* promise to "predict freight rates." It promises: **"AI helps brokers avoid bad quotes and protect margin."**

**Initial market:** independent, asset-light truckload brokerages (5–100 employees, 10–500 loads/month). Truckload first, then LTL/ocean/air/intermodal.

---

## 2. Problem

Freight brokers make money on the spread between the shipper's rate and the carrier's rate. Accurately estimating purchased-transportation cost is therefore central to profitability — and it is the hardest number to get right.

The current workflow is:

> DAT average + experience + phone calls + gut feeling = quote

Three concrete pain points:

1. **Load-board averages don't equal real capacity.** DAT/Truckstop averages often don't match the trucks actually available on a lane. Pricing off the average means quoting blind to true buy-side risk.
2. **Quotes live in a few reps' heads.** Lane knowledge and carrier relationships are institutional memory, not a system. When a rep leaves, the pricing edge leaves with them; every quote is a reinvention.
3. **Margin erodes quietly.** Ops covers loads under pressure, and contract freight locks a rate for weeks. A single bad Monday pickup on a tight lane can wipe out a week of margin without anyone noticing until the P&L closes.

The pain is most acute in **truckload**, where carrier costs are highly variable, spot quoting is constant, and margin pressure is relentless.

---

## 3. Solution

LaneVal's MVP workflow:

1. **Extract** — paste the customer's RFQ email. LaneVal extracts lane, equipment, volume, frequency, and customer (e.g., Chicago → Atlanta, dry van, 10/week, contract).
2. **Ground the price** — LaneVal asks how the rep is pricing it (existing carrier history, a DAT/Truckstop rate, or a manual estimate) and layers the broker's own booked rates and margin history on top.
3. **Recommend & protect** — return a sell price, an expected carrier buy range, an expected margin range, and a risk level with the reasons behind it.

Example output:

| Field | Value |
|-|-|
| Customer sell | $2,450 |
| Expected carrier buy | $1,950 – $2,100 |
| Expected margin | $350 – $500 |
| Risk | **HIGH** — carrier cost up 12% in 30 days · low outbound capacity · Monday pickup |

The differentiator is honesty and groundedness: the recommendation is built from the broker's *own* quoting and booked-carrier history, not a black-box national prediction.

---

## 4. Market Opportunity

### 4.1 Segment fit

| Segment | Fit | Why |
|-|-|-|
| Truckload freight broker | ★★★★★ | Highly variable carrier costs, spot quotes, margin pressure |
| 3PL generalist | ★★★★ | Depends on freight mode mix |
| Ocean forwarder / NVOCC | ★★★★ | Surcharges/accessorials complex, different workflow |
| LTL broker | ★★★ | More standardized pricing, carrier tariffs available |
| Air freight forwarder | ★★★ | Rates change but buying is relationship-driven |
| Rail / intermodal broker | ★★★ | Complex but smaller market |

**Decision: start with truckload, expand later.**

### 4.2 Market sizing (directional estimates)

> All figures are planning estimates based on public industry reporting (Armstrong & Associates and similar). They should be re-validated during due diligence.

- **TAM — U.S. freight brokerage:** ~$85B+ in gross revenue annually. Truckload is the largest single mode within it.
- **SAM — truckload brokerage addressed by a quoting/margin tool:** roughly the asset-light truckload brokerage segment (tens of billions in gross revenue).
- **SOM — early target:** independent truckload brokers with 5–100 employees moving 10–500 loads/month. A realistic year-1–2 beachhead is a few hundred paying brokerages.

### 4.3 ICP

**Independent, asset-light truckload freight brokerage:**

- 5–100 employees
- 10–500 loads/month
- Runs a TMS + DAT/Truckstop + spreadsheets
- Salespeople quoting customers daily
- Operations people covering loads

**Examples:** regional freight brokerage, produce broker, dry van broker, reefer broker, flatbed broker.

---

## 5. Product & Data Roadmap

A pure data-science product needs huge data. An MVP does not. LaneVal starts with customer-owned data and compounds into a moat.

- **Phase 1 — the broker's own history.** Historical quotes, booked carrier rates, failed quotes, margin history. Core fields: `origin, destination, equipment, customer_rate, carrier_cost, margin, carrier, date`. LaneVal learns "for *this* broker, CHI→ATL dry van typically costs $1,900–$2,100 at ~15% margin."
- **Phase 2 — market context.** DAT, Truckstop, fuel prices, weather, seasonality.
- **Phase 3 — network intelligence.** Anonymized lane economics across many brokers (thousands of loads per lane) → market-trend signals. **This becomes the moat.**

---

## 6. Competitive Landscape

| Category | Who | LaneVal's edge |
|-|-|-|
| Load boards | DAT, Truckstop | Lane-level, broker-specific margin context on top of market averages |
| TMS platforms | McLeod, Turvo, Tai, etc. | Focused on the *pricing decision*, not just load management |
| Freight-rate AI (prediction) | Various rate-prediction startups | Honest positioning — margin protection, not rate prediction |
| Spreadsheets / gut feel | The incumbent | Systematizes and defends institutional pricing knowledge |

Barrier to entry: the **network intelligence layer** (Phase 3) — a data advantage that compounds as more brokers contribute anonymized lane economics.

---

## 7. Business Model & Pricing

- **Land-and-expand SaaS.** Start with a quoting/margin assistant that plugs into an existing TMS + DAT/Truckstop workflow.
- **Early access:** free/design-partner pricing for the first cohort to seed data and testimonials.
- **Post-MVP (proposed):** per-seat or tiered monthly subscription scaled to loads/month, with a premium tier unlocking Phase 2/3 market context and network intelligence.
- **Non-goal (near term):** taking a spread on freight or becoming a brokerage. LaneVal sells software, not capacity.

*Pricing specifics to be validated during early-access interviews.*

---

## 8. Go-to-Market Strategy

1. **Design partners.** Onboard 5–10 independent truckload brokers, free/steeply discounted, in exchange for data, feedback, and testimonials.
2. **Channel where brokers already are.** Freight broker communities, load-board-adjacent content, industry newsletters, LinkedIn (freight brokers and sales reps), and freight-tech conferences (TIA, F3, Manifest).
3. **Content + GEO/SEO.** Publish lane-economics and margin-protection content aimed at both Google and AI search engines — the same "quote with confidence" narrative the landing page carries, in FAQ and how-to form.
4. **Land-and-expand within the account.** Start with the sales/quoting team, expand to ops as the recommendation proves out.
5. **Referral motion.** Brokers know other brokers; a strong word-of-mouth loop is realistic in this tight-knit segment.

---

## 9. Financial Projections (illustrative)

*Planning assumptions, not committed forecasts. Re-forecast after early-access data.*

- **Year 1:** 10 design partners → 30–50 paid brokerages; ARR in the low hundreds of thousands.
- **Year 2:** 150–300 brokerages; cross into the 3PL-generalist segment; ARR crossing ~$1M.
- **Year 3:** network-intelligence (Phase 3) becomes a paid premium layer; ARR several million with improving retention.

**Unit economics assumptions:** high gross margin (SaaS), customer acquisition via inbound + community rather than paid media, and a pricing floor that keeps it accessible to a 5-person broker.

---

## 10. Key Metrics / KPIs

- **Activation:** % of onboarded brokers who produce their first defended quote within week one.
- **Engagement:** quotes/week per brokerage; % of quotes where the recommendation changed the number.
- **Margin outcome:** measured spread improvement on recommended vs. non-recommended quotes.
- **Retention / NRR:** logo retention and net revenue retention (Phase 3 premium is the expansion lever).
- **Network depth:** loads and lanes in the anonymized intelligence layer.

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|-|-|
| Data cold-start (not enough history) | Phase 1 works on customer-owned data, which brokers already have; design partners seed it |
| "AI predicts rates" over-promising | Honest positioning; risk surfaced as reasons, not a single predicted price |
| TMS/DAT integration friction | Start with TMS export/CSV and paste-in RFQ; deepen integrations over time |
| Trust in recommendations | Ground every number in the broker's own booked rates; show reasons, allow overrides |
| Commoditization by incumbents | Move fast to Phase 3 network intelligence, which is the defensible data moat |

---

## 12. Team

- **Founding team:** product/engineering with freight-tech or brokerage-domain experience is the critical hire/complement. (To be filled.)
- **Advisors:** one or two practicing truckload brokers and one freight-tech operator for go-to-market credibility.

---

## 13. Milestones (next 12 months)

1. **Months 0–2:** Landing page live; 5–10 design-partner brokers signed.
2. **Months 2–4:** MVP (extract → ground → recommend) in one partner's real workflow; first defended quotes.
3. **Months 4–6:** TMS export ingestion; Phase 2 market-context layer (DAT/Truckstop, fuel, seasonality).
4. **Months 6–9:** Paid beta; 30–50 brokerages; margin-outcome data to prove value.
5. **Months 9–12:** Phase 3 network-intelligence pilot; pricing finalized; seed raise.

---

## 14. The Ask

**Raising:** pre-seed to fund MVP build, 1–2 freight-domain hires, and the design-partner program through paid beta.

**What the capital buys:** product engineering, data pipeline (Phase 1→2), go-to-market for the truckload beachhead, and the foundation for the Phase 3 network-intelligence moat.
