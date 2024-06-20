/* @flow */
"use strict"

const express = require("express")
const app = express()

app.use((req,res,next) => {
    console.log("Logger...", new Date() ,req.method, req.path)
    next();
})


app.use((req,res,next) => {
    if(req.method !== 'DELETE'){
        res.send("server alive withe express")
    }else{
        next(new Error('DELETES not accepted'))
    }
})

app.use((err,req,res,next) => {
    console.error("Error...", err.message)
    res.status(500).send("INTERNAL SERVER ERROR")
})

app.listen(8080, () => 
    console.log("local server express")
)