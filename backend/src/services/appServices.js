const { supabase } = require("../db/supabase");
//need to change the show to either add get an event created by a business or show the business itself
//users can like and save events and businesses?
module.exports = {
    async whatsHot() { //for now algorithm based on just recent likes alone in the past month
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 30);
        const since = cutoff.toISOString()
        const {data,error} = await supabase.from("LIKES")
            .select('business_username, likes:count(*)')
            .gte('created_at', since)
            .group('business_username')
            .order('like_count', { ascending: false })
            .limit(6);
        if (error) {
            throw new Error(error.message)
        }
        return data
    },

    async filter(tags, matchAll) {
  if (!Array.isArray(tags) || tags.length === 0) {
     // Nothing to filter by → return empty list (or fetch everything – up to you)
  }

  // Build the query
  let query = supabase.from("BUSINESS").select("*");

  query = matchAll
    ? query.contains("tags", tags)     // @>  – column contains every element in value :contentReference[oaicite:0]{index=0}
    : query.overlaps("tags", tags);    // &&  – column & value share at least one element :contentReference[oaicite:1]{index=1}

  const { data, error } = await query;

  if (error) {
    throw new Error(`Supabase: ${error.message}`);
  }

  return data ?? [];
}

        
    }

}