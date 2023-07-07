"use client";
import Navmenu from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import Footer from "../components/Footer";
import Link from "next/link";

interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  marca: string;
  categoria: string;
  subcategoria: string;
  descripcion: string;
  stock: number;
  urlimagen: string;
}

interface Carrito {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  urlimagen: string;
}
[];

export default function Catalogo() {
  const router = useRouter();
  const [productos, setProductos] = useState([] as Producto[]);
  const [carrito, setCarrito] = useState([] as Carrito[]);

  const sumarAlCarrito = async (e: any) => {
    e.preventDefault();
      let productoEncontrado = carrito.find((producto) => producto.id_producto === e.target[0].value);
      if (productoEncontrado) {
        productoEncontrado.cantidad = Number(productoEncontrado.cantidad) + Number(e.target[4].value);
        setCarrito([...carrito]);
      } else {
        setCarrito([
          ...carrito,
          {
            id_producto: e.target[0].value,
            nombre: e.target[1].value,
            precio: e.target[2].value,
            cantidad: e.target[4].value,
            urlimagen: e.target[3].value,
          },
        ]);
    }
  };

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
      if (response.status === 200) {
        console.log("sesion iniciada");
      } else {
        router.push("/login");
      }
    };

    const getProductos = async () => {
      const response = await fetch("/api/productos/", {
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
    return (
      <>
        <Navmenu />
        <div className="flex min-h-screen items-center justify-center">
          <CgSpinnerAlt className="h-10 w-10 animate-spin" />
          Cargando productos....
        </div>
      </>
    );
  }

  return (
    <>
      <Navmenu />

      <div className="m-16 min-h-screen ">
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <form onSubmit={sumarAlCarrito}>
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
                    <div className="flex gap-5">
                      <h2
                        className="card-title"
                        id={`nombre-${producto.id_producto}`}
                      >
                        {producto.nombre}
                      </h2>
                      <p
                        className="text-[10px]"
                        id={`id-${producto.id_producto}`}
                      >
                        id: {producto.id_producto}
                      </p>
                    </div>
                  </Link>
                  <p id={`descripcion-${producto.id_producto}`}>
                    {producto.descripcion}
                  </p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline text-[8px] sm:text-base">
                      <p id={`categoria-${producto.id_producto}`}>
                        {producto.categoria}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className="card-status"
                      id={`precio-${producto.id_producto}`}
                    >
                      ${producto.precio}
                    </p>
                    <p
                      className="card-status"
                      id={`precio-${producto.id_producto}`}
                    >
                      Stock: {producto.stock}
                    </p>
                  </div>
                  <div className="card-actions justify-end pt-3">
                    <input type="hidden" value={producto.id_producto} />
                    <input type="hidden" value={producto.nombre} />
                    <input type="hidden" value={producto.precio} />
                    <input type="hidden" value={producto.urlimagen} />
                    <input
                      type="number"
                      placeholder="1"
                      className="input w-20 border-white active:border-white"
                      disabled={producto.stock === 0 ? true : false}
                      defaultValue={producto.stock === 0 ? 0 : 1}
                      min={1}
                      max={producto.stock}
                    />
                    <button
                      className="btn bg-amber-600 text-white hover:bg-green-600 hover:text-black"
                      disabled={producto.stock === 0 ? true : false}
                    >
                      {producto.stock === 0
                        ? "No hay stock"
                        : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ))}
        </div>
        {/* Agrega aquí los otros elementos de la cuadrícula */}
      </div>
      <Footer />
    </>
  );
}
