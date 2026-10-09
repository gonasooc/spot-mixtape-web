import captureShot from "@/assets/screenshots/capture.webp";
import libraryShot from "@/assets/screenshots/library.webp";
import listenShot from "@/assets/screenshots/listen.webp";
import mixtapeShot from "@/assets/screenshots/mixtape.webp";
import shareShot from "@/assets/screenshots/share.webp";
import { BrandMark } from "@/components/BrandMark";
import { Reveal, stagger } from "@/components/Reveal";
import { ButtonAnchor, ButtonLink, Section, SectionLabel } from "@/components/ui";
import { site } from "@/config/site";

/**
 * App screens, cut from the Play Store screenshots in the app repository
 * (store/android/screenshots): the phone frame only, in a 1:2 box, without
 * the store headline above it. The app's UI is English; the Korean copy next
 * to each screen says what it does. The map screen is absent from the store
 * set because it reveals where the owner records, so it is absent here too.
 */
const SHOT = {
  capture: {
    src: captureShot,
    alt: "기록 화면 — 현재 위치 표시, 가운데의 큰 녹음 버튼, 선택 사진을 붙이는 영역",
  },
  library: {
    src: libraryShot,
    alt: "라이브러리 화면 — 오늘 녹음 5개가 쌓인 개인 아카이브와 사운드 카드 한 장",
  },
  listen: {
    src: listenShot,
    alt: "사운드 카드 상세 화면 — 사운드 온리 커버, 메모, 파형 플레이어, 공유 버튼",
  },
  mixtape: {
    src: mixtapeShot,
    alt: "믹스테이프 화면 — 보라색 커버의 테이프 카드와 지금 재생 중인 소리",
  },
  share: {
    src: shareShot,
    alt: "내보내기 화면 — 스토리 컷 미리보기와 재생 컨트롤, 카드 세 장의 순서",
  },
};

type Shot = (typeof SHOT)[keyof typeof SHOT];

const LOOP: { step: string; title: string; body: string; covers: Shot[] }[] = [
  {
    step: "01",
    title: "기록",
    body: "버튼 한 번으로 최대 10초를 녹음합니다. 같은 화면에서 장소명과 사진, 메모를 함께 붙입니다.",
    covers: [SHOT.capture],
  },
  {
    step: "02",
    title: "보관",
    body: "카드는 날짜별 라이브러리와 사운드 지도에 함께 쌓입니다. 믹스테이프로 묶으면 순서대로 이어 듣습니다.",
    covers: [SHOT.library, SHOT.mixtape],
  },
  {
    step: "03",
    title: "공유",
    body: "카드 한 장이든 테이프 전체든 9:16 세로 영상으로 내보내 갤러리에 저장합니다.",
    covers: [SHOT.share],
  },
];

const PRINCIPLES = [
  "공개 피드도, 좋아요도, 스트릭도 없습니다. 아카이브는 처음부터 끝까지 개인의 것입니다.",
  "광고와 행동 분석 SDK를 넣지 않습니다.",
  "오디오와 사진은 비공개로 저장되고, 소유자에게만 발급되는 서명 링크로 열립니다.",
  "계정 삭제는 프로필과 레코드뿐 아니라 업로드된 원본까지 함께 지웁니다.",
];

