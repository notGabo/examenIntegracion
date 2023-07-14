import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { pago } from "@/app/middleware/webpay";
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest) {
  const { total } = await request.json();
  const { carrito } = jwt.verify(cookies().get('carrito')?.value as string, "secret") as jwt.JwtPayload;
  const buyOrder = Math.floor(Math.random() * 1000000).toString();
  const sessionId = Math.floor(Math.random() * 1000000).toString();
  const currentUrl = new URL(request.url);
  const returnUrl = currentUrl.origin + "/pagoRealizado";
  const { url, token } = await pago(total, returnUrl, buyOrder, sessionId);
  
  // delete cookie carrito
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