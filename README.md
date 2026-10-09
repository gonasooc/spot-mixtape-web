# spot-mixtape-web

[spotMixtape](https://github.com/gonasooc/spot-mixtape) 앱의 홍보 랜딩과 법률 문서를 제공하는 정적 사이트다. 앱의 디자인 토큰과 "Digital Vinyl" 컨셉을 그대로 웹으로 옮겼고, 모바일 퍼스트로 작성했다.

## 문서

현재 상황과 작업 목록은 [docs/README.md](./docs/README.md)에서 시작한다. 제품 범위는 [docs/plan.md](./docs/plan.md), 구조는 [docs/architecture.md](./docs/architecture.md), 기술 구성과 검증 방법은 [docs/specs.md](./docs/specs.md), UI 기준은 [docs/design.md](./docs/design.md)에 있다. 에이전트 작업 규칙은 [AGENTS.md](./AGENTS.md)다.

## 페이지

| 경로                 | 내용                                                       |
| -------------------- | ---------------------------------------------------------- |
| `/`                  | 홍보용 랜딩 — 컨셉, 핵심 루프(기록·보관·공유), 운영 원칙. 앱 화면은 히어로와 루프 카드 안에 |
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
- Gothic A1(한국어 본문·제목) · Outfit(라틴 워드마크) · JetBrains Mono(숫자·라틴 메타) — 모두 self-host, 외부 CDN 요청 없음
  - 세 글꼴 모두 OFL 1.1이다. 고지와 라이선스 전문은 `public/licenses/fonts.txt`로 배포되고 푸터에서 연결한다
  - 한글은 unicode-range로 99조각 분할돼 페이지가 실제로 그리는 글자 블록만 받는다. `vite.config.ts`의 `assetsInlineLimit: 0`이 이 조각들을 `data:` URI로 인라인하지 않게 막는다

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

색·서체·간격·모션·문구 규칙과 그 근거는 [docs/design.md](./docs/design.md)에 있다. 토큰의
기준 파일은 `src/styles.css`의 `@theme` 하나이며, 컴포넌트에 임의 색값이나 임의 크기를
쓰지 않는다. `pnpm tokens:check`가 색과 글자 크기 네임스페이스의 이름 충돌을 빌드 전에
잡는다.

## 앱 스크린샷

랜딩의 앱 화면은 앱 저장소 Play 스토어 스크린샷 다섯 장에서 **폰 프레임만 잘라** 쓴다. 정본은
`spot-mixtape/store/android/screenshots/`의 `01-capture`, `02-library`, `03-card-detail`,
`04-mixtape`, `06-export-preview`(1080×1920, 브랜드 배경 위 영어 헤드라인 + 폰 캡처)이고, 이
저장소에는 잘라낸 웹용 사본만 둔다.

| 자리 | 화면 |
| --- | --- |
| 히어로 카드 스택 앞장 | `03-card-detail` — "다시 꺼내 듣습니다"에 해당하는 사운드 카드 상세 |
| 핵심 루프 · 기록 | `01-capture` |
| 핵심 루프 · 보관 | `02-library` + `04-mixtape`, 둘로 나눈 커버 (앱 `MixtapeCardCover`의 분할 레이아웃) |
| 핵심 루프 · 공유 | `06-export-preview` |

- 위치: `src/assets/screenshots/{capture,library,listen,mixtape,share}.webp`, 720×1440(1:2).
  원본에서 폰 프레임(717×1427, 좌상단 182,407) 주위로 740×1480 상자(좌상단 170,380)를 잘라 줄인 것이다.
  `src/assets/`에서 import하므로 Vite가 해시를 붙여 `/assets/`로 내보낸다. 내용이 바뀌면 파일명도
  바뀌므로 캐시가 낡은 이미지를 붙잡지 않는다.
- 갱신: 앱 저장소에서 PNG를 다시 만든 뒤 아래처럼 다시 자른다. 다섯 장의 프레임 위치는 같다.

  ```bash
  cwebp -q 82 -m 6 -crop 170 380 740 1480 -resize 720 1440 01-capture.png -o src/assets/screenshots/capture.webp
  ```

- 주의: 앱 UI는 영어다. 설명은 한국어 본문과 `alt`(`src/pages/Landing.tsx`의 `SHOT`)가 맡는다.
  `01-capture`는 위치 pill의 실제 동네명을 `CURRENT LOCATION`으로 지운 판이어야 하고, 사운드 맵
  장면은 녹음 장소가 드러나 스토어 세트에서 뺐으므로 여기서도 쓰지 않는다. 배경은 앱 저장소
  `store/README.md`에 있다.
- 히어로 이미지는 첫 화면이라 `loading="eager"` + `fetchPriority="high"`, 루프 카드의 커버는
  `loading="lazy"`. 모두 `width`/`height`를 명시해 레이아웃 이동이 없다.

## OG 이미지

공유 미리보기 이미지는 `public/og-image.png`(1200×630, PNG)이고, 모든 페이지가 `og:image`로
같은 이미지를 가리킨다. 앱 저장소의 Play 피처 그래픽(`store/android/feature-graphic-1024x500.png`)과
같은 배치에 랜딩 헤드라인을 한국어로 넣은 것이다. 미리보기에서 이미지가 약 1/4로 줄어도 읽히도록
문구는 볼드로 키웠다.

원본 구성은 [scripts/og-image/](./scripts/og-image/)에 있다. 개발 서버에서만 여는 페이지로, 사이트의
글꼴과 토큰, `Waveform`의 높이 수열을 그대로 쓴다. 빌드·배포에는 들어가지 않는다. 문구를 바꾸면
다시 찍는다.

```bash
pnpm dev   # 기본 포트 5173
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=10000 \
  --screenshot=public/og-image.png http://localhost:5173/spot-mixtape-web/scripts/og-image/
```

카카오톡·페이스북은 미리보기를 오래 캐시한다. 이미지를 바꾼 뒤 예전 미리보기가 계속 보이면 각
서비스의 공유 디버거(카카오 개발자의 "공유 디버거", Facebook Sharing Debugger)에서 캐시를 지운다.

## 현황과 잔여 작업

현재 상황과 진행 중인 작업 목록은 [docs/README.md](./docs/README.md)에 있다. 제품 범위와 아직 결정하지 않은 사항은 [docs/plan.md](./docs/plan.md)에, 개별 작업의 상태는 `docs/work/`에 있다.

출시 전체 절차는 앱 저장소의
[RELEASE_RUNBOOK.md](https://github.com/gonasooc/spot-mixtape/blob/main/docs/RELEASE_RUNBOOK.md)를
따른다. 스토어 콘솔 입력 상태와 OWNER 결정 기록은 그 문서가 정본이다.

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

### 보안 정책은 `<meta>`로 건다

GitHub Pages는 응답 헤더를 바꿀 수 없다. 그래서 Content-Security-Policy와 Referrer-Policy를 빌드된
모든 페이지의 `<meta>`로 넣는다. 정책 문자열은 [scripts/prerender.mjs](./scripts/prerender.mjs)의
`CONTENT_SECURITY_POLICY` 하나이고, 프리렌더가 각 페이지의 `<meta charset>` 바로 뒤에 넣는다.
개발 서버는 인라인 스크립트·스타일을 주입하므로 dev 페이지에는 넣지 않는다. 확인하려면
`pnpm build && pnpm preview`로 띄운다.

- 정책: `default-src 'self'`, `script-src 'self'`, `style-src 'self'`, `font-src 'self'`,
  `img-src 'self' data:`(그레인 텍스처), `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`,
  `form-action 'none'`.
- 그래서 **마크업에 `style` 속성을 쓰지 않는다.** 프리렌더된 HTML의 `style` 속성은 막힌다. 클래스·
  유틸리티·SVG 속성을 쓰고, 런타임 값은 CSSOM(`element.style.setProperty`)으로 넣는다. CSP는
  CSSOM을 막지 않는다. 인라인 `<script>`도 막힌다.
- 헤더로만 걸 수 있는 보호는 없다: 클릭재킹 방지(`frame-ancestors`·`X-Frame-Options`),
  `X-Content-Type-Options`, `Permissions-Policy`, COOP/CORP. 로그인·폼·쿠키가 없는 정적 사이트라
  수용했다(2026-10-09 OWNER 결정, [docs/work/W-002-main-security-headers.md](./docs/work/W-002-main-security-headers.md)).
- 캐시도 정할 수 없다. GitHub Pages는 모든 파일에 `max-age=600`을 주고, 10분이 지나면 ETag로
  다시 확인해 바뀌지 않았으면 304로 답한다.
- 예전 `public/_headers`(Netlify·Cloudflare 형식)는 GitHub Pages가 무시해 효력이 없어 지웠다.
  헤더를 지원하는 호스트로 옮기면 git 기록에서 되살린다.

## 디자인 토큰

`src/styles.css`의 `@theme` 블록이 앱의 `src/constants/Colors.ts` 다크 팔레트를 역할 이름으로 옮긴 것이다. 각 토큰 주석에 앱 쪽 이름이 적혀 있으니 앱의 팔레트가 바뀌면 이 블록을 함께 갱신한다. 마크·아이콘·파형·카드 치수도 앱이 기준이다. 전체 표와 근거는 [docs/design.md](./docs/design.md)에 있다.

| 토큰              | 값        | 앱 이름           | 용도                          |
| ----------------- | --------- | ----------------- | ----------------------------- |
| `--color-canvas`  | `#0B0D0A` | background        | 기본 배경                     |
| `--color-surface` | `#171A15` | surface           | 카드                          |
| `--color-chip`    | `#1E221B` | surfaceElevated   | 조용한 컨트롤 면, 마크 디스크 |
| `--color-ink`     | `#F3F5EC` | text              | 글자                          |
| `--color-acid`    | `#C9F55D` | primary           | 강조 (Electric Lime)          |
| `--color-paper`   | `#F3F5EC` | —                 | 법률 문서 배경 (앱에 대응 없음) |

한국어 본문은 `word-break: keep-all`로 어절 중간에서 줄바꿈되지 않게 하고, 이메일이나 URL처럼 끊을 수 없는 토큰만 `overflow-wrap: break-word`로 처리한다.
