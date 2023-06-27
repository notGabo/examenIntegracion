"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navmenu from "../components/Navbar";



export default function Home() {
  const router = useRouter();
  // Verificar si el usuario ya posee una cookie
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch("/api/sessionChecker", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      const datosCliente = data.data;
      console.log(datosCliente);
      if (response.status === 200) {
        console.log('sesion iniciada')
      }
      else{
        console.log("No se encontro cookie, por favor inicia sesion ")
        router.push('/login')
      }
    };
    checkLoggedIn();
  }, []);


  return (
    <>
      <Navmenu />  
    </>
  );
}
