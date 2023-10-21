const Map = require("../models/map");

const checkMapOwnership = async (req, res, next) => {

    //ID of the user who is logged in to the website!
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    if (!userId) {
        let error = new Error("خطای احراز هویت");
        error.statusCode = 401;
        throw error;
    }

    let mapid = req.params.id;

    try {
        let map = await Map.findById(mapid);

        //admin can update or delete any map!
        if (!isAdmin && map.userid.toString() !== userId) {
            let error = new Error("خطای احراز هویت");
            error.statusCode = 401;
            throw error;
        }

        next();
    }
    catch (error) {
        next(error);
    }
}

module.exports = checkMapOwnership;