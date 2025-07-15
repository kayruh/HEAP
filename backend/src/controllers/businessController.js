const businessServices = require('../services/businessServices');
const clerkexpress = require("@clerk/express")


module.exports = {

    async getAll(req, res) {
        try {
            const getAllBusiness = await businessServices.getAllBusiness();
            res.status(200).json({
                getAllBusiness
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBusinessDisplay(req, res) {
        try {
            const { userId } = clerkexpress.getAuth(req);
                if (!userId) {
                  return res.status(401).json({ error: 'Not authenticated' });
                }
            const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
            const { display_id, picture_array} = req.body //might need to change this inidividual picturearray function due to database limitations
            const businessDetailsUpdate = await businessServices.updateBusinessDisplay(username, picture_array, display_id);
            
            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json({
                message: "Updated Business Display"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async upsertEvent(req, res) {
         try {
            const { userId } = clerkexpress.getAuth(req);
                if (!userId) {
                  return res.status(401).json({ error: 'Not authenticated' });
                }
            const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
            const {uuid, title, description, start, end, event_photos} = req.body //might need to change this inidividual picturearray function due to database limitations
            const upsertEvent = await businessServices.upsertEvent(uuid, username, title, description, start, end, event_photos);
            
            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json({
                message: "Upserted Event"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteEvent(req, res) {
        try {
            const { userId } = clerkexpress.getAuth(req);
                if (!userId) {
                  return res.status(401).json({ error: 'Not authenticated' });
                }
            const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
            const {uuid} = req.body
            const deleteEvent = await businessServices.deleteEvent(uuid, username)

            res.status(204).json({
                message: "Deleted Event"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    async getEvents(req, res) {
        try {
            const {username} = req.params
            const getEvents = await businessServices.getEvents(username)

            res.status(200).json({
                message: "Returned Events"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBusinessInfo(req, res) {
        try {
            const {username} = req.params;
            const businessInfo = await businessServices.getBusinessInfo(username);
            if (!username) return res.status(404).json({ error: 'username required' });
            // console.log(businessInfo)
            res.status(200).json(businessInfo)
        }
        catch {
            res.status(500).json({ error: error.message });
        }
    }



}
