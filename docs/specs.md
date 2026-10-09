# 기술 명세

어떤 기술과 구현·검증 규칙을 따르는지 다룹니다. 구성 요소의 책임과 의존 관계 등 구조 규칙은 [docs/architecture.md](architecture.md)에서 관리합니다.

## 기술 구성

버전은 [package.json](../package.json)과 [.node-version](../.node-version)을 근거로 합니다.

| 항목 | 값 | 비고 |
| --- | --- | --- |
| 패키지 매니저 | pnpm `10.33.1` | `packageManager` 필드로 고정 |
| Node | `>=20.19.0`, `.node-version`은 `20.19.0` | CI가 `node-version-file`로 읽는다 |
| 번들러 | Vite `^7.1.11` | [vite.config.ts](../vite.config.ts) |
| UI | React `^19.2.0`, React Router `^7.9.4` | |
| 스타일 | Tailwind CSS `^4.1.16` (`@tailwindcss/vite`) | 설정 파일 없이 [src/styles.css](../src/styles.css)의 `@theme`로 토큰 정의 |
| 폰트 | `@fontsource/gothic-a1` 400·500·700(한국어), `@fontsource-variable/outfit`(라틴 워드마크), `@fontsource-variable/jetbrains-mono`(숫자·라틴 메타) | 모두 self-host, 외부 CDN 요청 없음. 셋 다 OFL 1.1이고 고지는 `public/licenses/fonts.txt`. 한글은 unicode-range 99조각이며 `assetsInlineLimit: 0`으로 인라인하지 않는다 |
| 타입 | TypeScript `^5.9.3`, 빌드 타깃 `es2022` | |
| 호스팅 | GitHub Pages project page | [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) |

린터·포매터·테스트 러너는 도입하지 않았습니다.

## 지켜야 할 구현 규칙

- **`src/config/site.ts`를 고치면 `pnpm config:check`와 `pnpm build`를 함께 돌린다.** 이 파일의 문자열이 법률 문서 본문에 그대로 렌더된다. `REQUIRED`, `example.com`, `YYYY-MM-DD` 중 하나라도 남으면 검출기가 exit 1을 내고, 전 페이지가 `noindex`로 떨어진다.
- **선택적으로 비울 수 있는 값은 `null`로 둔다.** `postalAddress`가 그렇다. 페이지 쪽에서 조건부로 렌더해 문장과 표 행이 함께 빠지게 한다. 빈 문자열을 쓰지 않는다.
- **`pnpm preview`는 SPA history fallback 없이(`appType: "mpa"`) 돈다.** 프로덕션과 같은 정적 호스트 동작을 재현하기 위해서이며, fallback을 켜면 깨진 URL과 404가 가려진다. 이 설정을 바꾸지 않는다.
- **색·크기는 `src/styles.css`의 `@theme`에서만 온다.** 컴포넌트에 임의 색값이나 임의 크기를 쓰지 않으며, 한 이름을 색과 글자 크기 네임스페이스에 겹쳐 두지 않는다. `pnpm tokens:check`가 후자를 빌드 전에 잡는다. 근거는 [docs/design.md](design.md).
- **마크업에 `style` 속성을 쓰지 않는다.** 빌드된 페이지는 meta CSP(`style-src 'self'`)를 달고 있어 프리렌더된 HTML의 `style` 속성이 막힌다. 클래스·유틸리티(예: 히어로 지연의 `enter-delay-*`)·SVG 표현 속성(예: 파형 막대의 `height`)을 쓰고, 런타임 값은 CSSOM(`element.style.setProperty`)으로 넣는다 — CSP는 CSSOM을 막지 않는다. 인라인 `<script>`와 `eval`, `data:` 글꼴도 막힌다. 정책의 위치와 범위는 [docs/architecture.md](architecture.md)를 본다.
- **레이어 밖 CSS에서 `animation` 단축 속성을 쓰지 않는다.** `src/styles.css`의 일반 규칙은 Tailwind의 `utilities` 레이어보다 우선하므로, 단축 속성이 유틸리티가 준 `animation-delay`를 0으로 덮는다. `.enter`가 개별 속성으로 쓰인 이유다.
- **이미지는 `src/assets/`에서 import한다.** `public/`에 두면 하위 경로와 해시 캐시를 직접 챙겨야 한다. 사진류는 WebP로 줄여 넣고(`cwebp -q 82`), `loading="lazy"`와 명시적 `width`/`height`를 함께 쓴다. 스토어 스크린샷의 정본과 갱신 절차는 [README.md](../README.md)의 "앱 스크린샷"에 있다.
- **한국어 본문은 `word-break: keep-all`을 전제로 작성한다.** 어절 중간에서 줄바꿈되지 않으며, 이메일·URL처럼 끊을 수 없는 토큰만 `overflow-wrap: break-word`로 처리한다.
- **커밋 메시지에 도구 귀속 줄(`Co-Authored-By` 등)을 붙이지 않는다.**

