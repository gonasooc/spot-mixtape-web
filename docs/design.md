# UI 디자인 기준

UI의 시각적 기준과 상호작용·반응형·접근성 기준을 다룹니다. 시스템 구조는 [docs/architecture.md](architecture.md), 기술 스택·검증 명령은 [docs/specs.md](specs.md)에서 관리합니다. 브랜드 톤과 안티레퍼런스는 [PRODUCT.md](../PRODUCT.md)가 원본입니다.

## 목적

랜딩은 앱이 무엇인지 한 화면에서 전달하고 출시 소식 구독으로 이어줍니다. 법률 문서는 스토어 심사관과 이용자가 장식 없이 빠르게 읽는 문서입니다. 두 표면의 성격이 다르므로 껍데기(헤더·푸터)만 공유하고 본문 배경을 나눕니다.

장식을 덜어내고 구조로 읽히게 합니다. 토큰 계약 하나, 여백이 만드는 섹션 리듬, 분리선 대신 표면 차이, 밑줄 없는 solid 액션, 납작한 헤더와 푸터가 그 방법입니다. 그 위에서 **앱의 결**을 따릅니다 — 앱이 쓰는 깊이(화면 그라데이션, 카드 그림자, 커버 스크림)와 굵기(볼드 제목), 앱의 밀도(한 장에 사실이 모여 있는 세로형 카드, 카드 스택), 앱 Outfit의 기하학적 성격에 가까운 한국어 서체, 앱 화면에 가까운 64/96px 리듬. `PRODUCT.md`가 말하는 "촉각적"은 이것들이 냅니다. 색은 digital vinyl과 앱 토큰 그대로입니다. 사이트가 앱보다 앞에 나서지 않습니다.

## 참고할 코드와 화면

| 원본 | 역할 |
| --- | --- |
| [src/styles.css](../src/styles.css) | `@theme` 토큰 계약, base 레이어, 그레인, 히어로 등장 애니메이션 |
| [src/components/ui.tsx](../src/components/ui.tsx) | 액션(`ButtonLink`·`ButtonAnchor`), `SectionLabel`, `Section` 거터와 세로 리듬 |
| [src/components/Layout.tsx](../src/components/Layout.tsx) | 헤더·푸터·건너뛰기 링크 |
| [src/components/PolicyLayout.tsx](../src/components/PolicyLayout.tsx) | 법률 문서 레이아웃과 섹션·목록·노트·표·연락처 |
| [src/components/Reveal.tsx](../src/components/Reveal.tsx) | 스크롤 등장. 숨김 상태를 만드는 유일한 곳 |
| [src/components/BrandMark.tsx](../src/components/BrandMark.tsx) | 레코드 마크. 앱 로그인 화면의 마크 치수를 그대로 쓴다 |
| [src/components/Waveform.tsx](../src/components/Waveform.tsx) | 파형 막대. 앱 `WaveformDisplay`와 같은 치수·색 |
| [public/favicon.svg](../public/favicon.svg), `public/apple-touch-icon.png`, `public/favicon.png` | 아이콘. SVG는 앱 `icon.png`의 측정 비율, PNG 둘은 앱 원본의 리사이즈·복사 |
| [scripts/check-tokens.mjs](../scripts/check-tokens.mjs) | 토큰 이름이 두 네임스페이스에 겹치는지 빌드 전에 검사 |

브랜드 요소의 원본은 앱 저장소 `spot-mixtape`입니다: 팔레트 `src/constants/Colors.ts`, 서체 스케일 `src/constants/Typography.ts`, 마크 `app/(auth)/login.tsx`의 `recordMark`/`recordRing`/`recordCore`, 아이콘 `assets/images/icon.png`, 파형 `src/components/audio/WaveformDisplay.tsx`, 카드 `src/components/cards/SoundCard.tsx`와 사진 없는 커버 `SoundOnlyPlaceholder.tsx`, 카드 스택 `WalletCardStack.tsx`, 믹스테이프 커버 `MixtapeCardCover.tsx`.

