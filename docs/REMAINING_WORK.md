# spot-mixtape-web 잔여 작업

> 이 문서 하나가 랜딩 사이트를 배포 가능한 상태로 만들기까지 남은 작업, 입력값, 검증 기준과 현재 상태의 정본이다. 위에서 아래로 진행하고, 완료한 항목은 체크한 뒤 바로 아래에 날짜와 증거를 기록한다.

앱 출시 전체 절차는 앱 저장소의 [RELEASE_RUNBOOK.md](https://github.com/gonasooc/spot-mixtape/blob/main/docs/RELEASE_RUNBOOK.md)를 따른다. 이 문서는 그 실행서의 "법률 랜딩 배포" 단계를 이 저장소 기준으로 상세화한 것이다.

## 0. 현재 상태와 사용법

### 이미 완료된 기준선

- [x] Vite 7 + React 19 + Tailwind v4 + pnpm 스캐폴드, 모바일 퍼스트 레이아웃
- [x] 앱의 `Colors.ts`·`tailwind.config.js` 팔레트를 `src/styles.css`의 `@theme`로 이식
- [x] 랜딩, 개인정보처리방침, 이용약관, 계정 삭제, 404 페이지 한국어 작성
- [x] 전 라우트 정적 프리렌더 — JS 없이도 전문 열람 가능, 이후 hydrate
- [x] `/privacy`, `/privacy/`, `/privacy.html` 3형태 모두 200 (호스트 무관)
- [x] Outfit·JetBrains Mono self-host — 외부 CDN 요청 0건
- [x] 한국어 `word-break: keep-all`, 322~1452px 가로 오버플로 0건
- [x] 콘솔 에러 0, hydration 불일치 0, 클라이언트 라우팅 시 meta·canonical 갱신
- [x] `public/_headers` 보안 헤더, `robots.txt`·`sitemap.xml` 자동 생성
- [x] `pnpm config:check` 플레이스홀더 검출기 (미교체 시 exit 1)

**현재 배포 불가 상태다.** `src/config/site.ts`에 플레이스홀더 9개가 남아 있고, 이 값들이 법률 문서 본문에 그대로 렌더된다.

### 역할 표시

- **OWNER**: 사업자·법률 값 결정, 변호사 검토 의뢰, 호스팅 계정과 도메인, 스토어 콘솔 입력처럼 프로젝트 소유자가 직접 해야 한다.
- **AGENT**: 값이 확정된 뒤 저장소 변경, 빌드, 배포 스크립트, 자동 검증과 문서 갱신을 수행할 수 있다.
- **REVIEW**: 대한민국 변호사 또는 개인정보 담당자의 검토가 필요하다.

사업자등록번호를 제외한 비밀값(호스팅 API token, 도메인 등록기관 자격증명 등)은 이 문서나 Git에 기록하지 않는다.

## 1. 법률·사업자 값 확정 — OWNER

`src/config/site.ts`에 들어갈 값을 먼저 확정한다. 아래 9개가 모두 채워지기 전에는 배포하지 않는다.

| 키 | 상태 | 완료 기준 |
| --- | --- | --- |
| `legalEntity` | [ ] | 서비스를 운영하는 법인명 또는 개인사업자 상호. 사업자등록증과 일치 |
| `developerName` | [ ] | App Store·Google Play에 노출되는 개발자명. 스토어 레코드와 일치 |
| `privacyOfficer` | [ ] | 개인정보 보호책임자 성명 또는 담당 부서명 |
| `postalAddress` | [ ] | 서면 문의를 실제로 수신할 수 있는 주소 |
| `supportEmail` | [ ] | 계정 삭제 요청을 실제로 수신·처리할 inbox. 개인 메일 대신 운영 주소 권장 |
| `publicOrigin` | [ ] | 이 사이트를 배포할 HTTPS origin. 끝에 `/` 없이. canonical·sitemap·OG URL에 사용 |
| `effectiveDate` | [ ] | 문서 시행일 `YYYY-MM-DD`. 변호사 검토 완료일 이후로 설정 |
| `backupRetention` | [ ] | 현재 Supabase 요금제의 실제 백업·로그 보관 기간. 대시보드에서 확인한 값 |
| `deletionRetention` | [ ] | 계정 삭제 후 잔존하는 데이터의 항목과 정확한 기간. 없으면 없다고 명시 |

`deletionSlaDays`는 기본값 `30`이다. 실제로 지킬 수 있는 기한인지 확인하고, 다르면 함께 수정한다.

`backupRetention`과 `deletionRetention`은 문장 그대로 문서에 노출되므로 완결된 한국어 문장으로 작성한다.

## 2. 값 반영과 검증 — AGENT

1. `src/config/site.ts`의 9개 값을 확정된 값으로 교체한다.
2. 검출기가 통과하는지 확인한다.

   ```bash
   pnpm config:check   # exit 0 이어야 한다
   ```

3. 전체 빌드를 실행하고 경고가 사라졌는지 확인한다.

   ```bash
   pnpm build          # "⚠️ placeholder" 경고가 출력되지 않아야 한다
   ```

4. 로컬에서 렌더 결과를 확인한다.

   ```bash
   pnpm preview
   ```

- [ ] `pnpm config:check` exit 0
- [ ] `pnpm build` 경고 없음
- [ ] 4개 페이지 본문·푸터에 `REQUIRED`, `example.com`, `YYYY-MM-DD`가 보이지 않음

## 3. 국내 개인정보 보호법 대응 — REVIEW → AGENT

현재 개인정보처리방침은 앱 저장소 `legal-site/templates/privacy.html`(글로벌 스토어 심사용 영문)을 한국어로 옮긴 것이다. **대한민국 개인정보 보호법 제30조와 시행령 제31조가 요구하는 기재사항 기준으로는 보완이 필요할 수 있다.** 아래는 검토 의뢰용 목록이며, 최종 판단은 변호사가 한다.

### 3.1 현재 문서에 포함된 항목

| 법정 기재사항 | 현재 상태 |
| --- | --- |
| 처리 목적 | 3장에 기재 |
| 처리 위탁 | 4장에 수탁자·업무 내용 기재 |
| 보유 기간 | 5장에 기재 (`backupRetention` 값에 의존) |
| 안전성 확보조치 | 6장에 기재 |
| 정보주체의 권리·행사방법 | 7장에 기재 |
| 개인정보 보호책임자 | 1장에 기재 |
| 처리방침 변경 | 8장에 기재 |

### 3.2 보완 검토가 필요한 항목

- [ ] **파기 절차와 방법** — 현재는 "삭제 완료 시 제거"만 있다. 보유기간 경과·목적 달성 시의 파기 절차와 방법(전자적 파일 형태의 복구 불가능한 삭제 등)을 별도 항목으로 요구할 수 있다.
- [ ] **권익침해 구제방법** — 개인정보분쟁조정위원회, 개인정보침해신고센터, 대검찰청, 경찰청 연락처 안내가 국내 방침에는 사실상 표준으로 포함된다. 현재 문서에 없다.
- [ ] **국외 이전 세부 고지** — 법 제28조의8은 이전 항목, 이전받는 국가·시기·방법, 이전받는 자의 성명·연락처, 이용 목적·보유기간, 거부 절차·방법의 고지를 요구한다. 현재 4장은 수탁자와 리전만 밝히고 있어 구체성이 부족하다.
- [ ] **열람청구 접수·처리 부서** — 보호책임자와 별도로 명시가 필요한지 확인한다.
- [ ] **만 14세 미만 아동** — 앱이 아동 가입을 허용하는지 정하고, 허용하지 않는다면 그 사실과 확인 방법을 기재한다. 스토어 연령 등급과 일치해야 한다.
- [ ] **자동 수집 장치(쿠키 등)** — 이 사이트와 앱 모두 쿠키·행동 분석 SDK를 쓰지 않는다. "사용하지 않는다"는 사실을 명시할지 결정한다.
- [ ] **국내대리인 / 가명정보 처리** — 해당 사항 없으면 기재 불요. 해당 여부만 확인한다.

### 3.3 이용약관 검토 항목

- [ ] 타인의 음성·초상 녹음과 공유에 대한 안내 문구 (통신비밀보호법, 초상권 관련)
- [ ] 위치정보 이용에 관한 사항 — 위치정보법상 별도 약관·동의가 필요한지 확인한다.
- [ ] 청약철회·환불 조항 — 현재 유료 상품이 없으므로 불요하나, 도입 시 필수다.
- [ ] 준거법·관할 조항이 소비자 강행규정과 충돌하지 않는지 확인

### 3.4 반영 — AGENT

검토 결과가 나오면 해당 섹션을 수정한다. 섹션 추가 시 `src/pages/Privacy.tsx`의 `SECTIONS` 배열과 `PolicySection`의 `index`를 함께 갱신해야 목차 번호가 맞는다.

- [ ] 검토 의견 반영 완료
- [ ] `effectiveDate`를 검토 완료 시점으로 갱신

## 4. 호스팅 배포 — OWNER → AGENT

### 4.1 호스트 결정 — OWNER

- [ ] 호스팅 제공자 결정 (Cloudflare Pages, Netlify, Vercel 중 택일 권장)
- [ ] 도메인 결정 및 DNS 연결
- [ ] HTTPS 인증서 발급 확인

`public/_headers`는 Netlify·Cloudflare Pages 형식이다. **Vercel을 선택하면 이 파일은 무시되므로** `vercel.json`의 `headers`로 같은 내용을 옮겨야 한다. 다른 호스트도 마찬가지다.

### 4.2 빌드 설정

| 항목 | 값 |
| --- | --- |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Node version | `20.19.0` (`.node-version` 참조) |
| Package manager | pnpm `10.33.1` |

### 4.3 배포 후 검증 — AGENT

```bash
# 3형태 URL이 모두 200인지
for p in / /privacy /privacy/ /privacy.html /terms /account-deletion; do
  curl -s -o /dev/null -w "%{http_code} $p\n" "https://<origin>$p"
done

# 없는 경로가 404인지
curl -s -o /dev/null -w "%{http_code}\n" "https://<origin>/nope"

# 보안 헤더가 실제로 붙는지
curl -sI "https://<origin>/privacy" | grep -i "content-security-policy\|x-frame-options\|permissions-policy"
```

- [ ] 6개 URL 모두 200
- [ ] 없는 경로 404 (`404.html` 렌더)
- [ ] CSP, `X-Frame-Options`, `Permissions-Policy`, `X-Content-Type-Options` 응답 헤더 확인
- [ ] CSP가 실제 페이지를 깨뜨리지 않는지 브라우저 콘솔에서 확인 (self-host 폰트가 `font-src 'self'`에 걸리지 않아야 한다)
- [ ] 로그아웃·시크릿 브라우저에서 4개 페이지 열람
- [ ] `https://<origin>/sitemap.xml`과 `robots.txt`의 origin이 실제 값인지 확인
- [ ] 모바일 실기기에서 랜딩·개인정보처리방침 스크롤과 목차 앵커 동작 확인

## 5. 앱 저장소 연동 — AGENT

앱은 `EXPO_PUBLIC_LEGAL_BASE_URL` origin에 `src/utils/legalUrls.ts`의 `LEGAL_PAGE_PATHS`를 붙여 URL을 만든다. 이 경로들은 하드코딩된 `.html` 형태이고, **이 사이트가 4개 모두 서빙하므로 앱 코드 변경은 필요 없다.**

| 앱의 `LegalPage` | 앱이 만드는 경로 | 이 사이트의 대응 파일 |
| --- | --- | --- |
| `privacy` | `/privacy.html` | `dist/privacy.html` |
| `terms` | `/terms.html` | `dist/terms.html` |
| `accountDeletion` | `/account-deletion.html` | `dist/account-deletion.html` |
| `support` | `/` | `dist/index.html` |

`getLegalPageUrl()`은 origin을 검증한다. HTTPS여야 하고, 경로·쿼리·프래그먼트·인증정보가 없어야 하며, `localhost`·`.test`·`example.com` 호스트는 거부한다. `publicOrigin`을 정할 때 이 조건을 만족시켜야 한다.

- [ ] 앱 저장소 `.env`와 EAS production env의 `EXPO_PUBLIC_LEGAL_BASE_URL`을 이 사이트 origin으로 설정 (끝에 `/` 없이)
- [ ] 위 표의 4개 URL이 실제 배포본에서 200인지 확인
- [ ] 앱 Settings에서 Privacy Policy, Terms, Support, Account Deletion 링크를 모두 열어 확인
- [ ] 앱 저장소 `pnpm run test:legal-urls` 통과

> 앱 저장소의 `legal-site/` 디렉터리는 이 사이트로 대체된다. 두 곳을 모두 유지하면 문구가 갈라진다. 이 사이트를 정본으로 삼고 `legal-site/`를 정리할지 OWNER가 결정한다.
>
> - [ ] `legal-site/` 처리 방침 결정 (제거 / 보관 / 유지)

## 6. 스토어 URL 매핑 — OWNER

이 사이트는 확장자 유무 양쪽을 모두 제공하므로 RELEASE_RUNBOOK에 적힌 `.html` URL도 그대로 동작한다. 신규 입력 시에는 확장자 없는 형태를 쓴다.

| 입력란 | URL |
| --- | --- |
| App Store Privacy Policy | `https://<origin>/privacy` |
| Apple User Privacy Choices | `https://<origin>/account-deletion` |
| Google Play Privacy Policy | `https://<origin>/privacy` |
| Google Play 계정 삭제 URL | `https://<origin>/account-deletion` |
| Support URL | `https://<origin>/` |
| Marketing URL | `https://<origin>/` |

- [ ] App Store Connect 4개 입력란 반영
- [ ] Google Play Console 2개 입력란 반영
- [ ] 계정 삭제 페이지가 로그인 없이, 앱 설치 없이 열리는지 심사 기준으로 확인

## 7. 스토어 배포 후 — AGENT

- [ ] `src/config/site.ts`의 `appStoreUrl`에 실제 App Store URL 입력
- [ ] `src/config/site.ts`의 `playStoreUrl`에 실제 Google Play URL 입력
- [ ] 재배포 후 랜딩 CTA가 "출시 준비 중"에서 스토어 버튼 2개로 바뀌는지 확인

두 값이 모두 `null`인 동안에는 CTA가 "iOS · Android 출시 준비 중"과 "출시 소식 받기"(mailto)로 표시된다. 한쪽만 채우면 해당 스토어 버튼 하나만 노출된다.

## 8. 미완성 항목 — AGENT

배포를 막지는 않지만 아직 처리되지 않은 것들이다.

- [ ] **OG 이미지 없음** — `og:image`가 없어 카카오톡·슬랙·트위터 공유 시 썸네일이 나오지 않는다. 1200×630 PNG를 만들어 `public/`에 넣고 `scripts/prerender.mjs`의 `buildHead()`에 `og:image` 절대 URL을 추가한다.
- [ ] **`apple-touch-icon`이 SVG** — `index.html`이 `apple-touch-icon`으로 `favicon.svg`를 가리키는데 iOS는 SVG를 지원하지 않는다. 180×180 PNG를 만들어 교체한다. 앱 저장소의 `assets/images/icon.png`를 활용할 수 있다.
- [ ] **`.well-known` 파일 없음** — Apple App Site Association이나 Android Asset Links로 딥링크를 붙일 계획이면 `public/.well-known/`에 추가한다. 현재는 불필요.
- [ ] **linter 없음** — ESLint·Prettier가 설정되어 있지 않다. 앱 저장소와 규칙을 맞출지 결정한다.
- [ ] **CI 없음** — `pnpm build`와 `pnpm config:check`를 PR에서 자동 실행하는 워크플로가 없다. 플레이스홀더가 다시 들어가는 것을 막으려면 `config:check`를 CI에 넣는 편이 안전하다.

## 9. 다루지 않기로 한 것

의도적으로 만들지 않은 것들이다. 나중에 "빠졌다"고 오해하지 않도록 기록한다.

| 항목 | 이유 |
| --- | --- |
| 웹 애널리틱스 | 앱과 동일하게 분석 SDK를 넣지 않는다는 제품 원칙을 따른다. 넣으려면 개인정보처리방침 4장과 쿠키 항목을 함께 고쳐야 한다 |
| 다국어(i18n) | 현재 한국어 단일 언어다. 글로벌 스토어 심사용 영문이 필요하면 앱 저장소의 `legal-site/` 영문본을 쓰거나 이 사이트에 라우트를 추가한다 |
| 문의 폼 | 폼 제출은 서버가 필요하고 CSP `form-action 'none'`과 충돌한다. mailto 링크로 대체했다 |
| 다크·라이트 테마 토글 | 앱이 다크 테마 기준이므로 사이트도 고정했다 |
| 블로그·변경 이력 페이지 | 요청 범위 밖 |

## 10. 최종 배포 전 체크리스트

- [ ] 1장 값 9개 확정, `pnpm config:check` exit 0
- [ ] 3장 변호사 검토 완료, 의견 반영, `effectiveDate` 갱신
- [ ] 4장 배포 완료, 6개 URL 200, 404 동작, 보안 헤더 확인
- [ ] 5장 앱 `EXPO_PUBLIC_LEGAL_BASE_URL` 연결, 앱 내 4개 링크 동작
- [ ] 6장 스토어 콘솔 URL 6개 입력
- [ ] `supportEmail` inbox로 실제 테스트 메일을 보내 수신 확인
- [ ] 계정 삭제 요청 mailto 링크가 제목·본문 템플릿과 함께 열리는지 확인
