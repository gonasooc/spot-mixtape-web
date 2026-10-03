# W-004 · 앱 기준으로 브랜드 요소 통일

- 상태: 진행 중
- 최근 갱신: 2026-10-04
- 관련 문서: [docs/design.md](../design.md), [docs/README.md](../README.md)

## 현재 상황

랜딩의 로고·아이콘·색 토큰·파형이 앱 저장소 `spot-mixtape`와 어긋나 있어, 레이아웃 구조는 유지한 채 앱을 기준으로 맞춥니다. 가장 큰 차이는 마크 자체였습니다 — 앱 아이콘은 **바이닐 레코드**(디스크 + 그루브 링 + 중앙 애시드 라벨)인데 랜딩은 **애시드 원판 위 파형 선**을 쓰고 있었습니다.

요소를 맞춘 뒤에도 "앱은 자유롭고 랜딩은 모던하다"는 인상이 남아 원인을 비교했고, 사용자가 **(a) 랜딩을 앱 쪽으로**를 택했습니다. 그래서 원리도 맞춥니다: 제목 700, 카드 그림자, 화면 그라데이션. 개편 때 세운 규칙 중 "500 상한"과 "그라데이션·그림자 금지"를 이 결정으로 폐기하고 [docs/design.md](../design.md)의 합의 기준을 고쳤습니다.

- 완료 조건: 헤더·히어로·파비콘·홈 화면 아이콘이 앱의 레코드 마크를 쓰고, 어두운 껍데기 색 토큰이 앱 `Colors.ts`의 값과 일치하며, 파형과 사운드 카드가 앱 `WaveformDisplay`·`SoundCard`의 치수를 따른다. 제목이 700, 카드에 앱 그림자, `html`에 앱 화면 그라데이션이 적용된다. 빌드·토큰 검사 통과, 네 폭에서 가로 넘침 0건.
- 사람이 판단할 사항: 없음. 제목 굵기는 (a) 결정으로 700.

## 진행과 판단

### 배경과 범위

사용자 요청: "앱을 기준으로 현재 랜딩 레이아웃 구조는 가급적 유지하면서 각 요소들에 통일성이 있도록 차이가 있는 디자인 요소들을 앱을 기준으로 수정." 섹션 구성·그리드·반응형 동작은 건드리지 않고, 요소 단위(마크, 워드마크, 색, 모서리, 파형, 카드, 액션, 아이콘 파일)만 맞춥니다.

### 중요한 시도와 결정