2026-10-04 결 통일([docs/work/W-005-main-app-feel.md](work/W-005-main-app-feel.md)) 뒤 재측정: 네 폭 가로 넘침 0건, 한글 Gothic A1 700 로드, 랜딩이 받는 글꼴 33요청·415KB(Gothic A1 31조각 343KB; Pretendard 때 13조각 405KB), 개인정보처리방침 30요청·381KB. woff 폴백은 0건 요청.

### 측정 기록

헤드리스 Chrome(CDP)으로 측정한 값입니다. 실제 기기·실제 스크린리더 검증과 구분합니다.

- 320 / 390 / 768 / 1280px에서 4개 페이지 모두 가로 넘침 0건
- 렌더된 글자 중 굵기 500 초과 0건 — 당시 기준. 2026-10-04 이후 제목은 700이 기준이라 더 이상 통과 조건이 아니다
- 본문·라벨의 색 대비가 모두 WCAG AA(작은 글자 4.5:1) 이상. 잔글씨 `#767c70`이 표면 위에서 4.09:1이라 `#838a7e`로 올렸다
- 프리렌더된 HTML에 `data-reveal`이 없고 본문 전체가 들어 있다 — JavaScript 없이 읽힌다
- `prefers-reduced-motion: reduce`에서 숨겨진 요소 0건, 파형 반복 애니메이션도 정지
- 외부 네트워크 요청 0건. 랜딩 18요청·516KB, 개인정보처리방침 20요청·573KB(캐시 없는 첫 방문)

측정하지 않은 것: 실제 브라우저 수동 조작, VoiceOver·TalkBack, 실기기 스크롤, Lighthouse, 인쇄 출력.

2026-10-04 브랜드 통일([docs/work/W-004-main-app-brand-alignment.md](work/W-004-main-app-brand-alignment.md)) 뒤 재측정: 320·390·768·1440px에서 랜딩·404 가로 넘침 0건(320px 문의 이메일 버튼 넘침 5px을 함께 고침), 헤더 마크 24px·히어로 마크 72/88px, 워드마크 Outfit 700, 파형 40개·3px·모서리 2px, 카드 모서리 22px·1px 테두리 — 모두 computed style로 확인.

## 관찰된 구현

### 토큰 계약

기준 파일은 [src/styles.css](../src/styles.css)의 `@theme` 하나입니다. 컴포넌트에 색·크기 임의값을 쓰지 않습니다. 어두운 껍데기의 값은 앱 `Colors.dark`에서 왔고, 각 토큰 옆 주석에 앱 쪽 이름이 적혀 있습니다.

| 역할 | 토큰 | 값 | 앱 이름 |
| --- | --- | --- | --- |
| 캔버스 | `canvas` / `canvas-raised` / `canvas-deep` | `#0b0d0a` / `#10130f` / `#070806` | background / backgroundRaised / backgroundDeep |
| 표면 | `surface` | `#171a15` | surface |
| 조용한 컨트롤 면 | `chip` / `chip-hover` | `#1e221b` / `#252a21` | surfaceElevated / surfacePressed |
| 실선 | `line` / `line-strong` | `#343a30` / `#4a5243` | border / borderStrong |
| 글자 | `ink` / `muted` | `#f3f5ec` / `#aab0a2` | text / textDim |
| 잔글씨 | `faint` | `#838a7e` | — (textMuted `#777d72`는 surface 위 4.15:1로 AA 미달이라 올린 값) |
| 비텍스트 회색 | `dim` | `#7a8174` | dim — 재생 전 파형 막대에만 |
| 액센트 | `acid` / `acid-bright` | `#c9f55d` / `#d7ff75` | primary / primaryStrong |
| 둘째 색 | `violet` | `#9e83cf` | secondary — 앱에서 믹스테이프 커버 틴트에만 쓰이고 여기서도 그렇다 |
| 상태 | `info` | `#82b8f6` | info — 출시 안내 칩. 다른 의미색은 쓰이는 자리가 없어 토큰에 두지 않았다 |

