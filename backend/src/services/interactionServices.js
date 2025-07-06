// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const interactionTable = "USER_BUSINESS_INTERACTION";

// console.log(supabase)

module.exports = {

    async getAllInteractions() { //for admin use cant be used due to enabled rls 

        const {data,error} = await supabase.from(interactionTable)
            .select("*")

        // console.log('Supabase → data:', data);
        // console.log('Supabase → error:', error);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },
}