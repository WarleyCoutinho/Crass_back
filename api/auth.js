const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("Informe usuário e senha!");
    }

    const user = await app.db("usuario").where({ email: req.body.email }).whereNull("deletedAt").first();

    if (!user) return res.status(400).send("Usuário não encontrado");

    // Compara a senha vinda do request com a do banco
    try {
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send("Email/Senha inválidos!");
      }
    } catch (error) {
      return res.status(401).send("Email/Senha inválidos!");
    }

    const now = Math.floor(Date.now() / 1000);

    // conteúdo do token de validação
    const payload = {
      usuarioId: user.usuarioId,
      name: user.name,
      email: user.email,
      nivel: user.nivel,
      admin: user.admin,
      iat: now,
      exp: now + 60 * 60 * 24 * 2, // A senha Expira em 2 dias
    };

    // Gerando o token
    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };
  const validateToken = async (req, res) => {
    const userData = req.body || null;
    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      // algum problema com o token
    }

    res.send(false);
  };

  return { signin, validateToken };
};
