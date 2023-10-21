const IsAdmin = (req,res,next) =>{
    if (!req.user.isAdmin)
    {
        let error = new Error("شما به این بخش دسترسی ندارید!");
        error.statusCode = 401;
        throw error;
    }
    next();
}

module.exports = IsAdmin;