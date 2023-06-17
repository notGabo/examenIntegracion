import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    // do a login and register form 

    // instead of use <a> tag, use <Link> tag from next/link
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image src="/logo.png" alt="MusicPro Logo" width={200} height={200} />
      <h1 className="text-6xl font-bold mt-10">MusicPro</h1>
      <p className="mt-3 text-2xl">Trabajo para integracion de plataformas DuocUC Sede Maipu 2023 - Profesor evaluador Francisco Valdivieso</p>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href="/login" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
          
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Inicia sesion para poder acceder a la plataforma
            </p>
        </Link>
        
        <Link href="/register" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Register &rarr;</h3>
            <p className="mt-4 text-xl">
              Registrate para poder acceder a la plataforma
            </p>
        </Link>
      </div>
    </div>



 
  )
}
