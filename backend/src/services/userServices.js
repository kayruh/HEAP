// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const userTable = "user";

// console.log(supabase)

module.exports = {

    async getAllUsers() { //for admin use

        const {data,error} = await supabase.from("USER")
            .select("*")
            
        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async updateUser(first_name,last_name,DOB) {
        
        const {data,error} = await supabase.from("USER")
            .upsert({
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