# W-002 · 보안 헤더 방침과 CSP 대응

- 상태: 진행 중
- 최근 갱신: 2026-10-09
- 관련 문서: [docs/architecture.md](../architecture.md), [docs/plan.md](../plan.md), [docs/design.md](../design.md)

## 현재 상황

2026-10-09 OWNER가 **GitHub Pages 유지 + meta CSP**로 결정했습니다. CSP와 Referrer-Policy가 빌드된 모든 페이지의 `<meta>`로 들어가고, 그 정책에 걸리던 인라인 style 43건은 클래스·SVG 속성으로 옮겼으며, 효력 없던 `public/_headers`는 지웠습니다. 로컬 빌드에서 전 페이지 위반 0건과 실제 집행을 확인했습니다. 남은 것은 배포 뒤 라이브 확인뿐입니다.

- 완료 조건: 호스팅 방침이 정해지고, 그 방침에서 의도한 헤더가 실제 응답에 붙거나, 붙이지 않기로 한 이유가 문서에 남는다. 결정된 방침(meta CSP)에서는 라이브 HTML에 정책이 들어 있고 위반이 0건이며, 헤더 전용 보호를 포기한 이유가 문서에 남는 것.
- 사람이 판단할 사항: 없음.

## 진행과 판단

### 배경과 범위

삭제된 `docs/REMAINING_WORK.md`가 배포 후 검증 항목으로 "CSP, `X-Frame-Options`, `Permissions-Policy`, `X-Content-Type-Options` 응답 헤더 확인"과 "CSP가 실제 페이지를 깨뜨리지 않는지 확인"을 올려두고 한 번도 실행되지 않은 채 남아 있었습니다. 그 두 항목을 실제로 확인한 결과를 이 작업이 이어받습니다.

### 중요한 시도와 결정

- 2026-10-04 — 라이브 응답을 확인했습니다. `curl -sI`로 `/privacy`를 받아보면 CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `Referrer-Policy`가 **전부 없습니다**. `public/_headers` 파일 자체는 `/_headers`로 그냥 다운로드됩니다. GitHub Pages는 커스텀 응답 헤더를 지원하지 않으므로 호스트를 유지하는 한 이 파일은 영원히 장식입니다.
- 2026-10-04 — `dist/`를 `_headers`의 CSP를 붙여 로컬에 서빙하고 헤드리스 Chrome(CDP)으로 로드해 영향을 측정했습니다. 위반 25건, 그 외 콘솔 에러 0건.
  - `style-src 'self'`가 인라인 `style` 속성을 차단합니다. 프리렌더된 랜딩에 27건 있고([src/components/Waveform.tsx](../../src/components/Waveform.tsx)의 막대 높이, 히어로의 `animation-delay`, [src/components/Reveal.tsx](../../src/components/Reveal.tsx)의 전환값), 파형 막대의 computed height가 전부 `0px`가 됩니다.
  - `font-src 'self'`가 Vite가 base64로 인라인한 `data:` 폰트 1건을 차단합니다. `@font-face` 100개 중 1개입니다.
- 2026-10-04 — 따라서 "헤더를 살리는 호스트로 옮긴다"는 선택지는 단독으로 성립하지 않습니다. 이전보다 CSP 수정이 먼저입니다.
- 2026-10-04 — 재측정. [W-005](W-005-main-app-feel.md)에서 손으로 그린 히어로 카드가 실제 스크린샷으로 바뀌며 랜딩의 인라인 `style`은 27건 → **3건**(히어로 `enter` 애니메이션의 `animation-delay`)이 됐습니다. 404 페이지의 파형 막대(40건, 높이 인라인)와 `Reveal`이 런타임에 주는 전환값은 남아 있습니다. `data:` 폰트는 `assetsInlineLimit: 0`으로 0건입니다. CSP를 켜기 위해 손볼 범위가 크게 줄었습니다.

