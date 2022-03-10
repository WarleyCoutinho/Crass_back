const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.usuarioId) user.usuarioId = req.params.usuarioId;

    if (!req.originalUrl.startsWith('/users')) user.admin = false;
    if (!req.user || !req.user.admin) user.admin = false;

    try {
      existsOrError(user.name, 'Nome não informado!');
      existsOrError(user.email, 'E-mail não informado!');
      existsOrError(user.nivel, 'Nível do usuário não informado!');
      existsOrError(user.password, 'Senha não informada!');
      existsOrError(
        user.confirmPassword,
        'Confirmação de Senha não informada!'
      );
      equalsOrError(
        user.password,
        user.confirmPassword,
        'Senhas não conferem!'
      );

      const userFromDB = await app
        .db('usuario')
        .where({ email: user.email })
        .first();
      if (!user.usuarioId) {
        notExistsOrError(userFromDB, 'Usuário já cadastrado');
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }
    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.usuarioId) {
      app
        .db('usuario')
        .where('usuarioId', user.usuarioId)
        .update(user)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db('usuario')
        .insert(user)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app.db
      .select(
        'usuario.usuarioId',
        'usuario.name',
        'usuario.email',
        'usuario.nivel',
        'usuario.admin'
      )
      .from('usuario')
      .whereNull('deletedAt')
      .then((usuario) => res.json(usuario))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app.db
      .select()
      .table('usuario')
      .where('usuarioId', req.params.usuarioId)
      .whereNull('deletedAt')
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      console.log('ID param: ', req.params.usuarioId);
      const rowsUpdated = await app
        .db('usuario')
        .where({ usuarioId: req.params.usuarioId })
        .update({ deletedAt: new Date() });
      existsOrError(rowsUpdated, 'Usuário não foi encontrado.');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
};
