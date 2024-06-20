const express = require("express")
const path = require("path")
const app = express()
const port = 3000;

app.use(express.json())


let items = [
    { id: '1', name: 'item1', description: 'item1 Desc', price: 100 },
    { id: '2', name: 'item2', description: 'item2 Desc', price: 200 }
]
let orders = [
    { id: '1', items: [items[0]], totalPrice: items[0].price },
    { id: '2', items: [items[1]], totalPrice: items[1].price }
]

/**
 * @api {get} /api/items REQUEST ALL ITEMS
 * @apiName GetItems
 * @apiGroup Items
 * 
 * @apiSuccess {Object[]} items List of items
 * @apiSuccess  {String} items.id Item ID
 * @apiSuccess  {String} items.name Item name
 * @apiSuccess  {String} items.description Item description
 * @apiSuccess  {Number} items.price Item price
 */

app.get('/api/items', (req, res) => 
    res.json(items)
)

/**
 * @api {get} /api/items/:id REQUEST an item by his id
 * @apiName GetItemByID
 * @apiGroup Items
 * 
 * @apiParam {String} id Item ID
 * 
 * @apiSuccess  {String} items.id Item ID
 * @apiSuccess  {String} items.name Item name
 * @apiSuccess  {String} items.description Item description
 * @apiSuccess  {Number} items.price Item price
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "id" : "1",
 *      "name" : "Item1",
 *      "description" : "description 1",
 *      "price" : 100,
 * }
 * @apiError ItemNotFound The item was not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      "error" : "Item not found"
 * }
 */

app.get('/api/items/:id', (req, res) => {
    const {id} = req.params
    const item = items.find(item => item.id === id )
    if(item){
        res.json(item)
    }else{
        res.status(404).json({error: "Item not found"})
    }
})

/**
 * @api {post} /api/items Create a new item
 * @apiName CreateItem
 * @apiGroup Items
 * 
 * 
 * @apiBody  {String} name Item name
 * @apiBody  {String} description Item description
 * @apiBody  {Number} price Item price
 * 
 * 
 * @apiSuccess {String} id Item ID
 * @apiSuccess {String} name Item name
 * @apiSuccess {String} description Item description
 * @apiSuccess {Number} price Item price
 */

app.post('/api/items', (req,res) => {
    const {name, description, price} = req.body;
    const id = (items.length + 1).toString()
    const newItem = {id, name, description, price}
    items.push(newItem)
    res.status(201).json(newItem)
})

app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')))

app.listen(port, () => 
console.log("server is ready")
)