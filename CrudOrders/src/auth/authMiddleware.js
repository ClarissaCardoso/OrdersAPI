const jwt = require("./jwt");

function authenticate(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token não informado" });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verifyToken(token);
        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({ message: "Token inválido" });

    }

}

module.exports = authenticate;