"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CgSpinnerAlt } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState(<></>)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setSubmitMessage(
        <div className="flex flex-col items-center transition duration-300 hover:scale-110 hover:text-orange-500">
          <CgSpinnerAlt className="animate-spin h-8 w-8 text-neutral-400" />
        </div>
      )
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      })

      if (res.status === 200) {
        setSubmitMessage(<p className="border-2 border-green-950 bg-green-600 text-l font-light text-center rounded-2xl text-neutral-800">redireccionando...</p>)
        setTimeout(() => {
          router.push("/home");
        }, 200);
      }
      if (res.status == 401) {
        setSubmitMessage (<p className="border-2 border-red-950 bg-red-600 text-l font-light text-center rounded-2xl text-neutral-800">Usuario o contraseña incorrectos</p>)
      }
      if (res.status == 500) {
        setSubmitMessage (<p className="border-2 border-red-950 bg-red-600 text-l font-light text-center rounded-2xl text-neutral-800">Error interno del servidor. Notifiquelo a @notGabo en github</p>)
      }
  }

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
          setSubmitMessage(
            <div className="bg-green-500 py-3 px-1 text-center border-4 text-white border-green-800 rounded-xl animate-pulse">
              <p>Sesion iniciada mediante cookie, redireccionando...</p>
            </div>)
          router.push("/home");
        }
        else{
          console.log("No se encontro cookie, por favor inicia sesion ")
        }
      };
      checkLoggedIn();
    }, []);

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
                onChange={handleChange}
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
                  onChange={handleChange}
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
            {submitMessage}
          </div>
        </div>
      </div>
    </>
  );
}
