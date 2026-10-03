# W-001 · 문서 구조 적용과 현황 파악

- 상태: 완료
- 최근 갱신: 2026-10-04
- 관련 문서: [docs/README.md](../README.md), [AGENTS.md](../../AGENTS.md)

## 현재 상황

docs-starter의 한국어 문서 구조를 이 저장소에 적용했습니다. 기존 [README.md](../../README.md), [PRODUCT.md](../../PRODUCT.md), `docs/REMAINING_WORK.md`는 보존했고, 초기 문서는 코드와 라이브 사이트에서 확인한 내용으로 채웠습니다. 확인할 수 없는 내용은 `미정`·`미확인`으로 남겼습니다.

적용 과정에서 코드 현황을 파악하다가 보안 헤더 관련 문제 두 건을 확인했습니다. 호스팅 방침이 정해져야 고칠 수 있어 이 작업에서는 기록만 했습니다.

- 완료 조건: `AGENTS.md`, `CLAUDE.md`, `docs/`의 기본·선택 문서와 템플릿이 자리 잡고, 문서 홈에서 현재 상황과 작업 목록을 찾을 수 있다.
- 사람이 판단할 사항: 보안 응답 헤더를 어떻게 할지(현 상태 수용 / 호스트 이전 / 프록시). [docs/plan.md](../plan.md)의 ‘아직 결정할 사항’ 참고.

## 진행과 판단

### 배경과 범위

문서가 `docs/REMAINING_WORK.md` 하나뿐이었고, 그 문서가 "배포 불가, 플레이스홀더 9개, 호스트 미정, CI 없음" 상태로 멈춰 있어 현재 코드와 크게 어긋나 있었습니다. 사람과 에이전트가 함께 읽을 공통 맥락을 만드는 것이 이번 범위입니다. 기존 문서의 내용을 고치거나 옮기는 것은 범위에 넣지 않았습니다.

### 중요한 시도와 결정

- 2026-10-04 — docs-starter의 `AGENTS.md`를 가져오면서 "이 템플릿을 다룰 때" 절은 제외했습니다. docs-starter 저장소 자체를 유지보수할 때의 규칙이라 적용 대상 프로젝트에는 해당하지 않습니다. 대신 이 저장소에만 해당하는 규칙을 "이 저장소의 추가 규칙"으로 덧붙였습니다.
- 2026-10-04 — `docs/design.md`를 포함했습니다. 랜딩과 법률 문서의 시각 기준이 실제 작업에 반복해서 영향을 주고, 디자인 토큰과 공통 컴포넌트가 이미 정리돼 있어 선택 문서를 쓸 조건이 됩니다. 관찰된 구현과 합의된 기준을 분리했고, 합의된 기준에는 근거 커밋을 달았습니다.
- 2026-10-04 — `docs/REMAINING_WORK.md`는 수정하지 않고 그대로 뒀습니다. 요청 범위가 보존이었고, 어느 항목이 실제로 끝났는지는 앱 저장소의 결정 기록과 대조해야 확정할 수 있습니다. 대신 문서 홈과 `AGENTS.md`에 "현재 코드보다 오래됐다"고 명시했습니다.
- 2026-10-04 — 코드 현황 파악 중 **GitHub Pages가 `public/_headers`를 무시한다**는 것을 라이브 응답으로 확인했습니다. CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `Referrer-Policy`가 하나도 나가지 않습니다. 파일은 `/_headers`로 그냥 서빙됩니다.
- 2026-10-04 — 이어서 **그 CSP를 지금 켜면 사이트가 깨진다**는 것을 확인했습니다. `dist/`를 `_headers`의 CSP를 붙여 로컬에 서빙하고 헤드리스 Chrome으로 로드한 결과, `style-src 'self'`가 [src/components/Waveform.tsx](../../src/components/Waveform.tsx)의 인라인 `style` 속성 24건을 전부 차단해 파형 바의 computed height가 모두 `0px`가 됐고, `font-src 'self'`가 Vite가 base64로 인라인한 `data:font/woff2` 1건을 차단했습니다. 콘솔 CSP 위반 25건, 그 외 에러 0건. 이 CSP는 한 번도 적용된 적이 없어 지금까지 드러나지 않았습니다.
- 2026-10-04 — 앱 저장소 `spot-mixtape`의 `src/utils/legalUrls.ts`를 확인해, 하위 경로 origin을 받도록 이미 수정돼 있음을 확인했습니다. `docs/REMAINING_WORK.md` 5장의 "경로가 없어야 한다"는 서술은 더 이상 맞지 않습니다.
- 2026-10-04 — 앱 저장소 `docs/RELEASE_RUNBOOK.md`에서 변호사 검토가 2026-09-05 OWNER 결정으로 생략됐음을 확인했습니다. `docs/REMAINING_WORK.md` 3장의 검토 항목 목록은 그 결정 이전 문서입니다.
- 2026-10-04 — 사용자 요청으로 [README.md](../../README.md)의 "배포 전 필수 작업" 절을 갱신했습니다. 값이 모두 확정돼 "배포 전"이라는 제목이 더 이상 맞지 않아 "법률 값 관리"로 바꾸고, 교체 대상 목록을 현재 값 표로 바꿨습니다. `developerName`이 `appStoreSellerName`·`playDeveloperName`로 나뉜 것과 `postalAddress`가 `null`인 것을 반영했고, 변호사 검토 생략 결정을 적었습니다. 이어서 "잔여 작업"과 "배포" 절도 갱신했습니다. 전자는 문서 홈을 먼저 가리키고 `REMAINING_WORK.md`가 낡았다는 점을 밝히도록, 후자는 GitHub Pages 배포 사실과 워크플로를 적고 보안 헤더가 적용되지 않는다는 사실을 하위 절로 분리했습니다.

