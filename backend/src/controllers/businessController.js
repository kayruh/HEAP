const businessServices = require('../services/businessServices');


module.exports = {

    async getAll(req, res) {
        try {
            const getAllBusiness = await businessServices.getAllBusiness();
            res.status(200).json({
                message: "returned all businesses"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBusinessDetails(req, res) {
        try {
            const {username} = req.params;
            const {google, streetName, streetNo, unitNo, postal, tags, description} = req.body //body vs params : params reveals ur key value through the link
            const businessDetailsUpdated = await businessServices.updateBusinessDetails(username, google, streetName, streetNo, unitNo, postal, tags, description);

            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json({
                message: "Update Business Details"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBusinessDisplay(req, res) {
        try {
            const {username} = req.params;
            const {mainDisplay, pictureArray, displayId} = req.body //might need to change this inidividual picturearray function due to database limitations
            const businessDetailsUpdate = await businessServices.updateBusinessDisplay(username,mainDisplay, pictureArray, displayId);
            
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
            const {username} = req.params;
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

    async getBusinessInfo(req, res) {
        try {
            const {username} = req.params;
            const businessInfo = await businessServices.getBusinessInfo(username);
            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json(businessInfo)
        }
        catch {
            res.status(500).json({ error: error.message });
        }
    }

}
