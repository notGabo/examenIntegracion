"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const config = {
    }
  }

  
  return (
    <>
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Image
          src="/img/logo.png"
          className="mb-2"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="w-full rounded-lg border bg-neutral-900 shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Ingresa a tu cuenta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Correo
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="********"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="text-primary-600 text-primary-500 text-sm font-medium hover:underline"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 focus:ring-primary-800 w-full rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-neutral-800 transition duration-300 hover:bg-gray-700 hover:text-white hover:shadow-2xl hover:shadow-red-600 focus:outline-none focus:ring-4"
              >
                Iniciar Sesión
              </button>
              <p className="text-sm font-light text-gray-400">
                ¿Aún no tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="text-primary-600 text-primary-500 font-medium hover:underline"
                >
                  ¡Registrate aqui!
                </Link>
              </p>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