function HeroActions() {
  if (!site.appStoreUrl && !site.playStoreUrl) {
    return (
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ButtonAnchor href={`mailto:${site.supportEmail}`}>
          출시 소식 받기
        </ButtonAnchor>
        {/* The app's status toast: an accent dot on a 12% tint of the same hue. */}
        <span className="inline-flex items-center gap-2 rounded-full bg-info/12 px-3 py-1.5 text-meta text-info">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-info" />
          iOS · Android 출시 준비 중
        </span>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
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

/**
 * The sound card screen, stacked the way WalletCardStack stacks cards: two
 * more behind it, each 24px lower, 5% smaller and 15% fainter, the last one a
 * mixtape cover — the one place the app uses its violet. Above the fold, so
 * the image loads eagerly.
 */
function CardStack() {
  return (
    <div className="enter enter-delay-240 relative mx-auto w-full max-w-72 pb-12 lg:mx-0 lg:ml-auto">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-12 aspect-phone scale-90 rounded-card border border-line bg-linear-to-br from-violet via-surface to-canvas-deep opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-6 aspect-phone scale-95 rounded-card border border-line bg-surface opacity-85"
      />
      <figure className="relative m-0 overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <img
          src={SHOT.listen.src}
          alt={SHOT.listen.alt}
          width={720}
          height={1440}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block aspect-phone w-full object-cover"
        />
      </figure>
    </div>
  );
}

/**
 * A loop card's cover, as SoundCard covers a card with its photo: a square
 * crop from the top of the screen, fading into the card body. Two screens
 * split the square the way MixtapeCardCover splits several photos; each half
 * is then 1:2, so a whole phone fits.
 */
function Cover({ covers }: { covers: Shot[] }) {
  return (
    <div
      className={[
        "relative grid aspect-square overflow-hidden",
        covers.length > 1 ? "grid-cols-2 gap-px bg-line" : "",
      ].join(" ")}
    >
      {covers.map((shot) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={720}
          height={1440}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover object-top"
        />
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-surface to-transparent"
      />
    </div>
  );
}

export function Landing() {
  return (
    <>
      {/* Copy on the left, the card stack on the right: the app's sign-in
          lockup, set like a page rather than a centred poster. */}
      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:flex lg:min-h-[calc(100svh-3.75rem)] lg:items-center">
        <div className="mx-auto grid w-full max-w-content items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <BrandMark className="enter size-18 sm:size-22" />
            <p className="enter eyebrow mt-6 mb-0 text-muted">
              Sound Archive for Places
            </p>

            <h1 className="enter enter-delay-60 mt-5 text-hero">
              그때 그곳의 소리를
              <br />
              <span className="text-acid">다시 꺼내 듣습니다.</span>
            </h1>

            <div className="enter enter-delay-120">
              <p className="mt-6 mb-0 max-w-copy text-body text-muted sm:text-lead">
                사진 한 장으로는 담기지 않는 순간이 있습니다. 그 장소의 10초를
                사운드 카드로 남기고, 모아둔 카드를 믹스테이프로 이어 듣습니다.
              </p>
              <HeroActions />
            </div>
          </div>

          <CardStack />
        </div>
      </section>

      <Section>
        <Reveal className="grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-12">
          <SectionLabel>핵심 루프</SectionLabel>
          <h2 className="max-w-[16ch] text-section sm:text-section-lg">
            기록하고, 보관하고, 다시 꺼냅니다.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3">
          {LOOP.map((item, index) => (
            <Reveal
              key={item.step}
              as="article"
              delay={stagger(index)}
              className="overflow-hidden rounded-card border border-line bg-surface shadow-card"
            >
              <Cover covers={item.covers} />
              <div className="p-6 sm:p-7">
                <span className="eyebrow text-faint">{item.step}</span>
                <h3 className="mt-3 text-subtitle">{item.title}</h3>
                <p className="mt-2 mb-0 text-label text-muted sm:text-control">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-14">
          <Reveal>
            <SectionLabel>원칙</SectionLabel>
            <h2 className="mt-4 max-w-[18ch] text-section sm:text-section-lg">
              일부러 그렇게 만들었습니다.
            </h2>
            <ButtonLink to="/privacy" tone="secondary" className="no-print mt-8">
              개인정보처리방침 읽기
            </ButtonLink>
          </Reveal>

          <ol className="m-0 grid list-none gap-5 self-center p-0">
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
          {/* 29 mono characters plus padding is 305px; a 320px screen has
              280px. One step down keeps the address on one line there. */}
          <ButtonAnchor
            href={`mailto:${site.supportEmail}`}
            className="mt-8 font-mono max-sm:text-meta"
          >
            {site.supportEmail}
          </ButtonAnchor>
        </Reveal>
      </Section>
    </>
  );
}