- 2026-10-04 — 앱의 브랜드 자산을 측정했습니다. `assets/images/icon.png`(1024px)를 PIL로 스캔한 결과 중심부터 애시드 라벨 r 0–74(`#C9F55D`), 디스크 `#10130F`, 안쪽 그루브 r 230–234(`#343A30`), 바깥 테두리 r 359–365(`#4A5243`), 그 밖은 `#0B0D0A`. 비율은 라벨 0.20, 그루브 0.64. 앱의 로그인 화면은 같은 마크를 View로 그립니다(`app/(auth)/login.tsx` `recordMark`/`recordRing`/`recordCore`): 디스크 88px `surfaceElevated` + 1px `borderStrong`, 링 58px 1px `borderStrong`, 코어 18px `primary`. 비율 0.205 / 0.66으로 아이콘과 같습니다.
- 2026-10-04 — 마크를 두 가지 출처에 각각 맞췄습니다. 화면 안 마크([src/components/BrandMark.tsx](../../src/components/BrandMark.tsx))는 앱의 **로그인 화면 코드** 치수(88/58/18, 1px)를 그대로 쓰고 `vector-effect: non-scaling-stroke`로 어느 크기에서도 1px 테두리를 유지합니다 — 앱이 `borderWidth: 1`로 그리는 방식과 같고, 비례 축소하면 24px 헤더에서 선이 사라지기 때문입니다. 파비콘([public/favicon.svg](../../public/favicon.svg))은 **아이콘 파일**의 측정 비율과 색을 그대로 옮겼습니다. `apple-touch-icon.png`(180px)와 `favicon.png`(48px)는 앱 원본을 리사이즈·복사했습니다.
- 2026-10-04 — 색 토큰을 앱 `Colors.dark`로 맞췄습니다. `chip` #272d1e→#1e221b(surfaceElevated), `chip-hover` #333a28→#252a21(surfacePressed), `line` #2a2f25→#343a30(border), `muted` #a8ae9f→#aab0a2(textDim). 새로 `canvas-raised`(backgroundRaised), `line-strong`(borderStrong), `dim`을 추가했습니다. **`faint`는 #838a7e로 유지**했습니다 — 앱의 textMuted #777d72는 surface 위에서 4.15:1, dim #7a8174는 4.37:1로 AA 미달이라 본문 잔글씨에는 쓸 수 없습니다. 대신 앱이 `dim`을 쓰는 곳(재생 전 파형 막대)에는 그대로 `--color-dim`을 씁니다. 페이퍼 팔레트는 손대지 않았습니다 — 앱 `Colors.light`는 정의만 있고 사용처가 0건이라 맞출 기준이 없습니다.
- 2026-10-04 — 파형을 앱 `WaveformDisplay`에 맞췄습니다: 40개 막대, 너비 3px, 모서리 2px, 재생 전 색 `dim`, 60px 스트립 안 13–87% 높이(앱의 8–52px). 사운드 카드는 앱 `SoundCard`처럼 모서리 22px + 1px `border`, 파형은 앱처럼 canvas 색 80px 우물(16px 모서리, 좌우 12px 인셋) 안에 넣었습니다. `--radius-card`가 16→22로 바뀌어 핵심 루프 카드 셋도 함께 22가 됩니다.
- 2026-10-04 — 히어로에 앱 로그인 화면의 락업(레코드 마크 → 모노 대문자 태그라인)을 넣었습니다. 태그라인은 앱의 `subtitle` 문자열 그대로 "Sound Archive for Places"이며, 개편 전 랜딩도 같은 문구를 eyebrow로 썼습니다. 개편에서 바뀐 한국어 `SectionLabel`("iOS · Android 사운드 아카이브")을 대체합니다.
- 2026-10-04 — 워드마크를 앱 `Typography.brand`대로 Outfit-Bold(700)로 올렸습니다(헤더·푸터). 랜딩의 500 상한에 대한 유일한 예외이며 `src/styles.css` 주석에 이유를 적었습니다. 보조 액션에는 앱 `appleButton`처럼 1px `borderStrong` 테두리를 추가했습니다. 모서리 14는 앱에서 가장 많이 쓰는 값(33건)이라 그대로 둡니다.
- 2026-10-04 — 바꾸지 않은 것: 한국어 제목 굵기(위 판단 사항), 페이퍼 팔레트, 섹션 리듬·그리드, `SectionLabel`(한국어 라벨은 sans 유지), 필름 그레인(PRODUCT.md가 브랜드 요소로 명시).
- 2026-10-04 — 검증 중 320px에서 문서 폭이 5px 넘치는 것을 발견했습니다. 원인은 이번 변경이 아니라 문의 섹션의 이메일 버튼이었습니다: 29자 모노 텍스트 + 좌우 패딩이 305px인데 320px 화면의 콘텐츠 폭은 280px입니다(`body`의 `overflow-x: clip` 때문에 스크롤은 안 생기고 버튼 오른쪽이 잘려 보임). 그 버튼에만 `max-sm:text-meta`를 줘 640px 미만에서 한 단계 작은 13px로 내려 한 줄에 들어가게 했습니다. 내비 항목이 320px를 넘는 것은 설계된 가로 스크롤러 안이라 문서 폭에 영향이 없습니다.
- 2026-10-04 — 헤드리스 Chrome `--window-size`로 찍은 390px 스크린샷이 우측에서 잘려 보였는데, 실제 넘침이 아니라 Chrome이 창 폭을 500px 아래로 줄이지 않아 500px 레이아웃을 390px로 잘라낸 것이었습니다. 모바일 폭은 CDP `Emulation.setDeviceMetricsOverride`로 에뮬레이션해야 하며, [docs/design.md](../design.md)의 확인 방법에 적었습니다.

