import {
  ContactList,
  PolicyLayout,
  PolicyList,
  PolicyNote,
  PolicySection,
  PolicyTable,
  type PolicySectionMeta,
} from "@/components/PolicyLayout";
import { deletionRequestMailto, site } from "@/config/site";

const SECTIONS: PolicySectionMeta[] = [
  { id: "controller", title: "처리 주체" },
  { id: "data", title: "처리하는 정보" },
  { id: "purposes", title: "이용 목적" },
  { id: "providers", title: "위탁과 처리 지역" },
  { id: "retention", title: "보관과 파기" },
  { id: "security", title: "안전조치" },
  { id: "choices", title: "이용자의 권리" },
  { id: "account-deletion", title: "계정 삭제" },
  { id: "changes", title: "변경과 문의" },
];

const DATA_ROWS = [
  [
    "계정",
    "로그인 제공자의 사용자 식별자, 이메일 주소, 선택적 표시 이름과 프로필 사진 참조",
    "Google 또는 Apple로 로그인할 때",
  ],
  [
    "오디오 녹음",
    "최대 10초 길이의 소리 녹음 파일과 그 재생 길이",
    "사운드 카드를 만들어 저장할 때",
  ],
  [
    "사진",
    "사운드 카드에 첨부하는 선택적 이미지",
    "직접 촬영하거나 갤러리에서 고를 때만",
  ],
  [
    "정밀 위치",
    "위도와 경도, 자동 생성되거나 수정한 장소명, 지도에서 보고 있는 영역의 타일 좌표",
    "위치 권한을 허용한 이후에만",
  ],
  [
    "그 밖의 콘텐츠",
    "선택적 메모, 사용자 지정 장소 별명, 믹스테이프 제목과 카드 순서",
    "직접 입력하거나 수정할 때",
  ],
  [
    "기기 내 앱 상태",
    "업로드 대기 중인 오프라인 draft, 캐시된 미디어, 세션 상태와 재생 설정",
    "앱이 정상 동작하도록 기기에 보관",
  ],
];

