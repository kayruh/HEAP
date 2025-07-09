const { supabase } = require("../db/supabase");
//need to change the show to either add get an event created by a business or show the business itself
//users can like and save events and businesses?
module.exports = {

    async whatsHot(limit = 6) { //for now algorithm based on just recent likes alone in the past month
      const { data, error } = await supabase
    .rpc('whatsHot', { limit_i: limit });

  if (error) 
    throw new Error(error.message);

  return data;
    },

    async filterByTags(tags, matchAll = false) {
      const payload = {
      p_tags: tags && tags.length ? tags : null,   // NULL = “no tags”
      p_match_all: matchAll
      };

      const { data, error } = await supabase.rpc('filter_by_tags', payload);
      if (error) throw new Error(`Supabase RPC error: ${error.message}`);

      return data ?? [];
    }

  
        
    

}