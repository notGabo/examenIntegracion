import Navmenu from "../components/Navbar"
import Footer from "../components/Footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CgSpinnerAlt } from "react-icons/cg"
import Link from "next/link"


export default function Seguimiento(){
    return(
        <>
        <Navmenu/>
        <div className="container m-16 min-h-screen">
            <div className="grid grid-cols-1 gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="card bg-base-100 shadow-xl transition duration-300 hover:scale-105 hover:shadow-white">
                    <figure>
                        <img
                            src="https://www.iconpacks.net/icons/2/free-arrow-next-icon-2825-thumb.png"
                            alt="Imagen En Camino"
                            className="h-80 w-full object-cover bg-white"
                        />
                    </figure>
                    <div className="card-body">
                        <Link href={`/seguimiento/123456`}>
                            <div className="flex gap-5">
                                <h2
                                    className="card-title"
                                    id={`nombre-Violin`}
                                >
                                    ID Compra: 123456
                                </h2>
                                <div className="badge badge-outline text-13px">
                                    <p id={`categoria-123456`}>
                                        EN CAMINO
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <div>
                            <p
                            className="card-status"
                            id={`total-123456`}
                            >
                                Fecha Compra: 14/07/2023
                                <br />
                                Fecha Entrega: 14/08/2023
                            </p>
                            <br />
                            <p
                            className="card-status"
                            id={`precio-123456`}
                            >
                                Productos: [Violin, Guitarra]
                            </p>
                            {/* <p
                            className="card-status"
                            id={`precio-123456`}
                            >
                                Cantidad: 1 - 1
                            </p> */}
                            <p
                            className="card-status"
                            id={`total-123456`}
                            >
                                Total: $1.360.000
                            </p>
                            {/* <p
                            className="card-status"
                            id={`total-123456`}
                            >
                                Método: Débito
                            </p> */}
                        </div>
                        <div className="card-actions justify-end pt-3">
                            <ul className="steps">
                                <li className="step step-info">Compra</li>
                                <li className="step step-info">Preparación</li>
                                <li className="step step-info">En Camino</li>
                                <li className="step">Entregado</li>
                            </ul>
                            <br /><br /><br />
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
                            className="h-80 w-full object-cover bg-white"
                        />
                    </figure>
                    <div className="card-body">
                        <Link href={`/seguimiento/123456`}>
                            <div className="flex gap-5">
                                <h2
                                    className="card-title"
                                    id={`nombre-Violin`}
                                >
                                    ID Compra: 654321
                                </h2>
                                <div className="badge badge-outline text-13px">
                                    <p id={`categoria-123456`}>
                                        ENTREGADO
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <div>
                            <p
                            className="card-status"
                            id={`total-123456`}
                            >
                                Fecha Compra: 23/02/2023
                                <br />
                                Fecha Entrega: 9/03/2023
                            </p>
                            <br />
                            <p
                            className="card-status"
                            id={`precio-123456`}
                            >
                                Productos: [Piano]
                            </p>
                            <p
                            className="card-status"
                            id={`total-123456`}
                            >
                                Total: $1.720.000
                            </p>
                        </div>
                        <div className="card-actions justify-end pt-3">
                            <ul className="steps">
                                <li className="step step-success">Compra</li>
                                <li className="step step-success">Preparación</li>
                                <li className="step step-success">En Camino</li>
                                <li className="step step-success">Entregado</li>
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
            </div>
        </div>
        <Footer/>
        </>
    )
}