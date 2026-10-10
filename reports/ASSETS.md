# GUILD24 — Presentation Assets

Every third-party asset in the build, with its licence and why it was chosen.
Regenerate the vendored copies with `npm run assets`.

## Adopted

### 발주 후보 교환 아이콘 — 프로젝트 생성 (2026-10-05)

- `dist/ui/assets/presentation/order/reroll.png`: OpenAI 내장 이미지 생성 도구로 제작한 RGBA PNG, 1254×1254, 342,574 bytes.
- 원호의 윗부분에 틈이 있고, 원호와 연결된 삼각형 화살표 머리가 있는 금갈색 아이콘. 배경은 투명하며 글자는 없다.
- 생성 원본을 변환 없이 복사했고 버튼에서는 16px로 표시한다. 원본/프롬프트 기록은 `reports/reroll-icon-generation.md`에 있다.
- 프로젝트 생성 에셋이며 제3자 라이선스를 추정하지 않는다. 기존 시작 시점 preload에 포함했다. User가 최종 화면을 컨펌했다(2026-10-05).

### 프롤로그 장면 그림 — User 제공 원본 (2026-10-04)

- `dist/ui/assets/presentation/prologue/scene{1,2,4}-{phone,wide}.webp`: User가 준 PNG(폰 941×1672, PC 1672×941)를
  크기 그대로 WebP 품질 0.9로 다시 인코딩했다(장당 0.2~0.5MB). 장면 1은 User가 다시 그린 v2를 쓴다.
- 장면 5는 기존 `morning/store-bg-*`와 손님 초상화 F/003을 쓴다. 글자는 모두 라이브 텍스트다.
- User 제공 파일로 기록하며 별도의 제작 도구·제3자 라이선스를 추정하지 않는다.

### 점포지원 PC 세로 배열용 넓은 계약서 — 프로젝트 생성 (2026-10-03 후속)

- `dist/ui/assets/presentation/support/contract-wide-blank.webp`: RGBA 2172×724, 기존 무지 계약서를 참고한
  OpenAI 이미지 생성 에셋. PC 후보를 넓게 쌓을 때 쓰며 모바일에는 기존 승인 종이를 유지한다.
- 이름·효과·가격·무료·행동 라벨은 없으며 모두 라이브 텍스트다. 생성 원본을 변환 없이 복사했다.
  재질은 절제된 크림 종이와 작은 집게이며 외곽은 투명하다. 제3자 라이선스를 추정하지 않는다.
- 해시·원본 일치 기록은 `reports/references/store-support-2026-10-03/contract-assets.json`에 있다.

### 점포지원 계약서·표찰 — 프로젝트 생성 제안 (2026-10-03)

- OpenAI 이미지 생성으로 제작한 글자 없는 RGBA PNG. 별도 제3자 라이선스를 추정하지 않는다.
- `dist/ui/assets/presentation/support/contract-blank.webp`: 1536×1024, 무지 크림 종이와 작은 금속 집게.
- 같은 폴더 `choice-tag-blank.webp`, `return-tag-blank.webp`: 각 2172×724, 무지 금색 종이 표찰과 목재 표찰.
- 생성 원본을 리사이즈·크롭·재인코딩 없이 그대로 복사했다. CSS에서 화면 크기에 맞춰 표시한다.
- 이름·효과·무료/실제 가격·선택/구매·나중에 결정은 모두 런타임 텍스트이며 이미지에 넣지 않는다.
  프롬프트도 모든 글자·숫자·가격·무료 문구를 배제하고 균일한 중앙 글자 영역, 투명 외곽, 절제된 픽셀 재질을 요청했다.
- 점포지원 선택 화면의 구현 제안이며 실제 화면 검증 후에도 최종 시각 컨펌은 별도로 남긴다.

### 점포지원 창고 배경·시각 참고 — User 제공 원본 (2026-10-03)

- 1번 `16833.jpg`는 구성 참고이며 `reports/references/store-support-2026-10-03/selection-reference.jpg`에 보존한다.
  참고 그림의 효과·가격·후보 개수는 게임 규칙이 아니며 현행 RELIC / COPY / 게임 데이터를 따른다.
