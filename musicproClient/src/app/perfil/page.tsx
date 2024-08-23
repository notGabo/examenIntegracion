"use client";
import Navmenu from "../components/Navbar";
import { useState, useEffect } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();
  const [datosPerfil, setDatosPerfil] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    id_rol: 0,
    rol: "",
  });
  const [btnCerrarSesion, setBtnCerrarSesion] = useState(<></>);
  const [mostrarClave, setMostrarClave ] = useState(false);


  const cerrarSesion = async () => {
    setBtnCerrarSesion(<button disabled className="mt-8 rounded-lg bg-orange-600 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-amber-600">Cerrando sesion...</button>)
    const response = await fetch("/api/auth/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log("sesion cerrada");
      router.push("/login");
    }
  };

  const showPassword = () => {
    setMostrarClave(!mostrarClave);
    if (mostrarClave) {
      setMostrarClave(false); 
    } else {
      setMostrarClave(true);
    }
  }

useEffect(() => {
  const checkLoggedIn = async () => {
    setBtnCerrarSesion(<button onClick={cerrarSesion} className="mt-8 rounded-lg bg-rose-600 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-green-600">Cerrar sesión</button>)
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
      //router.push('/login')
      console.warn("sesion no iniciada.");
      console.warn("Proyecto deprecado! La base de datos se elimino");
    }
  };
  checkLoggedIn();
}, []);

    // if datosPerfil attribute is empty, show loading spinner
    if (datosPerfil.username === "") {
      return (<>
      <Navmenu />
        <div className="flex min-h-screen items-center justify-center">
          <CgSpinnerAlt className="animate-spin h-10 w-10" />
          Cargando Perfil
        </div>
        </>
      );  
    }

  return (
    <>
      <Navmenu/>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-10 mb-10 mt-10 w-full max-w-md rounded-lg bg-neutral-900 p-6 shadow-lg md:mx-0">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-2xl font-bold leading-tight transition hover:text-red-800 cursor-default">Datos perfil</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  Username
                </label>
                <p className="mb-6 text-xl text-white">
                  {datosPerfil.username}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  Correo electrónico
                </label>
                <p className="mb-6 text-xl text-white">{datosPerfil.email}</p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  Nombre
                </label>
                <p className="mb-6 text-xl text-white">{datosPerfil.nombre}</p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  <div className="flex gap-2">
                    Contraseña 
                    <button className="text-[10px]" onClick={showPassword}>(Mostrar clave)</button>
                  </div>
                </label>
                <p id='password' className="mb-6 text-xl text-white">
                {mostrarClave ? datosPerfil.password : "*".repeat(datosPerfil.password.length)}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  Apellido
                </label>
                <p className="mb-6 text-xl text-white">
                  {datosPerfil.apellido}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  Id_Rol
                </label>
                <p className="mb-6 text-xl text-white">{datosPerfil.id_rol}</p>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-red-800">
                  Rol
                </label>
                <p className="mb-6 text-xl text-white">{datosPerfil.rol}</p>
              </div>
            </div>

            {btnCerrarSesion}
          </div>
        </div>
      </div>
    </>
  );
}
