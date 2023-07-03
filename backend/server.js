const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const fileReaderAsync = require("./fileReader");
const { writeFile } = require("fs");

const pizzaPath = path.join(`${__dirname}/pizzas.json`);
const allergensPath = path.join(`${__dirname}/allergens.json`);
const ordersPath = path.join(`${__dirname}/orders.json`);

// console.log(pizzaPath + "\n" + allergensPath)

const app = express();
const port = 9002;

// Function to get all the URLs called by getting each page.

// app.use((req, res, next) =>
// {
//     console.log(req.url)
//     next()
// })

// Middlewares for using & processing the data.
app.use(express.static(__dirname + "/../frontend/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(["/", "/pizza/list", "/api/orders"], (req, res, next) => 
{
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
});

// Getting all the pizzas in JSON format.
app.get('/api/pizzas', async (req, res) =>
{
    console.log(req.url)
    let data = await fileReaderAsync(pizzaPath)
    let parsedData = JSON.parse(data)
    let pizzas = parsedData.pizzas
    res.send(pizzas)
})

// Getting all the allergens in JSON format.
app.get('/api/allergens', async (req, res) =>
{
    console.log(req.url)
    let data = await fileReaderAsync(allergensPath)
    let parsedData = JSON.parse(data)
    let allergens = parsedData.allergens
    res.send(allergens)
})

app.get('/pizza/list/details', async (req, res) =>
{
    // You better just get the data in backend from the both files and then work with data in frontend.
    console.log(req.url)
    
    let pizzaData = await fileReaderAsync(pizzaPath)
    let parsedPizzaData = JSON.parse(pizzaData)
    let pizzas = parsedPizzaData.pizzas
    // console.log(parsedPizzaData)
    // console.log(pizzas) // works

    let allergensData = await fileReaderAsync(allergensPath)
    let parsedAllergensData = JSON.parse(allergensData)
    let allergens = parsedAllergensData.allergens
    // console.log(allergens) // works

    let totals = [{pizzas: [...pizzas], allergens: [...allergens]}]
    // console.log(totals)

    res.send(totals)
})

app.get('/api/orders/details', async (req, res) =>
{
    // Show all the orders made on the site.
    console.log(req.url)

    let orders = await fileReaderAsync(ordersPath)
    let parsedOrders = JSON.parse(orders)

    console.log(parsedOrders)
    res.send(parsedOrders)

})

app.post('/api/orders', async (req, res) =>
{
    // Post the orders made on the site.
    console.log("POST REQUEST")

    let data = await fileReaderAsync(ordersPath)
    newData = JSON.parse(data)

    console.log(req.body)

    req.body.id = newData.orders.length + 1
    newData.orders.push(req.body)

    console.log(newData)

    fs.writeFile(ordersPath, JSON.stringify(newData), 'utf8', (err) => 
    {
        if (err) 
        {
            // Handle error
            console.error(err);
            return;
        }
        else
        {
            console.log("Finished writing file at: " + new Date().toISOString())
            res.status(201).json({ success: true, data: newData })
        }
    });
})

app.get('/myCart', async (req, res) =>
{
    // Show all the orders made on the site made by one user.
})

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));