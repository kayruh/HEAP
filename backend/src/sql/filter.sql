create or replace function public.filter_by_tags(
    p_tags       text[],
    p_match_all  boolean default false
)
returns setof jsonb
language sql
stable
as $$
with candidate_businesses as (
    -- ① businesses that pass the tag rule
    select b.*
    from   "BUSINESS" b
    where  (
              p_tags is null
              or array_length(p_tags,1) is null           -- no tags
           )
       or ( p_match_all       and b.tags @> p_tags )      -- all tags
       or ( not p_match_all       and b.tags && p_tags )      -- any tag
),

events_from_candidates as (
    -- ② every event owned by those businesses
    select e.*
    from   "EVENT" e
    where  e.username in (select cb.username from candidate_businesses cb)
),

businesses_without_events as (
    -- ③ businesses that have zero events
    select cb.*
    from   candidate_businesses cb
    where  not exists (
             select 1
             from events_from_candidates efc
             where efc.username = cb.username
           )
),

rows_to_return as (
    /* ④ Homogeneous set: each SELECT now yields ONE jsonb column,
          so UNION ALL is legal */
    select to_jsonb(e.*) as row_json
    from   events_from_candidates e

    union all

    select to_jsonb(b.*) as row_json
    from   businesses_without_events b
)

select row_json
from   rows_to_return;
$$;
