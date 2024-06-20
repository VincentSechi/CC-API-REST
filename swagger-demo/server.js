const express = require("express")
const app = express()
const port = 3000;

app.use(express.json())


let items = [
    {id : '1', name: 'item1', description: 'item1 Desc', price: 100},
    {id : '2', name: 'item2', description: 'item2 Desc', price: 200}
]
let orders = [
    {id : '1', items : [items[0]], totalPrice : items[0].price},
    {id : '2', items : [items[1]], totalPrice : items[1].price}
]

/**
 * @swagger
 *  tags:
 *       name:Items
 *       description: Operations sur les items
 */


/**
 * @swagger
 * /api/items:
 *      get:
 *          summary: RETRIEVE ALL ITEMS
 *          tags: [Items]
 *          responses:
 *              200:
 *                  description: A list of items
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      price:
 *                                          type: number
 */

 app.get('/api/items', (req,res) => {
    res.json(items)
 })

 
/**
 * @swagger
 * /api/items/[id]:
 *      get:
 *          summary: RETRIEVE an item by ID
 *          tags: [Items]
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the item retrieved
 *          responses:
 *              200:
 *                  description: A list of items
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type:string
 *                                  name:
 *                                      type:string
 *                                  description:
 *                                      type:string
 *                                  price:
 *                                      type:number
 *              404:
 *                  description: Item not found
 */

app.get('/api/items/:id', (req,res) => {
    const { id } = req.params
    const item = item.find(item => item.id === id)
    if(item){
        res.json(item)
    }
    else[
        res.status(404).json({error: 'item not found'})
    ]
 })

app.listen(port, () => {
    console.log('server running on 8080')
})

const swaggerJsdoc =  require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'swagger api',
            version:'1.0.0',
            description: 'Doc'
        },
        servers: [
            {
                url:`http://localhost:${port}`,
                description: 'C Campus dev server'
            },
        ],
    },
    apis:['server.js']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))