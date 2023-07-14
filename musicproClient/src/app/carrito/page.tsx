"use client";
import Navmenu from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { toast, ToastContainer, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import WebpayPlus from "transbank-sdk/dist/es5/transbank/webpay/webpay_plus";

export default function Carrito() {
  const router = useRouter();
  const [carrito, setCarrito] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tokenTb, setTokenTb] = useState("");
  const [urlTb, setUrlTb] = useState("");

  const handleSubmit = async (e:any) => { 
    const response = await fetch("/api/webpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({total: total}),
    });
    const body = await response.json();
    const token  = body.token;
    const url = body.url;
    setTokenTb(token);
    setUrlTb(url);
    console.log(token);
    console.log(url);
    
  }  

  const vaciarCarrrito = async () => {
    try {
      const response = await fetch("/api/carrito", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        setCarrito([]);
        setTotal(0);
      } else {
        console.log("error al vaciar carrito");
      }
    } catch (error) {
      console.log("Error al vaciar carrito: ", error);
    }
  }

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
        <form onSubmit={handleSubmit} action={urlTb} method="POST">
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
            <div className="mt-5 overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead className="text-base">
                  <tr>
                    <th>Nombre producto</th>
                    <th>Categoria</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {/* row 1 */}
                  {carrito.map((producto) => (
                    <tr className="transition duration-300 hover:bg-amber-800">
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={producto.urlimagen}
                                alt={producto.nombre}
                              />
                            </div>
                          </div>
                          <div>
                            <div>{producto.nombre}</div>
                            <div className="text-sm opacity-50">
                              id: {producto.id_producto}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {producto.categoria}
                        <br />
                        <span className="badge badge-ghost">
                          {producto.subcategoria}
                        </span>
                      </td>
                      <td>{producto.cantidad}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.precio * producto.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot className="text-base">
                  <tr>
                    <th>Nombre producto</th>
                    <th>Categoria</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Subtotal</th>
                  </tr>
                  <tr className="text-xl text-white">
                    <td colSpan={4} className="text-right">
                      Total
                    </td>
                    <td>${total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <button
              className="btn-primary btn"
              disabled={carrito.length === 0 ? true : false}>
              Comprar
            </button>
            {
              carrito.length !== 0 ? (
                  <div
                  className={`btn text-white mt-2`+ `${carrito.length === 0 ? ' btn-disabled' : ' btn-accent'}`}
                  onClick={vaciarCarrrito}
                  >
                    Vaciar carrito
                  </div>
              ) : null
            }
          </div>
        </div>
        <input type="hidden" value={total} />
        <input type="hidden" name="token_ws" value={tokenTb}/>
        </form>
      </div>
      <ToastContainer 
        transition={Flip}
      />
      <Footer />
    </>
    );
}

