export interface AboutInterest {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  display_order: number;
  active: boolean;
  createdAt: string;
}

export const aboutInterests: AboutInterest[] = [
  {
    id: "1",
    title: "Next.js 14의 새로운 기능들과 성능 최적화",
    description: "최신 Next.js 기능들을 학습하고 실제 프로젝트에 적용하며 성능을 개선하는 것에 관심이 있습니다.",
    icon: "⚡",
    color: "indigo",
    display_order: 1,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TypeScript의 고급 타입 시스템 활용",
    description: "타입 안정성을 높이고 개발자 경험을 개선하는 고급 TypeScript 패턴을 연구하고 있습니다.",
    icon: "🔧",
    color: "purple",
    display_order: 2,
    active: true,
    createdAt: new Date().toISOString(),
  },
];