### 검증

- `pnpm config:check` — 통과(플레이스홀더 0개), 로컬 Node 22.12.0
- `pnpm build` — 통과, `prerender: wrote 8 pages + sitemap.xml + robots.txt`, placeholder 경고 없음
- 라이브 URL 상태 확인 — `/`, `/privacy`, `/privacy/`, `/privacy.html`, `/terms`, `/account-deletion`, `/sitemap.xml`, `/robots.txt` 모두 200, `/nope` 404. `curl`, 2026-10-04
- 라이브 보안 헤더 확인 — `curl -sI`로 `/privacy` 응답에 CSP·XFO·nosniff·Permissions-Policy·Referrer-Policy **없음** 확인
- CSP 적용 시 영향 확인 — `dist/`를 `_headers`의 CSP로 로컬 서빙 후 헤드리스 Chrome 152 + CDP로 측정. 위반 25건, 파형 바 24개 `0px`. `upgrade-insecure-requests`만 http 프로브를 위해 제외
- 문서 자체의 링크·구조 — 미검증. 상대경로 링크를 사람이 한 번 확인하면 좋습니다

- 2026-10-04 — 원격에 `86069ad`(토큰 계약 기반 UI 전면 개편, 15 files)가 먼저 올라와 브랜치가 갈라져 있었습니다. 문서 커밋을 그 위로 rebase하고 `README.md` 충돌을 양쪽 보존으로 해결한 뒤, 트레일러가 있는 7개를 포함해 8개 커밋의 메시지를 재작성하고 force-with-lease로 푸시했습니다. 트리 내용은 재작성 전과 동일함을 `git diff`로 확인했습니다.
- 2026-10-04 — 디자인 문서가 둘이 된 것을 사용자 결정에 따라 정리했습니다. 루트 `DESIGN.md`를 지우고 그 내용과 현재 코드를 근거로 [docs/design.md](../design.md)를 다시 썼습니다. 먼저 쓴 `docs/design.md`는 개편 전 타입 스케일·버튼·`--color-violet` 기준이라 그대로 두면 틀린 문서가 남았을 것입니다. `README.md`와 `src/styles.css` 주석의 참조도 함께 옮겼고, 개편으로 틀려진 [docs/specs.md](../specs.md)의 글꼴·명령 항목과 [docs/architecture.md](../architecture.md)의 빌드 흐름·컴포넌트 목록도 고쳤습니다.

- 2026-10-04 — `docs/REMAINING_WORK.md`를 사용자 결정에 따라 분배하고 삭제했습니다. 갱신하지 않은 이유는 그 문서의 구성(배포 전 단계별 체크리스트)이 이미 배포된 지금의 상태와 맞지 않아서입니다. 배정: 제외 범위의 이유와 국내 개인정보 보호법 보완 후보, 미결정 사항은 [docs/plan.md](../plan.md)로, 앱이 의존하는 URL 출력 계약과 법률 문서 장 번호 규칙은 [docs/architecture.md](../architecture.md)로, 배포 후 `curl` 검증 절차는 [docs/specs.md](../specs.md)로, OWNER/AGENT/REVIEW 역할 구분과 비밀값 취급은 [AGENTS.md](../../AGENTS.md)로 옮겼습니다. 열려 있던 작업은 [W-002](W-002-main-security-headers.md)(보안 헤더·CSP)와 [W-003](W-003-main-manual-verification.md)(수동 확인·공유 자산)로 나눴습니다. 이미 끝난 기준선 항목과 호스트 선택지 비교처럼 결과로 대체된 내용은 옮기지 않았습니다.

### 세션 메모

- 2026-10-04 · Claude Code(Opus 5) — 문서 구조 적용과 초기 작성 완료. 커밋하지 않았습니다. 다음 행동은 사용자 검토 후 커밋.

- 2026-10-04 · Claude Code — 완료로 닫음. 완료 조건(`AGENTS.md`·`CLAUDE.md`·`docs/` 기본·선택 문서·템플릿, 문서 홈에서 현황과 작업 목록 탐색)을 충족했고 세 커밋이 원격에 있습니다. 이 문서의 '사람이 판단할 사항'(보안 헤더)은 [W-002](W-002-main-security-headers.md)가 이어받았습니다.

## 남은 일

- [x] `AGENTS.md`, `CLAUDE.md` 추가 (docs-starter 규칙 + 이 저장소 추가 규칙)
- [x] `docs/README.md`, `plan.md`, `architecture.md`, `specs.md`, `design.md` 초기 작성
- [x] `docs/work/_template.md`, `docs/sessions/_template.md` 복사
- [x] `.gitignore`에 `docs/.local/` 등 병합
- [x] 기존 `README.md`에 문서 홈 링크 추가
- [x] `README.md`의 "배포 전 필수 작업" 절을 현재 값 기준으로 갱신 ("법률 값 관리"로 개제)
- [x] 사용자 검토 후 커밋 — `2c45206`(구조), `84d6273`(DESIGN.md 일원화), `a3452ca`(REMAINING_WORK 분배), 모두 푸시됨
- [x] `README.md`의 "잔여 작업"·"배포" 절 갱신 — 문서 홈 우선 안내, GitHub Pages 배포 사실, 보안 헤더 미적용 명시
- [x] 디자인 문서 일원화 — 루트 `DESIGN.md`를 지우고 `docs/design.md`로 합침
- [x] `docs/REMAINING_WORK.md` 처리 — 갱신 대신 역할별 문서로 분배하고 삭제
- [x] 보안 헤더 방침 결정 후 후속 작업 생성 — [W-002](W-002-main-security-headers.md)로 만들었고 결정 자체는 거기서 대기

재개에 필요한 코드 상태: 해당 없음 — 모두 커밋·푸시됐습니다.