- 2026-10-09 — **결정: GitHub Pages 유지 + meta CSP** (OWNER, 사용자 선택). 빌드된 HTML에 인라인 `<script>`가 0건이라 CSP를 `<meta http-equiv>`로 걸 수 있다는 점이 결정적이었습니다 — 호스트를 옮기면 스토어 콘솔·OAuth 동의 화면·앱 EAS 환경변수에 등록된 공개 URL을 전부 바꿔야 하지만, meta CSP는 URL을 하나도 건드리지 않습니다. 대가로 헤더 전용 보호(frame-ancestors/X-Frame-Options의 클릭재킹 방지, X-Content-Type-Options, Permissions-Policy, COOP/CORP)는 포기합니다. 로그인·폼·쿠키가 없는 정적 사이트라 실질 위험은 낮다고 판단했습니다. 효력 없는 `public/_headers`는 지웁니다.
- 2026-10-09 — **재측정에서 기록 오류 발견.** 위 재측정 항목에 "`Reveal`이 런타임에 주는 전환값"도 CSP에 걸린다고 적었는데 틀렸습니다. `Reveal`은 `element.style.setProperty`(CSSOM)로 값을 넣고, CSP의 `style-src`는 CSSOM 조작을 막지 않습니다. 현재 빌드에 `_headers`의 CSP를 걸고 잰 결과 랜딩 10개 요소가 모두 정상 등장했습니다. 실제로 걸리는 것은 랜딩 3건(히어로 `animation-delay` — 차단되면 순차 등장이 동시 등장이 됨)과 404의 40건(파형 막대 높이 — 차단되면 막대가 `0px`로 사라짐)뿐이고, 개인정보처리방침·이용약관은 이미 0건입니다.

- 2026-10-09 — **인라인 style 43건 제거.** 히어로의 `animation-delay` 3건은 `src/styles.css`의 함수형 유틸리티 `enter-delay-*`(`enter-delay-60` → 60ms)로 바꿨습니다. 404 파형 막대 40건은 높이를 style 대신 속성으로 주려고 막대를 `<span>`에서 빈 `<svg height="22%">`로 바꿨습니다 — CSP는 style 속성은 막지만 SVG 표현 속성은 막지 않고, flexbox 배치·너비·모서리·색은 그대로라 렌더 결과가 이전과 같습니다(56px 안 22% → 12.3px 그대로). 지금은 아무도 쓰지 않지만 쓰는 순간 CSP에 걸릴 `Waveform`의 `animated` 물결 지연도 `.bar-pulse:nth-child(8n+k)` 규칙 7개로 옮겼습니다. [src/components/Waveform.tsx](../../src/components/Waveform.tsx), [src/styles.css](../../src/styles.css)
- 2026-10-09 — **meta CSP.** 정책은 [scripts/prerender.mjs](../../scripts/prerender.mjs)의 `CONTENT_SECURITY_POLICY` 하나이고, 프리렌더가 리다이렉트 스텁을 포함한 모든 페이지의 `<meta charset>` 바로 뒤에 넣습니다(meta 정책은 그 뒤의 리소스에만 적용). 헤더 정책에서 두 지시어를 뺐습니다: `frame-ancestors`는 meta에서 무시되고, `upgrade-insecure-requests`는 https 전용 호스트에서 얻는 게 없는데 http로 띄우는 `vite preview`를 깨뜨립니다. 개발 서버는 인라인 스크립트·스타일을 주입하므로 dev 페이지에는 넣지 않습니다. Referrer-Policy(`strict-origin-when-cross-origin`)도 `<meta name="referrer">`로 함께 넣었습니다.
- 2026-10-09 — **회귀를 만들었다가 고침.** 검증에서 히어로 순차 등장이 사라진 것을 발견했습니다(`animation-delay` 전부 0s). `.enter`가 레이어 밖 규칙으로 `animation` 단축 속성을 쓰는데, 레이어 밖 규칙은 Tailwind `utilities` 레이어보다 우선해서 `enter-delay-*`가 준 delay를 0으로 덮었습니다. 전에는 인라인 style이라 이겼던 것입니다. `.enter`를 개별 속성으로 풀어 고쳤고, 같은 함정을 피하도록 [docs/specs.md](../specs.md)에 규칙으로 남겼습니다.
- 2026-10-09 — **`_headers` 삭제와 문서 정정.** `public/_headers`를 지웠습니다. 그 파일의 캐시 규칙(`/assets/*` 1년 immutable)도 한 번도 적용된 적이 없었는데, `docs/design.md`와 README가 그것을 사실처럼 적고 있었습니다 — 라이브는 해시가 붙은 에셋까지 모두 `max-age=600`이고 만료 뒤 ETag로 304 재확인합니다. README·[docs/architecture.md](../architecture.md)·specs·design·plan의 관련 서술을 모두 고쳤습니다.

### 선택지

| 선택 | 내용 | 비용 |
| --- | --- | --- |
| 현 상태 수용 | GitHub Pages 유지, `_headers`를 지우거나 "적용되지 않음"을 파일에 명시 | 없음. 쿠키·폼·인증이 없는 정적 법률 문서라 실질 위험은 낮지만 클릭재킹·MIME 스니핑 보호가 없다 |
| 호스트 이전 | Cloudflare Pages 또는 Netlify. `_headers`가 그대로 동작하고, 하위 경로가 사라져 `basePath`도 단순해진다 | CSP 수정 선행. 스토어 콘솔에 제출한 URL 전부 교체 |
| 커스텀 도메인 + 프록시 | Cloudflare 프록시의 Transform Rules로 헤더 주입 | 도메인 필요. CSP 수정 선행 |

