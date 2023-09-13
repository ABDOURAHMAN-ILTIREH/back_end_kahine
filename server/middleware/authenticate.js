const jwt = require("jsonwebtoken");


const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required." });
    }

    const token = authorization.split(" ")[1];

    try {
        
        const jwtUser = jwt.verify(token, process.env.SECRET);
        const users = await prisma.users.findUnique({
            where: {
                id:jwtUser._id,
            },
        });


        if (!users) {
            return res.status(401).json({ error: "User not found." });
        }

        req.users = users; // Attach the user to the request object for further use
        next();

    } catch (error) {
        console.error("Authentication error fixe it:", error);
        res.status(401).json({ error: "Authentication failed." });
    }
};

function authorizeAdmin(req, res, next) {
    if (req.users.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied. Admin authorization required.' });
    }
    next();
}
module.exports = {authenticateToken,authorizeAdmin};