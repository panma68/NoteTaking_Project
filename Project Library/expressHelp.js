
let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

const indexPath = __dirname + "/views/index.html"


// We can serve all static files, from folder "/public",
// by using the middlewere function .use, and passing
// the express.static function with the absolute path of
// the folder we have our static files.
const publicPath = __dirname + "/public";
app.use("/public",express.static(publicPath));

//URL Encode
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Using the res.sendFile, we can serve our file to the 
// "/" path.
app.get("/", (req,res) =>{ res.sendFile(indexPath); });


// res.json gets the json file, and then sends it. 
app.get("/json",(req,res) => {

    let jsonMessage = "Hello json";

    if (process.env.MESSAGE_STYLE === "uppercase"){
        jsonMessage = jsonMessage.toUpperCase();
    }

    res.json({
        message: jsonMessage
    })
});


app.get("/now",(req, res, next) => {
        req.time = new Date().toString();
        next();

}, (req, res) => {
        res.send({
            time: req.time
        });
    }
);

app.get("/:word/echo",(req,res) => {
    let echoWord = req.params.word;

    res.json({
        echo: echoWord
    });
});

app.get("/name",(req,res)=>{
    let firstName = req.query.first;
    let lastName = req.query.last;

    res.json({
        name: `${firstName} ${lastName}`
    })
});

app.post("/name",(req,res)=>{
    let body = req.body;
    
    console.log(body);
    // res.json({
    //     answer: body
    // })

});

 module.exports = app;

 