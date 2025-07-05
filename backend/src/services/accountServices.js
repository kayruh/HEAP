// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const accountTable = "ACCOUNT";

// console.log(supabase)

module.exports = {

    async getAllAccounts() { //for admin use cant be used due to enabled rls 

        const {data,error} = await supabase.from(accountTable)
            .select("*")

        // console.log('Supabase → data:', data);
        // console.log('Supabase → error:', error);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async updateAccount(email,username) {
        
        const {data,error} = await supabase.from(accountTable)
            .upsert({
                email,
                username
            })

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

}