// where the logic happens
//usertable is just a test
const { updateBusinessDetails, updateBusinessDisplay } = require("../controllers/businessController");
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

    async updateBusinessDetails(google, streetName, streetNo, unitNo, postal, tags, description) {
        
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

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async updateBusinessDisplay(mainDisplay, pictureArray, displayId) {
        
        const {data,error} = await supabase.from(businessTable)
            .update({
                mainDisplay, pictureArray, displayId
            })

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

}