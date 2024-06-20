/* @flow */
"use strict"

const express = require("express")
const path = require("path")
const app = express()

const flagPath = path.join(__dirname, "../flags")

app.get("/france" , (req,res) => 
    res.sendFile(`${flagPath}/europe/flag-fr.png`)
)

app.get("/england" , (req,res) => 
    res.sendFile(`${flagPath}/europe/flag-en.png`)
)

app.get("/usa" , (req,res) => 
    res.sendFile(`${flagPath}/usa/flag-us.png`)
)


/* app.use(
    "/static",
    express.static(path.join(__dirname, "../flags"), {
        immutable: true,
        maxAge: "30 days"
    })
) */

app.use((err, req, res, next) => {
    console.error("Error...", err.message)
    res.status(500).send("INTERNAL SERVER ERROR")
})

app.listen(8080, () =>
    console.log("local server express")
)