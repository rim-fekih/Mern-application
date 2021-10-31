const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isPastry],
    controller.pastryBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    controller.superadminBoard
  );

  app.get(
    "/api/Users",controller.get
  );
  app.get(
    "/api/AllUsers",controller.getAll
  );

  app.get(
    "/api/Pasteries",controller.getPasteries
  );
  app.put(
    "/api/Users/:id", controller.updateUser
  );
  app.get("/api/Users/:id", controller.getUserById);
  app.get("/api/User/:username", controller.getUserByUsername);
  app.delete("/api/User/:id", controller.deletebyUsername);
  app.delete("/api/User/orders/:id", controller.deleteUserOrders);
  app.delete("/api/User/offers/:id", controller.deleteUserOffers);
  app.delete("/api/User/products/:id", controller.deleteUserProducts);
  app.delete("/api/User/notifications/:id", controller.deleteUserNotifications);





};
