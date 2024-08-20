import { Router } from "express";



import { deleteProduct, getProduct, getProducts, postProducts, updateProduct } from "../controller/products.controller";

const router = Router();


// /products
router.route('')
        .get(getProducts)
        .post(postProducts)


// /products/:id
router.route('/:id')
        .get(getProduct)
        .put(updateProduct)
        .put(deleteProduct)





export default router;