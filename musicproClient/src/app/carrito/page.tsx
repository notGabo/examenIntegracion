"use client";
import Navmenu from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import Link from "next/link";

export default function Carrito() {
  const router = useRouter();
  const [carrito, setCarrito] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch("/api/sessionChecker", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status !== 200) {
        router.push("/login");
      }
    };

    const getCarrito = async () => {
      try {
        const response = await fetch("/api/carrito", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const body = await response.json();
        console.log(body.data.carrito);
        if (response.status === 200) {
          setCarrito(body.data.carrito);
          setLoading(false);
          setTotal(
            body.data.carrito.reduce(
              (total: number, producto: any) =>
                total + producto.precio * producto.cantidad,
              0
            )
          );
        } else {
          console.log("error al obtener carrito");
        }
      } catch (error) {
        console.log("Error al obtener carrito: ", error);
        setCarrito([]);
        setLoading(false);
      }
    };
    getCarrito();
    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <>
        <Navmenu />
        <div className="flex h-screen items-center justify-center">
          <CgSpinnerAlt className="h-10 w-10 animate-spin" />
          Cargando carrito...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navmenu />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-5 text-3xl font-bold">Carrito</h1>
      </div>
      <div>
        <div className="flex h-screen flex-col items-center justify-center">
          {carrito.length === 0 ? (
            <div className="mx-5 flex h-screen items-center justify-center gap-1">
              <p>
                El carrito esta vacio, agrega productos en{" "}
                <Link href="/catalogo" className="underline">
                  catalogo
                </Link>{" "}
                para revisar con detalle tu carrito
              </p>
            </div>
          ) : (
            // carrito.map((producto) => (
            // <div
            //     key={producto.id}
            //     className="flex flex-wrap items-center justify-around max-w-7xl  sm:w-full">
            //     <div className="flex flex-row items-center">
            //         <img
            //             className="h-44 w-44 object-cover rounded-md"
            //             src={producto.urlimagen}
            //             alt=""
            //         />
            //         <div className="flex flex-col items-start justify-center ml-2">
            //             <h1 className="text-lg font-bold">
            //                 {producto.nombre}
            //             </h1>
            //             <h1 className="text-lg font-bold">
            //                 c/u ${producto.precio}
            //             </h1>
            //         </div>
            //     </div>
            //     <div className="flex flex-col items-center justify-center">
            //         <h1 className="text-lg font-bold">
            //             Cantidad: {producto.cantidad}
            //         </h1>
            //         <h1 className="text-lg font-bold">
            //             Subtotal: ${producto.precio * producto.cantidad}
            //         </h1>
            //     </div>
            // </div>
            // ))
            <table>
              <thead className="border">
                <tr>
                  <th className="px-16 py-6 text-2xl">ID</th>
                  <th className="px-16 py-6 text-2xl">Imagen</th>
                  <th className="px-16 py-6 text-2xl">Nombre</th>
                  <th className="px-16 py-6 text-2xl">Precio unitario</th>
                  <th className="px-16 py-6 text-2xl">Cantidad</th>
                  <th className="px-16 py-6 text-2xl">Subtotal</th>
                </tr>
              </thead>
              <tbody className="border">
                {carrito.map((producto) => (
                  <tr key={producto.id_producto} className="transition duration-300 hover:bg-red-900">
                    <td className="transition duration-300 text-center text-xl hover:bg-amber-900 hover:shadow-amber-900 hover:shadow-lg ">{producto.id_producto}</td>
                    <td>
                      <img
                        src={producto.urlimagen}
                        alt=""
                        className="h-44 w-44 mx-5 my-2 rounded-md object-cover"
                      />
                    </td>
                    <td className="transition duration-300 text-center text-xl hover:bg-amber-900 hover:shadow-amber-900 hover:shadow-lg" >{producto.nombre}</td>
                    <td className="transition duration-300 text-center text-xl hover:bg-amber-900 hover:shadow-amber-900 hover:shadow-lg ">${producto.precio}</td>
                    <td className="transition duration-300 text-center text-xl hover:bg-amber-900 hover:shadow-amber-900 hover:shadow-lg ">{producto.cantidad}</td>
                    <td className="transition duration-300 text-center text-xl hover:bg-amber-900 hover:shadow-amber-900 hover:shadow-lg ">${producto.precio * producto.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex flex-col items-center justify-center py-7">
            <h1 className="text-2xl font-bold">Total: ${total}</h1>
            <button
              className="btn-primary btn mt-4"
              disabled={carrito.length === 0 ? true : false}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