## 실행과 검증

| 목적 | 명령 또는 확인 방법 | 필요한 조건 |
| --- | --- | --- |
| 준비 | `pnpm install` | Node `>=20.19.0`, pnpm `10.33.1` |
| 실행 | `pnpm dev` | 개발 서버. 프리렌더가 없으므로 빈 루트에 마운트된다 |
| 테스트 | 해당 없음 | 테스트 러너를 도입하지 않았다 |
| 정적 검사·빌드 | `pnpm typecheck` (`tsc -b`) / `pnpm build` | `build`는 토큰 검사 → 타입체크 → 클라이언트 → SSR → 프리렌더 순으로 돈다. 산출물은 `dist/` |
| 법률 값 검사 | `pnpm config:check` | 미교체 플레이스홀더가 있으면 exit 1 |
| 디자인 토큰 검사 | `pnpm tokens:check` | 한 이름이 두 네임스페이스에 있으면 exit 1. `build`가 먼저 실행한다 |
| 배포 결과 확인 | `pnpm preview` | 프리렌더된 파일이 있는 경로만 200을 반환한다 |

### 통과 기준

- `pnpm build`가 `⚠️ placeholder` 경고 없이 끝나고 `prerender: wrote 8 pages + sitemap.xml + robots.txt`를 출력한다.
- UI를 바꿨다면 [docs/design.md](design.md)의 디자인 확인 방법을 따른다.
- 빌드 결과를 `pnpm preview`로 띄워 콘솔에 CSP 위반이 0건인지 본다. 개발 서버에는 정책이 없어서 `pnpm dev`로는 드러나지 않는다.

### 배포 후 확인

```bash
ORIGIN=https://gonasooc.github.io/spot-mixtape-web

# 확장자 유무 양쪽이 모두 200인지
for p in / /privacy /privacy/ /privacy.html /terms /account-deletion; do
  curl -s -o /dev/null -w "%{http_code} $p\n" "$ORIGIN$p"
done

# 없는 경로가 404인지 (404.html 렌더)
curl -s -o /dev/null -w "%{http_code}\n" "$ORIGIN/nope"

# sitemap·robots의 origin이 실제 값인지
curl -s "$ORIGIN/sitemap.xml" "$ORIGIN/robots.txt"

# 공유 이미지가 200이고 메타가 절대 URL로 가리키는지
curl -s -o /dev/null -w "%{http_code} og-image.png\n" "$ORIGIN/og-image.png"
curl -s "$ORIGIN/" | grep -o '<meta property="og:image" content="[^"]*"'

# 보안 정책 — 헤더가 아니라 HTML의 <meta>로 나온다
curl -s "$ORIGIN/privacy" | grep -o '<meta http-equiv="Content-Security-Policy"[^>]*>'
```

사람이 직접 확인해야 하는 것은 [docs/work/W-003-main-manual-verification.md](work/W-003-main-manual-verification.md)에서 관리한다.

### 환경 변수

이 저장소는 런타임 환경 변수를 쓰지 않습니다. 설정은 모두 `src/config/site.ts`에 있습니다.

앱 저장소에는 `EXPO_PUBLIC_LEGAL_BASE_URL`이 있고, 값은 이 사이트의 `site.publicOrigin`과 항상 같아야 합니다. 비밀값은 문서나 Git에 기록하지 않습니다.

## 알려진 기술 제약

- **Vite가 4KB 미만 자산을 base64로 인라인한다.** 현재 `@font-face` 100개 중 1개가 `data:` URI이고, `font-src 'self'`를 켜면 그 하나가 막힌다. `build.assetsInlineLimit: 0`으로 끌 수 있다.
- **배포 워크플로의 `allow_placeholders` 수동 실행은 플레이스홀더 상태로 publish한다.** 배포 배관만 확인할 때 쓰는 탈출구이며, 이 경로로 올라간 사이트는 `noindex` + `Disallow: /` 상태다.
- **`upload-pages-artifact`는 기본적으로 dotfile을 artifact에서 제외한다.** `include-hidden-files: true`가 있어야 `public/.nojekyll`이 published 사이트에 들어간다.
- **프리렌더는 `dist/index.html`을 템플릿으로 읽는다.** 클라이언트 빌드가 먼저 끝나야 하며, 빌드 스크립트의 순서를 바꾸면 깨진다.
