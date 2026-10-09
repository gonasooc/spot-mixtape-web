# W-003 · 사람이 확인해야 할 항목과 공유 자산

- 상태: 진행 중
- 최근 갱신: 2026-10-09
- 관련 문서: [docs/specs.md](../specs.md), [docs/design.md](../design.md)

## 현재 상황

자동 검증으로는 덮을 수 없어 사람이 직접 해야 하는 확인과 공유용 이미지 자산을 모읍니다. 배포를 막는 항목은 없습니다. 공유 자산은 2026-10-09에 OG 이미지까지 만들어 모두 끝났고(배포 대기), 남은 것은 사람이 해야 하는 확인입니다.

지금까지의 검증은 전부 헤드리스 Chrome과 `curl`로 했습니다. 실기기, 실제 메일 수신, 실제 스크린리더는 확인하지 않았습니다.

- 완료 조건: 아래 ‘남은 일’의 확인 항목이 실제 기기·실제 수신함에서 통과하고, OG 이미지와 `apple-touch-icon`이 배포본에 들어간다.
- 사람이 판단할 사항: 없음. OG 이미지는 2026-10-09 사용자가 "한국어로 새로 합성"을 택했습니다.

## 진행과 판단

### 배경과 범위

배포 전 체크리스트에 남아 있던 수동 확인 항목과 미완성 자산을 이어받습니다. 기계로 확인할 수 있는 것(URL 상태 코드, 헤더, 가로 넘침, 대비, 굵기)은 이미 [docs/specs.md](../specs.md)와 [docs/design.md](../design.md)의 절차로 옮겼으므로 여기서는 다루지 않습니다.

### 중요한 시도와 결정

- 2026-10-04 — 프리렌더된 `<head>`에 `og:image`가 없고 `twitter:card`가 `summary`임을 확인했습니다. 카카오톡·슬랙·X 공유 시 썸네일이 나오지 않습니다. 이미지를 만들면 `public/`에 넣고 [scripts/prerender.mjs](../../scripts/prerender.mjs)의 `buildHead()`에 절대 URL을 추가한 뒤 `twitter:card`를 `summary_large_image`로 올립니다.
- 2026-10-09 — **OG 이미지.** 사용자가 세 안(한국어로 새로 합성 / 피처 그래픽 재사용 / 만들지 않음) 중 한국어 합성을 택했습니다. 앱의 Play 피처 그래픽(1024×500)을 재서 같은 배치로 1200×630에 옮겼습니다 — 마크 지름 236 → 280, 텍스트 열 x 397 → 465, 내용 전체 세로 가운데. 문구는 랜딩 헤드라인을 히어로처럼 볼드·둘째 줄 애시드로 했습니다. 피처 그래픽의 회색 보통 굵기는 미리보기 크기(300–400px)로 줄이면 읽히지 않습니다. 구성은 개발 서버 전용 페이지 [scripts/og-image/](../../scripts/og-image/)로 두어 사이트의 글꼴·토큰·파형 수열을 그대로 쓰고, Chrome으로 찍어 [public/og-image.png](../../public/og-image.png)(64KB)를 만들었습니다. 파형 수열을 재사용하려고 `Waveform`의 배열을 `WAVEFORM_HEIGHTS`로 export했습니다. [scripts/prerender.mjs](../../scripts/prerender.mjs)의 `buildHead()`에 `og:image`(절대 URL)·크기·`og:image:alt`를 넣고 `twitter:card`를 `summary_large_image`로 올렸습니다.
- 2026-10-04 — [index.html](../../index.html)이 `apple-touch-icon`으로 `favicon.svg`를 가리키는 것을 확인했습니다. iOS는 SVG를 지원하지 않아 무시됩니다. 180×180 PNG가 필요하며 앱 저장소의 `assets/images/icon.png`를 쓸 수 있습니다.

### 검증

