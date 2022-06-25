// this is where we will store our server/express code
const express = require('express')
const cors = require('cors') // cross origin resource sharing - allows to share resources (images, data, etc.) across URLs

//we will now invoke express and set it equal to a variable called app
const app = express()

//middleware - external code you want to run everytime your server starts up
app.use(express.json())  // allows our server to accept JSON data
app.use(cors())  // allows our server to activate cors

// Creating a makeshift/dummy database
const dummyInventory = ['potatos', 'onions', 'garlic', 'bread', 'eggs', 'milk', 'salt', 'steak', 'kale', 'tomatos']

// creating our endpoints
// making basic get request AND our query request
app.get('/api/inventory', (req,res) => {
    console.log(req.query)

    if(req.query.item) {
        const filteredItems = dummyInventory.filter((invItem) => {
            return invItem.toLowerCase().includes(req.query.item.toLowerCase());
        })
        return res.status(200).send(filteredItems)
    } else {
        return res.status(200).send(dummyInventory);
    }
})

// making our params get request
app.get("/api/inventory/:id", (req, res) => {
    console.log(req.params);
    const numIndex = +req.params.id; // we are type coercing the string-number into a regular number
    res.status(200).send(dummyInventory[numIndex]);
})

// let's officially open the door to our server
// first create a variable to store our port number
const SERVER_PORT = 5050;

app.listen(SERVER_PORT, () => {
    console.log('Server is running on port 5050')
})

