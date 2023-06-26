const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const fileReaderAsync = require("./fileReader");
const { writeFile } = require("fs");

const pizzaPath = path.join(`${__dirname}/pizzas.json`);
const allergensPath = path.join(`${__dirname}/allergens.json`);

// console.log(pizzaPath + "\n" + allergensPath)

const app = express();
const port = 9002;

// Function to get all the URLs called by getting each page.
app.use((req, res, next) =>
{
    console.log(req.url)
    next()
})

// Middlewares for using & processing the data.
app.use(express.static(__dirname + "/../frontend/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Create a list of pizzas that contain ingredients and allergens.
app.get('/', async (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

app.get('/pizza/list', async (req, res) =>
{
    console.log(req.url)
    let pizzaData = await fileReaderAsync(pizzaPath)
    let parsedPizzaData = JSON.parse(pizzaData)
    let pizzas = parsedPizzaData.pizzas

    let allergensData = await fileReaderAsync(allergensPath)
    let parsedAllergensData = JSON.parse(allergensData)
    let allergens = parsedAllergensData.pizzas
})

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));