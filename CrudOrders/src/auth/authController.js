const bcrypt = require("bcryptjs");
const jwt = require("./jwt");

const userMock = {
    username: "admin",
    password: bcrypt.hashSync("123456", 8)
};

function login(req, res) {

    const { username, password } = req.body;

    if (username !== userMock.username) {
        return res.status(401).json({ message: "Usuário inválido" });
    }

    const validPassword = bcrypt.compareSync(password, userMock.password);

    if (!validPassword) {
        return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.generateToken({ username });

    res.json({
        token
    });
}

module.exports = {
    login
};