- 2026-10-04 — 요소 통일 뒤 사용자가 "앱은 자유로운데 랜딩은 모던하다"고 느낀 이유를 코드로 비교했습니다. 앱: 그라데이션 11파일, 그림자 선언 21곳, Outfit-Bold 67회(Regular 51회보다 많음), 서로 다른 모서리 33종·글자 크기 20종, 의미색 39곳. 랜딩: 그림자·그라데이션 0, 500 상한, 모서리 4종·크기 12단계, 단일 액센트. 즉 요소는 같아졌지만 **깊이·굵기·체계의 조임**이 달랐고, 그 간극은 개편 커밋 `86069ad`가 의도적으로 만든 것이었습니다(개편 전 랜딩이 오히려 앱 느낌에 가까웠음). `PRODUCT.md`의 "촉각적"과도 어긋나는 지점이라 두 방향 — (a) 랜딩을 앱 쪽으로, (b) 차이를 의도로 확정 — 을 제시했고 사용자가 (a)를 택했습니다.
- 2026-10-04 — (a) 적용. 제목(h1–h6)·`strong`·`b`·`dt`·`th`를 700으로, 제목 자간을 앱 비율(−0.02em, h1 −0.025em)로. 카드 그림자 토큰 `--shadow-card: 0 8px 20px rgb(7 8 6 / 0.24)`(앱 `SoundCard` 값)를 사운드 카드와 핵심 루프 카드에, 1px `line` 테두리와 함께. 화면 그라데이션은 앱 `AppGradients.screen`(raised → background → deep, 위→아래)을 `html` 배경에 0/25/75/100% 스톱으로 펴고 `body`를 투명하게 — 히어로 섹션에만 두면 다음 섹션과 이음새가 생기고, `background-attachment: fixed`는 iOS Safari가 무시하기 때문입니다. 새 토큰 `canvas-deep`(backgroundDeep). 토큰 계약·4개 모서리·여백 분리·단일 액센트는 유지했습니다 — 그건 체계의 조임이지 촉각이 아니고, 사용자 요청이 "레이아웃 구조 유지"였기 때문입니다.

### 검증

- (a) 적용분 `pnpm build` — 통과(`tokens:check`에 `canvas-deep`·`shadow-card` 포함), 프리렌더 8페이지. 2026-10-04
- (a) 적용분 computed style(CDP, 320/390/768/1440 + `/privacy` 390) — h1·h2·h3·`strong` 700, 본문 400, 액션 500, 워드마크 700. h1 자간 −0.85px/34px(−0.025em), h2 −0.6px/30px(−0.02em). 사운드 카드·루프 카드 `box-shadow rgba(7,8,6,0.24) 0 8px 20px` + 1px `#343a30` + 22px. `html` `background-image: linear-gradient(#10130f 0%, #0b0d0a 25%, #0b0d0a 75%, #070806 100%)`, `no-repeat`, `body` 투명 — 전부 의도대로
- (a) 적용분 가로 넘침 — 네 폭 모두 `scrollWidth`가 뷰포트와 일치. 굵어진 h1은 320px에서 2줄, 오른쪽 끝 300px(여유 20px). `/privacy`에서 뷰포트를 넘는 요소는 자체 `overflow-x-auto` 안의 표뿐
- (a) 적용분 화면(CDP 에뮬레이션) — 데스크톱 1440 히어로·전체 페이지, 모바일 390·320 히어로, `/privacy` 390 상단·5장: 볼드 제목, 카드 그림자와 테두리, 상단 raised → 하단 deep 그라데이션(픽셀 샘플 상단 (17,20,16) → 중간 (11,13,10) → 하단 (7,8,6)) 확인. 페이퍼 페이지의 `PolicyNote`도 `rounded-card`를 쓰므로 22px이 됐고, 어색하지 않아 그대로 둠. 이상 없음
- 그라데이션 이음새 의심 → 캡처 artefact로 판정 — 전체 페이지 캡처에서 y≈950에 2단계 밝기 계단이 보였는데, 뷰포트 높이를 700으로 바꿔 다시 찍자 계단이 y≈700으로 따라 움직였고 950 부근은 평탄해졌다. `captureBeyondViewport`에서 `position: fixed` 그레인 오버레이가 첫 뷰포트만 덮어 그 아래가 그레인만큼(≈2단계) 어둡게 찍히는 것. 실제 페이지에서는 그레인이 항상 보이는 뷰포트를 덮으므로 이음새가 없다. [docs/design.md](../design.md) 확인 방법에 적어 둠
- `pnpm build` — 통과. `tokens:check`(새 토큰 `canvas-raised`·`line-strong`·`dim`·`radius-well` 포함) → `tsc -b` → 클라이언트·SSR → 프리렌더 8페이지. 2026-10-04, 로컬 Node 22
- computed style 프로브(CDP, 320/390/768/1440) — 헤더 마크 24px, 히어로 마크 72(≤639)/88px, 워드마크 `Outfit Variable` 700, 파형 40개·3px·2px·재생 전 `#7a8174`, 카드 22px·1px `#343a30`, eyebrow JetBrains Mono 1.44px 대문자, 토큰 `chip #1e221b`·`line #343a30` — 전부 의도대로
- 가로 넘침 — 수정 전 320px `scrollWidth 325`(이메일 버튼), 수정 후 320·390·768·1440 모두 뷰포트와 일치. 404 페이지 320px도 일치
- 데스크톱 스크린샷(1440) — 헤더·히어로 락업·사운드 카드 우물·404 파형 확인, 이상 없음
- 모바일 스크린샷(390·320, CDP 에뮬레이션) — 히어로 락업 간격, 카드·파형 우물, 404, 푸터 워드마크 확인. 320px에서 제목 2줄·태그라인 1줄로 들어가고 잘림 없음
- 실기기·실제 스크린리더 — 미실행 ([W-003](W-003-main-manual-verification.md)에서 관리)

