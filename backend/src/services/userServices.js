// where the logic happens
//usertable is just a test
const { getUserInfo } = require("../controllers/userController");
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

    async updateUser(clerk_id,first_name,last_name,DOB) {
        
        const {data,error} = await supabase.from(userTable)
            .update({
                first_name,
                last_name,
                DOB
            })
            .eq("clerk_id", clerk_id )

        if (error) {
            throw new Error(error.message);
        };
        console.log(data)
        return data;
    },

    async getUserInfo(clerk_id) {
        const { data, error } = await supabase
            .from(userTable)
            .select('*')
            .eq('clerk_id', clerk_id)
            .maybeSingle();     // returns one object or null

        if (error) {
            throw new Error(error.message);
        }
        return data;          //   ↪︎ bubbles back to controller
    }

}