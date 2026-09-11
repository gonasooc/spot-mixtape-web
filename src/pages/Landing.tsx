import { Reveal, stagger } from "@/components/Reveal";
import { Waveform } from "@/components/Waveform";
import { ButtonAnchor, ButtonLink, Section, SectionLabel } from "@/components/ui";
import { site } from "@/config/site";

const LOOP = [
  {
    step: "01",
    title: "기록",
    body: "버튼 한 번으로 최대 10초를 녹음합니다. 같은 화면에서 장소명과 사진, 메모를 함께 붙입니다.",
  },
  {
    step: "02",
    title: "보관",
    body: "카드는 날짜별 라이브러리와 사운드 지도에 함께 쌓입니다. 믹스테이프로 묶으면 순서대로 이어 듣습니다.",
  },
  {
    step: "03",
    title: "공유",
    body: "카드 한 장이든 테이프 전체든 9:16 세로 영상으로 내보내 갤러리에 저장합니다.",
  },
];

const PRINCIPLES = [
  "공개 피드도, 좋아요도, 스트릭도 없습니다. 아카이브는 처음부터 끝까지 개인의 것입니다.",
  "광고와 행동 분석 SDK를 넣지 않습니다.",
  "오디오와 사진은 비공개로 저장되고, 소유자에게만 발급되는 서명 링크로 열립니다.",
  "계정 삭제는 프로필과 레코드뿐 아니라 업로드된 원본까지 함께 지웁니다.",
];

const CARD_META = [
  { term: "길이", value: "00:10" },
  { term: "소유", value: "나" },
  { term: "접근", value: "서명" },
];

function HeroActions() {
  if (!site.appStoreUrl && !site.playStoreUrl) {
    return (
      <>
        <div className="mt-9 flex justify-center">
          <ButtonAnchor href={`mailto:${site.supportEmail}`}>
            출시 소식 받기
          </ButtonAnchor>
        </div>
        <p className="mt-4 mb-0 text-meta text-faint">
          iOS와 Android 출시를 준비하고 있습니다.
        </p>
      </>
    );
  }

  return (
    <div className="mt-9 flex flex-wrap justify-center gap-3">
      {site.appStoreUrl && (
        <ButtonAnchor href={site.appStoreUrl}>App Store에서 받기</ButtonAnchor>
      )}
      {site.playStoreUrl && (
        <ButtonAnchor href={site.playStoreUrl} tone="secondary">
          Google Play에서 받기
        </ButtonAnchor>
      )}
    </div>
  );
}

/** A single sound card, the unit the whole app is built on. */
function SoundCard() {
  return (
    <div
      className="enter mx-auto mt-12 w-full max-w-xl rounded-card bg-surface p-6 sm:p-8"
      style={{ animationDelay: "240ms" }}
    >
      <div className="eyebrow flex items-center justify-between gap-4 text-faint">
        <span>FIELD NOTE / 001</span>
        <span className="inline-flex items-center gap-2 text-acid">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-acid" />
          비공개
        </span>
      </div>

      <Waveform className="my-6 h-24 sm:my-7 sm:h-28" progress={0.55} animated />

      <dl className="grid grid-cols-3 gap-5">
        {CARD_META.map((item) => (
          <div key={item.term}>
            <dt className="text-caption text-faint">{item.term}</dt>
            <dd className="m-0 mt-1 font-mono text-meta text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Landing() {
  return (
    <>
      <section className="flex min-h-[calc(100svh-3.25rem)] flex-col justify-center px-5 py-16 sm:min-h-[calc(100svh-3.75rem)] sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-content">
          <div className="mx-auto max-w-hero text-center">
            <SectionLabel className="enter text-faint">
              iOS · Android 사운드 아카이브
            </SectionLabel>

            <h1
              className="enter mt-5 text-hero"
              style={{ animationDelay: "60ms" }}
            >
              그때 그곳의 소리를
              <br />
              <span className="text-acid">다시 꺼내 듣습니다.</span>
            </h1>

            <div className="enter" style={{ animationDelay: "120ms" }}>
              <p className="mx-auto mt-6 mb-0 max-w-copy text-body text-muted sm:text-lead">
                사진 한 장으로는 담기지 않는 순간이 있습니다. 그 장소의 10초를
                사운드 카드로 남기고, 모아둔 카드를 믹스테이프로 이어 듣습니다.
              </p>
              <HeroActions />
            </div>
          </div>

          <SoundCard />
        </div>
      </section>

      <Section>
        <Reveal className="grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-12">
          <SectionLabel>핵심 루프</SectionLabel>
          <h2 className="max-w-[16ch] text-section sm:text-section-lg">
            기록하고, 보관하고, 다시 꺼냅니다.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-3">
          {LOOP.map((item, index) => (
            <Reveal
              key={item.step}
              as="article"
              delay={stagger(index)}
              className="rounded-card bg-surface p-6 sm:p-7"
            >
              <span className="eyebrow text-faint">{item.step}</span>
              <h3 className="mt-3 text-subtitle">{item.title}</h3>
              <p className="mt-2 mb-0 text-label text-muted sm:text-control">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel>원칙</SectionLabel>
            <h2 className="mt-4 max-w-[18ch] text-section sm:text-section-lg">
              빠진 기능이 아니라, 내린 결정입니다.
            </h2>
            <ButtonLink to="/privacy" tone="secondary" className="no-print mt-8">
              개인정보처리방침 읽기
            </ButtonLink>
          </Reveal>

          <ol className="m-0 grid list-none gap-7 self-center p-0">
            {PRINCIPLES.map((principle, index) => (
              <Reveal
                key={principle}
                as="li"
                delay={stagger(index)}
                className="grid grid-cols-[2rem_1fr] items-baseline"
              >
                <span className="font-mono text-caption text-acid">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-label text-muted sm:text-control">
                  {principle}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionLabel>문의</SectionLabel>
          <h2 className="mt-4 text-section sm:text-section-lg">
            사람이 직접 답합니다.
          </h2>
          <p className="mt-4 mb-0 max-w-copy text-label text-muted sm:text-control">
            제품 문의도, 개인정보와 계정 삭제 요청도 같은 주소로 받습니다.
          </p>
          <ButtonAnchor
            href={`mailto:${site.supportEmail}`}
            className="mt-8 font-mono"
          >
            {site.supportEmail}
          </ButtonAnchor>
        </Reveal>
      </Section>
    </>
  );
}
