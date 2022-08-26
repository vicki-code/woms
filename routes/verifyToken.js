const jwt = require("jsonwebtoken");
const UserRoles = require("../models/UserRoles");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) res.status(403).json({ status: "Unauthorized" });
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ status: "Please login" });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == UserRoles.ADMIN) {
            next();
        } else {
            res.status(403).json("Access denied");
        }
    });
};

const verifyTechnicianOrAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == UserRoles.ADMIN || req.user.role == UserRoles.TECHNICIAN) {
            next();
        } else {
            res.status(403).json("Access denied");
        }
    });
};

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyTechnicianOrAdmin,
};