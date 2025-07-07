const userServices = require('../services/userServices');


module.exports = {

    async getAll(req, res) {
        try {
            const getAllUsers = await userServices.getAllUsers();
            res.status(200).json({
                message: "returned all users"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const {clerk_id} = req.params;
            const {first_name,last_name,DOB} = req.body //body vs params : params reveals ur key value through the link
            const userUpdated = await userServices.updateUser(clerk_id,first_name,last_name,DOB);

            if (!clerk_id) return res.status(404).json({ error: 'clerk_id required' });

            res.status(200).json({
                message: "Updated User"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getUserInfo(req, res) {
        try {
            const {clerk_id} = req.params;
            const userInfo = await userServices.getUserInfo(clerk_id);
            if (!clerk_id) return res.status(404).json({ error: 'clerk_id required' });

            res.status(200).json(userInfo)
        }
        catch {
            res.status(500).json({ error: error.message });
        }
    }

}

