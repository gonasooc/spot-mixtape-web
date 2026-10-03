# W-003 · 사람이 확인해야 할 항목과 공유 자산

- 상태: 예정
- 최근 갱신: 2026-10-04
- 관련 문서: [docs/specs.md](../specs.md), [docs/design.md](../design.md)

## 현재 상황

자동 검증으로는 덮을 수 없어 사람이 직접 해야 하는 확인과, 아직 만들지 않은 공유용 이미지 자산을 모읍니다. 배포를 막는 항목은 없습니다.

지금까지의 검증은 전부 헤드리스 Chrome과 `curl`로 했습니다. 실기기, 실제 메일 수신, 실제 스크린리더는 확인하지 않았습니다.

- 완료 조건: 아래 ‘남은 일’의 확인 항목이 실제 기기·실제 수신함에서 통과하고, OG 이미지와 `apple-touch-icon`이 배포본에 들어간다.
- 사람이 판단할 사항: OG 이미지를 만들지 여부. 만들지 않기로 하면 그 결정을 [docs/plan.md](../plan.md)에 남기고 이 항목을 닫는다.

## 진행과 판단

### 배경과 범위

배포 전 체크리스트에 남아 있던 수동 확인 항목과 미완성 자산을 이어받습니다. 기계로 확인할 수 있는 것(URL 상태 코드, 헤더, 가로 넘침, 대비, 굵기)은 이미 [docs/specs.md](../specs.md)와 [docs/design.md](../design.md)의 절차로 옮겼으므로 여기서는 다루지 않습니다.

### 중요한 시도와 결정

- 2026-10-04 — 프리렌더된 `<head>`에 `og:image`가 없고 `twitter:card`가 `summary`임을 확인했습니다. 카카오톡·슬랙·X 공유 시 썸네일이 나오지 않습니다. 이미지를 만들면 `public/`에 넣고 [scripts/prerender.mjs](../../scripts/prerender.mjs)의 `buildHead()`에 절대 URL을 추가한 뒤 `twitter:card`를 `summary_large_image`로 올립니다.
- 2026-10-04 — [index.html](../../index.html)이 `apple-touch-icon`으로 `favicon.svg`를 가리키는 것을 확인했습니다. iOS는 SVG를 지원하지 않아 무시됩니다. 180×180 PNG가 필요하며 앱 저장소의 `assets/images/icon.png`를 쓸 수 있습니다.

### 검증

- 아직 없음

### 세션 메모

- 2026-10-04 · Claude Code(Opus 5) — 항목만 모아 등록했습니다. 착수하지 않았습니다.

## 남은 일

공유 자산:

- [ ] OG 이미지 1200×630 PNG 제작 여부 결정, 만들면 `public/`에 넣고 `buildHead()`에 `og:image` 절대 URL 추가 + `twitter:card`를 `summary_large_image`로
- [x] `apple-touch-icon` 180×180 PNG 제작, `index.html` 교체 — 2026-10-04 [W-004](W-004-main-app-brand-alignment.md)에서 앱 `icon.png`를 리사이즈해 넣었고 48px `favicon.png`도 함께 추가

사람이 직접 확인:

- [ ] `spotmixtape.contact@gmail.com`으로 실제 테스트 메일을 보내 수신 확인
- [ ] 계정 삭제 요청 mailto 링크가 제목·본문 템플릿과 함께 열리는지 확인 (`deletionRequestMailto`)
- [x] 로그아웃·시크릿 브라우저에서 네 페이지 열람 — 불필요: 이 사이트에는 로그인이 없고 세션에 따라 달라지는 요소도 없다. 2026-10-04 비인증 `curl`로 라이브 `/`, `/privacy`, `/privacy/`, `/privacy.html`, `/terms`, `/account-deletion` 모두 200
- [ ] 모바일 실기기에서 랜딩·개인정보처리방침 스크롤과 목차 앵커 동작 확인
- [x] 계정 삭제 안내가 로그인 없이, 앱 설치 없이 열리는지 스토어 심사 기준으로 확인 — 2026-10-04 비인증 `curl`로 `/account-deletion` 200(정적 meta refresh 스텁 → `/privacy#account-deletion`), 방침 8장 '계정 삭제'가 프리렌더된 HTML에 포함. 앱 없이 읽힌다
- [ ] VoiceOver·TalkBack으로 건너뛰기 링크와 목차 확인

재개에 필요한 코드 상태: 브랜치 `main`. 소스 변경 없음.
