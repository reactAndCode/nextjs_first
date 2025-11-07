import type { Metadata } from "next";
import Image from "next/image";

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
  };
  return colorMap[color] || "bg-gray-500";
}

interface AboutInterest {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  display_order: number;
  active: boolean;
  createdAt: string;
}

async function getInterestsCount(): Promise<number> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/api/about/interests/count`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch interests count");
    }
    
    const data = await res.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching interests count:", error);
    return 4; // fallback 값
  }
}

async function getAboutInterests(): Promise<AboutInterest[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/api/about/interests`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch interests");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching about interests:", error);
    // Fallback to static interests if API fails
    return [
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
      {
        id: "3",
        title: "접근성과 반응형 디자인의 완벽한 구현",
        description: "모든 사용자를 위한 접근성과 다양한 디바이스를 지원하는 반응형 디자인에 집중하고 있습니다.",
        icon: "🌐",
        color: "green",
        display_order: 3,
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        title: "마이크로 인터랙션과 애니메이션으로 생동감 있는 UX",
        description: "사용자 경험을 향상시키는 미세한 애니메이션과 인터랙션 디자인에 대한 연구를 진행 중입니다.",
        icon: "✨",
        color: "blue",
        display_order: 4,
        active: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

export const metadata: Metadata = {
  title: "소개 | 바이브코딩",
  description: "풀스택 개발자의 여정과 기술 스택",
};

export default async function AboutPage() {
  const interests = await getAboutInterests();
  const interestsCount = await getInterestsCount();
  return (
    <div className="space-y-8">
      {/* 히어로 섹션 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
            <Image
              src="/images/heroImg01.png"
              alt="개발자 아바타"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              안녕하세요, <span className="text-indigo-600 dark:text-indigo-400">바이브코딩</span>입니다
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              문제를 해결하고 가치를 만드는 풀스택 개발자
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">
                Next.js Expert
              </span>
              <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
                TypeScript Lover
              </span>
              <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
                UI/UX Enthusiast
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 소개 섹션 */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 개발 철학
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              코드는 단순히 작동하는 것이 아니라, 사람들의 삶을 개선해야 한다고 믿습니다. 
              깔끔한 코드, 직관적인 UI, 뛰어난 사용자 경험을 추구하며 지속적으로 배우고 성장하고 있습니다.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 현재 관심사
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {interests.map((interest) => (
                <li key={interest.id} className="flex items-center gap-3">
                  <span className={`w-2 h-2 ${getColorClass(interest.color)} rounded-full`}></span>
                  {interest.title}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                총 <span className="font-semibold text-indigo-600 dark:text-indigo-400">{interestsCount}개</span>의 관심사가 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 기술 스택 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              💻 기술 스택
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">Backend & Database</h3>
                <div className="flex flex-wrap gap-2">
                  {["Supabase", "PostgreSQL", "Prisma", "Next.js API Routes"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">Tools & Deployment</h3>
                <div className="flex flex-wrap gap-2">
                  {["Vercel", "Git", "VS Code", "Figma"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 프로젝트 통계 */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">📊 프로젝트 통계</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-indigo-200">완성된 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50k+</div>
                <div className="text-indigo-200">코드 라인</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-indigo-200">GitHub 커밋</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-indigo-200">학습 중</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">함께 일하고 싶으신가요?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          재미있는 프로젝트나 협업 제안이 있다면 언제든 연락 주세요. 
          새로운 도전을 좋아하고, 함께 성장할 수 있는 기회를 기다리고 있습니다.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:contact@vibecoding.dev" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            📧 이메일 보내기
          </a>
          <a href="https://github.com/vibecoding" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            🔗 GitHub 보기
          </a>
        </div>
      </div>
    </div>
  );
}