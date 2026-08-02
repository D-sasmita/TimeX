const admin = (req, res, next) => {
    if (req.user && req.user.role && req.user.role.includes('admin')) {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = { admin };