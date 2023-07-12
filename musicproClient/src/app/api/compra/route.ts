import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { cookies } from "next/headers"
import { error } from 'console'
 
export async function GET(request: NextRequest){
    try{
        const carrito = cookies().get("carrito")
        const user = cookies().get("myToken")
        if (carrito && user){
            const userDecoded = jwt.verify(user.value as string, "secret") as jwt.JwtPayload;
            console.log(userDecoded);
        }
    }
    catch (error){
        return new Response(JSON.stringify({error: error}), {status: 500, statusText: 'Error al obtener el carrito'});
    }
}