### 세션 메모

- 2026-10-04 · Claude Code — 요소 통일(마크·아이콘·색·파형·카드·워드마크)과 (a) 원리 통일(제목 700·카드 그림자·화면 그라데이션)을 모두 적용하고 검증했습니다. design.md 합의 기준 개정 포함. 커밋하지 않았습니다. 다음 행동은 사용자 검토 → 커밋.

## 남은 일

- [x] 앱 아이콘·로그인 마크·색·파형·카드·버튼 치수 측정
- [x] `BrandMark` 레코드 마크로 교체, `favicon.svg` 재작성, `apple-touch-icon.png`·`favicon.png` 생성
- [x] 색·모서리 토큰을 앱 값으로, 신규 토큰 `canvas-raised`·`line-strong`·`dim`·`radius-well`
- [x] 헤더·푸터 워드마크 700, 히어로 락업, 사운드 카드 우물, 보조 액션 테두리, 파형 치수
- [x] `pnpm build` 통과 확인 (tokens:check 포함)
- [x] 320px 이메일 버튼 넘침 수정
- [x] 네 폭 가로 넘침 0건, 데스크톱 화면 확인
- [x] 모바일(390·320) 에뮬레이션 화면 확인 — 히어로 락업 간격
- [x] [docs/design.md](../design.md) 갱신 — 토큰 표(앱 이름 대응), 브랜드 마크와 아이콘, 파형과 사운드 카드, 합의 기준 "브랜드 요소는 앱을 따른다", 미정에 제목 굵기
- [x] `README.md` 디자인 토큰 표 정정 — 개편 전 토큰 이름(`--color-ink`가 배경, `--color-violet`)과 존재하지 않는 `tailwind.config.js` 언급을 현재 토큰과 앱 이름으로
- [x] W-003의 `apple-touch-icon` 항목을 완료로
- [x] 한국어 제목 굵기 결정 (사용자) — (a) 선택, 700
- [x] (a) 적용 — 제목 700, `--shadow-card`, `html` 화면 그라데이션, `canvas-deep` 토큰, design.md 합의 기준 개정
- [x] (a) 검증 — 빌드, 굵기·그림자·그라데이션 computed, 네 폭 넘침, 데스크톱·모바일·법률 페이지 화면
- [ ] 사용자 검토 후 커밋

재개에 필요한 코드 상태: 브랜치 `main`, 미커밋 변경 있음 (`src/styles.css`, `src/components/{BrandMark,Waveform,Layout,ui}.tsx`, `src/pages/Landing.tsx`, `index.html`, `public/{favicon.svg,favicon.png,apple-touch-icon.png}`, `README.md`, `docs/design.md`, `docs/README.md`, `docs/work/W-003`, 이 문서).
