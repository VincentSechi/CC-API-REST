/* @flow */
"use strict"

const express = require("express")
const routerCities = express.Router()

routerCities.get("/RH", (req, res) =>
    res.send(`GET Reims... path=${req.originalUrl}`)
)
routerCities.get("/:id", (req, res) =>
    res.send(`GET City=${req.params.id}`)
)
routerCities.delete("/:id", (req, res) =>
    res.send(`DELETE City ${req.params.id}`)
)
routerCities.post("/", (req, res) =>
    res.send(`POST City ${req.params.id}`)
)
routerCities.put("/:id", (req, res) =>
    res.send(`PUT City... path=${req.originalUrl}`)
)


module.exports = routerCities;