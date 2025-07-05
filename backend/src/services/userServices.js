// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const userTable = "user";

// console.log(supabase)

module.exports = {

    async createUserAccount(name) {
        
        const {data,error} = await supabase //this is the sql statement in code!
            .from("user")
            .insert([{name}])

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async getAllUsers() {

        const {data,error} = await supabase
            .select("*")
            .from("user")
        if (error) {
            throw new Error(error.message);
        }

        return data;
        

    }

}