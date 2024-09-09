import { Router } from 'express';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
//controller
import { getUsers, createUser, getUser, updateUser, deleteUser } from '../controller/users.controller';

const router = Router();

router.use((req: Request, res: Response, next: Function) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'Catalina', (err: any, user: any) => {
        console.log(err)
        console.log(user)
        if (err) return res.sendStatus(403)
        req.body = user
        next();
    });
})

router.route('/')
    .get(getUsers)
    .post(createUser)


router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)


export default router;