# Orvo One - Test Series & CBT Prep Platform

A minimal, high-grade exam preparation platform for SSC (CGL, CHSL, MTS, GD, CPO) and Railway (RRB NTPC, Group D, ALP, JE) one-day exams. Features realistic TCS-style CBT mock testing, instant 01 rapid drills, dynamic mistake book analytics, bilingual English/Hindi toggles across the header, live question player, and result analytics, paired with free-tier access governance and Orvo Coins (`oc`) economy.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed via interactive clarification:
> - **Language Switch Scope**: Bilingual switching (English & Hindi) applies dynamically to all questions, answer options, explanations, and result question reviews, while preserving clean, unbloated UI labels.
> - **Free Tier & Paywall Architecture**: Free users are permitted **1 test attempt**. Upon completing their first test, the result screen reveals their base score, total marks, and rank summary, while blurring deep granular analytics (weak/strong breakdown, recommended remedial tests, solution review) behind a subtle frosted glass upgrade paywall promoting **Orvo One Premium** (₹99/month or ₹499/year). Further test attempts will require premium activation or unlocking via earned `oc` coins.

---

### 1. Overview & Core Concept

- **What It Does**: Orvo One delivers a clean, distraction-free environment for government job aspirants. It features 3 core test types (Subject Wise, Full Mock Tests, Previous Year Questions) along with targeted Exam-Based categorization.
- **Target Audience**: SSC and Railway aspirants preparing for CBT exams seeking authentic question difficulty, immediate feedback, and rapid mistake rectification.
- **Key Value**: Clutter-free design adhering to the zero-pill discipline, realistic time-controlled CBT interface, automated mistake-book synchronization, and an engaging incentive model with streak multipliers and `oc` coin rewards.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Onboarding & Verification**:
   - Single-click **Continue with Google** authentication.
   - Immediate **Mobile Number Verification Modal**: Mandatory, strictly validating a unique 10-digit Indian phone number (`[6-9]\d{9}`). Awards a +25 `oc` welcome bonus upon completion.
2. **Dashboard & Habit Loop**:
   - Header greeting: `Hii {user name}` with target exam selector, streak flame (`5d`), and `oc` coin balance.
   - Activity summary cards: Tests taken, accuracy %, overall percentile, and questions solved.
   - Quick action cards: Mistake Book (with unresolved error counter), Start Current Affairs Test, Read Current Affairs (card-wise reader), and Read Notes.
3. **Flagship 01 Rapid Practice**:
   - Prominently styled navigation centerpiece with an enlarged `01` badge.
   - Rapid 1-question-at-a-time blitz with live instant answer checking, bilingual switch, explanations, and automatic mistake-book sync.
4. **CBT Real Exam Experience**:
   - Standard government exam layout: Countdown timer, section tabs, question palette (Not Visited, Not Answered, Answered, Marked for Review).
   - Instant language switch button (EN / HI) positioned directly in the question toolbar.
5. **Result & Remedial Analytics**:
   - Score breakdown, percentile, accuracy, and test duration.
   - Dedicated **Weak Areas** and **Strong Areas** detection with direct 1-click **Recommended Practice Drills**.
   - Automatic mistake-book count badge and question bookmarking.
   - Top 10 All-India leaderboard ranking and comparative topper benchmarking.
   - *Free User Tier*: Displays high-level score summary, but blurs deep diagnostics and solutions with an upgrade trigger to Orvo One Premium.

#### Visual Identity & Theme
- **Dominant Canvas (60%)**: Deep rich obsidian `#090d16` and structural slate `#111726`.
- **Structural Surfaces (30%)**: Fine hairline dividers `rgba(148, 163, 184, 0.1)`, dark muted slate cards.
- **Accent Budget (10%)**: High-contrast Indigo `#4f46e5` and Electric Cyan `#06b6d4` for primary actions, Amber `#f59e0b` for `oc` coins and streak badges, Rose `#f43f5e` for mistakes.
- **Typography**: `Plus Jakarta Sans` for clean, modern headings and UI prose, paired with `JetBrains Mono` for tabular numerals, scores, timers, and test IDs.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Persistent Client-Side State with LocalStorage Backup**
  - *Chosen Approach*: Maintain full state (user profile, phone number, streak, test attempts, mistake book, saved questions, coin transactions) in React Context backed by synchronized localStorage.
  - *Why*: Allows zero-friction instant mock tests, offline resilience, and fast development verification while meeting the Google authentication and unique phone validation requirements.
- **Decision 2: Free User 1-Test Limit & Blurred Paywall**
  - *Chosen Approach*: Track `user.testsAttemptedCount`. Free users can take their first test freely. On the result page, a frosted glass overlay obscures section-by-section analysis and solutions, accompanied by clear benefit highlights of the ₹99/mo and ₹499/yr plans.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Orvo One App                              │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar Contract: Brand "Orvo One" | Exam Selector | Lang (EN/HI)     │
│                    Streak Flames    | OC Coins      | Menu Drawer      │
├────────────────────────────────────────────────────────────────────────┤
│  Main Navigation Views:                                                │
│   ├── [DashboardView]        (Hii User, Stats, Mistake Book, CA Cards) │
│   ├── [TestView]             (Subject Wise, Mock Test, PYQ, Exam Base) │
│   ├── [PracticeView]         (01 Rapid Drill - Centerpiece Feature)    │
│   ├── [CurrentAffairsView]   (Card-wise reader, likely questions)      │
│   └── [LeaderboardView]      (Top 10 Students, All-India standings)    │
├────────────────────────────────────────────────────────────────────────┤
│  Interactive Modals & Overlays:                                        │
│   ├── [ExamScreen]           (TCS CBT interface with EN/HI toggle)     │
│   ├── [ResultScreen]         (Score, Weak/Strong, Top 10, Paywall)     │
│   ├── [MistakeBookModal]     (Re-attempt, Mastery toggle, Note-taking) │
│   ├── [SubscriptionModal]    (₹99/mo & ₹499/yr checkout simulation)    │
│   ├── [ReferModal]           (3 friends -> 7 days pass, 50 oc/friend)  │
│   └── [AuthModals]           (Google Login + Required Unique Phone)    │
└────────────────────────────────────────────────────────────────────────┘
```

#### Verification & Test Plan
1. **Compilation Check**: Run `compile_applet` to ensure zero TypeScript errors or missing imports.
2. **Language Switch Verification**: Verify toggling between EN and HI updates the top header, the live question player during tests, and the question solutions on the result page.
3. **Paywall Gate Verification**: Confirm a free user can complete their 1st test and sees the blurred analytics with upgrade CTA. Verify subsequent attempts block free users until upgraded or unlocked with `oc` coins.
4. **Phone Verification**: Verify 10-digit uniqueness validation rejecting invalid/duplicate phone numbers and awarding +25 `oc`.
