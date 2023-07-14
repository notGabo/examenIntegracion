import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { pago } from "@/app/middleware/webpay";
import jwt from 'jsonwebtoken'

  
//console.log requested method

export async function POST(request: NextRequest) {
  console.log(request.method);
  // console.log request status code
  const { total } = await request.json();
  const { carrito } = jwt.verify(cookies().get('carrito')?.value as string, "secret") as jwt.JwtPayload;
  const buyOrder = Math.floor(Math.random() * 1000000).toString();
  const sessionId = Math.floor(Math.random() * 1000000).toString();
  const currentUrl = new URL(request.url);
  const returnUrl = currentUrl.origin + "/pagoRealizado";
  const { url, token } = await pago(total, returnUrl, buyOrder, sessionId);
  console.log(url, token);

  return new Response(JSON.stringify({ url: url, token:token }), {
    status: 200,
  });
}