- 2번 `16831.jpg`: `dist/ui/assets/presentation/support/backroom-phone.jpg`, JPEG 720×1280, 136,917 bytes.
- 3번 `16832.jpg`: `dist/ui/assets/presentation/support/backroom-wide.jpg`, JPEG 1280×720, 169,910 bytes.
- 세 첨부 모두 변환·재압축·리사이즈 없이 바이트 그대로 복사했다. 원본/레포 사본의 SHA-256 일치와 JPEG 디코딩을 확인했다.
  정확한 해시·크기·경로는 `reports/references/store-support-2026-10-03/originals.json`에 기록한다.
- User 제공 파일로 기록하며 별도의 제작 도구·제3자 라이선스를 추정하지 않는다.
  배경은 점포지원 선택 화면에만 적용하며 라이브 UI 텍스트·선택 동작과 분리한다.

### 단골 배지 · NIGHT 편의점 배경 — User 제공 원본 (2026-10-03)

- `dist/ui/assets/presentation/sale/regular-badge.png`: User가 준 `픽셀 아트 단골 금빛 배지.png`(RGBA 1278×1230)의 투명 여백을 잘라 144×167로 줄임.
  SALE 손님 카드 이름판 오른쪽에 쓴다.
- `dist/ui/assets/presentation/night/store-night.webp`: User가 준 `비 내리는 밤의 편의점 풍경.png`(2048×768)를 1536×576으로 줄임. NIGHT 맨 위 배경으로 쓴다.
- User 제공 파일로 기록하며 별도의 제작 도구·제3자 라이선스를 추정하지 않는다.

### Settings wood / steel controls — project-generated, review candidate
- source: generated for this project with OpenAI image generation from the User's settings-menu visual direction
  (2026-10-03). No third-party asset licence is claimed.
- shipped PNG files under `dist/ui/assets/presentation/settings/`: `wood-panel.webp` (1254 × 1254),
  `blue-key.webp` and `red-key.webp` (2172 × 724 each), `supply-backdrop.webp` (1774 × 887). All retain their original
  RGBA pixels and metadata; copied without resizing, cropping or re-encoding.
- role: wood panel is a CSS nine-slice source for Settings, its existing import/reset confirmations and the store
  menu candidate; blank steel keys remain confined to Settings and its confirmations. Labels remain live, selectable UI text. The supply illustration sits behind Settings content
  at reduced opacity with no pointer events. These are not a replacement skin for gameplay phases.
- status: implementation candidate. Generated concept images are not browser evidence; final material / content-fit
  acceptance requires actual mobile capture and User review.

### Store menu destination icons — project-generated, review candidate
- source: seven OpenAI-generated PNGs retained from the interrupted menu-design session (2026-10-03).
  No third-party asset licence is claimed. Original RGBA pixels and metadata are copied without re-encoding.
- shipped at `dist/ui/assets/presentation/menu/`, each 1254 × 1254: `roster.png` (scroll and quill),
  `codex.png` (bound book), `support.png` (supply stall), `decor.png` (banner), `guide.png` (open book),
  `settings.png` (gear), `abandon.png` (signpost).
- role: decorative destination markers on existing menu rows only, displayed at 40px with empty alt text;
  the live row label carries the accessible name. No title icon, new action or detailed-settings icon is added.
- status: implementation candidate; runtime captures and User review determine visual acceptance.

