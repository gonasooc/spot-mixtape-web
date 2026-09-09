/**
 * Single source of truth for every legally significant value on this site.
 *
 * Values marked REQUIRED are placeholders. Replace them and have the result
 * reviewed before deploying — the privacy policy and terms pages render
 * straight from here. `pnpm run config:check` lists anything still unresolved.
 */
export const site = {
  appName: "spotMixtape",
  appTagline: "장소 기반 사운드 아카이브",
  appIdentifier: "com.gonasoo.spotmixtape",

  /** 서비스를 운영하는 법인, 개인사업자 상호 또는 개인 운영자 본명 */
  legalEntity: "최관수",
  /**
   * 각 스토어에 노출되는 이름. 두 콘솔의 값과 글자 그대로 같아야 한다.
   * 개인 계정이라 Apple은 법적 명의를, Play는 개발자 이름을 그대로 쓴다.
   */
  appStoreSellerName: "Gwansoo Choi",
  playDeveloperName: "gonasooc",
  /** 개인정보 보호책임자 이름 또는 담당 부서 */
  privacyOfficer: "최관수",
  /**
   * 서면 문의를 받을 주소. 사업장이 없어 공개할 주소가 없으면 null로 두면
   * 방침의 주소 항목과 약관의 우편 안내가 함께 빠지고 이메일만 남는다.
   * 우편 주소 없이 이메일 연락처만으로 충분한지는 법률 검토 대상이다.
   */
  postalAddress: null as string | null,
  /** 실제 수신 가능한 지원 이메일. 계정 삭제 요청도 이 주소로 받는다. */
  supportEmail: "spotmixtape.contact@gmail.com",
  /**
   * 이 사이트가 배포될 HTTPS base URL. 끝에 / 를 붙이지 않는다.
   * GitHub Pages project page처럼 하위 경로로 배포하면 그 경로까지 포함한다.
   */
  publicOrigin: "https://gonasooc.github.io/spot-mixtape-web",
  /** 문서 시행일. 내용을 고쳐 공개할 때마다 갱신한다. */
  effectiveDate: "2026-09-06",

  governingLaw: "대한민국 법률",
  supabaseRegion: "인도(뭄바이) · 리전 코드 ap-south-1",

  /**
   * 백업과 로그 보관 기간. 요금제를 바꾸거나 백업을 뜨기 시작하면 반드시
   * 함께 고친다. 실제 운영과 다르면 허위 고지가 된다.
   */
  backupRetention:
    "백엔드는 Supabase 무료 플랜으로 운영되어 자동 백업을 제공하지 않으며, 별도의 백업 사본을 만들지 않습니다. 서비스 운영 로그는 1일간 보관된 뒤 삭제됩니다.",
  /** 삭제 후 잔존 데이터. 백업을 운영하기 시작하면 반드시 다시 쓴다. */
  deletionRetention:
    "백업 사본을 만들지 않으므로 삭제된 콘텐츠가 남는 사본도 없으며, 앱 콘텐츠를 의도적으로 보관하지 않습니다. 삭제 처리 과정에서 생성된 운영 로그는 위 로그 보관 기간이 지나면 삭제되고, 이메일로 접수한 삭제 요청 기록은 처리 확인에 필요한 범위에서만 보관합니다.",
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
