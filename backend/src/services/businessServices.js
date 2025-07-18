// where the logic happens
//usertable is just a test
const { supabase } = require("../db/supabase");
const businessTable = "BUSINESS";
const { v4 } = require('uuid');
const uuidv4 = v4;

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


    async upsertEvent(uuid, username, title, description, start, end, google_map, address) {
        const {data, error} = await supabase.from("EVENT")
            .upsert({
                uuid, username, title, description, start, end, google_map, address
            },{onConflict:"uuid"}
            )
            .select("*")
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    async deleteEvent(uuid, username) {
        const {data, error} = await supabase.from("EVENT")
            .delete()
            .eq("uuid",uuid)
            .eq("username", username)
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    async getEvents(username) {
        const {data, error} = await supabase.from("EVENT")
            .select("*")
            .eq("username",username)
        if (error) {
            throw new Error(error.message);
        }
        return data;

    },

    async getBusinessInfo(username) {
        const { data: bizData, error: bizError} = await supabase
            .from(businessTable)
            .select('*')
            .eq('username', username)
            .maybeSingle();     // returns one object or null

        // const { data: hpData, error: hpError } = await supabase
        //     .from("HOMEPAGE")
        //     .select('*')
        //     .eq('username', username)
        //     .maybeSingle(); 

        if (bizError) {
            throw new Error(error.message);
        }
        // if (hpError) {
        //     throw new Error(hpError.message);
        // }
        // console.log({ ...bizData, ...hpData})
        return { ...bizData, 
            // ... hpData
        };
    },

    


    async uploadBusinessImage(username, fileBuffer, mime) {
        const filePath = `${username}/${uuidv4()}`;

        // console.log(fileBuffer, filePath, username, mime)

        const { data, error } = await supabase.storage
        .from('business-image')
        .upload(filePath, fileBuffer, { contentType: mime });

        if (error) throw new Error(error.message);

        const { data: urlData } = supabase.storage
        .from('business-image')
        .getPublicUrl(filePath);            // bucket public; use signed URL if private

        return { ...data, publicUrl: urlData.publicUrl };
    },

    async getBusinessImage(username) {
        const { data, error } = await supabase.storage
            .from('business-image')
            .list(`${username}/`);

        if (error) throw new Error(error.message);

        return data.map((f) => {
            const { data: url } = supabase.storage
            .from('business-image')
            .getPublicUrl(`${username}/${f.name}`);
            return url.publicUrl;
        });
    },
    
    async deleteBusinessImage(username, fileName) {
        const fullPath = `${username}/${fileName}`; // same pattern as uploads

        const { data, error } = await supabase.storage
            .from('business-image')
            .remove([fullPath]);                      // expects array

        if (error) throw new Error(error.message);
        return data; // usually []
    },   

    async checkBusinessEvent(username, event_uuid) {
        const { data, error} = await supabase
            .from("EVENT")
            .select("*")
            .eq("username", username)
            .eq("uuid",event_uuid)
            .maybeSingle()
        if (error) throw new Error(error.message);
        return data
    },

    async uploadEventImage(event_uuid, fileBuffer, mime) {
        const filePath = `${event_uuid}/${uuidv4()}`;
        const { data, error } = await supabase.storage
        .from('event-image')
        .upload(filePath, fileBuffer, { contentType: mime });

        if (error) throw new Error(error.message);

        const { data: urlData } = supabase.storage
        .from('event-image')
        .getPublicUrl(filePath);            // bucket public; use signed URL if private

    return { ...data, publicUrl: urlData.publicUrl };
    },

    async getEventImage(event_uuid) {
        // console.log("hit service")
        const { data, error } = await supabase.storage
            .from('event-image')
            .list(`${event_uuid}/`);
        // console.log(data)
        if (error) throw new Error(error.message);

        return data.map((f) => {
            const { data: url } = supabase.storage
            .from('event-image')
            .getPublicUrl(`${event_uuid}/${f.name}`);
            return url.publicUrl;
        });
    },
    
    async deleteEventImage(event_uuid, fileName) {
        const fullPath = `${event_uuid}/${fileName}`; // same pattern as uploads

        const { data, error } = await supabase.storage
            .from('event-image')
            .remove([fullPath]);                      // expects array

        if (error) throw new Error(error.message);
        return data;
    },   

        async countEvents(username) {
            const { data, count, error } = await supabase
                .from('EVENT')
                .select('*',{head: true, count: 'exact'})
                .eq('username', username);

            // console.log(business_username, count)

            if (error) throw new Error(error.message);
            return count;
        },

}

