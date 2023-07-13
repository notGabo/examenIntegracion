import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  Environment,
  Options,
  WebpayPlus,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
} from "transbank-sdk";

export async function POST(request: NextRequest) {
  const currentUrl = new URL(request.url);
  const { total } = await request.json();
  const buyOrder = Math.floor(Math.random() * 1000000).toString();
  const sessionId = Math.floor(Math.random() * 1000000).toString();
  const returnUrl = currentUrl.origin + "/pagoRealizado";
  console.log(total)
  try {
    const createResponse = await (new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration
      ))).create(buyOrder, sessionId, total, returnUrl);
    const cookie = cookies().get('carrito')
    if (cookie) {
        cookies().set({
            name: 'carrito',
            value: '',
            path: '/',
            maxAge: 0,
        })
    }        
    return new Response(JSON.stringify(createResponse), {
      status: 200,
      statusText: "respuesta creada",
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      statusText: "Error al crear la respuesta",
    });
  }
}
