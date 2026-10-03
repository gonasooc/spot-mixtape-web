# UI 디자인 기준

UI의 시각적 기준과 상호작용·반응형·접근성 기준을 다룹니다. 시스템 구조는 [docs/architecture.md](architecture.md), 기술 스택·검증 명령은 [docs/specs.md](specs.md)에서 관리합니다. 브랜드 톤과 안티레퍼런스는 [PRODUCT.md](../PRODUCT.md)가 원본입니다.

## 참고할 코드와 화면

| 원본 | 역할 |
| --- | --- |
| [src/styles.css](../src/styles.css) | `@theme` 디자인 토큰, base 레이어, `eyebrow` 유틸리티, 애니메이션 |
| [src/components/ui.tsx](../src/components/ui.tsx) | 버튼(`ButtonLink`·`ButtonAnchor`), `Eyebrow`, `Section` 거터와 세로 리듬 |
| [src/components/Layout.tsx](../src/components/Layout.tsx) | 헤더·푸터·건너뛰기 링크 |
| [src/components/PolicyLayout.tsx](../src/components/PolicyLayout.tsx) | 법률 문서 전용 레이아웃과 섹션·목록·노트·표·연락처 |
| [src/components/Waveform.tsx](../src/components/Waveform.tsx) | 파형 바. 앱의 사운드 카드와 같은 시각 언어 |

확인 범위: 2026-10-04, 커밋 `48e1143`, 헤드리스 Chrome 152로 `/`, `/privacy`, `/terms`, `/404`를 320·390·768·1440px에서 렌더해 스크린샷과 computed style을 함께 측정했습니다. 실기기 확인은 하지 않았습니다.

## 관찰된 구현

### 색과 질감

`@theme`의 토큰이 앱의 `src/constants/Colors.ts`·`tailwind.config.js`를 옮긴 것입니다. 어두운 `ink` 계열 배경에 애시드 라임(`--color-acid` `#C9F55D`) 단일 액센트, 밝은 섹션은 `paper`(`#F3F5EC`)입니다. 법률 문서는 전면 paper, 랜딩은 ink·paper·acid 세 밴드가 번갈아 나옵니다.

`body::before`에 opacity `0.03`의 SVG 노이즈를 `z-index: 100` 고정 오버레이로 깔아 전체에 필름 그레인을 줍니다.

### 타이포그래피

Outfit(본문·제목)과 JetBrains Mono(eyebrow, 버튼, 번호, 메타 정보) 두 종류만 씁니다. 크기별 행간은 `@theme`에서 Tailwind 기본값을 덮어씁니다.

| 구간 | 비율 | 용도 |
| --- | --- | --- |
| `xs` 1.6 · `sm` 1.71 · `base` 1.8 · `lg` 1.78 | 넉넉 | 본문. 한국어 가독성을 위해 기본보다 넓다 |
| `xl` 1.5 · `2xl` 1.4 · `3xl` 1.34 | 중간 | 소제목 |
| `4xl` 1.26 · `5xl` 1.18 · `6xl` 1.14 · `7xl` 1.1 | 좁음 | 디스플레이 |

`body`의 행간도 `1.8`이라 `text-base`와 일치합니다. 제목은 `font-weight: 600`, `letter-spacing: -0.03em`, `text-wrap: balance`입니다. 한국어 본문은 `word-break: keep-all`이고 끊을 수 없는 토큰만 `overflow-wrap: break-word`로 처리합니다.

### 레이아웃과 간격

- 거터와 세로 리듬은 `Section`이 담당합니다: `px-5 py-16 sm:px-8 sm:py-24`, 내부 `max-w-6xl`.
- 법률 문서는 `max-w-3xl`, 섹션마다 아래 괘선(`border-ink/15`)으로 구분합니다.
- 헤더는 sticky(`z-50`)이며 모바일에서 브랜드와 내비가 2행, `sm`부터 1행입니다. 2026-10-04 측정 기준 모바일 높이 93px.
- 사용하는 브레이크포인트는 Tailwind 기본 `sm`(640) · `md`(768) · `lg`(1024)입니다.

### 공통 컴포넌트

- 버튼은 `min-h-12`의 알약형이며 톤이 4개입니다: `primary`(acid 채움) · `quiet`(선) · `dark`(ink 채움) · `inverse`(밝은 배경 위 ink 선). 라벨은 mono `0.8125rem` bold.
- `Eyebrow`는 mono `0.6875rem`, `letter-spacing: 0.14em`, 대문자. 섹션 제목 위에 놓입니다.
- `Waveform`은 고정 높이 수열을 쓰는 결정적 컴포넌트입니다. 서버와 클라이언트가 같은 마크업을 내도록 난수를 쓰지 않습니다.

