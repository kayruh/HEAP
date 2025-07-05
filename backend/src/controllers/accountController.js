const userServices = require('../services/userServices');


module.exports = {

    async getAll(req, res) {
        try {
            const getAllUsers = await userServices.getAllUsers();
            console.log(getAllUsers); // should print all users
            res.status(200).json({
                message: "returned all users"
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}