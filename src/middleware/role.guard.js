const roleGuard = (role1, role2) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        // console.log(role1, role2);
        
        if (userRole === 'superadmin' || userRole === role1 || userRole === role2) {
            return next();
        }
        return res.status(403).json({ message: "Sizga ruxsat yo'q!" });
    };
};
export default roleGuard;