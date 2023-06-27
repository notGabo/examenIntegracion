import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { useRouter } from 'next/navigation'

export async function POST(request: NextRequest, response: NextResponse) {

    try{
      request.cookies.delete('myToken')
      return new Response(JSON.stringify({
        message: "Sesion cerrada",
        data: null
      }), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({
            message: "Error al obtener el perfil",
            error: error
        }), { status: 500 });
    }
  }
  


