import { Waveform } from "@/components/Waveform";
import { ButtonAnchor, ButtonLink, Eyebrow, Section } from "@/components/ui";
import { site } from "@/config/site";

const LOOP = [
  {
    step: "01",
    title: "기록",
    summary:
      "버튼을 한 번 누르면 녹음이 시작되고, 다시 누르면 멈춘다. 최대 10초에서 자동으로 끝난다.",
    details: [
      "저장 전 파형으로 미리 듣고, 마음에 들지 않으면 다시 녹음",
      "GPS와 플랫폼 지오코더로 장소명 자동 입력, 원하면 직접 수정",
      "9:16 사진과 짧은 메모를 한 화면에서 함께 첨부",
    ],
  },
  {
    step: "02",
    title: "보관",
    summary:
      "저장한 카드는 날짜별 라이브러리와 전체 사운드 지도, 두 갈래로 다시 찾아 들을 수 있다.",
    details: [
      "오늘의 카드를 날짜와 장소 기준으로 재배열하는 Daily Auto-Remix",
      "트랙이 바뀔 때 1.5초 crossfade로 이어지는 연속 재생",
      "1년 전 오늘, 지금 이 근처에 남긴 카드를 조용히 다시 제안",
    ],
  },
  {
    step: "03",
    title: "공유",
    summary:
      "카드 하나 또는 믹스테이프 전체를 세로 영상으로 내보내 갤러리에 저장한다.",
    details: [
      "9:16 풀스크린 스토리 뷰어 — 사진, 오버레이, 파형",
      "iOS FFmpeg · Android Media3 기반 1080×1920 H.264/AAC 파일",
      "사진 Ken Burns 줌과 오디오 길이에 맞춘 플레이헤드 스윕",
    ],
  },
];

const VINYL = [
  { term: "사운드 카드", value: "LP 자켓" },
  { term: "라이브러리", value: "레코드 크레이트" },
  { term: "믹스테이프", value: "턴테이블" },
];

const NOT_BUILDING = [
  {
    title: "스트릭도, 배지도 없다",
    body: "매일 기록하라고 재촉하지 않는다. 남기고 싶은 순간에만 남기면 된다.",
  },
  {
    title: "공개 피드가 없다",
    body: "좋아요, 팔로워, 조회수를 만들지 않는다. 아카이브는 처음부터 끝까지 개인의 것이다.",
  },
  {
    title: "광고와 분석 SDK가 없다",
    body: "현재 출시 버전에는 광고나 행동 분석 SDK가 들어 있지 않다.",
  },
  {
    title: "과도한 알림이 없다",
    body: "과거의 기록은 푸시가 아니라 시간과 장소의 맥락 안에서 조용히 다시 나타난다.",
  },
];

const PRIVACY_POSTURE = [
  {
    key: "A",
    title: "기본값이 비공개",
    body: "오디오와 사진은 소유자 전용 정책이 걸린 private 버킷에 저장되고, 짧은 유효기간의 서명 URL로만 열린다.",
  },
  {
    key: "B",
    title: "행 단위 접근 제어",
    body: "데이터베이스 row-level security가 계정이 소유한 레코드만 인증된 사용자에게 연결한다.",
  },
  {
    key: "C",
    title: "삭제가 콘텐츠까지 닿는다",
    body: "계정 삭제는 프로필과 DB 레코드뿐 아니라 업로드된 오디오와 사진 원본까지 함께 지운다.",
  },
];

