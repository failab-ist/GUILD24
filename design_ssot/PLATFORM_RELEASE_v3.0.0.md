# PLATFORM_RELEASE

DOC=PLATFORM_RELEASE
OWNER=external_release,android_wrapper,package_identity,native_save,cloud_save,app_lifecycle,android_back,haptics
RELEASE_TARGET=v3.0.0
DOC_AUTHORITY=AUTHORITATIVE_RELEASE_SPEC
GAMEPLAY_DESIGN_BASE=GUILD24_DESIGN_SSOT_v2.12.0

## ROLE

This owner holds the Android v3.0.0 release-integration behaviour approved by the User.
It does not reopen or redesign the closed v2.12.0 gameplay rules.

Implementation details that do not change Player-facing behaviour remain WORK choices.

## ANDROID APP IDENTITY

- wrapper: Capacitor
- Android package/application ID: `com.solbri.guild24`
- external release version: `v3.0.0`
- Android `versionCode`: implementation/release counter; increase for each uploaded build
- output for Google Play: AAB

The package/application ID is stable release identity. Do not rename it during ordinary v3.x updates.

## SAVE — v3.0.0 RELEASE BOUNDARY

Android v3.0.0 starts a new public Save compatibility boundary.

- v2.x development/web Saves are **not migrated** into the Android v3.0.0 app.
- first Android install starts from a fresh Save.
- from public v3.0.0 onward, ordinary updates must preserve supported public Player Saves unless a later User-approved migration policy says otherwise.

### Local Save

The local app Save is the primary playable Save.

- do not depend on WebView/browser `localStorage` as the Android release storage authority
- persist through app close/reopen
- offline play must remain fully playable
- Google login/network failure must not block boot or play

### Google Play Games Saved Games

Use Google Play Games Services v2 Saved Games as cloud backup/restore.

- no project-owned game server/DB
- when Play Games connection is available, back up the valid local Save automatically
- when the device has no valid local Save and a valid cloud Save exists, restore the cloud Save
- when both local and cloud Saves exist, resolve automatically; do not ask the Player to choose on routine launches
- conflict resolution must prefer the newer valid Save and must not intentionally roll Player progress backward
- WORK may use a monotonic Save revision plus timestamp/validity checks to implement this rule
- cloud failure falls back to the local Save without blocking play
- Saved Games is not Analytics and is not a developer dashboard for browsing every Player's Save

## ANDROID SYSTEM BACK

Android system Back / back gesture is navigation, not a gameplay rewind.

Priority:
1. if a modal / popover / settings / help surface is open, close the topmost dismissible surface
2. otherwise never undo an already committed gameplay decision or move backward across MORNING / ORDER / SALE / NIGHT / CLOSING state
3. at the app's top-level surface, follow normal Android app Back/exit behaviour after saving current state

Back must never reopen a resolved customer, reroll state, reverse an expedition result, or create a Save exploit.

## APP BACKGROUND / FOREGROUND

When the app leaves the foreground:

- persist current state
- suspend/stop BGM and SFX
- do not continue background audio

When the app returns:

- resume audio according to the existing mute/BGM/SFX settings
- do not duplicate BGM or replay one-shot SFX merely because of resume

## HAPTICS

Settings owns one `진동 ON/OFF` control.

- default: ON
- OFF disables all gameplay haptics

Use one short baseline haptic at these meaningful result points only:

- NIGHT outcome = 대성공
- NIGHT saved beat: the sold Item proves it saved the adventurer from 사망 / 중상 (UI_UX §NIGHT — SAVED BY THE SALE); an Insurance save does not vibrate
- NPC outcome = 사망
- FINAL result = clear
- FINAL result = failure

Do not add routine haptics to ordinary buttons, quantity changes, scrolling, ORDER taps, SALE purchases, navigation, or repeated low-value interactions.

Start with one short common intensity. Only tune intensity/duration if real-device QA shows it is clearly too weak or intrusive; do not create a multi-level haptic taxonomy without a new User decision.

## SCREEN / DEVICE INTEGRATION

- portrait-first Android app
- respect notch / cutout / home-indicator Safe Area
- preserve existing mobile touch-target and readability rules from UI_UX
- app wrapping must not change game rules, probabilities, information boundaries or phase order

## QA — RELEASE ACCEPTANCE

Before Closed Test:

1. fresh Android install starts a new game; no v2.x web/development Save is imported
2. close/reopen resumes the local Save
3. airplane/offline mode still boots and saves locally
4. Play Games unavailable/sign-in failure does not block play
5. valid cloud Save restores on a device with no valid local Save
6. a stale cloud Save does not overwrite a newer valid local Save
7. system Back closes the topmost dismissible surface but never rewinds a committed Phase/result
8. backgrounding saves and silences audio; foreground return resumes without duplicate playback
9. haptic toggle persists; the five approved result points fire once; routine controls do not vibrate
10. Safe Area / portrait layout is readable on the real Android test device
