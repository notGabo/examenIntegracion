import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//const fastApiPerfil = "http://0.0.0.0:12545/perfil/";
const fastApiPerfil = "http://129.151.120.46:3300/perfil/";

export async function GET(request: NextRequest, response: NextResponse) {

  const cookie = request.cookies.get("myToken");
  if (cookie) {
    const decoded = jwt.verify(cookie.value as string, "secret") as jwt.JwtPayload;
const exp = decoded.exp;
const email = decoded.email;
const username = decoded.username;
const id_rol = decoded.id_rol;
    
    const res = await axios.get(fastApiPerfil, {
      data: {
        correo: email,
      },
    });

    const rol = res.data.rol;
    
    return new Response(
      JSON.stringify({
        mensaje: "El usuario esta logueado",
        respuesta: 200,
        exp: exp,
        email: email,
        username: username,
        rol: rol,
        id_rol: id_rol,
      }),
      {
        status: 200,
        statusText: "CORRECTO",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return new Response(
    JSON.stringify({
      mensaje: "El usuario no esta logueado",
      respuesta: 401,
    })
  );
}
