import { Link } from "react-router-dom";

import {
  PolicyLayout,
  PolicyList,
  PolicyNote,
  PolicySection,
  type PolicySectionMeta,
} from "@/components/PolicyLayout";
import { site } from "@/config/site";

const SECTIONS: PolicySectionMeta[] = [
  { id: "agreement", title: "약관의 적용" },
  { id: "account", title: "계정" },
  { id: "recording", title: "책임 있는 녹음" },
  { id: "content", title: "이용자의 콘텐츠" },
  { id: "prohibited", title: "금지되는 이용" },
  { id: "service", title: "서비스와 계정 삭제" },
  { id: "liability", title: "책임의 범위" },
  { id: "law", title: "준거법과 문의" },
];

export function Terms() {
  return (
    <PolicyLayout title="이용약관" sections={SECTIONS}>
      <PolicySection id="agreement" index={1} title="약관의 적용">
        <p>
          이 약관은 {site.legalEntity}가 운영하는 {site.appName}의 이용 조건을
          정합니다. 계정을 만들거나 {site.appName}을 이용하면 이 약관과{" "}
          <Link to="/privacy">개인정보처리방침</Link>에 동의한 것으로 봅니다.
          동의하지 않는다면 서비스를 이용하지 마십시오. 앱 마켓 사업자의 약관이
          함께 적용될 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection id="account" index={2} title="계정">
        <PolicyList
          items={[
            "Google 또는 Apple을 통해 본인이 접근 권한을 가진 계정으로 로그인해야 합니다.",
            "로그인 계정과 기기를 합리적인 수준으로 안전하게 관리해야 합니다.",
            "무단 접근이 의심되면 즉시 운영자에게 알려야 합니다.",
            "타인을 사칭하거나 이용 제한을 회피할 목적으로 계정을 만들 수 없습니다.",
          ]}
        />
      </PolicySection>

      <PolicySection id="recording" index={3} title="책임 있는 녹음">
        <PolicyNote heading="마이크는 주변 사람의 목소리도 담습니다.">
          <p className="m-0">
            사적인 대화는 녹음하지 마십시오. 다른 사람의 음성, 모습, 사적인
            공간을 녹음하거나 보관하거나 공유하기 전에 반드시 허락을 받으십시오.
          </p>
        </PolicyNote>
        <p>
          녹음과 공유가 이루어지는 장소에 적용되는 녹음·프라이버시·초상권·주거
          침입·지식재산권·위치 관련 규정을 준수할 책임은 이용자에게 있습니다.
          어떤 장소가 출입을 허용했다는 사실이 그곳에서 일어나는 일을 녹음하고
          배포해도 된다는 허락을 의미하지는 않습니다.
        </p>
      </PolicySection>

      <PolicySection id="content" index={4} title="이용자의 콘텐츠">
        <p>
          이용자가 만든 녹음, 사진, 메모 등 콘텐츠에 대한 권리는 이용자에게
          그대로 남습니다. 이용자는 운영자에게, 요청한 서비스 기능을 제공하고
          보호하고 문제를 해결하고 개선하는 데 필요한 범위에서만 해당 콘텐츠를
          저장·복제·변환·전송할 수 있는 제한적 이용 권한을 부여합니다.
        </p>
        <p>
          이용자는 업로드하거나 공유하는 콘텐츠에 대해 필요한 권리와 동의를
          갖추고 있음을 확인합니다. 운영체제의 공유 시트는 이용자가 선택한
          목적지로 콘텐츠를 전송하며, 그 이후에는 해당 서비스의 약관이
          적용됩니다.
        </p>
      </PolicySection>

      <PolicySection id="prohibited" index={5} title="금지되는 이용">
        <PolicyList
          items={[
            "위법하게, 또는 필요한 동의 없이 콘텐츠를 녹음하거나 공유하는 행위",
            "괴롭힘, 스토킹, 감시, 협박, 착취 또는 사생활 침해",
            "악성코드를 업로드하거나 인증·접근 제어·이용 한도를 우회하려는 시도",
            "권한 없이 다른 이용자의 계정이나 콘텐츠에 접근하는 행위",
            "서비스 운영을 실질적으로 방해하거나 관련 법령을 위반하는 방식의 이용",
          ]}
        />
      </PolicySection>

      <PolicySection id="service" index={6} title="서비스 제공과 계정 삭제">
        <p>
          운영자는 보안, 안정성, 법령 준수 또는 서비스 운영을 위해 필요한 경우
          기능을 유지·변경·중단할 수 있습니다. 중요한 변경은 적절한 채널로
          안내하고자 하지만, 서비스가 중단 없이 제공된다고 보장하지는 않습니다.
        </p>
        <p>
          전체 사운드 지도는 현재 OpenStreetMap 래스터 타일을 최선노력
          기준으로 사용합니다. 지도 데이터의 저작권은 © OpenStreetMap
          contributors에 있으며{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer noopener"
          >
            OpenStreetMap 저작권 및 라이선스 조건
          </a>
          에 따라 제공됩니다. 커뮤니티 타일 서비스는 변경되거나 제한되거나
          이용할 수 없게 될 수 있습니다.
        </p>
        <p>
          이용자는 앱 설정에서 계정을 삭제하거나{" "}
          <Link to="/privacy#account-deletion">
            개인정보처리방침의 계정 삭제 안내
          </Link>
          를 통해 삭제를 요청할 수 있습니다. 삭제는 영구적이며, 이용자가 이미
          내보냈거나 백업했거나 {site.appName} 밖에서 공유한 사본까지 제거하지는
          않습니다.
        </p>
      </PolicySection>

      <PolicySection id="liability" index={7} title="책임의 범위">
        <p>
          관련 법령이 허용하는 범위에서 서비스는 “있는 그대로” 제공됩니다.
          대체할 수 없는 자료는 별도로 사본을 보관하고, 공유하기 전에 내보낸
          결과물을 확인할 책임은 이용자에게 있습니다. 이 약관의 어떤 조항도
          관련 소비자 법령이 배제를 허용하지 않는 권리나 구제 수단을 배제하지
          않습니다.
        </p>
      </PolicySection>

      <PolicySection id="law" index={8} title="약관 변경, 준거법과 문의">
        <p>
          서비스나 관련 요건이 바뀌면 이 약관을 갱신할 수 있습니다. 시행일이
          현재 버전을 나타냅니다. 이 약관은 {site.governingLaw}을 준거법으로
          하며, 이용자가 거주하는 지역에서 보장되는 강행 규정상의 권리를
          제한하지 않습니다.
        </p>
        <p>
          문의는 {site.developerName}에게 보내 주십시오. 이메일{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
          {site.postalAddress ? <>, 우편 {site.postalAddress}</> : null}.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
