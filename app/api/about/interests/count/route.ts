import { NextRequest, NextResponse } from 'next/server'

// 전통적인 SQL 방식으로 직접 쿼리 실행
async function getInterestsCountWithSQL(): Promise<number> {
  try {
    // 1. Supabase에 PostgreSQL 함수가 있다고 가정하고 RPC 호출
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/get_active_interests_count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      },
      body: JSON.stringify({}), // 파라미터 없음
    })

    if (!response.ok) {
      throw new Error('PostgreSQL function not found or failed')
    }

    const data = await response.json()
    console.log(`전통적인 SQL 쿼리 결과: ${data}개의 활성 관심사`)
    return data
    
  } catch (error) {
    console.log('PostgreSQL 함수 방식 실패, 대체 방법 사용')
    
    // 2. 대체 방법: Supabase REST API로 필터링 후 카운트 (SQL의 WHERE 절과 유사)
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/about_interests?select=id&active=eq.true`, {
        method: 'GET',
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch interests')
      }

      const data = await response.json()
      console.log(`대체 SQL 방식 결과: ${data.length}개의 활성 관심사`)
      return data.length
      
    } catch (fallbackError) {
      console.error('모든 SQL 방식 실패:', fallbackError)
      return 4 // 최종 fallback 값
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const count = await getInterestsCountWithSQL()
    
    return NextResponse.json({ 
      count,
      message: '전통적인 SQL 쿼리로 관심사 총갯수를 성공적으로 가져왔습니다.',
      method: 'PostgreSQL 함수 또는 대체 SQL 방식'
    })
  } catch (error) {
    console.error('Error in interests count API:', error)
    return NextResponse.json(
      { 
        count: 4, // fallback 값
        message: '전통적인 SQL 쿼리 실행에 실패했습니다.',
        method: 'fallback',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}