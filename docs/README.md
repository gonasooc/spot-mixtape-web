# 프로젝트 문서

## 현재 상황

[spotMixtape](https://github.com/gonasooc/spot-mixtape) 앱의 랜딩과 법률 문서를 제공하는 정적 사이트입니다. 법률 값이 모두 확정돼 `https://gonasooc.github.io/spot-mixtape-web`에 배포돼 있고, 색인도 열려 있습니다.

지금 남은 것은 배포 자체가 아니라 그 주변입니다. 현재 호스트가 `public/_headers`를 무시해 보안 응답 헤더가 하나도 나가지 않고, 그 헤더를 살리는 호스트로 옮기려면 CSP와 충돌하는 구현을 먼저 고쳐야 합니다. 호스팅 방침 결정이 다음 분기점입니다.

## 기본 문서

- [docs/plan.md](plan.md): 제품 목적, 사용자, 기능 범위, 사용자 흐름, 제품 정책
- [docs/architecture.md](architecture.md): 구성 요소, 폴더 책임, 의존 관계, 구조 규칙
- [docs/specs.md](specs.md): 기술 스택, 구현 규칙, 실행·검증 방법

제품 기획 → 구조 → 구현 규칙 순으로 안내합니다. 매 작업마다 전부 읽을 필요는 없으며, 현재 작업에 필요한 문서를 선택합니다.

## 선택 문서

- [docs/design.md](design.md): UI 디자인 기준, 관찰된 구현, 코드·화면 근거

UI를 추가·수정·검토하기 전에 관련 부분을 확인합니다.

## 그 밖의 문서

- [README.md](../README.md): 저장소 소개, 페이지 목록, 설치와 실행, 법률 값 현황
- [PRODUCT.md](../PRODUCT.md): 브랜드 톤과 안티레퍼런스의 원본
- 앱 저장소 `spot-mixtape`의 `docs/RELEASE_RUNBOOK.md`: 출시 전체 절차의 정본. 스토어 콘솔 입력 상태와 OWNER 결정 기록이 여기 있습니다

## 진행 중·예정·보류 작업

- [docs/work/W-002-main-security-headers.md](work/W-002-main-security-headers.md) — 보안 헤더 방침과 CSP 대응 — 보류 (OWNER 결정 대기)
- [docs/work/W-003-main-manual-verification.md](work/W-003-main-manual-verification.md) — 사람이 확인해야 할 항목과 공유 자산 — 예정
- [docs/work/W-001-main-docs-structure.md](work/W-001-main-docs-structure.md) — 문서 구조 적용과 현황 파악 — 진행 중

새 작업은 [docs/work/_template.md](work/_template.md)를 복사한 뒤 이 목록에 상대경로 링크를 추가합니다. 상태는 `예정`, `진행 중`, `보류`, `완료`를 사용합니다.

## 최근 완료

완료한 작업이 없습니다. 완료 후에도 원래 작업 문서를 보존하고 링크를 이곳으로 옮깁니다.

## 기록을 찾을 때

작업 문서의 ‘현재 상황’과 ‘남은 일’의 미완료 항목부터 읽으세요. 완료한 항목은 체크된 상태로 남아 있습니다. 보류 이유와 재개 조건은 ‘현재 상황’에, 선택한 이유와 검증 결과는 ‘진행과 판단’에 있습니다. 상세 세션 기록이 있으면 해당 작업 문서에서 연결합니다.

문서 작성·갱신 규칙은 [AGENTS.md](../AGENTS.md)를 참고하세요.
