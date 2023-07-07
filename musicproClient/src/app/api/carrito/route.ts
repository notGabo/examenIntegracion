import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
 

export async function POST(request: NextRequest) {
    const { carrito } = await request.json()
    return new Response(JSON.stringify({
        carrito
    }))
};