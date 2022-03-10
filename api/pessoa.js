module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    const pessoa = { ...req.body };
    console.log('Requisição do Front', req.body);
    if (req.params.id) pessoa.pessoaId = req.params.id;

    try {
      existsOrError(pessoa.name, 'Nome não informado');
      existsOrError(pessoa.sexo, 'Sexo não informado');
      existsOrError(pessoa.cpf, 'CPF não informada');
      existsOrError(pessoa.email, 'E-mail não informado');
      existsOrError(pessoa.dtNascimento, 'Data de Nascimento não informada');
      existsOrError(pessoa.naturalidade, 'Nascionalidade não informada');
      existsOrError(pessoa.celular, ' Celular não informado');
      existsOrError(pessoa.whastsapp, ' Whastsapp não informado');
      existsOrError(pessoa.rua, 'Rua deve ser informada!');
      existsOrError(pessoa.bairro, 'Bairro não informado');
      existsOrError(pessoa.complemento, 'complemento não informado');
      existsOrError(pessoa.cep, 'Cep não informado');
      existsOrError(pessoa.cidade, 'Cidade não informada');
      existsOrError(pessoa.estado, 'Estado de  não informado');
      existsOrError(pessoa.pais, 'País não informado');
    } catch (msg) {
      return res.status(400).send(msg);
    }
    if (pessoa.dataNascimentoFormatted) {
      delete pessoa.dataNascimentoFormatted;
    }
    if (pessoa.pessoaId) {
      app
        .db('pessoas')
        .update(pessoa)
        .where({
          pessoaId: pessoa.pessoaId,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db('pessoas')
        .insert(pessoa)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, 'Código da pessoa não informado.');

      const rowsDeleted = await app
        .db('pessoas')
        .where({ pessoaId: req.params.id })
        .del();
      existsOrError(rowsDeleted, 'A pessoa não foi encontrado.');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };
  const get = (req, res) => {
    app
      .db('pessoas')
      .select(
        'pessoa.pessoaId',
        'name',
        'sexo',
        'cpf',
        'email',
        'dtNascimento',
        'naturalidade',
        'telefone',
        'celular',
        'whastsapp',
        'rua',
        'bairro',
        'complemento',
        'cep',
        'cidade',
        'estado',
        'pais',
        // 'imageUrl',
        'content'
      )
      .from('pessoas')
      .then((pessoa) => res.json(pessoa))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db('pessoas')
      .select(
        'pessoa.pessoaId',
        'name',
        'sexo',
        'cpf',
        'email',
        'dtNascimento',
        'naturalidade',
        'telefone',
        'celular',
        'whastsapp',
        'rua',
        'bairro',
        'complemento',
        'cep',
        'cidade',
        'estado',
        'pais',
        // 'imageUrl',
        'content'
      )
      .where({ pessoaId: req.params.id })
      .first()
      .then((pessoa) => res.json(pessoa))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};
