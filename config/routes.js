module.exports = (app) => {
  app.route("/users").get(app.api.user.save)
                     .get(app.api.user.get) 
                     
                     
  app.route("/users/:id").put(app.api.user.save)



}
