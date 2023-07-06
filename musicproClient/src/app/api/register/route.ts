import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse){

    const fastApiRegister = process.env.FAST_API + "/registro";

    const { correo, clave, id_rol, rol, nombre, apellido, rut  } = await request.json();

    const jsonData = JSON.stringify({correo, clave, id_rol, rol, nombre, apellido, rut});

    const res = await fetch(fastApiRegister, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    });

    const data = await res.json();
    if (res.status === 200){
        return new Response(JSON.stringify(data), {status: 200});
        
    }
    else if (res.status === 402){ 
        return new Response(JSON.stringify(data), {status: 402});
    }
    else if (res.status === 500){ 
        return new Response(JSON.stringify(data), {status: 500});
    }
    const finalData = await res.json();
    return new Response(JSON.stringify(finalData), {});
}

export async function GET() {
    return new Response('Se debe ejecutar un POST con parametros de email, password, nombre, apellido, rut, rol y id_rol. Saludos!')
  }