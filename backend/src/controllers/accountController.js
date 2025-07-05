const accountServices = require('../services/accountServices');


module.exports = {

    async getAll(req, res) {
        try {
            const getAllAccounts = await accountServices.getAllAccounts();
            res.status(200).json({
                message: "returned all accounts"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateAccount(req, res) {
            try {
                const {email, username} = req.body //body vs params : params reveals ur key value through the link
                const accountUpdated = await accountServices.updateAccount(email, username);
    
                res.status(201).json({
                    message: "Updated Account"
                })
    
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
}