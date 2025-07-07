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

    async updateBusinessDetails(clerk_id, google, streetName, streetNo, unitNo, postal, tags, description) {
        
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
            .eq("clerk_id", clerk_id)

        if (error) {
            throw new Error(error.message);
        }
        console.log(data)
        return data;
    },

    async updateBusinessDisplay(mainDisplay, pictureArray, displayId) {
        
        const {data,error} = await supabase.from(businessTable)
            .update({
                mainDisplay, pictureArray, displayId
            })
            .eq("clerk_id", clerk_id)


        if (error) {
            throw new Error(error.message);
        }
        console.log(data)
        return data;
    },

    async getBusinessInfo(clerk_id) {
            const { data, error } = await supabase
                .from(businessTable)
                .select('*')
                .eq('clerk_id', clerk_id)
                .maybeSingle();     // returns one object or null
    
            if (error) {
                throw new Error(error.message);
            }
            return data;          //   ↪︎ bubbles back to controller
        }

}