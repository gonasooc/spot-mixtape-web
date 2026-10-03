# 아키텍처

시스템을 어떻게 나누고 연결하는지 다룹니다. 기술 스택·버전과 구현·검증 규칙은 [docs/specs.md](specs.md)에서 관리합니다.

## 구성 요소와 책임

| 구성 요소 | 책임 |
| --- | --- |
| `src/config/site.ts` | 법적으로 의미 있는 모든 값의 단일 출처. 상호, 스토어 표기명, 보호책임자, 지원 이메일, 공개 origin, 시행일, 보관 기간, 스토어 URL. `findUnresolvedConfigKeys()`로 미교체 플레이스홀더를 노출한다 |
| `src/basePath.ts` | `site.publicOrigin`의 경로에서 배포 서브패스를 끌어낸다. Vite asset base, 라우터 basename, 리다이렉트 스텁 목적지가 모두 여기서 나온다 |
| `src/routes.ts` | 라우트별 메타데이터(제목, 설명, theme-color, 색인 여부)와 경로→메타 조회. 플레이스홀더가 남아 있으면 전 라우트의 `indexable`을 끈다 |
| `scripts/prerender.mjs` | SSR 번들로 각 라우트를 정적 HTML로 출력하고, 리다이렉트 스텁·`sitemap.xml`·`robots.txt`를 생성한 뒤 `dist-ssr/`을 지운다 |
| `scripts/check-config.mjs` | 플레이스홀더 검출기. 남아 있으면 파일:줄과 함께 출력하고 exit 1 |
| `src/entry-server.tsx` | 프리렌더용 진입점. `StaticRouter`로 한 경로를 문자열로 렌더하고, 프리렌더 스크립트가 쓸 값들을 재수출한다 |
| `src/entry-client.tsx` | 브라우저 진입점. 프로덕션에서는 프리렌더된 마크업을 hydrate하고, 개발 서버에서는 빈 루트에 새로 마운트한다 |
| `.github/workflows/deploy.yml` | main push와 수동 실행으로 GitHub Pages에 배포. `config:check`와 필수 페이지 존재 검사를 통과해야 올라간다 |
| 외부: GitHub Pages | 정적 호스팅. 커스텀 응답 헤더를 지원하지 않는다 |
| 외부: `spot-mixtape` 앱 저장소 | `EXPO_PUBLIC_LEGAL_BASE_URL`에 이 사이트의 origin을 넣고 `.html` 경로를 이어 붙여 앱 내 링크를 만든다 |

## 주요 폴더와 흐름

```text
src/
├── config/site.ts        # 법률 값 단일 출처
├── basePath.ts           # 배포 서브패스 파생
├── routes.ts             # 라우트 메타와 색인 게이트
├── App.tsx               # 라우팅 + 스크롤 복원
├── useDocumentMeta.ts    # 클라이언트 내비게이션 시 head 동기화
├── entry-client.tsx      # hydrate / mount
├── entry-server.tsx      # 프리렌더 렌더 함수
├── styles.css            # Tailwind v4 @theme 토큰, base 레이어, 유틸리티
├── components/           # Layout, PolicyLayout, ui, Waveform, BrandMark
└── pages/                # Landing, Privacy, Terms, NotFound
```

빌드 흐름은 `tsc -b` → 클라이언트 빌드(`dist/`) → SSR 빌드(`dist-ssr/`) → 프리렌더입니다. 프리렌더는 `dist/index.html`을 템플릿으로 삼아 `<!--app-html-->`과 `<title>`·`theme-color`를 바꿔 끼우고 `</head>` 앞에 메타 블록을 넣습니다.

라우트 하나당 `privacy.html`과 `privacy/index.html`을 함께 씁니다. 확장자 없는 URL을 호스트마다 다르게 해석하기 때문이며, canonical은 확장자 없는 쪽으로 고정합니다.

## 지켜야 할 구조 규칙

- **법률 값은 `src/config/site.ts`에서만 읽는다.** 페이지 컴포넌트에 상호·이메일·날짜를 직접 쓰지 않는다. 한 곳만 고치면 세 페이지와 푸터, canonical, sitemap이 함께 따라오게 하기 위함이다.
- **`src/basePath.ts`는 `./config/site`를 상대경로로 import한다.** `vite.config.ts`가 자기 alias를 해석하는 중에 이 모듈을 읽기 때문에 `@` alias를 쓸 수 없다. 이 import를 alias로 바꾸면 빌드가 깨진다.
- **배포 서브패스는 `site.publicOrigin` 하나에서만 파생한다.** Vite `base`, 라우터 basename, 리다이렉트 스텁이 전부 `basePath`를 거친다. 호스트를 옮길 때 고칠 값은 `publicOrigin` 하나여야 한다.
- **브라우저가 직접 해석하는 절대 경로에는 `withBasePath()`를 쓴다.** 라우터를 거치지 않는 meta refresh 스텁의 목적지가 그렇다. 빠뜨리면 서브패스 배포에서 그 URL만 깨진다.
- **프리렌더 출력 계약을 바꾸지 않는다.** 앱의 `src/utils/legalUrls.ts`가 `privacy.html`, `terms.html`, `account-deletion.html`을 하드코딩하고 스토어 콘솔에도 같은 URL이 등록돼 있다. 워크플로의 필수 페이지 검사가 이 계약을 지킨다.
- **색인 여부는 `routes.ts`가 단독으로 판단한다.** 개별 페이지에서 robots 메타를 따로 쓰지 않는다. 프리렌더와 `useDocumentMeta`가 같은 값을 쓴다.

## 알려진 구조 제약

- **GitHub Pages는 커스텀 응답 헤더를 지원하지 않는다.** `public/_headers`는 Netlify·Cloudflare Pages 형식이라 현재 호스트에서 완전히 무시된다. 2026-10-04 라이브 응답 확인 결과 CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `Referrer-Policy`가 하나도 나가지 않는다. 파일 자체는 `/_headers`로 그냥 서빙된다.
- **`_headers`의 CSP는 지금 켜면 사이트를 깨뜨린다.** 한 번도 적용된 적이 없어 검증되지 않았다. 2026-10-04 dist를 그 헤더 그대로 로컬에 띄워 확인한 결과, `style-src 'self'`가 `Waveform`의 인라인 `style` 속성 24건을 차단해 파형 바가 전부 `0px`가 되고, `font-src 'self'`가 Vite가 base64로 인라인한 `data:` 폰트 1건을 차단한다. 헤더를 살리는 호스트로 옮기기 전에 CSP나 구현을 먼저 고쳐야 한다. 근거는 [docs/work/W-001-main-docs-structure.md](work/W-001-main-docs-structure.md)에 있다.
- **공개 origin이 도메인 루트가 아니라 하위 경로다.** `https://gonasooc.github.io/spot-mixtape-web`. 앱의 `getLegalPageUrl()`은 하위 경로를 받도록 이미 수정돼 있지만(끝 슬래시는 정규화, `.html`로 끝나면 거절), 루트 배포를 가정한 코드나 문서가 남아 있으면 어긋난다.
- **저장소 이름이 공개 URL의 일부다.** 이름을 바꾸면 스토어와 방침에 제출한 URL이 전부 깨진다.
- **배포 워크플로는 main push 전용이다.** PR 시점에 `config:check`나 빌드를 돌리는 워크플로는 없다.