const RELIABILITY = [
  {
    title: "오프라인에서도 기록은 남는다",
    body: "네트워크가 없을 때 만든 카드는 기기의 로컬 큐에 draft로 보존되고, 연결이 돌아오면 자동으로 업로드된 뒤 정리된다.",
  },
  {
    title: "원본은 손대지 않는다",
    body: "10초 제한은 기술의 한계가 아니라 제품의 선택이다. 녹음된 원본 파일은 가공 없이 그대로 보존한다.",
  },
  {
    title: "플랫폼별 네이티브 렌더러",
    body: "영상 내보내기는 기기 위에서 처리한다. 완성된 영상은 사용자가 저장하거나 공유 시트에서 목적지를 고를 때만 앱 밖으로 나간다.",
  },
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

      <p className="mt-5 mb-0 text-xs leading-relaxed text-muted">
        클라우드에 올라간 미디어는 비공개로 저장되고, 소유자에게만 발급되는
        짧은 수명의 링크로 열린다.
      </p>
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
            <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              그때 그곳의 소리를
              <br />
              <em className="not-italic text-acid">다시 꺼내 듣는다.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base text-dim sm:text-lg">
              중고 음반점의 턴테이블 소리, 골목의 빗소리. 사진 한 장으로는
              담기지 않는 순간이 있다. spotMixtape은 장소의 10초를 위치·사진·
              메모와 함께 사운드 카드로 남기고, 나만의 믹스테이프로 다시
              재생하는 개인 사운드 아카이브다.
            </p>
            <StoreActions />
          </div>

          <div className="flex justify-center lg:justify-end">
            <FieldCard />
          </div>
        </div>
      </section>

      {/* Digital vinyl concept */}
      <Section className="border-y border-line bg-ink-raised">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Digital vinyl</Eyebrow>
            <h2 className="max-w-[14ch] text-3xl sm:text-5xl">
              앱 전체가 하나의 레코드샵이다.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-dim">
              오래된 음반을 고르고 턴테이블에 올리는 감각을 그대로 디지털로
              옮겼다. 어두운 조명 아래 판을 넘기듯 카드를 넘기고, 한 장씩 올려
              듣는다. 문구와 장식이 기억보다 앞에 나서지 않도록 만들었다.
            </p>
            <dl className="mt-8 border-t border-line">
              {VINYL.map((item) => (
                <div
                  key={item.term}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-4"
                >
                  <dt className="font-mono text-sm font-bold text-paper">
                    {item.term}
                  </dt>
                  <dd className="m-0 flex items-center gap-3 text-sm text-muted">
                    <span aria-hidden="true" className="text-acid">
                      →
                    </span>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Core loop */}
      <Section>
        <div className="mb-12 grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-8">
          <Eyebrow>핵심 루프</Eyebrow>
          <h2 className="max-w-[16ch] text-3xl sm:text-5xl">
            기록하고, 보관하고, 다시 꺼낸다.
          </h2>
        </div>

        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {LOOP.map((item) => (
            <article
              key={item.step}
              className="flex flex-col gap-4 bg-ink p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-line font-mono text-[0.65rem] text-acid">
                  {item.step}
                </span>
                <h3 className="text-2xl">{item.title}</h3>
              </div>
              <p className="text-sm text-dim">{item.summary}</p>
              <ul className="mt-auto flex flex-col gap-2.5 border-t border-line pt-4">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="relative pl-4 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2.5 left-0 size-1.5 rounded-full bg-acid/70"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* What we deliberately do not build */}
      <Section className="bg-paper text-ink">
        <div className="mb-12 grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-8">
          <Eyebrow className="text-[#536800]">만들지 않은 것</Eyebrow>
          <h2 className="max-w-[18ch] text-3xl sm:text-5xl">
            빠진 기능이 아니라, 내린 결정이다.
          </h2>
        </div>

        <div className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {NOT_BUILDING.map((item) => (
            <article key={item.title} className="bg-paper p-6 sm:p-8">
              <h3 className="mb-2 text-xl">{item.title}</h3>
              <p className="m-0 text-sm text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Privacy posture */}
      <Section className="border-b border-line bg-ink-raised">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>현재 운영 방식</Eyebrow>
            <h2 className="max-w-[12ch] text-3xl sm:text-5xl">
              작은 앱, 의도적으로 좁힌 데이터.
            </h2>
            <ButtonLink to="/privacy" tone="quiet" className="mt-8">
              개인정보처리방침 읽기
            </ButtonLink>
          </div>

          <div>
            {PRIVACY_POSTURE.map((item) => (
              <article
                key={item.key}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-line py-6 last:border-b"
              >
                <span className="grid size-8 place-items-center rounded-full border border-line-strong font-mono text-[0.65rem] text-acid">
                  {item.key}
                </span>
                <div>
                  <h3 className="mb-1 text-lg">{item.title}</h3>
                  <p className="m-0 max-w-xl text-sm text-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Reliability */}
      <Section>
        <div className="mb-12 grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-8">
          <Eyebrow>기록의 신뢰</Eyebrow>
          <h2 className="max-w-[16ch] text-3xl sm:text-5xl">
            한 번 남긴 소리는 잃지 않는다.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {RELIABILITY.map((item, index) => (
            <article key={item.title} className="border-t-2 border-acid pt-5">
              <span className="eyebrow text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 mb-2 text-xl">{item.title}</h3>
              <p className="m-0 text-sm text-dim">{item.body}</p>
            </article>
          ))}
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
              제품 문의, 개인정보 관련 요청, 계정 삭제 요청 모두 같은 주소로
              보내면 됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:shrink-0">
            <ButtonAnchor href={`mailto:${site.supportEmail}`} tone="dark">
              {site.supportEmail}
            </ButtonAnchor>
            <ButtonLink to="/account-deletion" tone="inverse">
              계정 삭제 안내
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
