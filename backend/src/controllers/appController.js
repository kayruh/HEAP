const appServices = require('../services/appServices');


module.exports = {

    async getWhatsHot(req, res) {
        try {
            const getWhatsHot = await appServices.whatsHot();
            res.status(200).json({
                message: "returned What's Hot"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getFilterEvent(req, res) {
        try {
            const {tags} = req.body
            const getFilterEvent = await appServices.filter(tags);
            res.status(200).json({
                message: "returned Filter"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

}