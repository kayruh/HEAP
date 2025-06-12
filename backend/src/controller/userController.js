const { supabase } = require("../db/supabase");
//usertable is just a test
const userTable = "user";

module.exports = {

    async createUerAccount(name) {
        const {data,error} = await supabase //this is the sql statement in code!
            .from(userTable)
            .insert([{"name" :name}])

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

}