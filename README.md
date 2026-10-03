# spot-mixtape-web

[spotMixtape](https://github.com/gonasooc/spot-mixtape) 앱의 홍보 랜딩과 법률 문서를 제공하는 정적 사이트다. 앱의 디자인 토큰과 "Digital Vinyl" 컨셉을 그대로 웹으로 옮겼고, 모바일 퍼스트로 작성했다.

## 문서

현재 상황과 작업 목록은 [docs/README.md](./docs/README.md)에서 시작한다. 제품 범위는 [docs/plan.md](./docs/plan.md), 구조는 [docs/architecture.md](./docs/architecture.md), 기술 구성과 검증 방법은 [docs/specs.md](./docs/specs.md), UI 기준은 [docs/design.md](./docs/design.md)에 있다. 에이전트 작업 규칙은 [AGENTS.md](./AGENTS.md)다.

## 페이지

| 경로                 | 내용                                                       |
| -------------------- | ---------------------------------------------------------- |
| `/`                  | 홍보용 랜딩 — 컨셉, 핵심 루프(기록·보관·공유), 운영 원칙   |
| `/privacy`           | 개인정보처리방침                                           |
| `/terms`             | 이용약관                                                   |
| `/account-deletion`  | 계정 삭제 안내 (앱스토어·구글플레이 심사 요구 항목)        |
| `/404.html`          | 404                                                        |

모든 페이지는 빌드 시 정적 HTML로 프리렌더된다. JavaScript가 꺼진 브라우저, 크롤러, 스토어 심사자도 전체 내용을 읽을 수 있고, 이후 React가 같은 마크업을 hydrate해 클라이언트 라우팅을 넘겨받는다.

## 기술 스택

- pnpm `10.33.1`, Node `>=20.19.0`
- Vite 7 + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router 7
- Pretendard(한국어 본문) · Outfit(라틴 워드마크) · JetBrains Mono(숫자·라틴 메타) — 모두 self-host, 외부 CDN 요청 없음
  - 세 글꼴 모두 OFL 1.1이다. 고지와 라이선스 전문은 `public/licenses/fonts.txt`로 배포되고 푸터에서 연결한다

## 설치와 실행

```bash
pnpm install

pnpm dev              # 개발 서버
pnpm build            # 타입체크 → 클라이언트 빌드 → SSR 빌드 → 프리렌더
pnpm preview          # dist를 정적 호스팅과 동일한 방식으로 서빙
pnpm config:check     # 미교체 플레이스홀더 검사
pnpm tokens:check     # 디자인 토큰 이름 충돌 검사 (build가 먼저 실행)
```

`pnpm preview`는 SPA history fallback 없이(`appType: "mpa"`) 서빙한다. 프리렌더된 파일이 실제로 존재하는 경로만 200을 반환하므로 배포 결과를 그대로 확인할 수 있다.

## 디자인 기준

색·서체·간격·모션·문구 규칙과 그 근거는 [DESIGN.md](./DESIGN.md)에 있다. 토큰의 기준
파일은 `src/styles.css`의 `@theme` 하나이며, 컴포넌트에 임의 색값이나 임의 크기를 쓰지
않는다. `pnpm tokens:check`가 색과 글자 크기 네임스페이스의 이름 충돌을 빌드 전에 잡는다.

## 현황과 잔여 작업

현재 상황과 진행 중인 작업 목록은 [docs/README.md](./docs/README.md)에 있다.

[docs/REMAINING_WORK.md](./docs/REMAINING_WORK.md)는 배포 전에 작성한 입력값·법률 검토·검증 기준의 원래 목록이다. 지금은 값이 모두 확정되고 GitHub Pages에 배포된 상태라 어긋나는 항목이 많으므로, 근거로 쓰기 전에 현재 코드와 대조한다. 차이는 [docs/work/W-001-main-docs-structure.md](./docs/work/W-001-main-docs-structure.md)에 정리돼 있다.

## 법률 값 관리

`src/config/site.ts`의 값이 모든 법률 문서에 그대로 렌더된다. `REQUIRED`, `example.com`, `YYYY-MM-DD`가 남아 있으면 검출기가 걸러내고, 그동안 전 페이지는 `noindex` + `Disallow: /` 상태가 된다.

```bash
pnpm config:check   # 남아 있는 항목을 파일:줄 번호와 함께 출력, 있으면 exit 1
```

필수 값은 모두 확정됐고 `pnpm config:check`는 통과한다. 현재 값은 다음과 같다.

| 키 | 현재 값 |
| --- | --- |
| `legalEntity` | 최관수 — 사업자 등록 없이 개인 명의. 문서는 "운영자"로 지칭한다 |
| `appStoreSellerName` | `Gwansoo Choi` — App Store 판매자명 |
| `playDeveloperName` | `gonasooc` — Google Play 개발자 이름 |
| `privacyOfficer` | 최관수 |
| `postalAddress` | `null` — 공개할 사업장이 없어 생략. 방침의 주소 항목과 약관의 우편 안내가 함께 빠진다 |
| `supportEmail` | `spotmixtape.contact@gmail.com` — 계정 삭제 요청 수신처를 겸한다 |
| `publicOrigin` | `https://gonasooc.github.io/spot-mixtape-web` — 하위 경로까지 포함한다 |
| `effectiveDate` | `2026-09-06` |
| `backupRetention` | Supabase 무료 플랜이라 자동 백업 없음, 로그 1일 |
| `deletionRetention` | 백업 사본이 없어 잔존 사본도 없음 |
| `deletionSlaDays` | `30` |

값을 고칠 때 주의할 점:

- 스토어 표기명은 두 콘솔의 값과 **글자 그대로** 같아야 한다. 개인 계정이라 Apple은 법적 명의를, Play는 개발자 이름을 쓰므로 키가 둘로 나뉘어 있다.
- `backupRetention`과 `deletionRetention`은 문장 그대로 문서에 노출된다. 요금제를 바꾸거나 백업을 뜨기 시작하면 반드시 함께 고친다. 실제 운영과 다르면 허위 고지가 된다.
- `publicOrigin`은 Vite asset base, 라우터 basename, canonical·sitemap, 리다이렉트 스텁 목적지를 전부 결정한다. 앱 저장소의 `EXPO_PUBLIC_LEGAL_BASE_URL`과 항상 같은 값이어야 한다.
- 내용을 고쳐 공개할 때마다 `effectiveDate`를 갱신한다.
- 선택적으로 비우는 값은 빈 문자열이 아니라 `null`로 둔다.

스토어 배포 후에는 `appStoreUrl`과 `playStoreUrl`을 채운다. 두 값이 모두 `null`인 현재는 랜딩의 CTA가 "출시 준비 중"과 mailto 버튼으로 표시되고, 한쪽만 채우면 해당 스토어 버튼만 노출된다.

변호사 검토는 2026-09-05 OWNER 결정으로 생략했다. 이미 검토된 문안을 바탕으로 무료 앱에 맞게 불필요한 조항을 걷어낸 형태다. 결정 기록은 앱 저장소 `docs/RELEASE_RUNBOOK.md` 2.1에 있다. 본문이 실제 운영 사실과 어긋나지 않는지는 값을 고칠 때마다 확인한다.

## 배포

`https://gonasooc.github.io/spot-mixtape-web`에 GitHub Pages project page로 배포돼 있다. [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)이 main push마다 `pnpm config:check` → `pnpm build` → 필수 페이지 존재 검사를 거쳐 `dist/`를 올린다. 수동 실행의 `allow_placeholders` 입력은 배포 배관만 확인할 때 쓰는 탈출구이며, 그 경로로 올라간 사이트는 색인되지 않는다.

저장소 이름이 공개 URL의 일부다. 스토어와 개인정보처리방침에 제출한 뒤에는 이름을 바꾸지 않는다.

확장자 없는 URL 처리는 호스트마다 다르므로(Netlify·Cloudflare Pages는 `privacy/index.html`로 해석하지만 nginx·S3는 그렇지 않다) 프리렌더가 `privacy.html`과 `privacy/index.html`을 함께 생성한다. `/privacy`, `/privacy/`, `/privacy.html`이 모든 호스트에서 동작하며, canonical 태그는 `/privacy`로 고정된다.

앱 저장소의 `EXPO_PUBLIC_LEGAL_BASE_URL`은 `site.publicOrigin`과 같은 값이어야 한다. 현재 두 값은 일치한다.

### 보안 헤더가 적용되지 않는다

`public/_headers`는 Netlify·Cloudflare Pages 형식이고 **GitHub Pages는 이 파일을 무시한다.** 2026-10-04 라이브 응답 확인 결과 CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `Referrer-Policy`가 하나도 나가지 않으며, 파일 자체는 `/_headers`로 그냥 서빙된다. 호스팅 방침은 아직 정하지 않았다.

헤더를 살리는 호스트로 옮기더라도 `_headers`의 CSP를 그대로 켜면 사이트가 깨진다. 한 번도 적용된 적이 없어 검증되지 않은 설정이다.

- `style-src 'self'`가 [src/components/Waveform.tsx](./src/components/Waveform.tsx)의 인라인 `style` 속성 24건을 차단해 파형 바가 전부 높이 0이 된다.
- `font-src 'self'`가 Vite가 base64로 인라인한 `data:` 폰트 1건을 차단한다.

배경과 측정 방법은 [docs/architecture.md](./docs/architecture.md)의 알려진 구조 제약에 있다.

## 디자인 토큰

`src/styles.css`의 `@theme` 블록이 앱의 `src/constants/Colors.ts` · `tailwind.config.js`를 그대로 따른다. 앱의 팔레트가 바뀌면 이 블록을 함께 갱신한다.

| 토큰             | 값        | 용도                       |
| ---------------- | --------- | -------------------------- |
| `--color-ink`    | `#0B0D0A` | 기본 배경                  |
| `--color-acid`   | `#C9F55D` | 강조 (Electric Lime)       |
| `--color-violet` | `#9E83CF` | 보조 (record-label violet) |
| `--color-paper`  | `#F3F5EC` | 밝은 섹션 배경, 본문 텍스트 |

한국어 본문은 `word-break: keep-all`로 어절 중간에서 줄바꿈되지 않게 하고, 이메일이나 URL처럼 끊을 수 없는 토큰만 `overflow-wrap: break-word`로 처리한다.
