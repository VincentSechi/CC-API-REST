const express = require("express")
const cors = require("cors")

const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:8000',
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'dummy, content-type'
}))

app.get('/', (req,res) => 
    res.json({ message: "CORS ENABLED RESPONSE"})
)

app.listen(port, () => {
    console.log("CORS ENABLED ON 8080")
})