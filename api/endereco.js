module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const endereco = { ...req.body };
    if (req.params.id) endereco.id = req.params.id;

    try {
      existsOrError(endereco.rua, "Rua deve ser informada!");
      existsOrError(endereco.bairro, "Bairro não informado");
      existsOrError(endereco.complemento, "complemento não informado");
      existsOrError(endereco.cep, "Cep não informado");
      existsOrError(endereco.cidade, "Cidade não informada");
      existsOrError(endereco.estado, "Estado de  não informado");
      existsOrError(endereco.pais, "País não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (endereco.id) {
      app
        .db("enderecos")
        .update(endereco)
        .where({ id: endereco.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("enderecos")
        .insert(endereco)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Código do Endereço  não informado.");

      const rowsDeleted = await app
        .db("enderecos")
        .where({ id: req.params.id })
        .del();
      existsOrError(rowsDeleted, "Endereço não foi encontrado.");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const get = (req, res) => {
    app
      .db("enderecos")
      .select(
        "id",
        "rua",
        "bairro",
        "complemento",
        "cep",
        "cidade",
        "estado",
        "pais"
      )
      .from("enderecos")
      .then((endereco) => res.json(endereco))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("enderecos")
      .select(
        "id",
        "rua",
        "bairro",
        "complemento",
        "cep",
        "cidade",
        "estado",
        "pais"
      )
      .where({ id: req.params.id })
      .first()
      .then((endereco) => res.json(endereco))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};
