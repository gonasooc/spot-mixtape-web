# W-002 · 보안 헤더 방침과 CSP 대응

- 상태: 보류
- 최근 갱신: 2026-10-04
- 관련 문서: [docs/architecture.md](../architecture.md), [docs/plan.md](../plan.md), [docs/design.md](../design.md)

## 현재 상황

이 사이트는 보안 응답 헤더를 하나도 내보내지 않습니다. `public/_headers`는 Netlify·Cloudflare Pages 형식인데 현재 호스트인 GitHub Pages가 이 파일을 통째로 무시합니다. 게다가 그 파일에 적힌 CSP는 한 번도 적용된 적이 없어, 지금 그대로 켜면 사이트가 깨집니다.

- 완료 조건: 호스팅 방침이 정해지고, 그 방침에서 의도한 헤더가 실제 응답에 붙거나, 붙이지 않기로 한 이유가 문서에 남는다.
- 사람이 판단할 사항: 호스트를 유지할지 옮길지. 아래 선택지 참고.
- 보류 이유와 재개 조건: OWNER의 호스팅 결정이 선행 조건입니다. 결정이 나면 재개합니다. 단 **옮기기로 한다면 CSP 수정이 이전보다 먼저**입니다.

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

### 선택지

| 선택 | 내용 | 비용 |
| --- | --- | --- |
| 현 상태 수용 | GitHub Pages 유지, `_headers`를 지우거나 "적용되지 않음"을 파일에 명시 | 없음. 쿠키·폼·인증이 없는 정적 법률 문서라 실질 위험은 낮지만 클릭재킹·MIME 스니핑 보호가 없다 |
| 호스트 이전 | Cloudflare Pages 또는 Netlify. `_headers`가 그대로 동작하고, 하위 경로가 사라져 `basePath`도 단순해진다 | CSP 수정 선행. 스토어 콘솔에 제출한 URL 전부 교체 |
| 커스텀 도메인 + 프록시 | Cloudflare 프록시의 Transform Rules로 헤더 주입 | 도메인 필요. CSP 수정 선행 |

### 검증

- 라이브 보안 헤더 부재 — `curl -sI https://gonasooc.github.io/spot-mixtape-web/privacy`, 2026-10-04, 통과(헤더 0건 확인)
- CSP 적용 시 영향 — `dist/`를 `_headers`의 CSP로 로컬 서빙 + 헤드리스 Chrome 152 CDP 측정, 2026-10-04, 위반 25건 확인. `upgrade-insecure-requests`만 http 프로브를 위해 제외
- 수정안 검증 — 미실행

### 세션 메모

- 2026-10-04 · Claude Code(Opus 5) — 측정만 하고 보류했습니다. 다음 행동은 OWNER의 호스팅 결정.

## 남은 일

- [x] 라이브 응답에 보안 헤더가 붙는지 확인
- [x] `_headers`의 CSP를 켰을 때 깨지는 것 측정
- [ ] 호스팅 방침 결정 (OWNER)
- [ ] 남은 인라인 `style`을 CSS 변수나 클래스로 옮길지 결정하고 적용 — 랜딩 3건(히어로 `animation-delay`), 404의 파형 막대 40건, `Reveal` 런타임 전환값 (2026-10-04 재측정, 원래 27건)
- [x] `build.assetsInlineLimit: 0`으로 `data:` 폰트 제거 — 2026-10-04 [W-005](W-005-main-app-feel.md)에서 적용, 빌드 CSS의 `data:` 폰트 0건 확인
- [ ] 수정한 CSP로 다시 측정해 위반 0건 확인
- [ ] 방침에 맞게 `public/_headers`를 살리거나 지우고, [docs/architecture.md](../architecture.md)의 알려진 구조 제약을 갱신

재개에 필요한 코드 상태: 브랜치 `main`. 소스 변경 없음.
