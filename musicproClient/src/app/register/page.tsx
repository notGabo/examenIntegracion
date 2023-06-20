"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [registro, setRegistro] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    rut: "",
    rol: "0",
    
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [submitMessage, setSubmitMessage] = useState("")
  const handleChange = (e:any) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e:any) => {
    setRegistro({
      ...registro,
      confirmPassword: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    let id_rol 
    let nombreRol 
    if (registro.rol === "6") {
      id_rol = 6
      nombreRol = "Cliente"
    }
    if (registro.rol === "1") {
      id_rol = 1
      nombreRol = "Administrador"
    }
    if (registro.rol === "2") {
      id_rol = 2
      nombreRol = "Vendedor"
    }
    if (registro.rol === "3") {
      id_rol = 3
      nombreRol = "Bodeguero"
    }
    if (registro.rol === "4") {
      id_rol = 4
      nombreRol = "Contador"
    }
    if (registro.rol === "5") {
      id_rol = 5
      nombreRol = "Auditor"
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const datos ={
      "correo": registro.email,
      "clave": registro.password,
      "id_rol":id_rol,
      "rol":nombreRol,
      "nombre":registro.name,
      "apellido":registro.lastName,
      "rut":registro.rut
    }

    const response = await axios.post("/api/register", JSON.stringify(datos), config);
    if (response.data.respuesta === 200) {
      setSubmitMessage(response.data.mensaje); // Almacenar el mensaje de éxito en la variable de estado
    } else {
      setSubmitMessage(response.data.mensaje); // Almacenar el mensaje de error en la variable de estado
    }
  };

  useEffect(() => {
    const { email, password, confirmPassword, name, lastName, rol } = registro;

    // Verificar si los campos obligatorios están llenos
    const isRequiredFieldsFilled =
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      name.trim() !== "" &&
      lastName.trim() !== "" &&
      rol !== "0";

    // Verificar si las contraseñas coinciden
    const doPasswordsMatch = password === confirmPassword;

    // Actualizar el estado de isSubmitDisabled
    setIsSubmitDisabled(!isRequiredFieldsFilled || !doPasswordsMatch);
  }, [registro]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios.get("/api/perfilHandler");
      if (response.data.respuesta === 200) {
        console.log(response.data.respuesta)
        console.log(response.data.id_rol)

        if (response.data.id_rol) {
          router.push("/home");
        }

      } else {
        console.log("No hay ninguna sesión iniciada");
      }
    };

    checkLoggedIn();
  }, []);


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-6 mb-10 mt-10 w-full max-w-md rounded-lg border bg-neutral-900 p-6 shadow-lg md:mx-0">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/img/logo.png"
            className="mb-2"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="mb-6 text-2xl font-bold leading-tight text-white">
            Crea tu cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Correo
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
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
                placeholder="••••••••"
                onChange={handleChange}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="mb-2 block text-sm font-medium text-white"
              >
                Confirma contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmpassword"
                placeholder="••••••••"
                onChange={handleConfirmPasswordChange}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Juanito"
                onChange={handleChange}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="apellido"
                className="mb-2 block text-sm font-medium text-white"
              >
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Juan"
                onChange={handleChange}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="rut"
                className="mb-2 block text-sm font-medium text-white"
              >
                Rut
              </label>
              <input
                type="text"
                name="rut"
                id="rut"
                placeholder="12345678-9 (en este formato)"
                onChange={handleChange}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="rol"
                className="mb-2 block text-sm font-medium text-white"
              >
                Rol
              </label>
              <select
                name="rol"
                id="rol"
                defaultValue={0}
                onChange={handleChange}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="0">Selecciona un rol</option>
                <option value="6">Cliente</option>
                <option value="1">Administrador</option>
                <option value="2">Vendedor</option>
                <option value="3">Bodeguero</option>
                <option value="4">Contador</option>
                <option value="5">Auditor</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/login"
                className="text-primary-600 text-primary-500 text-sm font-medium hover:underline"
              >
                ¿Ya tienes una cuenta? Inicia sesion
              </Link>
            </div>
            <button
            disabled={isSubmitDisabled}
            className={`${
              isSubmitDisabled
                ? "opacity-50 cursor-not-allowed hover:bg-gray-700 hover:text-white hover:shadow-2xl hover:shadow-red-600"
                : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 focus:ring-primary-800 hover:bg-green-700 hover:text-white hover:shadow-2xl hover:shadow-white"
            } w-full rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-neutral-800 transition duration-300 focus:outline-none focus:ring-4`}
          >
            {/* Iniciar Sesion */}
            {`${isSubmitDisabled ? "Iniciar Sesion (verifica los datos ingresados)": "Iniciar Sesion" } `}
          </button>
{/* Mostrar el mensaje de envío */}
{submitMessage  && <p className="bg-yellow-700 py-3 px-1 text-center border-4 border-yellow-900 rounded-xl">{submitMessage}</p>}
            <p className="text-sm font-light text-gray-400">
              ¿Aun no tienes una cuenta?
              <Link
                href="#"
                className="text-primary-600 text-primary-500 font-medium hover:underline"
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
