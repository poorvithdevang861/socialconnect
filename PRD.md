# CauseConnect — One-page PRD

**Product:** Social volunteering discovery & registration (demo web app).  


---

## 1. Vision & problem

**Vision:** Help people find **verified** volunteering near them, join in a few taps, and see their **impact** over time.  
**Problem:** Causes and events are scattered; users need **trust** (verified orgs), **fit** (interests, time, distance), and **continuity** (my events, impact).

---

## 2. Goals

| Goal | Success signal (examples) |
|------|---------------------------|
| Complete onboarding with clear preferences | % sessions finishing interests → filters → home |
| Discover relevant events | Time-to-first event detail view; filter usage |
| Register for an event | Funnel: detail → confirm → success |
| Return to track commitment | Revisit “My events” and “Impact” |

---

## 3. Personas (lightweight)

| Persona | Needs |
|--------|--------|
| **New volunteer** | Quick signup, interests, local curated list |
| **Returning volunteer** | Fast access to home, my events, impact |
| **Casual / guest** | Same discovery path without full account (demo: guest → same onboarding) |

---

## 4. End-to-end user flow (summary)

```
Splash → Login/Signup (or guest) → Interests (step 1) → Filters (step 2) → Home
                                                                    ↓
                                              Event detail → Confirm → Success
                                                                    ↓
                                    Events (my commitments) · Impact · Profile (nav)
```

**Onboarding guard:** Unauthenticated users cannot access `/interests` or `/interests/filters` (redirect to login). If onboarding is already complete, `/interests` redirects to `/home`.

---

## 5. Routes & behavior (source of truth)

| Route | Purpose |
|-------|---------|
| `/` | Splash; then redirect to login |
| `/login`, `/signup` | Auth (demo); sets authenticated → `/interests` |
| `/interests` | Step 1: causes + volunteering style |
| `/interests/filters` | Step 2: distance, duration, commitment, toggles → complete onboarding → `/home` |
| `/home` | Discovery: promos, causes, near you, featured, trending, friends, filters modal |
| `/events` | My registered events (local storage) |
| `/impact` | Personal impact / stats |
| `/profile` | Profile (shell nav; not in mobile bottom tabs) |
| `/event` | Event details; join |
| `/event/confirm`, `/event/success` | Registration confirmation & success |

**Shell:** Navbar + footer on main app routes; **no shell** on splash, login, signup, interests steps. **Mobile bottom nav:** Home | Events | Impact only.

---

## 6. Key interactions

- **City** is global (navbar / home) and drives “near you” context.  
- **Filters** from home opens **interests-style** modal (preference tuning).  
- **Event cards** navigate to `/event`; **Join** flows to confirm → success.

---

## 7. Edge cases & constraints

- **Invalid URL:** Redirect to `/`.  
- **Demo auth:** `localStorage` only; no real API or session.  
- **My events:** Backed by client-side registration helper, not a server.  
- **Profile** is reachable from header, not from mobile tab bar (may reduce discoverability).

---

## 8. Out of scope (current build)

- Real authentication, payments, push notifications, maps, moderation, org dashboards, admin.

---

## 9. Open questions

- Should **Profile** be on the mobile tab bar for parity with Home?  
- Persist interests/filters to **API** vs local only when backend exists.  
- Define **“verified”** rules for production (manual review, partner API, etc.).
