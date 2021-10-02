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
    .delete(admin(app.api.user.remove))

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.category.get))
    .post(admin(app.api.category.save));

    app
    .route("/beneficios")
    .all(app.config.passport.authenticate())
   // .get(admin(app.api.beneficio.get))
    //.post(admin(app.api.beneficio.save));

  // Cuidado com ordem! Tem que vir antes de /categories/:id
  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

    app
    .route("/beneficios/tree")
    .all(app.config.passport.authenticate())
    //.get(app.api.beneficio.getTree);


  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove));

    app
    .route("/beneficios/:id")
    .all(app.config.passport.authenticate())
   // .get(app.api.beneficio.getById)
   // .put(admin(app.api.beneficio.save))
   // .delete(admin(app.api.beneficio.remove));

  app
    .route("/articles")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.article.get))
    .post(admin(app.api.article.save));

    app
    .route("/pessoas")
    .all(app.config.passport.authenticate())
    //.get(admin(app.api.pessoa.get))
    //.post(admin(app.api.pessoa.save));

  app
    .route("/articles/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(admin(app.api.article.save))
    .delete(admin(app.api.article.remove));

    app
    .route("/pessoas/:id")
    .all(app.config.passport.authenticate())
   // .get(app.api.pessoa.getById)
   // .put(admin(app.api.pessoa.save))
   // .delete(admin(app.api.pessoa.remove));

  app
    .route("/categories/:id/articles")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);

    app
    .route("/beneficiarios/:id/pessoas")
    //.all(app.config.passport.authenticate())
    //.get(app.api.article.getByCategory);

    app
    .route("/beneficios/:id/pessoas")
    //.all(app.config.passport.authenticate())
    //.get(app.api.article.getByCategory);

    app
    .route("/enderecos/:id/pessoas")
    //.all(app.config.passport.authenticate())
    //.get(app.api.article.getByCategory);

    app
    .route("/rendas/:id/pessoas")
    //.all(app.config.passport.authenticate())
    //.get(app.api.article.getByCategory);

    app
    .route("/documentos/:id/pessoas")
    //.all(app.config.passport.authenticate())
//.get(app.api.article.getByCategory);

    app
    .route("/dependentes/:id/pessoas")
    //.all(app.config.passport.authenticate())
   //.get(app.api.article.getByCategory);

    app
    .route("/unidades/:id/pessoas")
    //.all(app.config.passport.authenticate())
    //.get(app.api.article.getByCategory);


   // app.route('/stats')
    //    .all(app.config.passport.authenticate())
    //   .get(app.api.stat.get)
};
