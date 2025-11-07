-- 관심사 총갯수를 가져오는 함수 생성
CREATE OR REPLACE FUNCTION get_interests_count()
RETURNS TABLE(count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT COUNT(*)::BIGGINT
    FROM about_interests
    WHERE active = true;
END;
$$ LANGUAGE plpgsql;

-- 함수 권한 설정
GRANT EXECUTE ON FUNCTION get_interests_count TO anon, authenticated;