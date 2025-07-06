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
            const {google, streetName, streetNo, unitNo, postal, tags, description} = req.body //body vs params : params reveals ur key value through the link
            const businessDetailsUpdated = await businessServices.updateBusinessDetails(google, streetName, streetNo, unitNo, postal, tags, description);

            res.status(201).json({
                message: "Update Business Details"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBusinessDisplay(req, res) {
        try {
            const {mainDisplay, pictureArray, displayId} = req.body //might need to change this inidividual picturearray function due to database limitations
            const businessDetailsUpdate = await businessServices.updateBusinessDisplay(mainDisplay, pictureArray, displayId);

            res.status(201).json({
                message: "Updated Business Display"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}
