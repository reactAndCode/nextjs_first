const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://takkaasbaitjsgtxifty.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRha2thYXNiYWl0anNndHhpZnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4OTQ0NTksImV4cCI6MjA3NzQ3MDQ1OX0.3ZaaAVkrYSw64SKKOcYtsmg5PGvQ9HL53LAFQ9_-w18'
);

const interests = [
  {
    title: "Next.js 14의 새로운 기능들과 성능 최적화",
    description: "최신 Next.js 기능들을 학습하고 실제 프로젝트에 적용하며 성능을 개선하는 것에 관심이 있습니다.",
    icon: "⚡",
    color: "indigo",
    display_order: 1,
    active: true
  },
  {
    title: "TypeScript의 고급 타입 시스템 활용",
    description: "타입 안정성을 높이고 개발자 경험을 개선하는 고급 TypeScript 패턴을 연구하고 있습니다.",
    icon: "🔧",
    color: "purple",
    display_order: 2,
    active: true
  },
  {
    title: "접근성과 반응형 디자인의 완벽한 구현",
    description: "모든 사용자를 위한 접근성과 다양한 디바이스를 지원하는 반응형 디자인에 집중하고 있습니다.",
    icon: "🌐",
    color: "green",
    display_order: 3,
    active: true
  },
  {
    title: "마이크로 인터랙션과 애니메이션으로 생동감 있는 UX",
    description: "사용자 경험을 향상시키는 미세한 애니메이션과 인터랙션 디자인에 대한 연구를 진행 중입니다.",
    icon: "✨",
    color: "blue",
    display_order: 4,
    active: true
  }
];

async function insertInterests() {
  for (const interest of interests) {
    const { data, error } = await supabase
      .from('about_interests')
      .insert([interest]);
    
    if (error) {
      console.error('Error inserting interest:', error);
    } else {
      console.log('Successfully inserted:', interest.title);
    }
  }
}

insertInterests();