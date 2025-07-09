-- 📄 db/migrations/20250710b_top_likes.sql
create or replace function public.whatsHot(limit_i int default 6)
returns table (
    business_username text,        -- owner of the likeable item
    target_type       text,        -- 'business' | 'event'
    target_uuid       uuid,        -- NULL for pure-business likes
    likes_count       bigint
) language sql stable as
$$
/*  STEP 1 ─ collapse the last 30 days of likes
    ------------------------------------------
    - One row per (business, specific-event OR NULL) pair
*/
with recent_likes as (
    select
        l.business_username,
        l.event,                             -- uuid of EVENT; null = business like
        count(*)::bigint  as likes_count
    from "LIKES" l
    where l.created_at >= now() - interval '30 days'
    group by l.business_username, l.event
),


best_per_business as (
    select *
    from (
        select
            rl.*,
            row_number() over (
                partition by rl.business_username
                order by rl.likes_count desc
            ) as rn
        from recent_likes rl
    ) ranked
    where rn = 1
)


select
    business_username,
    case when event is null then 'business' else 'event' end as target_type,
    event                   as target_uuid,
    likes_count
from best_per_business
order by likes_count desc
limit limit_i;
$$;