법률 문서는 페이퍼 `#f3f5ec` 위에 제목 `#14170e`, 본문 `#383e30`, 메타 `#5c6352`를 씁니다. 액센트는 페이퍼에서 보이지 않으므로 `--color-paper-accent` `#45560b`를 따로 둡니다. 앱의 `Colors.light`는 정의만 있고 사용처가 없어 페이퍼 팔레트는 앱과 맞추지 않았습니다.

정렬선 1160px, 히어로 카피 780px, 법률 문서 736px, 제목 옆 본문 560px. 모서리는 앱에서 가장 많이 쓰는 세 값입니다: 컨트롤 8px, 액션 14px, 카드 안 우물 16px, 카드 22px(앱 `SoundCard`). `--aspect-phone`(1:2)은 스토어 스크린샷에서 잘라낸 폰 프레임 상자의 비율입니다.

### 깊이

앱은 모든 화면을 `AppGradients.screen`(backgroundRaised → background → backgroundDeep, 위에서 아래로)으로 칠하고 사운드 카드에 그림자를 둡니다. 랜딩은 페이지를 하나의 화면으로 보고 같은 세 단계를 `html` 배경에 전체 높이로 폅니다 — 0% raised, 25–75% canvas, 100% deep. 퍼센트 스톱이라 페이지 길이와 무관하게 이음새가 없고, iOS Safari가 무시하는 `background-attachment: fixed`를 쓰지 않습니다. `body`는 투명합니다.

카드 그림자는 `--shadow-card` 하나입니다: `0 8px 20px rgb(7 8 6 / 0.24)`, 앱 `SoundCard`의 shadowOffset 8 · shadowRadius 20 · shadowOpacity 0.24 · shadowColor backgroundDeep을 그대로 옮긴 값입니다. 히어로 카드와 핵심 루프 카드 셋에 1px `line` 테두리와 함께 씁니다. 그 밖의 그림자는 없습니다.

앱이 쓰는 그라데이션은 셋이고 모두 여기 있습니다: 화면 그라데이션(위), 카드 커버가 카드 본문으로 잦아드는 스크림(앱 `SoundCard` 커버 하단의 어두운 스크림에 해당, 여기서는 surface로), 믹스테이프 커버 틴트(violet → surface → deep, 대각선).

### 브랜드 마크와 아이콘

마크는 바이닐 레코드입니다 — 조용한 컨트롤 면의 디스크, 1px `line-strong` 바깥 테두리와 그루브 링, 중앙의 애시드 라벨. 치수는 앱 로그인 화면의 88px 마크(디스크 88, 링 58, 코어 18)를 그대로 쓰고, 테두리는 `vector-effect: non-scaling-stroke`로 어느 크기에서도 1px입니다. 앱이 `borderWidth: 1`로 그리는 방식과 같고, 비례 축소하면 24px 헤더에서 선이 사라지기 때문입니다.

헤더에는 24px 마크 + 워드마크, 히어로에는 앱 로그인 화면의 락업(마크 72/88px → 모노 대문자 태그라인 "Sound Archive for Places" → 제목)을 둡니다. 파비콘 SVG는 앱 `icon.png`의 측정 비율(디스크 0.71, 그루브 0.64, 라벨 0.20)을 `#0b0d0a` 바탕에 그린 것이고, `apple-touch-icon.png`(180px)와 `favicon.png`(48px)는 앱 원본을 그대로 씁니다.

### 타이포그래피

한국어 본문과 제목은 Gothic A1(HanYang I&C, OFL), 라틴 워드마크는 Outfit, 숫자와 라틴 메타 라벨은 JetBrains Mono입니다. 셋 다 self-host라 외부 요청이 0건입니다. Gothic A1은 2026-10-04에 Pretendard를 대체했습니다 — 앱의 온기는 Outfit의 기하학적·둥근 꼴에서 오는데 Pretendard의 중립 그로테스크는 그 결이 아니었습니다. Gothic A1은 둥근 ㅇ과 열린 속공간의 기하학적 고딕이고, 400/500/700이 있으며, Google Fonts 방식으로 unicode-range 99조각이라 Pretendard dynamic subset과 같은 비용 구조입니다. 교체는 `--font-sans` 한 줄입니다.

