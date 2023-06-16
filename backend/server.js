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

app.use(express.static(`${__dirname}/../frontend/public`))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/pizzas', async (req, res) =>
{
    console.log(req.url)
    let data = await fileReaderAsync(pizzaPath)
    parsedData = JSON.parse(data)
    let pizzas = parsedData.pizzas
    res.send(pizzas)
})

app.get('/api/allergens', async (req, res) =>
{
    console.log(req.url)
    let data = await fileReaderAsync(allergensPath)
    parsedData = JSON.parse(data)
    let allergens = parsedData.allergens
    res.send(allergens)
})

app.get('/pizza/list', (req, res) =>
{
    res.sendFile('D:/VS CODE/CODECOOL/WEB FRAMEWORKS/pizza-order-prototype-javascript-georgelungu/frontend/index.html')
})

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));