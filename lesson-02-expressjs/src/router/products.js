import { Router } from "express";

const routerProducts = Router();

routerProducts.get("/", (req, res) => {
    console.log("Get all products");
});

routerProducts.get("/:id", (req, res) => {
    console.log("Get detail product");
});

export default routerProducts;