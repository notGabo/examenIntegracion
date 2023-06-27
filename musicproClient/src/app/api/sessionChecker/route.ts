import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
const fastApiPerfil = "http://0.0.0.0:12545/perfil/";
//const fastApiPerfil = "http://129.151.120.46:3300/perfil/";

export async function GET(request: NextRequest, response: NextResponse) {
  try{
    // get cookie called "myToken and decode it"
    const cookie = cookies().get("myToken"); console.log(cookie);
    if (cookie){
      const decoded = jwt.verify(cookie.value as string, "secret") as jwt.JwtPayload;
      console.log(decoded);
      return new Response(JSON.stringify({
        message: "Perfil obtenido",
        data: decoded 
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({
        message: "No se iniciado sesion",
        data: null
      }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      message: "Error al obtener el perfil",
      error: error
    }), { status: 500 });
  }
}
