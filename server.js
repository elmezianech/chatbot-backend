const express= require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "chatbot-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models/");
const dbConfig = require("./app/config/db.config.js");
const Role = db.role;

db.mongoose.connect(`mongodb://127.0.0.1:27017/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
})
.catch(err=> {
    console.error("Connection error", err);
    process.exit();
});



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to this beautiful application."});
});

require('./app/routes/auth.routes.js')(app);
require('./app/routes/session.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
    try{
        const count = await Role.estimatedDocumentCount();

        if (count == 0) {
            new Role ({
                name: "user"
            }).save().then(()=>{
                console.log("added 'user' to roles collection");
            }).catch(function(err) {
                console.log("error", err);
            })


            new Role ({
                name: "admin"
            }).save().then(()=>{
                console.log("added 'admin' to roles collection");
            }).catch(function(err) {
                console.log("error", err);
            })

            new Role ({
                name: "moderator"
            }).save().then(()=>{
                console.log("added 'moderator' to roles collection");
            }).catch(function(err) {
                console.log("error", err);
            })
            
        }
        
    } catch(err){
        console.log(err);
    }
}
