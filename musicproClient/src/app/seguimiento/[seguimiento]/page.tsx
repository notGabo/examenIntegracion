import Navmenu from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CgSpinnerAlt } from "react-icons/cg"
import Link from "next/link"


export default function Seguimiento(){
    return(
        <>
        <Navmenu/>
        <div
        className="hero min-h-screen"
        >
            {/* <div className="hero-overlay bg-opacity-60">
                <div className="p-10">{alerta}</div>
            </div> */}
            <div className="hero-content flex-col lg:flex-row bg-neutral-600 rounded-xl">
                <img
                    src="https://www.iconpacks.net/icons/2/free-arrow-next-icon-2825-thumb.png"
                    alt="Imagen En Camino"
                    className="max-w-sm rounded-lg shadow-2xl bg-white"
                />
                <div className="pl-10">
                    <div>
                        <h1 className="text-3xl font-bold">ID Compra: 123456</h1>
                        <p className="py-3"></p>
                        <p className="font-bold text-xl">Estado: En Camino</p>
                        <br />
                        <p>Fecha Compra: 14/07/2023</p>
                        <p>Fecha Entrega: 14/08/2023</p>
                        <br />
                        <p>Productos: [Violin - Guitarra]</p>
                        <p>Cantidad: 1 - 1</p>
                        <br />
                        <p>Detalle: $680.000 - $680.000</p>
                        <p>Total: $1.360.000</p>
                        <p>Método: Débito</p>
                        <br />
                        <p>Cliente: Gabo Nafle</p>
                    </div>
                    {/* <div className="mt-5 flex gap-5">
                        <input
                            type="number"
                            placeholder="1"
                            className="input w-20 border-white active:border-white"
                            min={1}
                            max={producto.stock}
                            onChange={handleChange}
                        />
                        <button className="btn bg-green-600 text-white hover:bg-amber-800 ">Añadir al carrito</button>
                    </div> */}
                </div>
                <div>
                    <ul className="steps steps-vertical">
                        <li className="step step-info">Compra</li>
                        <li className="step step-info">Preparación</li>
                        <li className="step step-info">En Camino</li>
                        <li className="step">Entregado</li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}