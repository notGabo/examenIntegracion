import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

//const fastApiLogin = 'http://0.0.0.0:12545/login/'
const fastApiLogin = 'http://129.151.120.46:3300/login/'
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
  if (data.respuesta === 200) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email: data.email,
      password: password,
      username: data.username,
      id_rol: data.id_rol,
      rol: data.rol,
    }, 'secret')
    const serialized = serialize('myToken', token, {
      httpOnly: false,
      secure: false,
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
    }), {})
    

    response.headers.append('Set-Cookie', serialized) // Configurar la cookie en la respuesta
    return response
  }

  if (data.respuesta === 401) { 
    return new Response(JSON.stringify({
        mensaje: data.mensaje,
        respuesta: data.respuesta,
        }), {
        status: 200,
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
    }), {})
  }
}
