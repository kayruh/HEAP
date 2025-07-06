const interactionServices = require('../services/interactionServices');


module.exports = {

    async getAll(req, res) {
        try {
            const getAllInteractions = await accountServices.getAllInteractions();
            res.status(200).json({
                message: "returned all interactions"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}