크기 토큰은 t-shirt 사이즈가 아니라 **역할 이름**입니다. 컴포넌트가 의미 없는 단계를 고를 수 없게 하기 위해서입니다.

| 토큰 | 크기 | 행간 |
| --- | --- | --- |
| `caption` · `meta` · `label` | 12 · 13 · 14 | 1.6 · 1.65 · 1.7 |
| `control` · `body` · `lead` | 15 · 17 · 18 | 1.5 · 1.75 · 1.75 |
| `subtitle` · `title` | 20 · 24 | 1.45 · 1.35 |
| `section` · `section-lg` · `display` | 30 · 36 · 44 | 1.25 · 1.22 · 1.18 |
| `hero` | `clamp(32px, 8vw, 60px)` | 1.16 |

히어로만 fluid입니다. 긴 한국어 한 줄이라 60px 고정은 320px 화면에서 넘치고, 브레이크포인트 단계는 문장 중간에서 튑니다. 하한 32px은 Gothic A1 Bold로 "다시 꺼내 듣습니다."가 320px에서 한 줄에 들어가는 값입니다.

굵기는 세 단계입니다. 제목(h1–h6)·`strong`·`th`·`dt`·워드마크는 700, 액션과 `SectionLabel`은 500, 본문과 라벨은 400. 앱이 제목을 전부 Outfit-Bold로 그리는 것(`Typography.screenTitle`·`sectionTitle`·`brand`)을 따른 값으로, 2026-10-04 이전의 500 상한을 대체합니다. 제목 자간은 앱 비율대로 −0.02em, h1은 −0.025em(앱 로그인 제목 −0.8px/34px)입니다.

mono에 대문자와 0.12em 자간(앱 eyebrow의 12px 기준 1.4px)을 얹는 `eyebrow`는 라틴과 숫자에만 씁니다. 한글을 그렇게 조판하면 다른 글꼴로 대체되면서 늘어져 보입니다. 한글 소제목 라벨은 `SectionLabel`이 sans 13px으로 그립니다.

### 구조와 리듬

- 섹션 사이는 데스크톱 96px, 모바일 64px입니다(`Section`의 `py-16 sm:py-24`). 개편이 올렸던 144/88은 앱과 다른 제품처럼 읽혀 2026-10-04에 되돌렸습니다. 섹션을 가르는 것은 이 여백과 표면 차이(canvas ↔ surface)이며 가로선을 긋지 않습니다. 표 테두리처럼 구조를 설명하는 선만 남깁니다.
- 히어로는 `lg` 이상에서 카피 좌·카드 스택 우의 2단(1.1fr / 0.9fr)이고 전 폭에서 좌측 정렬입니다. 데스크톱에서는 헤더를 뺀 한 화면 높이를 최소로 잡고 세로 가운데에 둡니다. 락업은 앱 로그인 화면 순서(레코드 마크 → 모노 태그라인 → 제목)입니다. 중앙 정렬 포스터형은 2026-10-04에 폐기했습니다.
- 헤더는 60px(모바일 52px), 워드마크와 고스트 내비만 둡니다. 활성 항목은 밑줄 막대가 아니라 컨트롤 면으로 표시합니다. 한글 메뉴 이름이 320px 헤더보다 길어 내비만 가로 스크롤합니다.
- 푸터는 한 줄입니다. 앱 이름, 두 문서 링크, 운영자와 시행일까지. 테두리 없이 위쪽 여백으로 분리합니다.
- 법률 문서는 한 열(736px)에 제목·시행일·목차·본문만 놓습니다. 히어로도 등장 모션도 없습니다.

### 액션과 링크

