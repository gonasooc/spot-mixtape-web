import { Waveform } from "@/components/Waveform";
import { ButtonLink, Eyebrow } from "@/components/ui";

export function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow>404 / 신호 없음</Eyebrow>
        <h1 className="max-w-[12ch] text-4xl sm:text-6xl">
          이 필드 노트는 비어 있습니다.
        </h1>
        <Waveform className="my-8 h-16 max-w-md" progress={0} />
        <p className="mb-8 max-w-lg text-dim">
          페이지가 옮겨졌을 수 있습니다. 필요한 문서는 아래에서 바로 찾을 수
          있습니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/">홈으로 돌아가기</ButtonLink>
          <ButtonLink to="/privacy" tone="quiet">
            개인정보처리방침
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
