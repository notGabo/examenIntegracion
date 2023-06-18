import React from 'react';
import Image from 'next/image';
export default function Login() {
  return (
    <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Image src="/img/logo.png" className="mb-2" alt="logo" width={100} height={100} />

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-neutral-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Ingresa a tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Correo</label>
                <input type="email" name="email" id="email" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="correo@ejemplo.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Olvide mi contraseña</a>
              </div>
              <button type="submit" className="w-full text-neutral-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-300 transition duration-300 hover:shadow-2xl hover:shadow-red-600 hover:bg-gray-700 hover:text-white focus:ring-primary-800">Iniciar Sesion</button>
              <p className="text-sm font-light text-gray-400">
                ¿Aun no tienes una cuenta? <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">¡Solicita una a un administrador aqui! </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};


