import { Waveform } from "@/components/Waveform";
import { ButtonLink, SectionLabel } from "@/components/ui";

export function NotFound() {
  return (
    <section className="flex min-h-[60svh] flex-col justify-center px-5 py-22 sm:px-6 sm:py-36">
      <div className="mx-auto w-full max-w-content">
        <SectionLabel>404 · 신호 없음</SectionLabel>
        <h1 className="mt-4 max-w-[12ch] text-section sm:text-display">
          이 필드 노트는 비어 있습니다.
        </h1>

        <Waveform className="my-9 h-14 max-w-sm" progress={0} />

        <p className="mb-8 max-w-copy text-label text-muted sm:text-control">
          페이지가 옮겨졌을 수 있습니다. 필요한 문서는 아래에서 바로 찾을 수
          있습니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/">홈으로 돌아가기</ButtonLink>
          <ButtonLink to="/privacy" tone="secondary">
            개인정보처리방침
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
