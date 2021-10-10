module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
      const endereco = { ...req.body };
      if (req.params.id) endereco.enderecoId = req.params.id;

      try {
            existsOrError(endereco.rua, "Rua deve ser informada!");
            existsOrError(endereco.bairro, 'Bairro não informado')
            existsOrError(endereco.complemento, 'complemento não informado')
            existsOrError(endereco.cep, 'Cep não informado')
            existsOrError(endereco.cidade, 'Cidade não informada')
            existsOrError(endereco.estado, 'Estado de  não informado')
            existsOrError(endereco.pais, 'País não informado')
      } catch (msg) {
          return res.status(400).send(msg);
      }

      if (endereco.enderecoId) {
          app.db("enderecos")
              .update(endereco)
              .where({ enderecoId: endereco.enderecoId })
              .then((_) => res.status(204).send())
              .catch((err) => res.status(500).send(err));
      } else {
          app.db("enderecos")
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
              .where({ enderecoId: req.params.id })
              .del();
          existsOrError(rowsDeleted, "Endereço não foi encontrado.");

          res.status(204).send();
      } catch (msg) {
          res.status(400).send(msg);
      }
  };

  const get = (req, res) => {
      app.db
          .select(
              "endereco.enderecoId",
              "endereco.rua",
              "endereco.bairro",
              "endereco.complemento",
              "endereco.cep",
              "endereco.cidade",
              "endereco.estado",
              "endereco.pais",
          )
          .from("enderecos")
          .then((endereco) => res.json(endereco))
          .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
      app.db("enderecos")
          .where({ enderecoId: req.params.id })
          .first()
          .then((endereco) => res.json(endereco))
          .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};