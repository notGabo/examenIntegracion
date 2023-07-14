import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { pago } from "@/app/middleware/webpay";
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest) {
  const { total } = await request.json();
  // const { carrito } = jwt.verify(cookies().get('carrito')?.value as string, "secret") as jwt.JwtPayload;
  const carrito = cookies().get('carrito')?.value;
  console.log(carrito)
  const userData = cookies().get('myToken')?.value;
  const userDataDecoded = jwt.verify(userData as string, "secret") as jwt.JwtPayload;
  console.log(userDataDecoded)
  const emailCliente  = userDataDecoded.email;
  const usernameCliente  = userDataDecoded.username;
  const nombreCliente  = userDataDecoded.nombre;
  const apellidoCliente  = userDataDecoded.apellido;
  const nombreCompleto = nombreCliente + ' ' + apellidoCliente;
  const buyOrder = Math.floor(Math.random() * 1000000).toString();
  const sessionId = Math.floor(Math.random() * 1000000).toString();
  const currentUrl = new URL(request.url);
  const returnUrl = currentUrl.origin + "/pagoRealizado";
  const estado = "pendiente"

  const res = await fetch(process.env.FAST_API + "/compra/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ordenDeCompra": buyOrder,
      "ordenDeCompraInt": parseInt(buyOrder),
      "carrito": carrito,
      "total": total,
      "fecha": new Date().toISOString().slice(0, 10),
      "estado": estado,
      "correo": emailCliente,
      "username": usernameCliente,
      "nombreCompleto": nombreCompleto}),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
        const { url, token } = await pago(total, returnUrl, buyOrder, sessionId);
        cookies().set({
          name: 'carrito',
          value: '',
          expires: new Date('1980-01-01'),
        path: '/', // For all paths
        })
        return new Response(JSON.stringify({ url: url, token:token } ), {
          status: 200,
        });
    }
    return new Response(JSON.stringify({ mensaje: "Error al crear la compra" } ), {status: 400});
}

export async function GET(request: NextRequest) {
  try{
    const cookie = cookies().get("myToken"); console.log(cookie);
    if (cookie){
      const decoded = jwt.verify(cookie.value as string, "secret") as jwt.JwtPayload;
      console.log(decoded);
      const res = await fetch(process.env.FAST_API + "/compra/correo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "correo": decoded.email,
        }),
      });
      const data = await res.json();
      const compras = data.compras
      let newCompras = []
      console.log(compras)
      for (let i = 0; i < compras.length; i++) {
        const ordenDeCompra = compras[i].ordenDeCompra
        const carrito = compras[i].carrito
        const carritoDecoded = jwt.verify(carrito, "secret") as jwt.JwtPayload as {carrito: object[];iat: number;};
        const carritoArray = carritoDecoded.carrito;;
        const total = compras[i].total
        const fecha = compras[i].fecha
        const estado = compras[i].estado
        const username = compras[i].username
        const nombreCompleto = compras[i].nombreCompleto
        const compra = {
          ordenDeCompra: ordenDeCompra,
          carrito: carritoArray,
          total: total,
          fecha: fecha,
          estado: estado,
          username: username,
          nombreCompleto: nombreCompleto
        }
        newCompras.push(compra)
      }
      console.log(newCompras)
      return new Response(JSON.stringify({
        message: "Perfil obtenido",
        data: newCompras
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