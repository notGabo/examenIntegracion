import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
 
const fastApiLogin = process.env.FAST_API + "/login/";

export async function GET() {
  return new Response('Se debe ejecutar un POST con parametros de email y password. Saludos!')
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const res = await fetch(fastApiLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  console.log(data);

  if (res.status === 200) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email: data.correo,
      password: password,
      nombre: data.nombre,
      apellido: data.apellido,
      username: data.username,
      id_rol: data.id_rol,
      rol: data.rol,
    }, 'secret')
    
    const serialized = serialize('myToken', token, {
      httpOnly: false,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
      
    })

    const response = new Response(JSON.stringify({
      mensaje: data.mensaje,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      username: data.username,
      id_rol: data.id_rol,
      rol: data.rol,
      respuesta: data.respuesta,
    }), {status:200, statusText: 'Inicio de sesion exitoso'})
    
    response.headers.append('Set-Cookie', serialized) // Configurar la cookie en la respuesta
    return response
  }

  if (res.status == 401) { 
    return new Response(JSON.stringify({
        mensaje: data.mensaje,}), {
        status: 401,
        statusText: 'Error de inicio de sesion',
        headers: {
            'Content-Type': 'application/json',
        },
    })
  }

  if (data.respuesta === 500) {
    return new Response(JSON.stringify({
      mensaje: data.mensaje,
      respuesta: data.respuesta,
      error: data.error,
    }), {})
  }
}
