export interface RouteMeta {
  /** Router path and, for the prerenderer, the output directory. */
  path: string;
  title: string;
  description: string;
  /** Browser UI colour — legal pages render on paper, the landing on ink. */
  themeColor: string;
  indexable: boolean;
}

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: "spotMixtape — 장소 기반 사운드 아카이브",
    description:
      "그때 그곳의 10초를 소리로 남깁니다. 위치와 사진을 담은 사운드 카드를 모아 나만의 믹스테이프로 다시 듣는 iOS·Android 앱입니다.",
    themeColor: "#0B0D0A",
    indexable: true,
  },
  {
    path: "/privacy",
    title: "개인정보처리방침 · spotMixtape",
    description:
      "spotMixtape이 수집하는 개인정보 항목과 이용 목적, 처리 위탁과 국외 이전, 보관과 파기, 이용자의 권리를 안내합니다.",
    themeColor: "#F3F5EC",
    indexable: true,
  },
  {
    path: "/terms",
    title: "이용약관 · spotMixtape",
    description:
      "spotMixtape 서비스 이용 조건, 계정과 콘텐츠에 대한 책임, 녹음 시 지켜야 할 사항과 금지 행위를 안내합니다.",
    themeColor: "#F3F5EC",
    indexable: true,
  },
  {
    path: "/404",
    title: "페이지를 찾을 수 없습니다 · spotMixtape",
    description: "요청한 페이지가 존재하지 않습니다.",
    themeColor: "#0B0D0A",
    indexable: false,
  },
];

export function findRouteMeta(pathname: string): RouteMeta {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  return (
    routes.find((route) => route.path === normalized) ??
    routes[routes.length - 1]
  );
}
