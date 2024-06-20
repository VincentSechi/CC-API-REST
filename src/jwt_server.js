"use strict"
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

const validateUser = require("./validate_user")

const SECRET_JWT_KEY = "restFullAPI";

app.use(bodyParser.urlencoded({extended: false}))

app.get("/public", (req,res) => {
    res.send("la route /public pas besoin de JWT")
})

app.post('/gettoken', (req,res) => {
    validateUser(req.body.user, req.body.password, (idErr, userid) => {
        if(idErr !== null){
            res.status(401).send(idErr)
        } else {
            jwt.sign(
                { userid },
                SECRET_JWT_KEY,
                { algorithm: "HS256", expiresIn : "1h"},
                (err, token) => res.status(200).send(token)
            )
        }
    })
})

app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).send("pas de token renseigné")
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => {
        if(err){
            return res.status(403).send("token a expiré ou non valide")
        } else {
            req.userid = decoded.userid;
            next()
        }
    })
})

app.get("/private", (req,res) => {
    res.send(("/private a besoin d'un token et c'est bon"))
})

app.use((err,req, res,next) => {
    console.log("error...", err.message);
    res.status(500).send("INTERNALS SERVER ERROR")
})

app.listen(8080, () => 
    console.log("mini JWT ready on 8080")
)