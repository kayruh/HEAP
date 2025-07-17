const appServices = require('../services/appServices');


module.exports = {

    async getWhatsHot(req, res) {
        try {
            const getWhatsHot = await appServices.whatsHot();
            // console.log(getWhatsHot)
            res.status(200).json(getWhatsHot)

            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getOngoingEventsAndBusinesses(req, res) {
        try {
            const {tags} = req.body

            const rows = await appServices.getOngoingEventsAndBusinesses(tags);

            res.status(200).json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message});
        }
    }

}