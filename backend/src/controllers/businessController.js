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
            const {clerk_id} = req.params;
            const {google, streetName, streetNo, unitNo, postal, tags, description} = req.body //body vs params : params reveals ur key value through the link
            const businessDetailsUpdated = await businessServices.updateBusinessDetails(clerk_id, google, streetName, streetNo, unitNo, postal, tags, description);

            if (!clerk_id) return res.status(404).json({ error: 'clerk_id required' });

            res.status(200).json({
                message: "Update Business Details"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBusinessDisplay(req, res) {
        try {
            const {clerk_id} = req.params;
            const {mainDisplay, pictureArray, displayId} = req.body //might need to change this inidividual picturearray function due to database limitations
            const businessDetailsUpdate = await businessServices.updateBusinessDisplay(clerk_id,mainDisplay, pictureArray, displayId);
            
            if (!clerk_id) return res.status(404).json({ error: 'clerk_id required' });

            res.status(200).json({
                message: "Updated Business Display"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBusinessInfo(req, res) {
        try {
            const {clerk_id} = req.params;
            const businessInfo = await businessServices.getBusinessInfo(clerk_id);
            if (!clerk_id) return res.status(404).json({ error: 'clerk_id required' });

            res.status(200).json(businessInfo)
        }
        catch {
            res.status(500).json({ error: error.message });
        }
    }

}
