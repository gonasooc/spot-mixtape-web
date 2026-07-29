import { ButtonAnchor, Eyebrow, Section } from "@/components/ui";
import { deletionRequestMailto, site } from "@/config/site";

const DELETED_ITEMS = [
  {
    term: "계정과 프로필",
    detail:
      "로그인 제공자와 연결된 사용자 ID, 이메일, 표시 이름, 프로필 사진 참조",
  },
  {
    term: "사운드 카드",
    detail: "오디오 녹음, 사진, 메모, 장소명, 좌표, 생성·수정 시각",
  },
  {
    term: "믹스테이프",
    detail: "제목, 카드 연결 관계, 순서와 관련 계정 레코드",
  },
  {
    term: "비공개 클라우드 미디어",
    detail: "계정이 소유한 업로드된 오디오와 이미지 오브젝트",
  },
];

const TIMELINE = [
  {
    label: "0일차",
    title: "요청 접수",
    body: "요청을 확인했음을 알리고 계정 소유 확인 절차를 시작합니다.",
  },
  {
    label: "확인",
    title: "소유 확인",
    body: "권한 없는 삭제를 막기 위해 계정 이메일로 회신을 요청할 수 있습니다.",
  },
  {
    label: `${site.deletionSlaDays}일 이내`,
    title: "삭제 완료",
    body: "계정과 관련 앱 데이터를 제거한 뒤 완료 사실을 안내합니다.",
  },
];

const FAQ = [
  {
    question: "계정 삭제를 되돌릴 수 있나요?",
    answer:
      "되돌릴 수 없습니다. 다시 이용하고 싶다면 새 계정을 만들 수 있지만, 삭제된 카드와 믹스테이프는 앱을 통해 복구할 수 없습니다.",
  },
  {
    question: "앱을 지우면 계정도 삭제되나요?",
    answer:
      "아닙니다. 앱 삭제는 기기의 로컬 데이터를 지울 뿐, 클라우드 계정 자체를 제거하지는 않습니다. 위의 두 가지 방법 중 하나를 이용해 주십시오.",
  },
  {
    question: "갤러리에 저장한 영상은 어떻게 되나요?",
    answer:
      "내보낸 스토리 영상은 기기에 저장된 파일입니다. 갤러리, 백업, 그리고 공유했던 다른 서비스에서 직접 삭제해 주십시오.",
  },
  {
    question: "해지해야 할 유료 구독이 있나요?",
    answer:
      "현재 출시 버전에는 앱 내 구독 상품이 없습니다. 따라서 계정 삭제 전에 별도의 구독 해지 절차가 필요하지 않습니다.",
  },
];