액션은 모두 밑줄 없는 solid 면입니다. 높이 52px(작은 변형 44px), 모서리 14px, 글자 15px에 굵기 500. 누를 때 1px 내려앉는 것 말고 hover에서 떠오르지 않습니다.

톤은 둘뿐입니다. `primary`는 애시드 면에 캔버스 글자, `secondary`는 컨트롤 면에 밝은 글자와 1px `line-strong` 테두리(앱의 보조 버튼과 같은 구성). 페이퍼 위에는 잉크 면과 페이퍼 글자를 씁니다. 밑줄은 문장 안에 섞인 링크에만 남깁니다.

### 파형과 사운드 카드

파형은 앱 `WaveformDisplay`대로 40개 막대, 너비 3px, 모서리 2px, 양 끝까지 균등 배치, 재생된 막대는 애시드, 나머지는 `dim`입니다. 높이는 스트립 안 13–87%(앱의 8–52px)입니다.

히어로 카드 스택의 앞장은 앱의 **사운드 카드 상세 화면 그 자체**(스토어 스크린샷 `03-card-detail`에서 잘라낸 폰 프레임, 1:2)이고, 뒤에는 앱 `WalletCardStack` 규칙으로 두 장이 더 있습니다: 한 장당 24px 아래, 5% 작게, 15% 연하게. 맨 뒤는 `MixtapeCardCover`의 violet 틴트입니다. 스케일 때문에 보이는 띠는 12–15px뿐이라 violet은 암시 수준입니다 — 앱 기하를 그대로 둔 결과입니다.

핵심 루프의 카드 셋은 앱 `SoundCard`가 사진으로 카드를 덮듯 **앱 화면을 커버로** 씁니다. 커버는 정사각형이고 화면의 윗부분(`object-position: top`)을 보여 주며 아랫단 1/3이 카드 표면으로 잦아듭니다. 기록 ← `01-capture`, 공유 ← `06-export-preview`. 보관은 `02-library`와 `04-mixtape` 둘을 `MixtapeCardCover`의 분할 레이아웃처럼 반씩 나눠 보여 주는데, 정사각형의 반은 1:2라 폰 한 대가 통째로 들어갑니다. 카드 레시피(22px, 1px `line`, 그림자)는 같습니다.

스크린샷은 정본(앱 저장소 `store/android/screenshots`, 1080×1920 스토어 창작물)에서 영어 헤드라인을 뺀 폰 프레임만 740×1480 상자로 잘라 720×1440 WebP로 둡니다. 앱 UI는 영어이므로 둘레의 한국어 본문과 `alt`가 화면을 설명합니다. 지도 장면은 녹음 장소가 드러나 스토어 세트에 없고 여기에도 없습니다. 자르는 상자와 갱신 명령은 [README.md](../README.md)의 "앱 스크린샷"에 있습니다.

### 모션

히어로는 CSS 애니메이션으로 60ms 간격, 620ms 동안 12px 아래에서 올라옵니다. JavaScript가 없어도 그대로 보입니다.

그 아래는 [src/components/Reveal.tsx](../src/components/Reveal.tsx)가 맡습니다. 텍스트는 18px 이동에 600ms, 그래픽은 28px 이동과 0.985배에 760ms, easing은 `--ease-emphasized`(`cubic-bezier(.22, 1, .36, 1)`). 같은 묶음 안 간격은 80ms이고 160ms에서 멈춥니다. 화면 하단보다 48px 안쪽에 닿으면 한 번만 재생합니다.

### 상호작용과 접근성

- 포커스 링은 2px 애시드에 4px 오프셋이며, 페이퍼 위에서는 잉크색으로 바뀝니다.
- 액션의 터치 영역은 최소 44px입니다.
- 첫 포커스로 잡히는 "본문으로 건너뛰기" 링크가 있습니다.
- 가로 스크롤이 생기는 표는 `role="region"` + `aria-label` + `tabIndex=0`로 감싸 키보드로 스크롤할 수 있습니다.
- 인쇄 시 흰 배경·검은 글자로 전환하고 그레인과 `.no-print` 요소를 숨깁니다.

