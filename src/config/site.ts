/**
 * Single source of truth for every legally significant value on this site.
 *
 * Values marked REQUIRED are placeholders. Replace them and have the result
 * reviewed before deploying — the privacy policy, terms, and account-deletion
 * pages all render straight from here. `pnpm run config:check` lists anything
 * still unresolved.
 */
export const site = {
  appName: "spotMixtape",
  appTagline: "장소 기반 사운드 아카이브",
  appIdentifier: "com.gonasoo.spotmixtape",

  /** REQUIRED: 서비스를 운영하는 법인 또는 개인사업자 상호 */
  legalEntity: "REQUIRED 사업자 상호",
  /** REQUIRED: 앱스토어·구글플레이에 노출되는 개발자명 */
  developerName: "REQUIRED 스토어 개발자명",
  /** REQUIRED: 개인정보 보호책임자 이름 또는 담당 부서 */
  privacyOfficer: "REQUIRED 개인정보 보호책임자",
  /** REQUIRED: 서면 문의를 받을 주소 */
  postalAddress: "REQUIRED 사업장 주소",
  /** REQUIRED: 실제 수신 가능한 지원 이메일 */
  supportEmail: "support@example.com",
  /** REQUIRED: 이 사이트가 배포될 HTTPS origin (끝에 / 없이) */
  publicOrigin: "https://example.com",
  /** REQUIRED: 문서 시행일 (YYYY-MM-DD) */
  effectiveDate: "YYYY-MM-DD",

  governingLaw: "대한민국 법률",
  supabaseRegion: "인도(뭄바이) · 리전 코드 ap-south-1",

  /** REQUIRED: 현재 Supabase 요금제의 백업·로그 보관 기간을 정확히 기재 */
  backupRetention:
    "REQUIRED: 현재 Supabase 요금제를 확인한 뒤 백업과 로그의 정확한 보관 기간을 기재한다.",
  /** REQUIRED: 삭제 후 잔존 데이터가 있다면 근거와 기간을, 없다면 없다는 사실을 기재 */
  deletionRetention:
    "REQUIRED: 법령상 보존 의무나 공급자 백업으로 남는 데이터가 있다면 그 항목과 정확한 기간을 기재하고, 없다면 앱 콘텐츠를 의도적으로 보관하지 않는다는 사실을 기재한다.",
  /** 계정 삭제 요청 처리 목표 기한 (일) */
  deletionSlaDays: 30,

  /** 스토어 배포 전이면 null로 두고, 배포 후 실제 URL을 넣는다. */
  appStoreUrl: null as string | null,
  playStoreUrl: null as string | null,
} as const;

export const deletionRequestMailto = `mailto:${site.supportEmail}?subject=${encodeURIComponent(
  `${site.appName} 계정 삭제 요청`,
)}&body=${encodeURIComponent(
  [
    "아래 항목을 채워 보내주세요. 녹음 파일, 사진, 비밀번호, 신분증, 액세스 토큰은 첨부하지 마세요.",
    "",
    "- 계정 이메일:",
    "- 로그인 방식(Google 또는 Apple):",
    "- 요청 사유(선택):",
  ].join("\n"),
)}`;

/** 아직 교체되지 않은 필수 값 목록. 빌드 스크립트와 개발 경고에서 함께 쓴다. */
export function findUnresolvedConfigKeys(): string[] {
  const placeholder = /(?:\bREQUIRED\b|example\.com|YYYY-MM-DD)/i;

  return Object.entries(site)
    .filter(([, value]) => typeof value === "string" && placeholder.test(value))
    .map(([key]) => key);
}
