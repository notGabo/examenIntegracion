"use client";
import Navmenu from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
//import { useRouter } from "next/router"; 
import { useEffect, useRef, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast, ToastContainer, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ProcesoPago(){
    const formularioRef = useRef<HTMLFormElement>(null);


    //get the token from the query param
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    console.log(token);

    useEffect(() => {
        if (formularioRef.current) {
            formularioRef.current.submit();
        }
      }, []);

    // do a post request to the url 'https://webpay3gint.transbank.cl/webpayserver/initTransaction' passing the token as query param
    return(
    <div>
        <Navmenu />
        <div className="flex min-h-screen items-center justify-center">
          <CgSpinnerAlt className="h-10 w-10 animate-spin" />
          Procesando Pago...
        </div>
        <form method="post" action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" ref={formularioRef}>
            <input type="hidden" name="token_ws" value={token ?? ''} />
            <input type="submit" value="Ir a pagar" className="hidden" />
        </form>
        <Footer />
    </div>

    )
}