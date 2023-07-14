"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navmenu from "../components/Navbar";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import Link from "next/link";



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

      <Carrusel/>

      <div className="container mx-auto min-h-screen">
        {/* <br /><br /> */}
        {/* <Link href="/catalogo" className="">
          <div className="container h-3/4 overflow-hidden flex items-center justify-center relative rounded-3xl">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Imagen Instrumentos" className="mx-auto w-full" />
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-4xl font-bold hover:text-5xl active:text-red-400 transition-all">
              <h3>Nos alegra verte por aquí ;)</h3><br />
              <h3 className="">¡Haz click y revisa todas nuestras ofertas!</h3>
            </div>
          </div>
        </Link> */}

        <br /><br />

        <div className="container h-1/5 overflow-hidden flex justify-between bg-black rounded rounded-3xl">
            <img src="https://images.unsplash.com/photo-1492563817904-5f1dc687974f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Imagen Violín" className="w-2/5"/>
            <div className="container text-center flex content-center flex-col items-center justify-center p-20">
              <h3 className="text-4xl font-bold">¡Bienvenidos a nuestra tienda de música e instrumentos!</h3>
              <br />
              <p className="text-2xl">Aquí encontrarás una amplia selección de productos de alta calidad que satisfarán todas tus necesidades musicales. Nos enorgullece ofrecer una variedad de instrumentos, equipos de sonido y accesorios de primer nivel para músicos de todos los niveles, desde principiantes hasta profesionales experimentados.</p>
              <br />
              <p className="text-2xl">Además de la calidad de nuestros productos, también nos esforzamos por brindar un excelente servicio al cliente. Nuestro equipo está formado por apasionados de la música que están dispuestos a compartir sus conocimientos y asesorarte en tu búsqueda musical. Ya sea que necesites ayuda para elegir el instrumento adecuado, obtener consejos de mantenimiento o resolver cualquier duda, estamos aquí para ayudarte en cada paso del camino.</p>
            </div>
        </div>

        <br /><br />

        <div className="container overflow-hidden flex flex-col justify-between relative rounded-3xl">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Imagen Violín" className=""/>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all">
              <div className="container text-center flex content-center flex-col items-center justify-center p-20">
                <h3 className="text-4xl font-bold">¿Quienes somos?</h3>
                <br />
                <p className="text-2xl">Music Pro es una destacada tienda y distribuidora de instrumentos y accesorios musicales con una sólida trayectoria en el mercado. Desde nuestra fundación en 1988, nos hemos convertido en un referente en la industria de la música en Chile, ofreciendo a nuestros clientes una amplia gama de opciones para satisfacer sus necesidades musicales.</p>
                <br />
                <p className="text-2xl">Con múltiples sedes estratégicamente ubicadas en la región metropolitana de Santiago, incluyendo Providencia, Maipú, Santiago y Vitacura, facilitamos la distribución de nuestros productos a lo largo de toda la zona. Nuestro compromiso es brindar un servicio de calidad y una experiencia de compra satisfactoria.</p>
                <br />
                <p className="text-2xl">Nuestro enfoque en la diversidad de productos nos ha convertido en una tienda altamente solicitada por músicos profesionales y aficionados por igual. Valoramos la pasión por la música y nos enorgullece poder acompañarte en tu camino musical, brindándote el asesoramiento adecuado y una atención personalizada para que encuentres el instrumento o accesorio perfecto.</p>
                <br />
                <p className="text-2xl">En Music Pro, la calidad, la variedad y el compromiso con nuestros clientes son los pilares fundamentales que nos distinguen. Te invitamos a visitar nuestras tiendas o explorar nuestra plataforma en línea para descubrir por qué somos la elección preferida de los amantes de la música en Chile. ¡Embárcate en una experiencia musical excepcional con Music Pro!</p>
              </div>
            </div>
        </div>

        <br /><br />
      </div>
      <Footer/>
    </>
  );
}
