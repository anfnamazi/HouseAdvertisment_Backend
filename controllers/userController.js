const User = require("../models/user");

class UserController {

    //Get one user by id
    async getOneUserById(req, res, next) {
        try {
            var user = await User.findById(req.params.id);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }

    //Get all users
    async getAll(req, res, next) {
        try {
            var user = await User.find();
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }

    //Delete One User
    async deleteOne(req, res, next) {
        try {
            await User.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: "با موفقیت حذف شد!"
            });
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController;