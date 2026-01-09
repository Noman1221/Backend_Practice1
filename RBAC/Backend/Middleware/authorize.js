export const authorized = (permission) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!role[userRole]) {
            return res.status(403).json({ message: "Invalid role" });
        }

        const hasPermission = role[userRole].includes(permission);

        if (!hasPermission) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};
