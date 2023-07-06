import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export async function GET() {
  try{
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