### 검증

- 라이브 보안 헤더 부재 — `curl -sI https://gonasooc.github.io/spot-mixtape-web/privacy`, 2026-10-04, 통과(헤더 0건 확인)
- CSP 적용 시 영향 — `dist/`를 `_headers`의 CSP로 로컬 서빙 + 헤드리스 Chrome 152 CDP 측정, 2026-10-04, 위반 25건 확인. `upgrade-insecure-requests`만 http 프로브를 위해 제외
- 수정안 검증(2026-10-09, 로컬, 헤드리스 Chrome 152 + CDP, 응답 헤더 없이 dist 서빙 — GitHub Pages와 같은 조건)
  - `pnpm build` 통과(`tokens:check` 포함). 빌드 HTML의 인라인 `style` 속성 전 페이지 0건(index·privacy·terms·404·account-deletion)
  - 모든 페이지에 CSP·referrer `<meta>`가 있고 첫 `<link>`/`<script>`보다 앞에 위치
  - 로드 시 CSP 위반: `/`, `/privacy`, `/terms`, `/404.html`, `/account-deletion` 모두 0건. 랜딩 → 개인정보처리방침 SPA 이동 중에도 0건. 페이지마다 새 브라우저로 쟀습니다(같은 탭을 쓰면 `Log.enable`이 이전 페이지 로그를 재전송해 수치가 오염됨)
  - 집행 확인: style 속성 주입과 인라인 `<script>` 삽입이 둘 다 막히고 `style-src-attr`·`script-src-elem` 위반으로 보고됨. (CDP로 실행한 `eval`은 DevTools 코드라 CSP를 받지 않아 시험 방법으로 쓰지 않았습니다)
  - 정상 동작: 히어로 지연 `0s,0s,0.06s,0.12s,0.24s`, Reveal 10/10 등장(지연 5개 CSSOM 적용), 이미지 5/5, 글꼴 3종, 그레인(`data:` SVG) 적용, 404 파형 40개(22% → 12.3px), 콘솔 에러 0
  - 개발 서버: meta CSP 없음(의도), 렌더·순차 등장 정상, 예외 0
- 라이브 확인 — 미실행(배포 전)

### 세션 메모

- 2026-10-04 · Claude Code(Opus 5) — 측정만 하고 보류했습니다. 다음 행동은 OWNER의 호스팅 결정.
- 2026-10-09 · Claude Code(Opus 5.5) — 결정(Pages + meta CSP)을 받아 인라인 style 제거·meta CSP·`_headers` 삭제·문서 정정까지 하고 로컬에서 검증했습니다. 커밋하지 않았습니다. 다음 행동은 커밋·푸시 뒤 라이브 확인.

## 남은 일

- [x] 라이브 응답에 보안 헤더가 붙는지 확인
- [x] `_headers`의 CSP를 켰을 때 깨지는 것 측정
- [x] 호스팅 방침 결정 (OWNER) — 2026-10-09 GitHub Pages 유지 + meta CSP
- [x] 남은 인라인 `style`을 CSS 변수나 클래스로 옮겨 적용 — 랜딩 3건은 `enter-delay-*`, 404의 40건은 `<svg height>`. `Reveal`은 CSSOM이라 해당 없음 (2026-10-09)
- [x] `build.assetsInlineLimit: 0`으로 `data:` 폰트 제거 — 2026-10-04 [W-005](W-005-main-app-feel.md)에서 적용, 빌드 CSS의 `data:` 폰트 0건 확인
- [x] 수정한 CSP로 다시 측정해 위반 0건 확인 — 2026-10-09 로컬, meta CSP로 전 페이지 0건, 집행 확인
- [x] 방침에 맞게 `public/_headers`를 살리거나 지우고, [docs/architecture.md](../architecture.md)의 알려진 구조 제약을 갱신 — 지움. README·architecture·specs·design·plan 정정
- [ ] 배포 뒤 라이브 HTML에 meta CSP가 있는지, 라이브에서 위반이 0건인지 확인

재개에 필요한 코드 상태: 브랜치 `main`, 기준 커밋 `fc20701`. 미커밋 변경 — `scripts/prerender.mjs`, `src/styles.css`, `src/components/Waveform.tsx`, `src/pages/Landing.tsx`, `public/_headers` 삭제, README·docs.
