"use client"
import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import Link from 'next/link';

const Carrusel = () => {
    const imagenes = [
    {
        foto: "https://images.unsplash.com/photo-1568057609581-8556cf900d3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        texto:  (
        <h1 className="font-black font-VALORANT text-center lg:text-6xl md:text-2xl sm:text-5xl transition ease-in-out delay-150 hover:-translate-y-1 hover:text-white hover:scale-110 duration-300">
            Bienvenido a MusicPro
        </h1>
        )
    },
    {
        foto: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        texto: (
            <Link href="/catalogo"><p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:text-3xl active:text-red-400 transition-all'>Nos alegra tener aquí ;)<br/>¡Haz click y revisa nuestro catálogo y todas nuestras ofertas!</p></Link>
        )
    },
    {
        foto: "https://images.unsplash.com/photo-1571974599782-87624638275e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
        texto: (
        <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Productos de calidad garantizada.</p>
        
        )
    },
    {
        foto: "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        texto: (
            <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white'>¡Tenemos desde instrumentos hasta los accesorios que necesitas! Solo revisa nuestro catálogo online. Recuerda que también puedes llamar o ir a nuestras sucursales de manera presencial.</p>
        )
    }
    ];

    const propiedadesSlide = {
    indicators: false,
    duration: 10000000,
    transitionDuration: 700,
    infinite: true,

    prevArrow: (
        <div className='cursor-pointer top-[45px] sm:top-auto'>
        <BsFillArrowLeftSquareFill className='scale-150 sm:scale-150 md:scale-150 lg:scale-150 xl:scale-150 m-10 opacity-80 lg:text-5xl md:text-sm text-white-900 transition hover:scale-[2] hover:text-rose-600' />
        </div>
    ),
    nextArrow: (
        <div className='cursor-pointer top-[45px] sm:top-auto'>
        <BsFillArrowRightSquareFill className='scale-150 m-10 opacity-80 lg:text-5xl md:text-sm text-white-900 transition hover:scale-[2]  hover:text-rose-600' />
        </div>
    )
    };

    return (
        <div className=''>
            <Slide {...propiedadesSlide}>
                {imagenes.map((each, index) => (
                    <div key={index} className='flex -top-[45px] justify-center lg:w-full relative'>
                        <img className='z-0 lg:w-screen lg:h-screen object-cover shadow-xl' src={each.foto} alt={`Slide ${index}`} />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center'>
                            {each.texto}
                        </div>
                    </div>
                ))}
            </Slide>      
        </div>
    );
};
export default Carrusel;