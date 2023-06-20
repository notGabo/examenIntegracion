import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse){
    const fastApiRegister = "http://0.0.0.0:12545/registro";

    const { correo, clave, id_rol, rol, nombre, apellido, rut  } = await request.json();

    const jsonData = JSON.stringify({correo, clave, id_rol, rol, nombre, apellido, rut});

    const res = await fetch(fastApiRegister, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    });
    const finalData = await res.json();
    return new Response(JSON.stringify(finalData), {});
}

export async function GET() {
    return new Response('Se debe ejecutar un POST con parametros de email, password, nombre, apellido, rut, rol y id_rol. Saludos!')
  }