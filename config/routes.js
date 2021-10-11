const admin = require("./admin");
module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save))
    .get(admin(app.api.user.get));

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById))
    .delete(admin(app.api.user.remove));
    
    app
    .route("/pessoas")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.pessoa.save))
    .get(admin(app.api.pessoa.get));

  app
    .route("/pessoas/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.pessoa.save))
    .get(admin(app.api.pessoa.getById))
    .delete(admin(app.api.pessoa.remove));


    app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.category.get))
    .post(admin(app.api.category.save));

  app
    .route("/enderecos")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.endereco.save))
    .get(admin(app.api.endereco.get));

  app
    .route("/enderecos/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.endereco.save))
    .get(admin(app.api.endereco.getById))
    .delete(admin(app.api.endereco.remove));

  
  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove));






};
