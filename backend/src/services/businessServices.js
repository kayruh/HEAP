// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const businessTable = "BUSINESS";

// console.log(supabase)

module.exports = {

    async getAllBusiness() { //for admin use cant be used due to enabled rls 

        const {data,error} = await supabase.from(businessTable)
            .select("*")

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async updateBusinessDisplay(username, picture_array, display_id) {
        
        const {data,error} = await supabase.from("HOMEPAGE")
            .update({
                picture_array, display_id
            })
            .eq("username", username)

        
        if (error) {
            throw new Error(error.message);
        }
        
        return data;
    },

    async upsertEvent(uuid, username, title, description, start, end, event_photos) {
        const {data, error} = await supabase.from("EVENT")
            .upsert({
                uuid, username, title, description, start, end, event_photos
            },{onConflict:"uuid"}
        )
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    async deleteEvent(uuid, username) {
        const {data, error} = await supabase.from("EVENT")
            .delete()
            .eq("uuid",uuid)
            .eq("username", username)
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    async getEvents(username) {
        const {data, error} = await supabase.from("EVENT")
            .select("*")
            .eq("username",username)
        if (error) {
            throw new Error(error.message);
        }
        return data;

    },

    async getBusinessInfo(username) {
        const { data: bizData, error: bizError} = await supabase
            .from(businessTable)
            .select('*')
            .eq('username', username)
            .maybeSingle();     // returns one object or null

        const { data: hpData, error: hpError } = await supabase
            .from("HOMEPAGE")
            .select('*')
            .eq('username', username)
            .maybeSingle(); 

        if (bizError) {
            throw new Error(error.message);
        }
        if (hpError) {
            throw new Error(hpError.message);
        }
        // console.log({ ...bizData, ...hpData})
        return { ...bizData, ... hpData};
    }


    // async getBusinessInfo(username) {
    //     const { data, error } = await supabase
    //         .from(businessTable)
    //         .select('*')
    //         .eq('username', username)
    //         .maybeSingle();     // returns one object or null

    //     if (error) {
    //         throw new Error(error.message);
    //     }
    //     return data;          //   ↪︎ bubbles back to controller
    // }

}

