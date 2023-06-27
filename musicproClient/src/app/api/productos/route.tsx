import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    //const fastApiUrl = "http://0.0.0.0:12545/productos";
    const fastApiUrl = "http://129.151.120.46:3300/productos";
    try{
        const res = await fetch(fastApiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        if (res.status === 200){
            return new Response(JSON.stringify(data), {status: 200});
        }
        else if (res.status === 402){
            return new Response(JSON.stringify(data), {status: 402});
        }
        else {
            return new Response(JSON.stringify({error: "Error"}), {status: 500});
        }
    }
    catch(error){
        return new Response(JSON.stringify({error: error}), {status: 500});
    }
}