export function AccountDeletion() {
  return (
    <>
      <header className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 size-96 rounded-full bg-acid/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl rise">
          <Eyebrow>개인정보 선택 / 되돌릴 수 없는 처리</Eyebrow>
          <h1 className="max-w-[14ch] text-4xl sm:text-6xl lg:text-7xl">
            {site.appName} 계정을 삭제합니다.
          </h1>
          <p className="mt-6 max-w-xl text-base text-dim sm:text-lg">
            앱 안에서 바로 삭제할 수 있고, 앱을 이미 지웠다면 이 페이지에서
            이메일로 삭제를 요청할 수 있습니다.
          </p>
        </div>
      </header>

      <section
        aria-label="계정 삭제 방법"
        className="grid border-y border-line md:grid-cols-2"
      >
        <article className="flex flex-col bg-acid px-5 py-12 text-ink sm:px-8 sm:py-16 md:border-r md:border-ink/20">
          <div className="flex items-center justify-between gap-4 font-mono text-[0.65rem] font-bold tracking-wide uppercase">
            <span className="grid size-10 place-items-center rounded-full border border-ink">
              01
            </span>
            <span className="rounded-full border border-ink px-2.5 py-1.5">
              가장 빠름
            </span>
          </div>

          <h2 className="mt-10 mb-6 max-w-[10ch] text-3xl sm:text-5xl">
            앱 안에서 삭제
          </h2>

          <ol className="my-2">
            {[
              `${site.appName}을 열고 로그인합니다.`,
              "녹음 화면에서 설정을 엽니다.",
              "계정 삭제를 선택합니다.",
              "경고 문구를 읽고 영구 삭제를 확인합니다.",
            ].map((step, index) => (
              <li
                key={step}
                className="grid min-h-14 grid-cols-[2.5rem_1fr] items-center border-t border-ink/25 last:border-b"
              >
                <span className="font-mono text-[0.67rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-6 mb-0 text-sm text-ink/70">
            앱은 먼저 비공개 스토리지의 파일을 제거한 뒤, 인증된 계정과 그
            계정에 연결된 데이터베이스 레코드를 삭제합니다. 이 과정이 성공한
            뒤에야 로그아웃됩니다.
          </p>
        </article>

        <article className="flex flex-col bg-paper-deep px-5 py-12 text-ink sm:px-8 sm:py-16">
          <div className="flex items-center justify-between gap-4 font-mono text-[0.65rem] font-bold tracking-wide uppercase">
            <span className="grid size-10 place-items-center rounded-full border border-ink">
              02
            </span>
            <span className="rounded-full border border-ink px-2.5 py-1.5">
              앱 없이 가능
            </span>
          </div>

          <h2 className="mt-10 mb-6 max-w-[12ch] text-3xl sm:text-5xl">
            이메일로 삭제 요청
          </h2>

          <p className="m-0 text-ink/75">
            Google 또는 Apple 로그인에 사용한 이메일 주소에서 요청을 보내
            주십시오. 이메일 가리기를 사용했다면 가능한 한 연결된 Apple 릴레이
            주소에서 보내 주십시오.
          </p>

          <div className="mt-8">
            <ButtonAnchor href={deletionRequestMailto} tone="dark">
              삭제 요청 메일 작성
            </ButtonAnchor>
          </div>

          <p className="mt-6 mb-0 text-sm leading-relaxed text-ink/70">
            또는 <a
              href={`mailto:${site.supportEmail}`}
              className="font-bold text-ink underline underline-offset-4"
            >
              {site.supportEmail}
            </a>
            로 제목을 “{site.appName} 계정 삭제 요청”으로 하여 보내 주십시오.
            계정 이메일과 Google·Apple 중 어떤 방식으로 로그인했는지 함께 적어
            주시고, 녹음 파일·사진·비밀번호·신분증·액세스 토큰은 첨부하지 마십시오.
          </p>
        </article>
      </section>

      <Section className="bg-paper text-ink">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr] lg:gap-16">
          <div>
            <Eyebrow className="text-[#536800]">삭제 범위</Eyebrow>
            <h2 className="max-w-[10ch] text-3xl sm:text-5xl">
              무엇이 삭제되나
            </h2>
          </div>
          <ul>
            {DELETED_ITEMS.map((item) => (
              <li
                key={item.term}
                className="grid gap-1 border-t border-ink/15 py-5 last:border-b sm:grid-cols-[0.45fr_1fr] sm:gap-4"
              >
                <span className="font-bold">{item.term}</span>
                <small className="text-sm leading-relaxed text-ink/60">
                  {item.detail}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-y border-line bg-ink-raised">
        <div className="grid gap-4 lg:grid-cols-[0.4fr_1fr] lg:gap-8">
          <Eyebrow>이후 절차</Eyebrow>
          <h2 className="max-w-[14ch] text-3xl sm:text-5xl">
            요청 처리 일정은 이렇게 진행됩니다.
          </h2>
        </div>

        <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {TIMELINE.map((item) => (
            <li key={item.label} className="flex flex-col bg-ink p-6 sm:p-8">
              <span className="eyebrow text-acid">{item.label}</span>
              <h3 className="mt-8 mb-2 text-xl">{item.title}</h3>
              <p className="m-0 text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-[#ff7849] text-ink">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr] lg:gap-16">
          <div>
            <Eyebrow className="text-[#4e1705]">삭제 후 보관</Eyebrow>
            <h2 className="max-w-[10ch] text-3xl sm:text-5xl">
              좁은 범위의 예외
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="m-0 max-w-2xl">{site.deletionRetention}</p>
            <p className="m-0 max-w-2xl">
              제한적으로 남는 데이터가 있더라도 삭제된 계정을 되살리는 데
              사용되지 않습니다. 이용자가 직접 관리하는 기기 내 내보내기 파일과
              백업은 클라우드 계정 삭제 요청으로 제거되지 않습니다.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-paper text-ink">
        <div className="mx-auto max-w-4xl">
          <Eyebrow className="text-[#536800]">자세히</Eyebrow>
          <h2 className="mb-10 text-3xl sm:text-5xl">확인하기 전에</h2>

          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group border-t border-ink/15 last:border-b"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-base font-bold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-5 text-sm leading-relaxed text-ink/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
