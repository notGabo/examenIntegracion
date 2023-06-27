import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { useRouter } from 'next/navigation'

export async function GET(request: NextRequest, response: NextResponse) {

    // get cookie
    const cookie = request.cookies.get('myToken')
    if (cookie) {
      const token = jwt.sign({
        exp: -1,
        email: '',
        password: '',
        username: '',
      }, 'secret')
      const serialized = serialize('myToken', token, {
        httpOnly: true,
        secure: false,
        maxAge: -1,
        path: '/',
      })
      
  
      response.headers.append('Set-Cookie', serialized)
      return new Response(JSON.stringify({mensaje: 'Sesion cerrada'}), {status:200, statusText: 'Sesion cerrada'})
    }
    return new Response(JSON.stringify({mensaje: 'No se ha iniciado sesion'}), {status:201, statusText: 'No se ha iniciado sesion'})

  }
  


