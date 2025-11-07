-- 직접 SQL 쿼리를 실행하는 PostgreSQL 함수 생성
CREATE OR REPLACE FUNCTION execute_sql(query_text TEXT)
RETURNS TABLE(result JSON) AS $$
BEGIN
    RETURN QUERY EXECUTE query_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 권한 설정
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO anon, authenticated;

-- 관심사 총갯수를 가져오는 특정 함수
CREATE OR REPLACE FUNCTION get_active_interests_count()
RETURNS INTEGER AS $$
DECLARE
    total_count INTEGER;
BEGIN
    -- 전통적인 SQL COUNT 쿼리 실행
    SELECT COUNT(*) INTO total_count
    FROM about_interests 
    WHERE active = true;
    
    RETURN total_count;
END;
$$ LANGUAGE plpgsql;

-- 권한 설정
GRANT EXECUTE ON FUNCTION get_active_interests_count() TO anon, authenticated;