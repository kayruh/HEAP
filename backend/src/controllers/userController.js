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
    },

    async updateUser(req, res) {
        try {
            const {first_name,last_name,DOB} = req.body //body vs params : params reveals ur key value through the link
            const userUpdated = await userServices.updateUser(first_name,last_name,DOB);

            res.status(201).json({
                message: "Updated User"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

