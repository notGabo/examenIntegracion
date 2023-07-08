"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navmenu from "../components/Navbar";
import Footer from "../components/Footer";



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

      if (response.status === 200) {
        console.log("sesion iniciada");
      }
      else{
        
        router.push('/login')
      }
    };
    checkLoggedIn();
  }, []);


  return (
    <>
      <Navmenu />  
      <Footer/>
    </>
  );
}