### Wanted Sans 1.0.3 — information UI face
- source: npm `wanted-sans` (https://github.com/wanteddev/wanted-sans), (c) Wanted Lab
- licence: **SIL OFL-1.1** — commercial use YES, embedding YES, modification YES,
  attribution: keep the OFL notice (shipped at `dist/ui/fonts/OFL-WantedSans.txt`).
- why: `design_ssot/UI_UX_v2.8.0.md` routes the current UI/UX truth and inherits the typography baseline that names Wanted Sans as the INFORMATION face, replacing
  Pretendard. Type carries two jobs and they must not be mixed: the atmosphere face takes
  signage, document titles and diegetic readouts; the information face takes every value,
  effect line, price, count and control label, including both primary actions. A system stack
  was rejected: Korean fallbacks differ per platform, so readability could not be guaranteed
  and the QA screenshots would not represent what a player sees.
- how: Regular + SemiBold only - the package ships seven weights and the other five never
  reach dist - subset to the same glyph set by `tools/vendor-assets.py`
  (2.3 MB each -> ~62 KB each). Five faces ship in total.

### Mulmaru 1.1 — atmosphere face
- source: upstream https://github.com/mushsooni/mulmaru, (c) 2025 Mushsooni, Reserved Font
  Name "물마루" / "Mulmaru". Vendored in-repo at `vendor/mulmaru/` with the upstream OFL.
- licence: **SIL OFL-1.1** — commercial use YES, embedding YES, modification YES,
  attribution: keep the OFL notice (shipped at `dist/ui/fonts/OFL.md`).
- acquisition: Mulmaru publishes no npm package and its own repository carries no binaries at
  any ref, so the WOFF2 pair was taken from the `projectnoonnu/2601-4` distribution that
  jsDelivr serves as `@1.1`. That tag and `main` are the same commit (707cc84), and the files
  were verified before use: real WOFF2, family `물마루` / `물마루 Mono`, OFL-1.1 in the name
  table, 11,940 glyphs each. The CDN is an ACQUISITION SOURCE ONLY — the game fetches nothing
  at runtime, which `tests/assets.cjs` asserts against the CSS.
- faces: Mulmaru and Mulmaru Mono only, the two the CSS actually asks for. Mulmaru ships a
  single weight by design, so the @font-face is declared `font-weight:100 900` and a rule
  asking for 700 gets the real face instead of a synthesised bold.
- how: subset to this build's glyph set by `tools/vendor-assets.py` (97 KB -> 11 KB and
  95 KB -> 10 KB).

