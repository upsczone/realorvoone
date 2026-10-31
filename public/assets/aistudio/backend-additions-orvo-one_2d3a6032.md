# ORVO ONE: Complete Backend Additions Checklist

This is the consolidated hand-off for backend and the **existing** admin panel. It covers the student components currently in the ORVO ONE web app and separates confirmed integration gaps from APIs the frontend already calls. No separate admin app is needed.

## Launch blockers (P0)

### 1. One-day exam catalogue and content mapping

The student profile currently stores `exam_preparation` as free text, while the exam picker is a temporary frontend list. Add a managed catalogue and stable IDs.

**Backend work**

- Add `exams`: `id`, unique `slug`, localized/display `name`, `category` (initially `one_day`), `is_active`, `sort_order`, timestamps.
- Add nullable `profiles.exam_id` with a foreign key; preserve `exam_preparation` during migration for old clients and existing profiles.
- Add `GET /api/v1/app/exams?category=one_day&active=true&lang=en` and return `{data:[{id,slug,name,category}]}`.
- Extend profile read/update (`GET /api/v1/app/auth/me`, `PATCH /api/v1/app/profile`) with `exam_id` and an exam summary. Validate active exams server-side; update the legacy text field from the chosen name while compatibility is needed.
- Add exam mappings for questions and exam-wise test series. Use join tables such as `question_exams(question_id, exam_id)` and `test_series_exams(test_series_id, exam_id)` when content may serve more than one exam.
- Add `exam_id` filtering to student question/test feeds. Never infer permanent mappings from titles. Keep `test_type=exam_wise` as paper format, separate from exam identity.
- Do not filter shared Current Affairs or GS Notes by the student's target exam.

**Existing admin panel work**

- Add exam catalogue create/edit/active/order controls.
- Add exam selectors to question and test-series create/edit forms, bulk import, filters and publish review.
- Require an exam mapping to publish exam-specific questions or `exam_wise` papers.
- Add exam selection to student profile support tools; preserve the legacy text value only for migration/debugging.
- Seed the one-day exam groups/options already represented in the app (SSC, Railway, UPSSSC, DSSSB, Banking, NET/SET, Teaching, Defence, Insurance and Other Government) and allow admins to maintain them.

### 2. Subject-wise, continuing Practice feed

The frontend displays subjects from `GET /api/v1/app/subjects?has_questions=true&lang={lang}` and requests questions after a student selects a subject.

- Ensure the subject endpoint returns every published subject that has eligible questions, with stable IDs and localized display names.
- Extend the question feed with `subject_id` (the current client sends the selected ID as `subject`), `difficulty`, `limit`, `include_answer=false`, `lang` and preferably `cursor`.
- Return `next_cursor` and a stable, non-repeating page for the selected subject/exam. Exhaustion should return an empty page and `next_cursor: null`. A random endpoint that can return the same batch forever cannot satisfy continuous practice.
- Preserve exam eligibility in the server query. Keep correct answers hidden until `POST /api/v1/app/questions/{id}/answer` is submitted.
- Record answer, accuracy, mistake-book and performance changes server-side. Do not let the client decide correctness or award coins.

### 3. ORVO ONE subscriptions and checkout

The student page always displays Monthly **₹99** and Annual **₹499** cards. Checkout stays disabled unless a matching live billing product exists.

- Create billing products with codes `orvo_one_monthly` and `orvo_one_annual`, product scope `orvo_one`, web/mobile platform availability, period, currency, final payable amount, entitlements/features and active status.
- Filter `GET /api/v1/app/subscriptions/plans?platform=web` by ORVO ONE product scope (or add an explicit `app_code=orvo_one`). Return only these products to this app with stable IDs/codes, features and payable `total`.
- Ensure the configured final amounts and the values charged are ₹99/month and ₹499/year. If tax changes the final amount, return that payable amount and reconcile the displayed price before enabling checkout.
- Scope purchase validation and entitlements by app code; never accept a plan ID/code belonging to UPSC/PCS.
- Web: implement `POST /api/v1/app/subscriptions/purchase` to create a Cashfree order and return `order_id`/`payment_session_id`; verify payment server-to-server/webhook before granting access. Make confirm idempotent.
- Android: configure the matching Google Play product IDs and server-side purchase-token validation. Do not reuse Cashfree sessions in the Android app.
- Add plan/product, price, platform, entitlement, gateway-product-ID and active-state fields to the existing admin plan editor.

### 4. Question Battle (subject matching, friend challenge, verified 10-coin reward)

The app currently requests `GET /api/v1/app/question-battles/config`; the live endpoint returned 404. Battle controls must remain disabled until the server can run and score a real match.

**Student API additions**

- `GET /api/v1/app/question-battles/config`: `enabled`, `reward_coins` (10), `questions_per_match`, `duration_seconds`, eligible subjects.
- `POST /api/v1/app/question-battles/matches`: authenticated matchmaking request with `subject_id` and an idempotency key. Match only players queued for the same subject; return `waiting`/`matched` and a match ID.
- `POST /api/v1/app/question-battles/friend-invites`: create a short-lived, one-use invite for a friend, scoped to `subject_id`.
- `POST /api/v1/app/question-battles/friend-invites/{invite_code}/accept`: authenticate the invited friend and join that same subject/match. Keep invite codes private, single-use and expiring.
- `GET /api/v1/app/question-battles/matches/{match_id}`: return participant-safe opponent summary, match state, current question/deadline and final result. Never expose an answer key before a round is closed.
- `POST /api/v1/app/question-battles/matches/{match_id}/answers`: validate one answer per question and server-side deadline; reject late, duplicate and out-of-match answers.
- `POST /api/v1/app/question-battles/matches/{match_id}/forfeit`: close a match under server rules.

