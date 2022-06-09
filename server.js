// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

// Require cors to Configures the Access Control Allow Origin CORS header
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');

/** listen port */
const port = 6969;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Cors for cross origin allowance
app.use(cors());


                        /** POST route */
    /**There are two ways to do this, and I chose the first. */

        /**First method */

        // POST route
app.post('/add',(req,res) =>{
    projectData={
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    };
    res.send(projectData).status(202).end();
});

        /**The second method */

// app.post('/add', addInfo);

// function addInfo(req, res) {
//     projectData['temp'] = req.body.temp;
//     projectData['date'] = req.body.date;
//     projectData['content'] = req.body.content;
//     res.send(projectData).status(202).end();
// }




                /** Initialize all route  */
    /**There are two ways to do this, and I chose the first. */


        /**First method */
// Initialize all route with a callback function
app.get('/all', getInfo);

// Callback function to complete GET '/all'
function getInfo(req, res) {
    res.send(projectData).status(202).end;
};

        /**The second method */
        
// app.get('/all',(req,res) =>{
//     response.send(projectData).status(202).end
// });



// Set up and Spin up the server
const server = app.listen(port, () => {
    console.log(`server is listening on port:http://localhost:${port}`); // Callback to debug
});