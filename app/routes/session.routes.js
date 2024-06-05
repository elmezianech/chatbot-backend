const controller = require("../controllers/session.controller.js");

module.exports = function(app){

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );

        next();
    });

    // Route to create a new chat session
    app.post('/api/sessions', controller.createSession);

    // Route to add a message to an existing chat session
    app.post('/api/sessions/:sessionId/messages', controller.addMessage);

    // Route to retrieve chat sessions for a user
    app.get('/api/users/:userId/sessions', controller.getUserSessions);

    app.post('/api/sessions/:sessionId/delete', controller.deleteSession);

}