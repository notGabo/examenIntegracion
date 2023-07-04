"use client";
import Navmenu from "@/app/components/Navbar";
import Footer from "@/app/components/Footer"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";

export default function Producto() {
    const [alerta,setAlerta] = useState(<></>)
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
  [];

  const [producto, setProducto] = useState({} as Producto);

  const pathname = usePathname();
  const extractedProductId = pathname.split("/")[2];
  const router = useRouter();

  const handleChange = (e:any) => {

    // if field e.target.value is not filled, set it to 1
    if(e.target.value === "") {
      e.target.value = 1;
    }
    if(e.target.value > producto.stock){
        setAlerta(<div className="alert alert-error">No hay suficiente stock</div>)
        console.log("No hay suficiente stock")
    }
    else if(e.target.value < 1){
      setAlerta(<div className="alert alert-error">No puedes añadir 0 productos</div>)
      console.log("No puedes añadir 0 productos")
    }
    else{
        setAlerta(<></>)
    }
    
  }

  useEffect(() => {
    // check login
    const checkLoggedIn = async () => {
      const response = await fetch("/api/sessionChecker", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        console.log("sesion iniciada");
      } else {
        console.log("No se encontro cookie, por favor inicia sesion ");
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
      if (response.status === 200) {
        const allData = await response.json();
        const productsData = allData.productos as Producto[];
        setProducto(
          Object.assign(
            {},
            productsData.find(
              (product) => product.id_producto === parseInt(extractedProductId)
            )
          )
        );
      } else {
        console.log("Error al obtener productos");
      }
    };

    getProductos();
    checkLoggedIn();
  }, []);

  // while producto is not loaded
  if (!producto.id_producto) {
    return (
      <>
        <Navmenu />
        <div className="flex min-h-screen items-center justify-center">
          <CgSpinnerAlt className="h-10 w-10 animate-spin" />
          Cargando producto....
        </div>
      </>
    );
  }
  console.log(producto);
  return (
    <>
      <Navmenu />
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${producto.urlimagen})` }}
      >
        <div className="hero-overlay bg-opacity-60">
          <div className="p-10">{alerta}</div>
        </div>
        <div className="hero-content flex-col lg:flex-row">

          <img
            src={producto.urlimagen}
            alt={producto.nombre}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <div>
                <h1 className="text-5xl font-bold">{producto.nombre}</h1>
                <p className="py-3">{producto.descripcion}</p>
                <p>Stock:   {producto.stock}</p>
                <p className="badge badge-outline bg-red-800">{producto.categoria}</p>
                <p className="badge badge-outline bg-red-800">{producto.subcategoria}</p>
            </div>
            <div className="mt-5 flex gap-5">
              <input
                type="number"
                placeholder="1"
                className="input w-20 border-white active:border-white"
                min={1}
                max={producto.stock}
                onChange={handleChange}
              />
              <button className="btn bg-green-600 text-white hover:bg-amber-800 ">Añadir al carrito</button>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
      <Footer/>
    </>
  );
}
