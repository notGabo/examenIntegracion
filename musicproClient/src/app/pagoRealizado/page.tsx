import Navmenu from "../components/Navbar"
import Footer from "../components/Footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CgSpinnerAlt } from "react-icons/cg"
import Link from "next/link"


export default function PagoRealizado(){
    return(
        <>
        <Navmenu />
        <div className="flex flex-col h-screen items-center justify-center">
          
          <h1 className="text-5xl font-bold text-center text-white">✔ Compra completa ✔</h1>
            <div className="flex gap-5 items-center justify-center">
            <Link href="/"><button className="transition duration-300 bg-white hover:bg-green-500 hover:shadow-2xl hover:shadow-white hover:text-white text-black  py-2 px-4 rounded mt-5">Volver al inicio</button></Link>
            <Link href="/seguimiento"><button className="transition duration-300 bg-white hover:bg-amber-700 hover:shadow-2xl hover:shadow-white hover:text-white text-black  py-2 px-4 rounded mt-5">Seguimiento de compra</button></Link>
            </div>
        </div>
        <Footer />
        </>
    )
}