## 합의된 디자인 기준

- **브랜드 요소는 앱 저장소를 따릅니다.** 마크·아이콘·어두운 껍데기 색·파형·카드 치수의 기준은 앱이고, 사이트가 따로 정하지 않습니다. 앱 팔레트가 바뀌면 `@theme`의 해당 토큰을 같이 고칩니다. 접근성 때문에 벗어나는 값(`faint`)은 이유를 토큰 주석에 남깁니다. 근거: [docs/work/W-004-main-app-brand-alignment.md](work/W-004-main-app-brand-alignment.md).
- **토큰 계약을 우회하지 않습니다.** 색·크기·모서리·이징은 전부 `@theme`에서 옵니다. 컴포넌트에 임의 색값이나 임의 크기를 쓰지 않습니다.
- **토큰 이름을 두 네임스페이스에 겹쳐 두지 않습니다.** Tailwind의 `text-*`는 색과 글자 크기를 함께 읽어, 같은 이름이 양쪽에 있으면 `text-<name>`이 **색으로** 해석되고 크기 지정이 조용히 사라집니다. `--color-control`과 `--text-control`을 같이 두었다가 본문이 배경색으로 칠해지는 일이 실제로 있었고 빌드도 런타임도 경고를 내지 않았습니다. 색 토큰을 `--color-chip`으로 바꿔 해결했고, `pnpm tokens:check`가 빌드 전에 잡습니다.
- **제목은 앱처럼 700, 본문은 400입니다.** 개편 때 세운 500 상한은 2026-10-04 사용자 결정으로 폐기했습니다 — 앱이 자유롭고 랜딩이 모던하게 느껴지는 가장 큰 원인이 굵기였습니다. 위계는 굵기·크기·색·여백이 함께 만듭니다. 근거: [docs/work/W-004-main-app-brand-alignment.md](work/W-004-main-app-brand-alignment.md).
- **깊이는 앱이 쓰는 장치로만 냅니다.** `html`의 화면 그라데이션, 카드의 `--shadow-card`, 카드 커버의 스크림, 믹스테이프 커버의 violet 틴트, 커버 위 글자 그림자. 전부 앱 값 그대로이며, 그 밖의 장식 그림자·광원 블롭·임의 그라데이션은 쓰지 않습니다. 근거: W-004, [docs/work/W-005-main-app-feel.md](work/W-005-main-app-feel.md).
- **한국어 서체는 Gothic A1입니다.** 앱 Outfit의 기하학적·둥근 성격에 가장 가까운 OFL 글꼴로 2026-10-04 사용자 결정으로 골랐습니다. 바꾸려면 `--font-sans`와 `@import`, `public/licenses/fonts.txt`의 고지를 함께 고칩니다. 근거: W-005.
- **리듬은 앱의 밀도를 따릅니다.** 섹션 64/96px, 히어로는 좌측 정렬 2단. 랜딩 페이지 관습(넓은 여백, 중앙 정렬 포스터)보다 앱 화면의 밀도가 기준입니다. 근거: W-005.
- **색 폭은 앱의 용례 그대로입니다.** violet은 믹스테이프 커버에만, `info`는 상태 안내에만. 쓰이는 자리 없이 토큰만 두지 않습니다 — 손으로 그린 카드가 사라지며 `acid-muted`·`micro`·`text-shadow-cover`·`aspect-card`도 함께 걷어냈습니다. 근거: W-005.
- **앱 화면은 별도 절이 아니라 기존 내용 안에 둡니다.** 히어로 카드와 루프 카드의 커버가 그 자리입니다. 정본은 앱 저장소의 스토어 스크린샷이고, 사이트는 거기서 폰 프레임만 같은 상자로 잘라 쓰며 다시 합성하지 않습니다. 위치명 익명화와 지도 장면 제외는 정본의 판단을 따릅니다. 근거: W-005.
- **섹션은 여백과 표면 차이로 가릅니다.** 분리선을 긋지 않습니다. 구조를 설명하는 선(표 테두리 등)만 예외입니다.
- **숨김 상태는 `Reveal` 훅만 만듭니다.** 첫 페인트에 이미 화면에 있는 요소는 건드리지 않습니다 — 보이던 것을 감췄다가 다시 띄우면 등장이 아니라 깜박임입니다. 부모와 자식에 함께 걸지 않습니다. Tab이 아직 숨은 요소에 먼저 닿으면 그 자리에서 드러냅니다.
- **`prefers-reduced-motion`에서는 훅이 아무것도 하지 않고 CSS가 한 번 더 막습니다.** 파형 반복 애니메이션은 따로 끕니다 — 시간만 0으로 줄이면 마지막 키프레임인 45% 높이에서 굳습니다.
- **글꼴은 self-host합니다.** CSP 계약이 `font-src 'self'`라 외부 CDN을 전제하지 않습니다(그 CSP가 현재 호스트에서 적용되지 않는 사정은 [docs/architecture.md](architecture.md) 참고). 세 글꼴 모두 OFL 1.1이고 파일을 함께 배포하므로 고지도 실어야 하는데 미니파이어가 스타일시트 주석을 지웁니다. `public/licenses/fonts.txt`에 고지와 전문을 두고 푸터에서 연결합니다.
- **한글 웹폰트 비용을 감수합니다.** 랜딩은 Pretendard subset 13개(405KB), 법률 문서는 15개(459KB)를 받습니다. `font-display: swap`이라 첫 페인트를 막지 않고 `/assets/*`가 1년 immutable 캐시라 재방문에는 요청이 없습니다. 정적 subset으로 더 줄일 수 있지만 문구를 고칠 때마다 다시 만들어야 해서 하지 않습니다. OS마다 한글 인상이 달라지는 문제를 없애는 값으로 받아들입니다.
- **한국어 조판**: `word-break: keep-all`로 어절 안에서 줄이 끊기지 않게 합니다. 제목은 `text-wrap: balance`, 본문은 `pretty`.
- **랜딩의 모든 주장은 앱 코드베이스와 일치해야 합니다.** 10초 제한, 비공개 저장, 서명 링크, 삭제 범위는 실제 동작이며 문구를 고칠 때 함께 확인합니다.
- **문구 점검 항목**: 번역투(`~를 통해`, `~에 있어`, `~을 가지고 있다`, 이중 피동), AI 결산 관용구(`결론적으로`, `~하는 이유다`, `필요한 것은 ~이다`), 같은 종결어미 연속, `A가 아니라 B` 대구의 반복, 과장 수사, 이모지. 원칙 절의 제목이 유일한 대구였는데(`빠진 기능이 아니라, 내린 결정입니다`) 영어 직역이라 주어가 붕 뜨고 목록의 절반(비공개 저장, 원본 삭제)은 '빠진 기능'이 아니어서, 2026-10-04 `일부러 그렇게 만들었습니다`로 바꿨습니다. 지금 랜딩에 대구는 없습니다. 기준은 `humanize-korean`의 quick-rules이며 원문은 <https://github.com/epoko77-ai/im-not-ai>입니다.
- **반응형 확인 범위는 320·390·768·1280px입니다.** `body`의 `min-width`가 320px이며, 네 폭 모두에서 가로 넘침이 없어야 합니다.