### anime.js 4.5.0 — animation runtime
- source: npm `animejs` (https://animejs.com), (c) Julian Garnier
- licence: **MIT** (SPDX: MIT) — commercial use YES, modification YES, attribution: keep the notice
  (shipped at `dist/ui/vendor/anime.LICENSE.md`).
- why: game feel. Shutter lift, stamp impact, price-tag swing, coin count-up and the Night
  result beat are timing problems, not CSS problems.
- how: the UMD build is vendored to `dist/ui/vendor/`. Presentation only: no system under
  `dist/systems/` or `dist/data/` references it, and the UI checks `typeof anime` so the
  game runs correctly if it is absent. Asserted by `tests/assets.cjs`.

### uisfx 0.4.0 `mechanical` theme — material Decision SFX
- source: npm `uisfx` (https://www.npmjs.com/package/uisfx), (c) 2026 Yuki Capital.
  The package code is MIT; **the audio under `sounds/` is separately dedicated to the public
  domain**, which the package states in its own `LICENSE-AUDIO`.
- licence: **CC0-1.0** (SPDX: CC0-1.0) — commercial use YES, modification YES, redistribution
  YES, attribution appreciated but **not required**. The upstream dedication ships beside the
  files it releases at `dist/ui/assets/audio/LICENSE-CC0.txt`.
- modification status: **none**. The shipped bytes are the upstream bytes; only the filename
  changes, from the vendor's UI vocabulary to the cue's role in this game. No re-encode, no
  trim, no level change — gain and layering happen live in `dist/ui/audio.js`.
- why: `design_ssot/UI_UX_v2.8.0.md` §AUDIO VOICE asks the material cues for mechanical /
  paper / register / fixture sound, with short, dry, readable transients and no sci-fi or
  arcade character. An oscillator can imply that material; it cannot be it. The `mechanical`
  theme is the one in the package that matches the voice: measured in a browser, every adopted
  file is 87–298 ms long and falls 20 dB within 10–70 ms of its peak.
- scope: the **tonal** families stay synthesised — NIGHT outcomes, the Boss motif and the phase
  beds have to stay in tune with each other, and a sample set cannot be transposed into a
  family. Only the object-sounds below ship; the package carries 1872 files and the rest
  never reach `dist`.
- how: `tools/vendor-assets.py` copies them into `dist/ui/assets/audio/` (36 KB total, mp3 —
  the one container every current mobile browser decodes). Regenerate with `npm run assets`.
  Nothing is fetched from a host at runtime; the loader reads this build's own files, and every
  sampled cue keeps a synthesised fallback so a failed load is thinner, never silent.

| shipped | upstream | cue |
| --- | --- | --- |
| `stamp.mp3` | `mechanical/press` | ORDER confirmation, under the synthesised paper layer |
| `register.mp3` | `mechanical/purchase` | SALE commit — shared by every price mode |
| `refuse.mp3` | `mechanical/cancel` | SALE refusal |
| `secure.mp3` | `mechanical/lock` | Store Support acquisition |
| `cart.mp3` | `mechanical/add-to-cart` | ordinary Decoration purchase |
| `unlock.mp3` | `mechanical/unlock` | 본사 해금 |
| `shutter.mp3` | `mechanical/open` | MORNING opening |
| `gate.mp3` | `mechanical/blocked` | FINAL commit |
| `key.mp3` | `mechanical/select` | ordinary pick |
| `door.mp3` | `mechanical/send` | SALE 손님 보내기 — the customer leaves (v2.9.0 TRANSACTION BEAT A4) |
| `crate.mp3` | `mechanical/drop` | ORDER 2nd / 3rd crate landing (User 2026-10-09) |
| `newstore.mp3` | `mechanical/checkpoint` | ending -> next store (User 2026-10-09) |
| `return.mp3` | `mechanical/success` | NIGHT 성공 (User 2026-10-09) |
| `severe.mp3` | `cinematic/error` | NIGHT 중상 (User 2026-10-09) |
| `settle.mp3` | `organic/start` | CLOSING 다음 날 (User 2026-10-09) |

User 2026-10-09: the last five rows were chosen by ear from a side-by-side page of the current synthesised cue against uisfx candidates; each shape in `dist/ui/audio.js` keeps `solo` (the file alone plays) and its synthesised notes as the fallback. `대성공` stays synthesised (the candidate sounded too much like 살았다 3단계, User 2026-10-09). `퇴각` and `부상` stay synthesised, with the two shapes swapped so 부상 is the longer one (User 2026-10-09). `사망`, `rescue`, `saved*`, `shove`, `heal` and the Boss / ending cues stay synthesised. `severe.mp3` is from the `cinematic` theme and `settle.mp3` from the `organic` theme (same CC0 dedication).

- `page.mp3` — page turn of the prologue's scene changes (User 2026-10-04). Kenney "RPG Audio" `bookFlip2.ogg`, CC0 1.0
  (https://kenney.nl/assets/rpg-audio), re-encoded mono mp3 64 kb/s (~7 KB). Added by hand, not by `npm run assets`.
- Retired (User 2026-09-29, v2.9.11 quick patch): `tick.mp3` (ORDER quantity) and `soft.mp3` (utility navigation) were
  masked by the phase music even at their tier's loudest; both cues are now synthesised in `dist/ui/audio.js` and the files
  no longer ship.

### Phase BGM — user-provided, project-generated (v3.0, recorded 2026-09-29)
- source originals (kept untouched, never written to): `assets-src/bgm/*.mp3` — generated by the User with the Gemini app
  (Lyria) for this project and received on 2026-09-29 (commits `ae1be27`, `36826e2`). All are 44.1 kHz stereo MP3 at 192 kb/s.
  The User generated them with both a free account and a Google AI Plus subscription; the account per track is in the
  table below (User 2026-09-29). BOSS2's account is not recorded: the User does not recall it, and it does not ship.
- rights (User decision 2026-09-29): tracks from the free account may be used too. No third-party licence is claimed.
  Terms of use:
  - keep this provenance record
  - never strip or defeat the SynthID watermark
  - no track may closely imitate an existing song
  - never present the music as human-composed
  Being AI-generated, the tracks carry weak copyright protection and no infringement warranty.
- shipped runtime files (web build): `dist/ui/assets/bgm/*.mp3` (9 files, 22 MB), made by `tools/vendor-assets.py` `bgm()`.
  - Modification status (User 2026-09-29): **re-encoded** to MP3 128 kb/s CBR, 44.1 kHz stereo, with no tags; not trimmed.
    The decoded audio is sample-aligned with the original (0-sample shift, same length, measured in ffmpeg and Chromium),
    so the loop points measured on the originals by `tools/bgm-loop.py` (`reports/bgm-loops.md`) hold.
  - The originals carry a **C2PA manifest** (Content Credentials) that marks them as AI-generated. It is bound to the
    original bytes, so the web copies do not carry it. The AI disclosure for the web build rides the game's credits and
    the store text (User 2026-09-29) - a requirement of the credits work.
  - The app build ships the originals from `assets-src/bgm/`, C2PA included (User 2026-09-29). Re-measure the loudness
    trim there: the originals read about 0.4 dB louder than the web copies.
  - The loop is played from the decoded buffer (`dist/ui/audio.js`): loop points, fades and the per-track loudness trim
    (measured on the web copies) live there.
- not adopted: `BOSS2_beneath_the_heavy_arch.mp3`. Its mood fit, but no loop join sounded natural (User 2026-09-29), so
  it stays in `assets-src/bgm/` and never reaches dist.
- commercial release: the same AI-content disclosure as the portraits applies (Steam Content Survey, pre-generated audio).

| shipped | source | phase | account |
| --- | --- | --- | --- |
| `title.mp3` | `TITLE_beneath_the_root` | no Run · 첫 점포지원 · the store about to open | free |
| `morning.mp3` | `MORNING_the_sunken_courtyard` | MORNING | Google AI Plus |
| `order.mp3` | `ORDER_before_the_next_turn` | ORDER | Google AI Plus |
| `sale.mp3` | `SALE_copper_key` | SALE | Google AI Plus |
| `night.mp3` | `NIGHT_valley_of_sunken_bells` | NIGHT | free |
| `close.mp3` | `CLOSE_the_stone_path` | CLOSING | free |
| `boss.mp3` | `BOSS_beneath_the_stone_floor` | FINAL | free |
| `succ.mp3` | `SUCC_step_into_the_canopy` | the ending of a cleared Run | Google AI Plus |
| `fail.mp3` | `FAIL_late_shift_at_the_dungeon_gate` | the ending of any failed Run | Google AI Plus |

## Evaluated and rejected

| Candidate | Verdict |
|---|---|
| OpenGameArt / Kenney / itch.io pixel packs | Unreachable — blocked by this environment's egress proxy. npm carries no commercial-safe pixel store-interior pack (searches for pixel art ui / game ui kit / rpg ui / sprite pack returned chat kits, avatar generators and dice rollers). |
| jsDelivr / unpkg / esm.sh runtime CDN | Unreachable from this environment; and for the font a local subset is strictly better (smaller, no FOUT, offline). |
| `nes.css` (MIT), `rpgui` (Zlib) | Game-flavoured but container-first component frameworks. They impose an NES / RPG-Maker chrome and would fight the store-material language rather than serve it. |
| `@iconify-json/game-icons` (CC BY 3.0), `rpg-awesome` | Smooth vector fantasy icons. They read as vector art sitting on bitmap type, and the nine Hazard pictograms they would cover are already drawn on-grid in `dist/ui/scene.js`. |

## Authored in-project

`dist/ui/art.js` (avatars, item pictograms, gate marks, UI glyphs) and `dist/ui/scene.js`
(store ceiling, shelving wall, counter, corporate seal, stock crate, price tag, nine Hazard
pictograms). Originally authored for this project on its 4px grid, so no third-party
licence applies and the style stays coherent with the existing art.

## NPC customer stickers — `dist/ui/assets/npc/npc-01..05.png`

Supplied by the project as examples of the production NPC asset format, not as finished
cards: a character plus their own lifestyle vignette on a transparent surround, roughly
square (377×358 / 361×365 / 364×367 / 368×362 / 362×370), with 3–10px of transparent
margin and, in one case, content touching the frame edge.

The Sale screen treats them as an immutable payload:
- contained at their own aspect ratio inside one square customer slot — never cropped,
  stretched, letterboxed to a fixed pixel box, or recoloured;
- the transparent surround is preserved, so the silhouette stays organic;
- nothing is baked into the artwork — rarity, name, level, job and the reveal are
  separate DOM layers over the same `<img>`.

Production art replaces these by editing `Scene.npcPool`, or per NPC by registering
`Scene.manifest['npc.<npcId>']`. No screen, layout or per-NPC rule changes.

## Not shipped — review references

These files are review inputs for Presentation work. They are not part of the build,
are never requested at runtime, and no pixel of them is reused in the UI.

### v2.8 current-vs-target quality pair
- files: `reports/reference/quality-pair-current.jpg`, `reports/reference/quality-pair-target.png`
- source: provided by the User on 2026-09-22 for the v2.8 Presentation Upgrade
- why: `PRESENTATION_SYSTEM_v2.8.0.md` §VISUAL HARNESS CONTRACT lists the User-provided
  current-vs-target pair as a review input and forbids reconstructing it from memory once it
  is out of context. It is stored so later Batches review against the same pair.
- how used: construction method first - frame build, edge grammar, control solidity, material
  finish. Motifs are not copied by default; any motif reuse is judged by Phase/object fit and
  runtime visual improvement under the Presentation Asset / Visual Delta gates.

### Title logo — user-provided, project-generated (v2.12.x)
- shipped file: `dist/ui/assets/presentation/start/title-logo.png` — 640x382, PNG RGBA, 231 KB
- source: provided by the User on 2026-10-10 (the title changed to `마왕 잡는 편의점: 길드24`), generated with GPT image
  generation for this project (2172x724, PNG RGBA, two lines, no subtitle, md5 `00a4d9cd35681dfc5712cfb754394486`). Not a third-party work: no external
  licence is claimed and none applies. The User's other cuts (one line, and with a GUILD24 subtitle) are kept outside the
  build, the 점 받침 corrected the same way.
- modification (User, 2026-10-10): the 점 받침 read as ㅡ / ㅇ at the phone size. Its walls were thinned (rows and
  columns taken from the wall interiors) and the counter's middle row and column repeated, so the counter grew from 82x26 to
  125x63 px of the original. No other glyph was touched. The corrected image was trimmed to its drawn letters (alpha
  above 60, 4 px margin) and resized to 640 px wide (Lanczos) for display.
- role: the opening screen's title (UI_UX §OPENING TITLE LOGO), in place of the set-type title.

## Batch 1 presentation graphics

No third-party asset is used. The inline graphic is a bespoke 13x9 pixel pip drawn in
`dist/ui/ui.css` as a data URI, on the Opening's supporting rule. One further attempt - a
re-cut bevel on the Opening's Primary - was made and removed: the runtime capture was
flatter than the shared Action geometry it replaced.

### MORNING production art — user-provided, project-generated
- shipped files:
  - `dist/ui/assets/presentation/morning/store-bg-wide.webp` — 1672x941, PNG RGB, no alpha, 1.28 MB
  - `dist/ui/assets/presentation/morning/store-bg-phone.webp` — 941x1672, PNG RGB, no alpha, 1.18 MB
- evaluated and removed from the build:
  - `board-frame-panel.png` — 1774x887, PNG RGBA, 419 KB
  - `board-frame-plank.png` — 1774x887, PNG RGBA, 470 KB
- source: provided by the User on 2026-09-22, generated with GPT image generation for this
  project. Not a third-party work: no external licence is claimed and none applies.
- modification: none. Stored byte-identical to the files as received (md5 verified against
  the originals). Any later derivative is recorded separately when it is made.
- role: the two `store-bg-*` files are the MORNING store environment - stage only, no baked
  text, controls, board content or day information. They are not two places: they are the same
  store, authored twice, once framed for a wide viewport and once for a portrait one. The
  phone file was supplied as its own resize, not as a crop of the wide one, and is used as
  such. The two `board-frame-*.png` were candidate notice-board frames, drawn frame with a
  fully transparent content region.
- measured authored zones, as a share of each file's own height:
  - wide: ceiling 0-19%, wall / shelves / window 19-78%, counter top 82.7-85.2%,
    counter face 85.2-100%
  - phone: ceiling 0-18.6%, wall / shelves / window 18.6-74%, counter top 74.2-76.0%,
    counter face 76-90.7%, floor 90.7-100%
  These are what the live layer is seated against, per breakpoint.
- adopted: both `store-bg-*` files, as the MORNING room, in `dist/ui/director-review.css`.
  SALE also reuses the portrait/wide room in `dist/ui/ui.css` (User 2026-10-03): the previous generated shelf-strip SVG is
  hidden there; opaque information planes retain contrast. Asset bytes are untouched. Final visual approval is pending.
  PHONE takes the portrait file and DESKTOP the wide one at the sheet's existing 1024
  breakpoint. The room is owned by the MORNING stage, so it runs behind the Action dock as
  well, and `cover` crops horizontally only at every shipped width - no authored zone is lost
  vertically, which is also what makes the asset's own counter top a reliable seating plane
  for the live till. `store-bg-wide.webp` is reused by OPENING as the closed, unlit store the
  preparation sheet stands in. Neither file is altered in any use; the wide file was renamed
  from `store-bg.png`, bytes untouched.
  An earlier integration cropped it into the wall band to preserve the procedural ceiling.
  That was rejected on runtime review: discarding the art's own ceiling left old ceiling plus
  a pasted middle strip, which is not one room.
- evaluated and REJECTED, both frames, on runtime capture:
  - `board-frame-plank.png` was integrated with `border-image` 9-slice. Technically correct -
    corners unstretched, rails repeating - and still a downgrade: a frame sized to carry its
    corner brackets opens an interior the live notice does not fill, so a quiet day read as a
    small notice inside a large decorative shell. The board's own CSS construction is tighter.
  - `board-frame-panel.png` was captured in the same role first and read flatter and more
    generic against the store's wooden fixtures.
  - reason, both: dynamic content fit - excess interior dead space around live notice content.
  - Neither is referenced, so neither ships: the files are removed from `dist/` rather than
    left in the build as dead weight. They remain recoverable from this repository's history
    (commit `8f5af05`) if a concrete content-fit hypothesis is ever proposed.
- note for review: measured, these read as high-resolution painted art in a pixel idiom rather
  than true pixel art - 159k unique colours in the backdrop, 10-18k in the frames, and 1px
  run lengths where GUILD24's own art uses flat blocks. That is a runtime-crispness and
  house-consistency question, answered by capture, not by the numbers.

### D30 FINAL Boss domain backdrops — user-provided, project-generated
- source originals (kept untouched; added `e4039db`, moved one folder down in the next commit so the
  Boss-form folder stays exactly the reachable forms):
  `GUILD24_NPC_PRODUCTION/04_BOSS/BACKDROP/B00N_<BOSS>_BACKDROP.png` x7 — 1672x941, PNG RGB, no alpha,
  C2PA manifest (OpenAI Media Service API) intact. Supplied by the User on 2026-09-23, generated
  with GPT image generation for this project; no third-party licence is claimed and none applies.
- shipped runtime files: `dist/ui/assets/presentation/final/B00N_<BOSS>_BACKDROP.png` x7 —
  byte-identical copies of the originals (same SHA-256), not a derivative: no resize, crop,
  re-encode, optimisation or metadata change. The PNGs are used as-is.
- mapping (User-approved): B001 WRATH, B002 PRIDE, B003 ENVY, B004 GREED, B005 GLUTTONY,
  B006 LUST, B007 SLOTH.
- role: the Boss's own domain / wall, used ONLY behind the D30 FINAL stage (`.p-final[data-boss]`
  in `dist/ui/ui.css`). Never in the D0-D25 reports, the Codex, Boss cards or any store phase.
  Displayed with one axis fixed and the other auto, so the 1672:941 ratio is never stretched:
  a phone fits the room's height to the gate band and crops the sides (centre kept), a desk
  shows the full width and lets the room fade into the Final's dark ground under the gate.

### NPC / Boss portraits — user-provided, project-generated (recorded 2026-09-28)
- source originals (kept untouched, never written to): `GUILD24_NPC_PRODUCTION/01_NORMAL_ORIGINAL` (218 originals) sorted
  into `02_NORMAL_WORK/{M,F}` (200 Normal), `03_EASTER` (3 Rare Reference: E001~E003, removed in v2.9.11) and `04_BOSS` (16 Boss forms).
  All generated by the User with GPT image generation for this project (User 2026-09-28); no third-party licence is
  claimed and none applies. OpenAI's terms assign the output to the user and allow commercial use; the output carries no
  infringement warranty and, being AI-generated, weak copyright protection.
- shipped runtime files: `dist/ui/assets/npc/{normal,easter,boss}/*.webp` (200 / 3 / 16) — derived copies made by
  `tools/vendor-assets.py` `portraits()` (WebP q90 with alpha, capped at the largest size the UI paints at 2x).
- commercial release: an AI-content disclosure applies on Steam (Content Survey, pre-generated art). The three Rare
  Reference portraits evoke real people and are to be removed before a commercial release (User 2026-09-28;
  `reports/v3.0-prep.md` §6-1).
