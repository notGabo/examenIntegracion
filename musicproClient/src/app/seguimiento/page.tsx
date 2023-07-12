import Navmenu from "../components/Navbar"
import Footer from "../components/Footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CgSpinnerAlt } from "react-icons/cg"
import Link from "next/link"


export default function Seguimiento(){
    return(
        <>
        <Navmenu/>
        <div className="container">
            <h1>Seguimiento</h1>
        </div>
        <Footer/>
        </>
    )
}