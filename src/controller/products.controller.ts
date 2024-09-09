import { Request, Response } from "express";
import { query } from "../database";
import { Products } from "../interface/Products";








export const getProducts = async (req: Request, res: Response) : Promise<Response> => {

    const text = 'SELECT * FROM products';
    const result = await query(text);

    return res.json(result.rows);
}
export const getProduct = async (req: Request, res: Response) : Promise<Response> => {
    
    const id = req.params.id;
    const text = 'SELECT * FROM public.products WHERE id = $1';
    const values = [id]
    const result = await query(text, values);

    return res.json(result.rows[0]);
}


export const postProducts = async (req: Request, res: Response) : Promise<Response> => {

    const product : Products = req.body;
    const text = 'INSERT INTO public.products (name, description, is_active) VALUES($1, $2, $3)';
    const values = [product.name, product.description, product.is_active];
    const result = await query(text, values);
    return res.json(result.rows[0]);
}

export const updateProduct = async (req:Request, res:Response) : Promise<Response> => {

    const id = req.params.id;
    const product : Products = req.body;

    const text = 'UPDATE public.users SET name = $1, description = $2, is_active = $3 WHERE id = $4';
    const values = [ product.name, product.description, product.is_active, id]
    const result = await query(text, values);

    return res.json(result.rows[0]);

}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const product: Products = req.body;
    const text = 'UPDATE public.users SET is_active = $1 WHERE id_users = $2';
    const values = [ product.is_active, parseInt(id) ];
    const result = await query(text, values);
    
    return res.json(result.rows)

}

