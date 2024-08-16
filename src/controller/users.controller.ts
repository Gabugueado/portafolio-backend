import { Request, Response } from "express";
import bcrypt from 'bcrypt';

// database connection
import { query } from "../database";
import { Users } from "../interface/Users";

export const getUsers = async (req: Request, res: Response) : Promise<Response> => {
    const result = await query('SELECT * FROM public.users');
    return res.json(result.rows);
}

export const createUser = async (req: Request, res: Response) => {
    const user: Users = req.body;
    const text = 'INSERT INTO public.users(username, password) VALUES($1, $2) RETURNING *';
    const hashedPassword = await hashPassword(user.password);
    const values = [user.username, hashedPassword];
    const result = await query(text, values);
    return res.json(result.rows[0])
}

export const getUser = async (req: Request, res: Response) : Promise<Response> => {
       
    const { id } = req.params;
    const text = 'SELECT * FROM public.users WHERE id_users = $1';
    const values = [ parseInt(id) ];
    const result = await query(text, values);
    return res.json(result.rows[0])
}

export const updateUser = async (req:Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const user: Users = req.body;
    const text = 'UPDATE public.users SET username = $1, password = $2 WHERE id_users = $3';
    const values = [user.username, user.password, parseInt(id)];
    const result = await query(text, values);
    return res.json(result.rows)
    
}

export const deleteUser = async (req:Request, res:Response): Promise<Response> => {
    
    const { id } = req.params;
    const user: Users = req.body;
    const text = 'UPDATE public.users SET is_active = $1 WHERE id_users = $2';
    const values = [ user.is_active, parseInt(id) ];
    const result = await query(text, values);
    
    return res.json(result.rows)
}

//TODO: leave in a separate file
async function hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}