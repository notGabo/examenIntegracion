"use client";
import Navmenu from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";

interface Producto {
  id_producto: number;
  nombre: string
  precio: number;
  marca: string;
  categoria: string;
  subcategoria: string;
  descripcion: string;
  stock: number;
  urlimagen: string;
  
}

export default function Catalogo() {
  const router = useRouter();
  const [productos, setProductos] = useState([] as Producto[]);

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
        console.log("sesion iniciada");
      } else {
        console.log("No se encontro cookie, por favor inicia sesion ");
        router.push("/login");
      }
    };

    const getProductos = async () => {
      const response = await fetch('/api/productos/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const body = await response.json();
      console.log(body);
      if (response.status === 200) {
        setProductos(body.productos);
      } else {
        console.log("Error al obtener productos");
      }
    };

    checkLoggedIn();
    getProductos();
  }, []);

  // load spinner while productos is fetching data
  console.log(productos.length)
  if (productos.length === 0) {
    return(
    <>
      <Navmenu />
      <div className="flex min-h-screen items-center justify-center">
        <CgSpinnerAlt className="h-10 w-10 animate-spin" />
        Cargando productos....
      </div>
    </>)
  }

  return (
    <>
      <Navmenu />

      <div className="mt-5 mb-5 min-h-screen ">
        <div className="ml-5 mr-5 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={producto.urlimagen}
                  alt={producto.nombre}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">
                    {producto.categoria}
                  </div>
                </div>
                <div>
                  <p className="card-status">${producto.precio}</p>
                  <p className="card-status">Stock: {producto.stock}</p>
                </div>
                <div className="card-actions justify-end pt-3">
                  <button className="btn bg-amber-600 text-white hover:bg-green-600 hover:text-black">
                    Añadir al carrito
                  </button>
                </div>
                </div>
          </div>
          ))}



        </div>
        {/* Agrega aquí los otros elementos de la cuadrícula */}
      </div>
    </>
  );
}
