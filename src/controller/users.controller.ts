import { Request, Response } from "express";

// database connection
import { pool } from "../database";
import { Users } from "../interface/Users";

export const getUsers = async (req: Request, res: Response) : Promise<Response> => {
    const result = await pool.query('SELECT * FROM public.users');
    return res.json(result.rows)
}


export async function createUser(req: Request, res: Response) {
    const user: Users = req.body;
    const text = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
    const values = [user.username, user.password];
    const result = await pool.query(text, values);
    return res.json(result.rows[0])
}


export const getUser = async (req: Request, res: Response) : Promise<Response> => {
       
    const { id } = req.params;
    const text = 'SELECT * FROM public.users WHERE id_users = $1';
    const values = [ parseInt(id) ];
    const result = await pool.query(text, values);
    return res.json(result.rows[0])
}

export const updateUser = async (req:Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const user: Users = req.body;
    const text = 'UPDATE public.users SET username = $1, password = $2 WHERE id_users = $3';
    const values = [user.username, user.password, id];
    const result = await pool.query(text, values);
    console.log(result);
    return res.json(result.rows)
    
}