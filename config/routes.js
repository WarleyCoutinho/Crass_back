const admin = require('./admin');
module.exports = (app) => {
  app.post('/signup', app.api.usuario.save);
  app.post('/signin', app.api.auth.signin);
  app.post('/validateToken', app.api.auth.validateToken);

  app
    .route('/usuario')
    .all(app.config.passport.authenticate())
    .post(admin(app.api.usuario.save))
    .get(admin(app.api.usuario.get));

  app
    .route('/usuario/:id')
    .all(app.config.passport.authenticate())
    .put(admin(app.api.usuario.save))
    .get(admin(app.api.usuario.getById))
    .delete(admin(app.api.usuario.remove));

  app
    .route('/pessoas')
    .all(app.config.passport.authenticate())
    .post(admin(app.api.pessoa.save))
    .get(admin(app.api.pessoa.get));

  app
    .route('/pessoas/:id')
    .all(app.config.passport.authenticate())
    .put(admin(app.api.pessoa.save))
    .get(admin(app.api.pessoa.getById))
    .delete(admin(app.api.pessoa.remove));

  app
    .route('/beneficios')
    .all(app.config.passport.authenticate())
    .get(admin(app.api.beneficio.get))
    .post(admin(app.api.beneficio.save));

  app
    .route('/beneficios/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.beneficio.getById)
    .put(admin(app.api.beneficio.save))
    .delete(admin(app.api.beneficio.remove));
};
