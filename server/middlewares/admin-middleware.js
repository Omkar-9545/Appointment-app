const adminMiddleware = async(req,res,next) => {
    try {
        // console.log(req.user)
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({ mesage: "Access Denied. User is not admin", success: false });
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = adminMiddleware;