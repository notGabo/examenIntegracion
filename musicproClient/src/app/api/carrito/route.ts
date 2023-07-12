import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { cookies } from "next/headers"
import { error } from 'console'
 

export async function POST(request: NextRequest) {
    const { carrito } = await request.json()
    console.log(carrito)
    try{
        const token = jwt.sign({
            carrito: carrito,
        }, 'secret')
        const serialized = serialize('carrito', token, {
            httpOnly: false,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/',
          })
        const response = new Response(JSON.stringify({
            mensaje: "Carrito agregado exitosamente",
            carrito: serialized,
        }), {status:200, statusText: 'Carrito agregado exitosamente'})
        response.headers.append('Set-Cookie', serialized) // Configurar la cookie en la respuesta
        return response
    }
    catch (error){
        return new Response(JSON.stringify({error: error}), {status: 500, statusText: 'Error al agregar el carrito'});
    } 
};

export async function GET() {
    try{
      const cookie = cookies().get("carrito"); 
      if (cookie){
        const decoded = jwt.verify(cookie.value as string, "secret") as jwt.JwtPayload;
        console.log(decoded);
        return new Response(JSON.stringify({
          message: "carrito obtenido",
          data: decoded 
        }), { status: 200 });
      } else {
        return new Response(JSON.stringify({
          message: "No se ha agregado un carrito",
        }), { status: 404 });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        message: "Error al obtener el carrito",
        error: error
      }), { status: 500 });
    }
  }

export async function PUT(request: NextRequest) {
  // delete carrito cookie
  try{
    const cookie = cookies().get('carrito')
    if (cookie) {
      cookies().set({
        name: 'carrito',
        value: '',
        expires: new Date('1980-01-01'),
        path: '/', // For all paths
      })
      return new Response (JSON.stringify('cookie eliminada'),{status:200})
    }
    return new Response (JSON.stringify({message: "Error al eliminar el carrito", error: error}),{status:500})
  } catch (error) {
    return new Response(JSON.stringify({
      message: "Error al eliminar el carrito",
      error: error
    }), { status: 500 });
  }
}
  