### 하지 않는 것

테마 토글을 넣지 않습니다. 앱이 다크 기준이므로 사이트도 고정합니다.

광원 블롭, 섹션 분리선, 이모지, 텍스트 화살표를 쓰지 않습니다. 그라데이션과 그림자는 앱이 쓰는 것(화면 그라데이션, 카드 그림자, 커버 스크림, 믹스테이프 틴트, 커버 글자 그림자)만 쓰고 장식용으로 늘리지 않습니다. 필름 그레인은 앱의 촉각을 옮긴 브랜드 요소입니다.

가짜 지표, 후기, 호환성 로고를 만들지 않습니다. 임의 색값을 쓰지 않습니다. 블러와 스크롤 가로채기도 쓰지 않습니다.

## 불일치와 미정 사항

- **인라인 `style` 속성이 CSP와 충돌합니다.** 프리렌더된 랜딩에 27건 있습니다 — `Waveform`의 막대 높이, 히어로의 `animation-delay`, `Reveal`이 주는 전환값. 현재 호스트에는 CSP가 적용되지 않아 드러나지 않지만, `style-src 'self'`를 켜는 호스트로 옮기면 전부 차단돼 막대가 `0px`가 되고 등장 타이밍이 깨집니다. CSS 변수나 클래스로 바꿀지는 미정입니다. 배경은 [docs/architecture.md](architecture.md)의 알려진 구조 제약에 있습니다.
- OG 이미지가 없어 공유 시 썸네일이 나오지 않습니다. 제작 여부가 미정입니다.
- **woff 폴백이 산출물에 들어갑니다.** fontsource CSS가 woff2와 woff를 함께 선언해 Vite가 둘 다 내보내고(`dist/assets` 7.9MB, 594개), 브라우저는 woff2만 받습니다. 배포 artifact 크기만의 문제이며, 빌드 후 woff를 걷어낼지 미정입니다.
- 카드 스택 맨 뒤 믹스테이프 커버의 violet은 보이는 띠가 12–15px라 거의 인지되지 않습니다. 앱 `WalletCardStack` 기하를 그대로 둔 결과이며, 더 보이게 할지 미정입니다.
- 실기기 확인을 하지 않았습니다. 모바일 Safari의 sticky 헤더와 목차 앵커 동작은 미확인입니다.