### 상호작용과 접근성

- `:focus-visible`은 3px acid 아웃라인에 offset 3px이며, `.bg-paper`·`.bg-paper-deep`·`.bg-acid` 안에서는 ink로 바뀝니다. acid를 paper 위에 쓰면 대비가 약 1.4:1이라 보이지 않기 때문입니다.
- 내비 링크와 버튼의 터치 영역은 최소 44px(`min-h-11`·`min-h-12`)입니다.
- 첫 포커스로 잡히는 "본문으로 건너뛰기" 링크가 있습니다.
- `prefers-reduced-motion: reduce`에서 모든 애니메이션·트랜지션을 사실상 끕니다.
- 가로 스크롤이 생기는 표는 `role="region"` + `aria-label` + `tabIndex=0`로 감싸 키보드로 스크롤할 수 있습니다.
- 인쇄 시 흰 배경·검은 글자로 전환하고 그레인과 `.no-print` 요소를 숨깁니다.

## 합의된 디자인 기준

- **시각적 방향과 레이아웃**: 다크 잉크 배경에 애시드 라임 단일 액센트. 법률 문서는 장식 없는 paper 문서로 유지하고 히어로나 마케팅 문구를 넣지 않습니다. 근거는 [PRODUCT.md](../PRODUCT.md).
- **행간은 크기에 따라 달라집니다.** 본문 구간(`xs`–`lg`)은 한국어 가독성을 위해 넓게 두고, 디스플레이 구간(`xl` 이상)은 커질수록 좁힙니다. 하나의 비율을 전 구간에 적용하지 않습니다. 임의 크기(`text-[...]`)를 쓸 때는 Tailwind가 행간을 붙여주지 않으므로 `text-[...]/[...]`로 함께 지정합니다. 근거: 커밋 `01624f2`.
- **밝은 배경 위에서는 포커스 링을 ink로 바꿉니다.** acid 링은 paper 위에서 보이지 않습니다. 같은 커밋.
- **반응형 확인 범위는 320·390·768·1440px입니다.** `body`의 `min-width`가 320px이며, 네 폭 모두에서 가로 스크롤이 없어야 합니다.
- **비인터랙티브 상태 표시를 버튼처럼 보이게 하지 않습니다.** 랜딩의 "출시 준비 중" 배지가 mailto 버튼과 같은 전폭 알약으로 보여 혼동을 준 사례가 있어, 내용 너비만 차지하도록 고쳤습니다. 같은 커밋.

## 불일치와 미정 사항

- `Waveform`이 바 높이를 인라인 `style` 속성으로 줍니다. 현재 호스트에는 CSP가 없어 문제가 없지만, CSP를 적용하는 호스트로 옮기면 `style-src 'self'`에 전부 차단돼 바가 `0px`가 됩니다. CSS 변수나 클래스로 바꿀지는 미정입니다. 배경은 [docs/architecture.md](architecture.md)의 알려진 구조 제약에 있습니다.
- `--color-violet`(`#9E83CF`)은 토큰에만 있고 실제로 쓰이는 곳이 없습니다. 앱 팔레트와의 일치를 위해 남긴 것인지, 웹에서 쓸 자리가 있는지 미정입니다.
- OG 이미지가 없어 공유 시 썸네일이 나오지 않습니다. `apple-touch-icon`도 SVG라 iOS에서 무시됩니다. 둘 다 제작 여부가 미정입니다.
- 실기기 확인을 하지 않았습니다. 모바일 Safari의 sticky 헤더와 목차 앵커 동작은 미확인입니다.

## 디자인 확인 방법

UI를 바꾸면 다음을 확인합니다.

1. `pnpm build && pnpm preview`로 프로덕션과 같은 정적 서빙 상태에서 본다.
2. 대표 화면 네 개: 랜딩(`/`), 법률 문서(`/privacy`), 404, 그리고 바꾼 컴포넌트가 쓰이는 화면.
3. 폭 320·390·768·1440px. 각 폭에서 `document.documentElement.scrollWidth`가 뷰포트 폭과 같은지 본다.
4. 키보드 Tab으로 건너뛰기 링크 → 내비 → 본문 링크 순서와 포커스 링 가시성을 어두운 섹션과 밝은 섹션 양쪽에서 본다.
5. 제목·본문의 행간이 크기 구간 기준과 맞는지 computed style로 확인한다.

실제 확인 결과와 미확인 범위는 해당 작업 문서에 남깁니다.
