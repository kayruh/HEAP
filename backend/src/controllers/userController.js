const userServices = require('../services/userServices');


module.exports = {

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

