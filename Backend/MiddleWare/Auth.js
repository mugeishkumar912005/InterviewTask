    const JWT = require("jsonwebtoken");

    const Auth = (req, res, next) => {
        try {
            const authHeader = req.header("Authorization");
            if (!authHeader) {
                return res.status(401).json({ err: "Authorization header required" });
            }

            const Token = authHeader.split(" ")[1];
            if (!Token) {
                return res.status(401).json({ err: "Token required" });
            }

            try {
                const decode = JWT.verify(Token, "Y+88p4NldTYqVNWLSVKODcprx0g59PackkQWqGwxow0=");
                console.log("Decoded Token:", decode);
                req.user = decode; 
                next();
            } catch (err) {
                console.error("Token verification failed:", err);
                return res.status(401).json({ err: "Token invalid" });
            }
        } catch (err) {
            console.error("Error in Auth middleware:", err);
            return res.status(500).json({ err: "Server error" });
        }
    };  

    const authorizeRoles = (...roles) => {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ Msg: "Access Denied: Unauthorized Role" });
            }
            next();
        };
    };

    module.exports = { Auth, authorizeRoles };
