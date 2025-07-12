CREATE OR REPLACE FUNCTION public.get_top_events(
  p_limit integer DEFAULT 6,
  p_days  integer DEFAULT 30
)
RETURNS TABLE(
  uuid              uuid,
  title             text,
  description       text,
  start             timestamptz,
  "end"             timestamptz,
  like_count        bigint,
  business_username text,
  pictures          text[]       -- ← event_photos goes here
) AS $$
WITH event_likes AS (
  SELECT
    e.uuid,
    e.title,
    e.description,
    e.start,
    e."end",
    e.username          AS business_username,
    COUNT(le.*)         AS like_count,
    COALESCE(e.event_photos, ARRAY[]::text[]) AS pictures
  FROM "EVENT" e
  LEFT JOIN "LIKE_EVENT" le
    ON le.event = e.uuid
   AND le.created_at > NOW() - (p_days || ' days')::interval
  GROUP BY
    e.uuid,
    e.title,
    e.description,
    e.start,
    e."end",
    e.username,
    e.event_photos
),
ranked AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY business_username
      ORDER BY like_count DESC
    ) AS rn
  FROM event_likes
)
SELECT
  uuid,
  title,
  description,
  start,
  "end",
  like_count,
  business_username,
  pictures
FROM ranked
WHERE rn = 1
ORDER BY like_count DESC
LIMIT p_limit;
$$ LANGUAGE sql STABLE;
