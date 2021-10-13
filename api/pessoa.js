module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const pessoa = { ...req.body };
    if (req.params.id) pessoa.id = req.params.id;

    try {
      existsOrError(pessoa.name, "Nome não informado");
      existsOrError(pessoa.sexo, "Sexo não informado");
      existsOrError(pessoa.cpf, "CPF não informada");
      existsOrError(pessoa.dtNascimento, "Data de Nascimento não informada");
      existsOrError(pessoa.naturalidade, "Nascionalidade não informada");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (pessoa.id) {
      app
        .db("pessoas")
        .update(pessoa)
        .where({ id: pessoa.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("pessoas")
        .insert(pessoa)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Código do Beneficiario  não informado.");

      const rowsDeleted = await app
        .db("pessoas")
        .where({ id: req.params.id })
        .del();
      existsOrError(rowsDeleted, "Beneficiario não foi encontrado.");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const get = (req, res) => {
    app
      .db("pessoas")
      .select(
       "id",
        "name",
        "sexo",
        "cpf",
        "email",
        "dtNascimento",
        "naturalidade",
        "content"
      )
      .from("pessoas")
      .then((pessoa) => res.json(pessoa))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("pessoas")
      .select(
       "id",
        "name",
        "sexo",
        "cpf",
        "email",
        "dtNascimento",
        "naturalidade",
        "content"
        
      )
      .where({ id: req.params.id })
      .first()
      .then((pessoa) => res.json(pessoa))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};
