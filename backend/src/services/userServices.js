// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const userTable = "USER";

// console.log(supabase)

module.exports = {

    async getAllUsers() { //for admin use cant be used due to enabled rls 

        const {data,error} = await supabase.from(userTable)
            .select("*")

        // console.log('Supabase → data:', data);
        // console.log('Supabase → error:', error);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async updateUser(first_name,last_name,DOB) {
        
        const {data,error} = await supabase.from(userTable)
            .update({
                first_name,
                last_name,
                DOB
            })

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

}