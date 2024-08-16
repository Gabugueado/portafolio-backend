import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import { Users } from "../interface/Users"
import { query } from "../database";

//TODO: leave in a separate file
async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}


export const login = async (req:Request, res:Response) : Promise<Response> => {

    const user:Users = req.body;
    const text = 'SELECT * FROM public.users WHERE username = $1';
    const values = [user.username];
    const result = await query(text, values);
    const ok = await comparePassword(user.password, result.rows[0].password);
    
    const token = jwt.sign({ username: user.username }, 'Catalina', { expiresIn: '1h' }); 
    // const message = ok ? 'successful login' : 'login failure';
    
    return res.json({ token });

}