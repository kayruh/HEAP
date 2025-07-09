const { supabase } = require("../db/supabase");

module.exports = {
    async whatsHot() { //for now algorithm based on just recent likes alone in the past month
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 30);
        const since = cutoff.toISOString()
        const {data,error} = await supabase.from("LIKES")
            .select('business_clerk_id, likes:count(*)')
            .gte('created_at', since)
            .group('business_clerk_id')
            .order('like_count', { ascending: false })
            .limit(6);
        if (error) {
            throw new Error(error.message)
        }
        return data
    },

    async filter (filter) {
        
    }

}