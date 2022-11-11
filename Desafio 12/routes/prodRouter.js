const express = require("express");
const prodRouter = express.Router();
const { faker } = require("@faker-js/faker");
const ProductDao = require("../DAOs/Product.dao.class");
const prod = new ProductDao();


prodRouter.post("/api/productos-test", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    res.json(response);
});




module.exports = prodRouter;