- 계정 삭제 mailto 링크(기계 확인, 2026-10-09) — 빌드된 `privacy.html`의 `href`를 해독. 받는 주소 `spotmixtape.contact@gmail.com`, 제목 "spotMixtape 계정 삭제 요청", 본문 템플릿 4줄(첨부 금지 안내, 계정 이메일, 로그인 방식, 요청 사유)이 올바르게 인코딩돼 있음. 실제 메일 앱에서 열리는지는 사람이 확인할 몫으로 남김
- OG 이미지(2026-10-09, 로컬) — 개발 서버 구성 페이지를 헤드리스 Chrome 152로 1200×630 렌더, 글꼴 3종 로드·텍스트 넘침 없음. 300·400px 축소본에서 워드마크와 한국어 헤드라인이 읽힘. README의 Chrome 명령 한 줄로 찍은 결과와 비교해 색은 같고 차이 20 이상 픽셀이 0.02%(가장자리 안티에일리어싱)라 재현 방법으로 유효. `pnpm build` 후 `dist/og-image.png` 64KB, 네 페이지 모두 `og:image`가 `https://gonasooc.github.io/spot-mixtape-web/og-image.png`, `twitter:card` `summary_large_image`, `og:image:alt` 있음
- 실제 공유 미리보기 — 미실행(배포 전)

### 세션 메모

- 2026-10-04 · Claude Code(Opus 5) — 항목만 모아 등록했습니다. 착수하지 않았습니다.
- 2026-10-09 · Claude Code(Opus 5.5) — OG 이미지를 만들고 mailto 링크를 기계로 확인했습니다. 커밋하지 않았습니다. 남은 것은 모두 사람이 해야 하는 확인이고, 배포 뒤에 해야 의미가 있습니다.

## 남은 일

공유 자산:

- [x] OG 이미지 1200×630 PNG 제작 여부 결정, 만들면 `public/`에 넣고 `buildHead()`에 `og:image` 절대 URL 추가 + `twitter:card`를 `summary_large_image`로 — 2026-10-09 한국어로 합성, `public/og-image.png`
- [ ] 배포 뒤 카카오톡·슬랙에 랜딩 URL을 붙여 미리보기에 이미지가 뜨는지 확인 (사람)
- [x] `apple-touch-icon` 180×180 PNG 제작, `index.html` 교체 — 2026-10-04 [W-004](W-004-main-app-brand-alignment.md)에서 앱 `icon.png`를 리사이즈해 넣었고 48px `favicon.png`도 함께 추가

사람이 직접 확인:

- [ ] `spotmixtape.contact@gmail.com`으로 실제 테스트 메일을 보내 수신 확인
- [ ] 계정 삭제 요청 mailto 링크가 제목·본문 템플릿과 함께 열리는지 확인 (`deletionRequestMailto`) — 링크 인코딩은 2026-10-09 기계로 확인됨, 실제 메일 앱에서 열기만 남음. 이 링크로 그대로 보내면 위 수신 확인도 함께 끝남
- [x] 로그아웃·시크릿 브라우저에서 네 페이지 열람 — 불필요: 이 사이트에는 로그인이 없고 세션에 따라 달라지는 요소도 없다. 2026-10-04 비인증 `curl`로 라이브 `/`, `/privacy`, `/privacy/`, `/privacy.html`, `/terms`, `/account-deletion` 모두 200
- [ ] 모바일 실기기에서 랜딩·개인정보처리방침 스크롤과 목차 앵커 동작 확인
- [x] 계정 삭제 안내가 로그인 없이, 앱 설치 없이 열리는지 스토어 심사 기준으로 확인 — 2026-10-04 비인증 `curl`로 `/account-deletion` 200(정적 meta refresh 스텁 → `/privacy#account-deletion`), 방침 8장 '계정 삭제'가 프리렌더된 HTML에 포함. 앱 없이 읽힌다
- [ ] VoiceOver·TalkBack으로 건너뛰기 링크와 목차 확인

재개에 필요한 코드 상태: 브랜치 `main`, 기준 커밋 `fc20701`. 미커밋 변경 — `public/og-image.png`, `scripts/og-image/`, `scripts/prerender.mjs`(og:image), `src/components/Waveform.tsx`(export), 문서. W-002 변경과 같은 작업 트리.
