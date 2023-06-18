import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-neutral-900 rounded-lg shadow-lg p-6 mb-10 mt-10">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/img/logo.png"
            className="mb-2"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-2xl font-bold leading-tight text-white mb-6">
            Crea tu cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Correo
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirma contraseña
              </label>
              <input
                type="password"
                name="password"
                id="confirmpassword"
                placeholder="••••••••"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="block mb-2 text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Juanito"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="apellido"
                className="block mb-2 text-sm font-medium text-white"
              >
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Juan"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="rut"
                className="block mb-2 text-sm font-medium text-white"
              >
                Rut
              </label>
              <input
                type="text"
                name="rut"
                id="rut"
                placeholder="12345678-9 (en este formato)"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline text-primary-500"
              >
                ¿Ya tienes una cuenta? Inicia sesion
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-neutral-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-300 transition duration-300 hover:shadow-2xl hover:shadow-red-600 hover:bg-gray-700 hover:text-white focus:ring-primary-800"
            >
              Iniciar Sesion
            </button>
            <p className="text-sm font-light text-gray-400">
              ¿Aun no tienes una cuenta?{" "}
              <Link
                href="#"
                className="font-medium text-primary-600 hover:underline text-primary-500"
              >
                ¡Solicita una a un administrador aqui!{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
