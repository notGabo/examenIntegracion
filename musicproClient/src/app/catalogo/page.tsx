"use client";
import Navmenu from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import Footer from "../components/Footer";
import Link from "next/link";


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
      const datosCliente = data.data;
      if (response.status === 200) {

      } else {

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

        if (response.status === 200) {
          setProductos(body.productos);
        } else {
  
        }
      };

    checkLoggedIn();
    getProductos();
  }, []);

  // load spinner while productos is fetching data
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

      <div className="m-16 min-h-screen ">
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            
            <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
              <figure>
                <img
                  src={producto.urlimagen}
                  alt={producto.nombre}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
              <Link href={`/catalogo/${producto.id_producto}`}>
                <h2 className="card-title">{producto.nombre}</h2>
                </Link>
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
                <input type="number" placeholder="1" className="w-20 input border-white active:border-white" min={1} max={producto.stock} />
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
      <Footer />
    </>
  );
}
