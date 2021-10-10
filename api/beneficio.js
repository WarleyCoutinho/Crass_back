module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const beneficio = { ...req.body };
    if (req.params.id) beneficio.beneficioId = req.params.id;

    try {
      existsOrError(beneficio.name, "O Beneficio deve ser informado!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (beneficio.beneficioId) {
      app
        .db("beneficios")
        .update(beneficio)
        .where({ beneficioId: beneficio.beneficioId })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("beneficios")
        .insert(beneficio)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Código do Beneficio não informado.");

      const rowsDeleted = await app
        .db("beneficios")
        .where({ beneficioId: req.params.id })
        .del();
      existsOrError(rowsDeleted, "O Beneficio não foi encontrado.");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const get = (req, res) => {
    app.db
      .select("beneficio.beneficioId", "beneficio.name")
      .from("beneficio")
      .then((beneficio) => res.json(beneficio))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("beneficios")
      .where({ beneficioId: req.params.id })
      .first()
      .then((beneficio) => res.json(beneficio))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};