**Data and award rules**

- Store matches, subject, participants, questions, answers, score, timestamps, status, invite state and final result.
- Select exam-eligible questions for the selected subject. Score both players on the server; define tie, disconnect, timeout and forfeit behavior.
- Credit exactly 10 coins once to the verified winner in the same transaction that closes the match. Use a unique reward-ledger reference/idempotency constraint. Return `result`, `reward_coins_awarded` and updated `coin_balance`.
- Start with bounded polling for readiness/round state if that is already supported; add WebSocket only if existing infrastructure makes it straightforward. Never fake a live opponent or let the browser mint the reward.

**Existing admin panel work**

- Add Battle enable/disable, reward (default 10), eligible subject/exam, question count, duration and queue controls.
- Add match history, invite/match status, report/abuse review and coin-ledger audit. Restrict actions to authorized admin roles.

## Other component integrations to verify/deploy

These are used by the current student frontend. Treat them as additions only if the backend deployment does not already expose them.

| Student component | API contract currently used by frontend | Required backend/admin outcome |
| --- | --- | --- |
| Sign-in, session, profile | `/api/v1/auth/login`, `/api/v1/auth/refresh`, `/api/v1/app/auth/me`, `PATCH /api/v1/app/profile` | Keep cookie/session behavior; add the exam catalogue fields above. |
| Home / account stats | `GET /api/v1/app/dashboard/stats` | Return student-specific coins, streak, quizzes and recent test summary. |
| Saved Questions / Mistake Book | `GET /api/v1/app/questions/bookmarks`, `GET /api/v1/app/questions/mistakes`, `POST /api/v1/app/questions/{id}/bookmark` | Deploy the list handlers; derive mistakes from server-graded wrong answers and persist bookmarks per student. |
| Practice grading | `POST /api/v1/app/questions/{id}/answer` | Server-grade, return correct option/explanation after submit, and update performance/mistake records. |
| One-day Tests / history | `GET /api/v1/app/test-series?type=exam_wise`, detail, `/start`, `/submit`, `/attempts` | Apply the exam mappings above; enforce attempt ownership, timers, server scoring and history. |
| Current Affairs | list/detail routes already called by the app | Keep published articles shared for every exam; support `lang`, localized article fields and safe rich content. Add exam labels only as optional metadata, never as a visibility gate. |
| GS Notes | `/api/v1/app/gs-courses`, course/lesson detail, lesson/course completion | Keep published GS content shared for every exam. Return lesson content, lock state and per-user progress. |
| NCERT Courses | `/api/v1/app/ncert-courses`, course/chapter detail and completion | Return class level, subject, chapters, premium lock and per-user progress. Add `class_level` and related publishing/filter controls in the existing content admin if missing. |
| Performance | `GET /api/v1/app/performance` | Return per-user subject attempts, correct count, accuracy and dates from graded activity. |
| Leaderboard | `GET /api/v1/app/leaderboard?metric=streak&period=all` | Return privacy-safe names, ranks and the current student's rank/value. |
| Billing confirmation | `/subscriptions/purchase`, `/subscriptions/confirm` | Verify gateway callbacks server-side, prevent duplicate grants and return the active ORVO ONE entitlement. |

The frontend consumes the routes above already; do not create duplicate APIs where the deployed backend implementation is complete. Add contract/authorization checks for every student ID, attempt ID, bookmark and progress write.

## Content/admin publishing fields to check

- Questions: subject, topic, difficulty, language, exam mapping, explanation, premium flag and publish state.
- Test series: `test_type`, exam mapping, title, duration, question count, marks, negative marking, language, premium/purchase state and publish state.
- Current Affairs: category, publish date, title, summary, rich content, source, language and publish state; shared visibility across exams.
- GS Notes and NCERT: subject, course/lesson or class/chapter hierarchy, language, rich content, free/premium lock, order, publish state and completion eligibility.
- Billing: app scope, platform, code, final payable price, gateway product IDs and entitlements.
- Battle: config, same-subject queue, friend invite lifecycle, match audit and reward ledger.

## Rollout order and acceptance

1. Seed the exam catalogue; add profile `exam_id` while retaining the old text field.
2. Add admin question/test mappings and manually map published one-day papers/questions.
3. Deploy exam-filtered test/practice feeds and cursor-backed subject batches. Check that one subject/exam never returns another exam's content.
4. Configure both ORVO ONE billing products and verify web checkout plus Android purchase-token validation in their respective sandbox/live environments.
5. Add the Battle tables, admin controls and endpoints; verify same-subject random match, friend invite acceptance, tie/timeout handling and exactly-once 10-coin awards before enabling the feature flag.
6. Deploy/verify bookmark and mistake list handlers, answer grading, performance, test history and course progress for the signed-in student.
7. Confirm Current Affairs, GS Notes and NCERT remain available regardless of selected exam and that Hindi/English content uses the requested `lang`.

**Release gates:** unmapped exam-wise content is not shown as belonging to an exam; no client-side answer key or coin grant; each subscription purchase is scoped to ORVO ONE; question-battle rewards are server-ledgered exactly once; shared study content remains visible for every target exam.
