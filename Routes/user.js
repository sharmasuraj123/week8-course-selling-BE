function createuserRouter(app) {
  app.post("/user/signup", (req, res) => {});

  app.post("/user/login", (req, res) => {});

  app.get("/user/purchases", (req, res) => {});
}

module.exports = {
    createuserRouter:createuserRouter
}
