import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const authMiddleware = async (req, res, next) => {
    console.log("authMiddleware reached");
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    //token getting
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "not authorized, no token prvided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({ error: "user doesn't exist" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error(err);
        console.log("Token:", token);
        return res.status(401).json({ error: "Not authorized token failed" });

    }
};