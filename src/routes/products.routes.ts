import { Router } from "express";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';


import { deleteProduct, getProduct, getProducts, postProducts, updateProduct } from "../controller/products.controller";

const router = Router();

router.use((req: Request, res: Response, next: Function) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token == null) return res.sendStatus(401);
    
        jwt.verify(token, 'Catalina', (err: any, data: any) => {
            if (err) return res.sendStatus(403)
			console.log(data)
            req.body = data
            next();
        });
    })

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