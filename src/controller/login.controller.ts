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
    const {username, password} = user
    if (!username || !password) {
        return res.status(401).json({message: 'data is missing'})
    }
    const text = 'SELECT * FROM public.users WHERE username = $1';
    const values = [user.username];
    const result = await query(text, values);
    const ok = await comparePassword(user.password, result.rows[0].password);
    if (!ok) return res.status(401).json({message: 'Usuario o Contraseña erroneo'});

    const accessToken = jwt.sign({ data: user }, 'Catalina', { expiresIn: '1h' }); 
    // const message = ok ? 'successful login' : 'login failure';
    res.cookie('accessToken', accessToken, { expires: new Date(Date.now() + 60*60*1000 ), httpOnly: true })
    res.clearCookie('accessToken')
    return res.status(201).json({ 
        accessToken,
        user 
    });

}