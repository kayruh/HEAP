// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const userTable = "USER";

// console.log(supabase)

module.exports = {

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