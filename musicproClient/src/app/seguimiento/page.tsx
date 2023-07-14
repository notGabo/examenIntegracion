"use client"
import Navmenu from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import Link from "next/link";


interface Compras {
    ordenDeCompra: number;
    carrito: {
        id_producto: number;
        nombre: string;
        precio: number;
        categoria: string;
        subcategoria: string;
        cantidad: number;
        urlimagen: string;
    }[];
    total: number;
    fecha: string;
    estado: string;
    username: string;
    nombreCompleto: string;
}

export default function Seguimiento() {
    const [compras, setCompras] = useState([] as Compras[]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        console.log(compras);
    }, [compras]);

    // use effect para sesion y productos
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

        const getCompras = async () => {
            const response = await fetch("/api/webpay", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setCompras(data.data);
                console.log(compras);
                setLoading(false);
            }
            else{
                setLoading(false);
            }
        };

        checkLoggedIn();
        getCompras();
    }, []);

    if (loading) {
        return (
            <>
                <Navmenu />
                <div className="flex justify-center items-center h-screen">
                    <CgSpinnerAlt className="animate-spin h-20 w-20" />
                    Cargando compras...
                </div>
                <Footer />
            </>
        );
    }


    return (
        <>
            <Navmenu />
            <div className="m-16 min-h-screen">
                {/*  <div className="grid grid-cols-1 gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
           <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
            <figure>
              <img
                src="https://www.iconpacks.net/icons/2/free-arrow-next-icon-2825-thumb.png"
                alt="Imagen En Camino"
                className="h-80 w-full bg-white object-cover"
              />
            </figure>
            <div className="card-body">
              <Link href={`/seguimiento/123456`}>
                <div className="flex gap-5">
                  <h2 className="card-title" id={`nombre-Violin`}>
                    ID Compra: 123456
                  </h2>
                  <div className="text-13px badge badge-outline">
                    <p id={`categoria-123456`}>EN CAMINO</p>
                  </div>
                </div>
              </Link>
              <div>
                <p className="card-status" id={`total-123456`}>
                  Fecha Compra: 14/07/2023
                  <br />
                  Fecha Entrega: 14/08/2023
                </p>
                <br />
                <p className="card-status" id={`precio-123456`}>
                  Productos: [Violin, Guitarra]
                </p>
                <p className="card-status" id={`total-123456`}>
                  Total: $1.360.000
                </p>
   
              </div>
              <div className="card-actions justify-end pt-3">
                <ul className="steps">
                  <li className="step-info step">Compra</li>
                  <li className="step-info step">Preparación</li>
                  <li className="step-info step">En Camino</li>
                  <li className="step">Entregado</li>
                </ul>
                <br />
                <br />
                <br />
                <Link href={`/seguimiento/123456`}>
                  <button className="btn bg-red-600 text-white hover:bg-green-600 hover:text-black">
                    Ver detalles de compra
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
            <figure>
              <img
                src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
                alt="Imagen En Camino"
                className="h-80 w-full bg-white object-cover"
              />
            </figure>
            <div className="card-body">
              <Link href={`/seguimiento/123456`}>
                <div className="flex gap-5">
                  <h2 className="card-title" id={`nombre-Violin`}>
                    ID Compra: 654321
                  </h2>
                  <div className="text-13px badge badge-outline">
                    <p id={`categoria-123456`}>ENTREGADO</p>
                  </div>
                </div>
              </Link>
              <div>
                <p className="card-status" id={`total-123456`}>
                  Fecha Compra: 23/02/2023
                  <br />
                  Fecha Entrega: 9/03/2023
                </p>
                <br />
                <p className="card-status" id={`precio-123456`}>
                  Productos: [Piano]
                </p>
                <p className="card-status" id={`total-123456`}>
                  Total: $1.720.000
                </p>
              </div>
              <div className="card-actions justify-end pt-3">
                <ul className="steps">
                  <li className="step-success step">Compra</li>
                  <li className="step-success step">Preparación</li>
                  <li className="step-success step">En Camino</li>
                  <li className="step-success step">Entregado</li>
                </ul>
                <br />
                <Link href={`/seguimiento/123456`}>
                  <button className="btn bg-red-600 text-white hover:bg-green-600 hover:text-black">
                    Ver detalles de compra
                  </button>
                </Link>
              </div>
            </div>
          </div> 
        </div>*/}


                <div className={ `${compras.length === 0 ? null : "grid grid-cols-1 gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`  }>
                {compras.length === 0 ? (
                        <div className="mx-5 flex h-screen items-center justify-center gap-1">
                        <p>
                          Aun no has comprado nada! Para comprar ve a {" "}
                          <Link href="/catalogo" className="underline">
                            catalogo
                          </Link>{" "}
                          y luego revisa tu {" "}
                            <Link href="/carrito" className="underline">
                                carrito
                            </Link>
                        </p>
                      </div>
                    ) :
                    <>
                    <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
                        <figure>
                            <img
                                src="https://www.iconpacks.net/icons/2/free-arrow-next-icon-2825-thumb.png"
                                alt="Imagen En Camino"
                                className="h-80 w-full bg-white object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <Link href={`/seguimiento/123456`}>
                                <div className="flex gap-5">
                                    <h2 className="card-title" id={`nombre-Violin`}>
                                        ID Compra: 123456
                                    </h2>
                                    <div className="text-13px badge badge-outline">
                                        <p id={`categoria-123456`}>EN CAMINO</p>
                                    </div>
                                </div>
                            </Link>
                            <div>
                                <p className="card-status" id={`total-123456`}>
                                    Fecha Compra: 14/07/2023
                                    <br />
                                    Fecha Entrega: 14/08/2023
                                </p>
                                <br />
                                <p className="card-status" id={`precio-123456`}>
                                    Productos: [Violin, Guitarra]
                                </p>
                                <p className="card-status" id={`total-123456`}>
                                    Total: $1.360.000
                                </p>

                            </div>
                            <div className="card-actions justify-end pt-3">
                                <ul className="steps">
                                    <li className="step-info step">Compra</li>
                                    <li className="step-info step">Preparación</li>
                                    <li className="step-info step">En Camino</li>
                                    <li className="step">Entregado</li>
                                </ul>
                                <br />
                                <br />
                                <br />
                                <Link href={`/seguimiento/123456`}>
                                    <button className="btn bg-red-600 text-white hover:bg-green-600 hover:text-black">
                                        Ver detalles de compra
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
                        <figure>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
                                alt="Imagen En Camino"
                                className="h-80 w-full bg-white object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <Link href={`/seguimiento/123456`}>
                                <div className="flex gap-5">
                                    <h2 className="card-title" id={`nombre-Violin`}>
                                        ID Compra: 654321
                                    </h2>
                                    <div className="text-13px badge badge-outline">
                                        <p id={`categoria-123456`}>ENTREGADO</p>
                                    </div>
                                </div>
                            </Link>
                            <div>
                                <p className="card-status" id={`total-123456`}>
                                    Fecha Compra: 23/02/2023
                                    <br />
                                    Fecha Entrega: 9/03/2023
                                </p>
                                <br />
                                <p className="card-status" id={`precio-123456`}>
                                    Productos: [Piano]
                                </p>
                                <p className="card-status" id={`total-123456`}>
                                    Total: $1.720.000
                                </p>
                            </div>
                            <div className="card-actions justify-end pt-3">
                                <ul className="steps">
                                    <li className="step-success step">Compra</li>
                                    <li className="step-success step">Preparación</li>
                                    <li className="step-success step">En Camino</li>
                                    <li className="step-success step">Entregado</li>
                                </ul>
                                <br />
                                <Link href={`/seguimiento/123456`}>
                                    <button className="btn bg-red-600 text-white hover:bg-green-600 hover:text-black">
                                        Ver detalles de compra
                                    </button>
                                </Link>
                            </div>
                        </div>  
                    </div>
                        {compras.map((compra) => (
                            <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
                                <figure>
                                    <img
                                        src={compra.carrito[0].urlimagen }
                                        alt="Imagen En Camino"
                                        className="h-80 w-full bg-white object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <Link href={`/seguimiento/`+compra.ordenDeCompra}>
                                        <div className="flex gap-5">
                                            <h2 className="card-title" >
                                                ID Compra: {compra.ordenDeCompra}
                                            </h2>
                                            <div className="text-13px badge badge-outline">
                                                <p>{compra.estado}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div>
                                        <p className="card-status">
                                            Fecha Compra: {compra.fecha}
                                        </p>
                                        <br />
                                        <p className="card-status">
                                            Productos: {compra.carrito.map((producto) => (
                                                <p>{producto.nombre} * {producto.cantidad}</p>
                                            ))}
                                        </p>
                                        <p className="card-status" >
                                            Total: {compra.total}
                                        </p>
                                    </div>
                                    <div className="card-actions justify-end pt-3">
                                        <ul className="steps">
                                            <li className="step step-success">Compra</li>
                                            <li className={"step "+ `${compra.estado !== 'pendiente' ? '' : ' step-success'  }` }>Preparación</li>
                                            <li className="step">En Camino</li>
                                            <li className="step">Entregado</li>
                                        </ul>
                                        <br />
                                        <Link href={`/seguimiento/123456`}>
                                            <button className="btn bg-red-600 text-white hover:bg-green-600 hover:text-black">
                                                Ver detalles de compra
                                            </button>
                                        </Link>
                                    </div>
                                </div>  
                            </div>
                        ))}
                    </>
                }
            </div>
        </div >
            <Footer />
        </>
    );
}
