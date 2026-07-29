# spot-mixtape-web

[spotMixtape](https://github.com/gonasooc/spot-mixtape) 앱의 홍보 랜딩과 법률 문서를 제공하는 정적 사이트다. 앱의 디자인 토큰과 "Digital Vinyl" 컨셉을 그대로 웹으로 옮겼고, 모바일 퍼스트로 작성했다.

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
- Outfit · JetBrains Mono (`@fontsource-variable`로 self-host — 외부 CDN 요청 없음)

## 설치와 실행

```bash
pnpm install

pnpm dev              # 개발 서버
pnpm build            # 타입체크 → 클라이언트 빌드 → SSR 빌드 → 프리렌더
pnpm preview          # dist를 정적 호스팅과 동일한 방식으로 서빙
pnpm config:check     # 미교체 플레이스홀더 검사
```

`pnpm preview`는 SPA history fallback 없이(`appType: "mpa"`) 서빙한다. 프리렌더된 파일이 실제로 존재하는 경로만 200을 반환하므로 배포 결과를 그대로 확인할 수 있다.

## 잔여 작업

배포까지 남은 작업, 필요한 입력값, 법률 검토 항목과 검증 기준은 [docs/REMAINING_WORK.md](./docs/REMAINING_WORK.md)에 정리되어 있다.

## 배포 전 필수 작업

`src/config/site.ts`의 값이 모든 법률 문서에 그대로 렌더된다. `REQUIRED`, `example.com`, `YYYY-MM-DD`가 남아 있으면 문서가 플레이스홀더 상태로 배포된다.

```bash
pnpm config:check   # 남아 있는 항목을 파일:줄 번호와 함께 출력, 있으면 exit 1
```

교체해야 하는 항목:

- `legalEntity` — 서비스를 운영하는 사업자 상호
- `developerName` — 스토어에 노출되는 개발자명
- `privacyOfficer` — 개인정보 보호책임자 또는 담당 부서
- `postalAddress` — 서면 문의 주소
- `supportEmail` — 실제 수신 가능한 지원 이메일
- `publicOrigin` — 배포될 HTTPS origin (canonical·sitemap·OG URL에 사용)
- `effectiveDate` — 문서 시행일 (`YYYY-MM-DD`)
- `backupRetention` — 현재 Supabase 요금제의 백업·로그 보관 기간
- `deletionRetention` — 계정 삭제 후 잔존 데이터의 항목과 기간

스토어 배포 후에는 `appStoreUrl`과 `playStoreUrl`을 채운다. 두 값이 모두 `null`이면 랜딩의 CTA가 "출시 준비 중"으로 표시된다.

법률 문구는 배포 전에 반드시 검토를 받는다. 본문은 앱 저장소의 `legal-site/templates`를 한국어로 옮긴 것이며, 실제 운영 사실과 일치하는지 확인이 필요하다.

## 배포

`pnpm build`의 결과물인 `dist/`를 그대로 정적 호스팅에 올린다.

확장자 없는 URL 처리는 호스트마다 다르므로(Netlify·Cloudflare Pages는 `privacy/index.html`로 해석하지만 nginx·S3는 그렇지 않다) 프리렌더가 `privacy.html`과 `privacy/index.html`을 함께 생성한다. `/privacy`, `/privacy/`, `/privacy.html`이 모든 호스트에서 동작하며, canonical 태그는 `/privacy`로 고정된다.

`public/_headers`는 Netlify·Cloudflare Pages 형식의 보안 헤더(CSP, `X-Frame-Options`, `Permissions-Policy` 등)다. 다른 호스트를 쓴다면 같은 헤더를 해당 호스트 설정으로 옮긴다.

배포 후 앱 저장소의 `EXPO_PUBLIC_LEGAL_BASE_URL`을 이 사이트의 origin으로 설정한다.

## 디자인 토큰

`src/styles.css`의 `@theme` 블록이 앱의 `src/constants/Colors.ts` · `tailwind.config.js`를 그대로 따른다. 앱의 팔레트가 바뀌면 이 블록을 함께 갱신한다.

| 토큰             | 값        | 용도                       |
| ---------------- | --------- | -------------------------- |
| `--color-ink`    | `#0B0D0A` | 기본 배경                  |
| `--color-acid`   | `#C9F55D` | 강조 (Electric Lime)       |
| `--color-violet` | `#9E83CF` | 보조 (record-label violet) |
| `--color-paper`  | `#F3F5EC` | 밝은 섹션 배경, 본문 텍스트 |

한국어 본문은 `word-break: keep-all`로 어절 중간에서 줄바꿈되지 않게 하고, 이메일이나 URL처럼 끊을 수 없는 토큰만 `overflow-wrap: break-word`로 처리한다.
