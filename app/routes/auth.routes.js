const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app){

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );

        next();
    });

    /*app.post("/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ], (req, res) => {
            controller.signup
        }
    );*/

    app.post('/api/auth/signup', verifySignUp.checkDuplicateUsernameOrEmail, controller.signup);

    //app.post("/api/auth/signin", function(req,res){ controller.signin });

    app.post("/api/auth/signin", controller.signin );

    //app.post("/api/auth/signout", function(req,res) {controller.signout});

    app.post("/api/auth/signout", controller.signout);


}
