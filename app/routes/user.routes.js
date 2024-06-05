const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

/*module.exports = function(app){
    app.use(function(req, res, next){
        res.hearder(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", 
        (req,res) => {
            controller.allAccess
        }
    );

    //we first pass by the middleware then to the controller
    app.get("/api/test/user", [authJwt.verifyToken],
        (req, res) => {
            controller.userBoard
        });

    app.get("/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        (req,res) =>{
            controller.moderatorBoard
        }
    );

    app.get("/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        (req,res) => {
            controller.adminBoard
        }
    );

    
}*/

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
      next();
    });
  
    app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsersWithSessions);
    app.delete("/api/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
};