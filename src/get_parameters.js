/* @flow */
"use strict"

const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))

app.use("*", (req, res) => {
    console.log(req.query, req.body);
    res.send("Server alive" + "\n\r")
})

app.use((err, req, res, next) => {
    console.error("Error...", err.message)
    res.status(500).send("INTERNAL SERVER ERROR")
})

app.listen(8080, () =>
    console.log("local server express")
)