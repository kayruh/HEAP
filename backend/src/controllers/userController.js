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
            const {username} = req.params;
            const {first_name,last_name,DOB} = req.body //body vs params : params reveals ur key value through the link
            const userUpdated = await userServices.updateUser(username,first_name,last_name,DOB);

            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json({
                message: "Updated User"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getUserInfo(req, res) {
        try {
            const {username} = req.params;
            const userInfo = await userServices.getUserInfo(username);
            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json(userInfo)
        }
        catch {
            res.status(500).json({ error: error.message });
        }
    }

}