## 디자인 확인 방법

UI를 바꾸면 다음을 확인합니다.

1. `pnpm build && pnpm preview`로 프로덕션과 같은 정적 서빙 상태에서 본다. `build`가 `tokens:check`를 먼저 돌린다.
2. 대표 화면 네 개: 랜딩(`/`), 법률 문서(`/privacy`), 404, 그리고 바꾼 컴포넌트가 쓰이는 화면.
3. 폭 320·390·768·1280px. 각 폭에서 `document.documentElement.scrollWidth`가 뷰포트 폭과 같은지 본다. 320px에서는 문의 이메일 버튼이 한 줄에 들어가는지도 본다. 헤드리스 Chrome의 `--window-size`는 500px 아래로 줄지 않으므로 모바일 폭은 CDP의 `Emulation.setDeviceMetricsOverride`로 잡는다. 전체 페이지를 `captureBeyondViewport`로 찍으면 고정 배치된 그레인이 첫 뷰포트 높이까지만 덮여 그 아래가 약 2단계 어둡게 나온다 — 배경 이음새가 아니라 캡처 한계이며, 뷰포트 높이를 바꿔 찍으면 경계가 따라 움직인다.
4. 제목이 700이고 본문이 400인지, `document.fonts.check('700 1em "Gothic A1"')`이 true인지, 본문·라벨 대비가 AA를 넘는지 computed style로 확인한다. 카드에 `--shadow-card`가 붙고 `html`에 화면 그라데이션이 있는지 본다. 히어로 제목이 320px에서도 두 줄인지 본다.
5. 히어로와 루프 카드의 `img` 다섯 개가 로드되고 비어 있지 않은 `alt`와 `width`/`height`가 있는지, 보관 카드의 분할 커버 두 칸이 같은 폭인지 본다.
5. 키보드 Tab으로 건너뛰기 링크 → 내비 → 본문 링크 순서와 포커스 링 가시성을 어두운 섹션과 밝은 섹션 양쪽에서 본다. 아직 숨은 요소에 Tab이 닿으면 그 자리에서 드러나는지 함께 본다.
6. `prefers-reduced-motion: reduce`에서 숨겨진 요소가 없는지, 파형이 멈추는지 본다.
7. 프리렌더된 HTML에 `data-reveal`이 없고 본문 전체가 들어 있는지 본다.

실제 확인 결과와 미확인 범위는 해당 작업 문서에 남깁니다.
