/* @flow */
"use strict"

const express = require("express")
const app = express()

app.use("/", (req,res) => res.send("serveur en ligne"))

app.listen(8080, () => 
    console.log("local server express")
)