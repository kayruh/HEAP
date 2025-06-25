const userServices = require('../services/userServices');


module.exports = {

    async createAccount(req, res) {
        try {
            const {name} = req.body //body vs params : params reveals ur key value through the link
            const userAccountCreated = await userServices.createUserAccount(name);

            res.status(200).json({
                message: "it works"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

