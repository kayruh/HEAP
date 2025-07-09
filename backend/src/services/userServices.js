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

    async updateUser(username,first_name,last_name,DOB) {
        
        const {data,error} = await supabase.from(userTable)
            .update({
                first_name,
                last_name,
                DOB
            })
            .eq("username", username )

        if (error) {
            throw new Error(error.message);
        };
        console.log(data)
        return data;
    },

    async getUserInfo(username) {
        const { data, error } = await supabase
            .from(userTable)
            .select('*')
            .eq('username', username)
            .maybeSingle();     // returns one object or null

        if (error) {
            throw new Error(error.message);
        }
        return data;          //   ↪︎ bubbles back to controller
    }

}