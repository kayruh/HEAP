
CREATE OR REPLACE FUNCTION public.get_top_events (
  p_limit integer DEFAULT 6,
  p_days  integer DEFAULT 30
)
RETURNS TABLE (
  uuid              uuid,
  title             text,
  description       text,
  start             timestamptz,
  "end"             timestamptz,
  like_count        bigint,
  business_username text,
  cover_url         text         -- single public image URL (nullable)
) AS $$
WITH event_likes AS (
  /* 1️⃣  Count likes per event in the last p_days */
  SELECT
    e.uuid,
    e.title,
    e.description,
    e.start,
    e."end",
    e.username                      AS business_username,
    COUNT(le.*)                     AS like_count
  FROM "EVENT"            e
  LEFT JOIN "LIKE_EVENT"   le
         ON le.event = e.uuid
        AND le.created_at > NOW() - (p_days || ' days')::interval
  GROUP BY
    e.uuid,
    e.title,
    e.description,
    e.start,
    e."end",
    e.username
),
ranked AS (
  /* 2️⃣  Keep each business’s top-liked event */
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY business_username
      ORDER BY like_count DESC
    ) AS rn
  FROM event_likes
)
SELECT
  r.uuid,
  r.title,
  r.description,
  r.start,
  r."end",
  r.like_count,
  r.business_username,

  /* 3️⃣  Pick the first object whose key starts with <uuid>/ */
  (
    SELECT
      'https://nirelgpdnqxwvnrctnmh.supabase.co/storage/v1/object/public/' ||
      o.bucket_id || '/' || o.name
    FROM storage.objects o
    WHERE o.bucket_id = 'event-image'
      AND o.name LIKE r.uuid || '/%'     -- any file in that folder
    ORDER BY o.name                      -- deterministic pick (ASCII)
    LIMIT 1
  ) AS cover_url

FROM ranked r
WHERE r.rn = 1                           -- best per business
ORDER BY r.like_count DESC
LIMIT p_limit;
$$ LANGUAGE sql STABLE;
