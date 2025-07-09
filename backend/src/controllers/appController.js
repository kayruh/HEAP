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
            const tagsParam = (req.query.tags || '').trim();
            const tags =
            tagsParam ? tagsParam.split(',').map((t) => t.trim()) : null;

            const matchAll = String(req.query.matchAll || '').toLowerCase() === 'true';


            const rows = await appServices.filterByTags(tags, matchAll);

            const payload = rows.map((r) => ({
            type: 'start' in r ? 'event' : 'business',
            ...r
            }));

            res.status(200).json(payload);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message});
        }
    }

}