export function Privacy() {
  return (
    <PolicyLayout title="개인정보처리방침" sections={SECTIONS}>
      <PolicySection id="controller" index={1} title="처리 주체">
        <p>
          이 방침은 {site.legalEntity}(이하 “회사”)가 {site.appName}을 제공하면서
          개인정보를 어떻게 처리하는지 설명합니다. 회사는 스토어에{" "}
          {site.developerName}(으)로 표기됩니다.
        </p>
        <ContactList
          entries={[
            { term: "개인정보 보호책임자", detail: site.privacyOfficer },
            {
              term: "이메일",
              detail: (
                <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
              ),
            },
            { term: "주소", detail: site.postalAddress },
          ]}
        />
      </PolicySection>

      <PolicySection id="data" index={2} title="처리하는 정보">
        <PolicyTable
          caption="처리하는 개인정보 항목"
          head={["구분", "포함되는 내용", "수집 시점"]}
          rows={DATA_ROWS}
        />
        <p>
          스토리 영상은 이용자의 기기에서 생성됩니다. {site.appName}이 이를
          업로드하지 않으며, 영상은 이용자가 직접 기기에 저장하거나 운영체제
          공유 시트에서 목적지를 선택할 때만 앱 밖으로 나갑니다.
        </p>
      </PolicySection>

      <PolicySection id="purposes" index={3} title="이용 목적">
        <PolicyList
          items={[
            "이용자를 인증하고, 개인 아카이브를 올바른 계정에 연결하기 위해",
            "사운드 카드를 만들고 보여주고 편집·재생·리믹스·지도 표시·내보내기·삭제하기 위해",
            "기기가 다시 연결되었을 때 오프라인 draft를 업로드하기 위해",
            "이용자 본인이 저장한 카드로 ‘그날의 기록’과 근처 기록을 다시 보여주기 위해",
            "서비스를 보호하고 장애를 진단하며, 고객 지원과 개인정보 관련 요청에 응답하기 위해",
          ]}
        />
        <p>
          현재 출시 버전에는 광고나 행동 분석 SDK가 포함되어 있지 않습니다.
          선택적 오류 진단 기능은 배포 설정과 이 방침이 함께 갱신되기 전까지
          비활성 상태로 유지됩니다.
        </p>
      </PolicySection>

      <PolicySection id="providers" index={4} title="처리 위탁과 처리 지역">
        <p>
          서비스 운영에 필요한 범위로 한정해 아래 사업자를 이용합니다. 회사는
          개인정보를 판매하지 않습니다. 각 사업자는 자체 약관과 회사의 서비스
          설정에 따라 정보를 처리할 수 있습니다.
        </p>

        <PolicyTable
          caption="수탁자와 처리 업무"
          head={["수탁자", "처리 업무", "처리 지역"]}
          rows={[
            [
              "Supabase",
              "인증, PostgreSQL 데이터베이스, 비공개 오브젝트 스토리지와 서비스 로그",
              site.supabaseRegion,
            ],
            [
              "Google",
              "선택적 Google 계정 인증. Android에서는 위치 권한 허용 후 운영체제 지오코더가 좌표를 장소명으로 변환",
              "이용자의 Google 계정과 해당 사업자 약관에 따름",
            ],
            [
              "Apple",
              "iOS의 선택적 Apple로 로그인(선택 시 이메일 가리기 포함)과 운영체제 지오코더의 좌표 변환",
              "이용자의 Apple 계정과 해당 사업자 약관에 따름",
            ],
            [
              "OpenStreetMap Foundation",
              "전체 사운드 지도의 래스터 지도 타일. 요청에는 보고 있는 지도 영역과 IP 주소·앱 식별자 같은 일반적인 네트워크 정보만 포함",
              "OSMF 인프라 및 전송 사업자",
            ],
          ]}
        />

        <p>
          OpenStreetMap 관련 정책은{" "}
          <a
            href="https://operations.osmfoundation.org/policies/tiles/"
            target="_blank"
            rel="noreferrer noopener"
          >
            타일 이용 정책
          </a>
          과{" "}
          <a
            href="https://osmfoundation.org/wiki/Privacy_Policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            개인정보처리방침
          </a>
          에서 확인할 수 있습니다.
        </p>

        <PolicyNote heading="국외 이전">
          <p className="m-0">
            백엔드 호스팅 리전이 대한민국 밖({site.supabaseRegion})에 있으므로
            계정 정보와 업로드된 콘텐츠가 국외에서 처리될 수 있습니다. 적용되는
            이전 보호조치에 대해 더 알고 싶다면 서비스를 이용하기 전에 회사로
            문의해 주십시오.
          </p>
        </PolicyNote>
      </PolicySection>

      <PolicySection id="retention" index={5} title="보관과 파기">
        <p>
          계정이 유지되는 동안에는 아카이브를 제공하기 위해 계정 정보와 저장된
          콘텐츠를 보관합니다. 오프라인 draft와 내보낸 영상은 이용자가 직접
          삭제하거나 운영체제가 앱 데이터를 정리할 때까지 기기에 남습니다.
        </p>

        <PolicyNote heading="현재 서비스 제공자 보관 기간">
          <p className="m-0">{site.backupRetention}</p>
        </PolicyNote>

        <p>
          계정 삭제가 완료되면 서비스는 계정, 비공개 오디오와 사진, 프로필,
          사운드 카드, 믹스테이프와 그 데이터베이스 관계를 제거합니다.{" "}
          {site.deletionRetention}
        </p>
        <p>
          삭제 방법과 처리 일정은 <a href="#account-deletion">계정 삭제</a>{" "}
          항목에서 확인할 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection id="security" index={6} title="아카이브를 지키는 방법">
        <PolicyList
          items={[
            "지원되는 운영 환경에서 모든 네트워크 요청은 HTTPS/TLS를 사용합니다.",
            "데이터베이스 row-level security가 계정 소유 레코드를 인증된 사용자에게만 연결합니다.",
            "오디오와 사진 버킷은 비공개이며, 소유자 전용 정책과 짧은 수명의 서명 URL로만 접근합니다.",
            "관리자 자격 증명과 서명 비밀은 공개 배포되는 앱에 포함하지 않습니다.",
          ]}
        />
        <p>
          완벽하게 안전한 시스템은 없습니다. 계정이나 콘텐츠가 노출되었다고
          의심되면 즉시 회사로 알려 주십시오.
        </p>
      </PolicySection>

      <PolicySection id="choices" index={7} title="이용자의 선택과 권리">
        <PolicyList
          items={[
            "시스템 설정에서 카메라, 사진, 마이크, 위치 권한을 거부할 수 있습니다.",
            "앱 안에서 개별 사운드 카드를 수정하거나 삭제할 수 있습니다.",
            "저장된 아카이브를 지우지 않고 로그아웃할 수 있습니다.",
            "설정에서 계정 전체를 삭제하거나, 이메일로 삭제를 요청할 수 있습니다.",
            "회사에 연락해 개인정보의 열람, 정정, 처리정지, 삭제를 요구할 수 있습니다.",
          ]}
        />
      </PolicySection>

      <PolicySection id="account-deletion" index={8} title="계정 삭제">
        <p>다음 두 가지 방법으로 계정을 삭제할 수 있습니다.</p>
        <PolicyList
          items={[
            <>
              <strong>앱에서:</strong> 녹음 화면의 설정에서 계정 삭제를 선택하고
              확인합니다. 앱은 계정과 데이터베이스 레코드를 먼저 삭제한 뒤
              비공개 스토리지의 미디어를 정리하며, 미처 정리되지 못한 파일은
              소유자 전용 정책 때문에 누구도 접근할 수 없고 운영 절차로 마저
              제거됩니다.
            </>,
            <>
              <strong>이메일로:</strong> 앱을 이미 지웠다면 로그인에 사용한
              이메일 주소에서 <a href={deletionRequestMailto}>삭제 요청 메일</a>
              을 보내 주십시오. 계정 이메일과 로그인 방식(Google 또는 Apple)을
              적고, 녹음 파일·사진·비밀번호·신분증·액세스 토큰은 첨부하지
              마십시오.
            </>,
          ]}
        />
        <p>
          이메일 요청은 권한 없는 삭제를 막기 위한 계정 소유 확인을 거쳐{" "}
          {site.deletionSlaDays}일 이내에 처리하고 완료를 안내합니다. 삭제는
          되돌릴 수 없으며, 기기에서 앱을 지우는 것만으로는 계정이 삭제되지
          않습니다. 기기에 내보낸 영상과 백업, {site.appName} 밖으로 공유한
          사본은 이용자가 직접 삭제해야 합니다.
        </p>
      </PolicySection>

      <PolicySection id="changes" index={9} title="방침 변경과 문의">
        <p>
          제품, 서비스 제공자, 법령 또는 처리 방식이 바뀌면 이 방침을 갱신할 수
          있습니다. 상단의 시행일이 현재 버전을 나타냅니다. 중요한 변경은 적절한
          제품 또는 스토어 채널을 통해 안내합니다.
        </p>
        <p>
          문의와 개인정보 관련 요청은{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>로 보내
          주십시오. 이 방침은 {site.governingLaw}과 서비스가 제공되는 지역에
          적용되는 그 밖의 법령을 고려해 해석됩니다.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
