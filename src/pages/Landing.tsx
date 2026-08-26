import { Waveform } from "@/components/Waveform";
import { ButtonAnchor, ButtonLink, Eyebrow, Section } from "@/components/ui";
import { site } from "@/config/site";

const LOOP = [
  {
    step: "01",
    title: "기록",
    body: "버튼 한 번으로 최대 10초를 녹음합니다. 장소명과 사진, 메모가 한 화면에서 함께 붙습니다.",
  },
  {
    step: "02",
    title: "보관",
    body: "카드는 날짜별 라이브러리와 사운드 지도에 쌓이고, 믹스테이프로 이어 듣습니다.",
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

function StoreActions() {
  const hasStoreLinks = Boolean(site.appStoreUrl || site.playStoreUrl);

  if (!hasStoreLinks) {
    return (
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-acid/40 bg-acid/10 px-5 font-mono text-xs font-bold tracking-wide text-acid">
          <span aria-hidden="true" className="size-2 rounded-full bg-acid" />
          iOS · Android 출시 준비 중
        </span>
        <ButtonAnchor href={`mailto:${site.supportEmail}`} tone="quiet">
          출시 소식 받기
        </ButtonAnchor>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {site.appStoreUrl && (
        <ButtonAnchor href={site.appStoreUrl}>App Store에서 받기</ButtonAnchor>
      )}
      {site.playStoreUrl && (
        <ButtonAnchor href={site.playStoreUrl} tone="quiet">
          Google Play에서 받기
        </ButtonAnchor>
      )}
    </div>
  );
}

function FieldCard() {
  return (
    <div className="relative w-full max-w-md rotate-[1.5deg] rounded-sm border border-acid/40 bg-ink-raised bg-linear-[145deg] from-acid/10 to-transparent to-50% p-5 shadow-[0_28px_90px_rgb(0_0_0/40%)] sm:rotate-[2.5deg] sm:p-7">
      <span
        aria-hidden="true"
        className="absolute -right-3 -bottom-3 top-3 left-3 -z-10 border border-line"
      />

      <div className="flex items-center justify-between gap-4 font-mono text-[0.6rem] tracking-widest text-muted">
        <span>FIELD NOTE / 001</span>
        <span className="inline-flex items-center gap-1.5 text-acid">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-acid shadow-[0_0_16px_var(--color-acid)]"
          />
          비공개
        </span>
      </div>

      <Waveform
        className="my-6 h-32 border-y border-line py-4 sm:h-40"
        progress={0.55}
        animated
      />

      <dl className="grid grid-cols-3 gap-3">
        {[
          { term: "길이", value: "00:10" },
          { term: "소유", value: "나" },
          { term: "접근", value: "서명" },
        ].map((item) => (
          <div key={item.term} className="border-l border-line pl-3">
            <dt className="font-mono text-[0.55rem] tracking-widest text-muted uppercase">
              {item.term}
            </dt>
            <dd className="m-0 font-mono text-sm">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 size-[28rem] rounded-full bg-acid/8 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="rise">
            <Eyebrow>Sound archive for places</Eyebrow>
            <h1 className="text-[2.6rem] leading-[1.26] sm:text-6xl lg:text-7xl">
              그때 그곳의 소리를
              <br />
              <em className="not-italic text-acid">다시 꺼내 듣습니다.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base text-dim sm:text-lg">
              사진 한 장으로는 담기지 않는 순간이 있습니다. spotMixtape은
              장소의 10초를 사운드 카드로 남기고, 나만의 믹스테이프로 다시 듣는
              개인 사운드 아카이브입니다.
            </p>
            <StoreActions />
          </div>

          <div className="flex justify-center lg:justify-end">
            <FieldCard />
          </div>
        </div>
      </section>

      {/* Core loop */}
      <Section className="border-t border-line">
        <div className="mb-12 grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-8">
          <Eyebrow>핵심 루프</Eyebrow>
          <h2 className="max-w-[16ch] text-3xl sm:text-5xl">
            기록하고, 보관하고, 다시 꺼냅니다.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {LOOP.map((item) => (
            <article key={item.step} className="border-t-2 border-acid pt-5">
              <span className="eyebrow text-muted">{item.step}</span>
              <h3 className="mt-3 mb-2 text-2xl">{item.title}</h3>
              <p className="m-0 text-sm text-dim">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-paper text-ink">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <div>
            <Eyebrow className="text-[#536800]">원칙</Eyebrow>
            <h2 className="max-w-[18ch] text-3xl sm:text-5xl">
              빠진 기능이 아니라, 내린 결정입니다.
            </h2>
            <ButtonLink to="/privacy" tone="inverse" className="mt-8 no-print">
              개인정보처리방침 읽기
            </ButtonLink>
          </div>

          <ol className="self-center">
            {PRINCIPLES.map((principle, index) => (
              <li
                key={principle}
                className="grid grid-cols-[2.5rem_1fr] items-baseline border-t border-ink/15 py-5 last:border-b"
              >
                <span className="font-mono text-[0.67rem] font-bold text-[#667a17]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-ink/80">{principle}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="bg-acid px-5 py-16 text-ink sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow className="text-[#425400]">문의</Eyebrow>
            <h2 className="max-w-[14ch] text-3xl sm:text-5xl">
              사람이 직접 답합니다.
            </h2>
            <p className="mt-4 mb-0 max-w-lg text-sm text-ink/70">
              제품 문의도, 개인정보와 계정 삭제 요청도 같은 주소로 받습니다.
            </p>
          </div>
          <ButtonAnchor
            href={`mailto:${site.supportEmail}`}
            tone="dark"
            className="sm:shrink-0"
          >
            {site.supportEmail}
          </ButtonAnchor>
        </div>
      </section>
    </>
  );
}
