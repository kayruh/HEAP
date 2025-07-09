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

    async updateBusinessDetails(username, google, streetName, streetNo, unitNo, postal, tags, description) {
        
        const {data,error} = await supabase.from(businessTable)
            .update({
                google, 
                streetName, 
                streetNo, 
                unitNo, 
                postal, 
                tags, 
                description
            })
            .eq("username", username)

        if (error) {
            throw new Error(error.message);
        }
        console.log(data)
        return data;
    },

    async updateBusinessDisplay(username, mainDisplay, pictureArray, displayId) {
        
        const {data,error} = await supabase.from(businessTable)
            .update({
                mainDisplay, pictureArray, displayId
            })
            .eq("username", username)


        if (error) {
            throw new Error(error.message);
        }
        console.log(data)
        return data;
    },

    async upsertEvent(uuid, username, title, description, start, end, event_photos) {
        const {data, error} = await supabase.from(EVENT)
            .upsert({
                uuid, username, title, description, start, end, event_photos
            },{onConflict:"uuid"}
        )
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    async getBusinessInfo(username) {
            const { data, error } = await supabase
                .from(businessTable)
                .select('*')
                .eq('username', username)
                .maybeSingle();     // returns one object or null
    
            if (error) {
                throw new Error(error.message);
            }
            return data;          //   ↪︎ bubbles back to controller
        }

}