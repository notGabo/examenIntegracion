import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'



export async function GET(request: NextRequest, response: NextResponse) {
  const cookie = cookies().get('myToken')
  if (cookie) {
    
    cookies().set({
      name: 'myToken',
      value: '',
      expires: new Date('1980-01-01'),
      path: '/', // For all paths
    })
    return new Response (JSON.stringify('cookie eliminada'),{status:200})
  }
  return new Response (JSON.stringify({error: "error"}),{status:500})
} 