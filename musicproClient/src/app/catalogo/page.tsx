"use client";
import Navmenu from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import Footer from "../components/Footer";
import Link from "next/link";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  categoria: string;
  subcategoria: string;
  precio: number;
  cantidad: number;
  urlimagen: string;
}
[];

export default function Catalogo() {
  const router = useRouter();
  const [productos, setProductos] = useState([] as Producto[]);
  const [allProds, setAllProds] = useState([] as Producto[]);
  const [carrito, setCarrito] = useState([] as Carrito[]);
  
  useEffect(() => {
    const checkCookieCarrito = async () => {
      const response = await fetch("/api/carrito", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const body = await response.json();
      if (response.status === 200) {
        setCarrito(body.data.carrito);
      } else if (response.status === 500) {
        console.log("error al obtener carrito");
      } else {
        console.log("No se ha encontrado carrito");
      }
    };
    checkCookieCarrito();
  }, []);

  const sumarAlCarrito = async (e: any) => {
    e.preventDefault();
    try {
      let productoEncontrado = carrito.find(
        (producto) => producto.id_producto === e.target[0].value
      );
      if (productoEncontrado) {
        productoEncontrado.cantidad =
          Number(productoEncontrado.cantidad) + Number(e.target[6].value);
        setCarrito([...carrito]);
      } else {
        // if cantidad from cookie is equal from stock from database, then we can't add more products
        setCarrito([
          ...carrito,
          {
            id_producto: e.target[0].value,
            nombre: e.target[1].value,
            precio: e.target[2].value,
            categoria: e.target[3].value,
            subcategoria: e.target[4].value,
            cantidad: e.target[6].value,
            urlimagen: e.target[5].value,
          },
        ]);
      }
      toast.success(e.target[1].value + " agregad@ al carrito", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log("Error al agregar al carrito: " + error);
      toast.error("Error al agregar: " + e.target[1].value, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  //useEffect para carrito
  useEffect(() => {
    const guardarCarrito = async () => {
      await fetch("/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ carrito: carrito }),
      });
    };
    if (carrito.length > 0) {
      guardarCarrito();
    }
  }, [carrito]);

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
        // console.log(body.productos);
        setAllProds(body.productos);
        setProductos(body.productos);
      }
    };
    checkLoggedIn();
    getProductos();
  }, []);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  const [filtros, setFiltros] = useState([] as any[]);

  const [newProds, setNewProds] = useState([] as any[]);
  const filtraje = async (filters:any, products:any) => {
    // console.log(productos);
    // console.log(filtros);
    if (filters.length != 0 ) {
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        // console.log(p.categoria)
        for (let i = 0; i < filters.length; i++) {
          const f = filters[i];
          if (p.categoria == f) {
            newProds.push(p);
          }
        }
      }
      await setProductos(newProds);
    } else {
      await setProductos(allProds);
    }
    // console.log(productos)
  }

  const handleCheckboxChange = (event: any) => {
    const checkboxId = event.target.id;
    console.log("Checkbox clickeada:", checkboxId);
    setFiltros(prevFiltros => {
      const newFiltros = [...prevFiltros];
      if (checkboxId === "Instrumentos de Cuerdas") {
        setIsChecked1(prevValue => !prevValue);
        if (isChecked1) {
          const index = newFiltros.indexOf(checkboxId);
          if (index !== -1) {
            newFiltros.splice(index, 1);
          }
        } else {
          newFiltros.push(checkboxId);
        }
      } else if (checkboxId === "Percusión") {
        setIsChecked2(prevValue => !prevValue);
        if (isChecked2) {
          const index = newFiltros.indexOf(checkboxId);
          if (index !== -1) {
            newFiltros.splice(index, 1);
          }
        } else {
          newFiltros.push(checkboxId);
        }
      } else if (checkboxId === "Amplificadores") {
        setIsChecked3(prevValue => !prevValue);
        if (isChecked3) {
          const index = newFiltros.indexOf(checkboxId);
          if (index !== -1) {
            newFiltros.splice(index, 1);
          }
        } else {
          newFiltros.push(checkboxId);
        }
      } else {
        setIsChecked4(prevValue => !prevValue);
        if (isChecked4) {
          const index = newFiltros.indexOf(checkboxId);
          if (index !== -1) {
            newFiltros.splice(index, 1);
          }
        } else {
          newFiltros.push(checkboxId);
        }
      }
      return newFiltros;
    });
    setNewProds([]);
    // console.log(filtros);
    // filtraje();
    // console.log(productos)
  };

  useEffect(() => {
    console.log("REALIZANDO FILTRAJE.")
    // console.log(`FILTROS: ${filtros}`)
    filtraje(filtros, allProds);
  },[filtros])

  // load spinner while productos is fetching data
  if (productos.length === 0) {
    return (
      <>
        <Navmenu />
        <div className="flex min-h-screen items-center justify-center">
          <CgSpinnerAlt className="h-10 w-10 animate-spin" />
          Cargando productos....
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navmenu />

      <div className="m-16 min-h-screen ">
        <div className="flex  w-full items-center justify-evenly ">
          <div className="flex gap-5">
          <label className={`mr-5 flex items-center border rounded-xl py-1 px-2 select-none transition-all ${isChecked1 ? 'bg-white text-gray-500 scale-[1.15]' : ''}`}>
              <input
                type="checkbox"
                className=""
                id="Instrumentos de Cuerdas"
                checked={isChecked1}
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
                value="Instrumentos de Cuerdas"
              />
              <span className="">Instrumentos de cuerda</span>
            </label>
            <label className={`cursor-pointer mr-5 flex items-center border rounded-xl py-1 px-2 select-none transition-all ${isChecked2 ? 'bg-white text-gray-500 scale-[1.15]' : ''}`}>
              <input
                type="checkbox"
                className=""
                id="Percusión"
                checked={isChecked2}
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
                value="Percusión"
              />
              <span className="">Percusión</span>
            </label>
            <label className={`cursor-pointer mr-5 flex items-center border rounded-xl py-1 px-2 select-none transition-all ${isChecked3 ? 'bg-white text-gray-500 scale-[1.15]' : ''}`}>
              <input
                type="checkbox"
                className=""
                id="Amplificadores"
                checked={isChecked3}
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
                value="Amplificadores"
              />
              <span className="">Amplificadores</span>
            </label>
            <label className={`cursor-pointer mr-5 flex items-center border rounded-xl py-1 px-2 select-none transition-all ${isChecked4 ? 'bg-white text-gray-500 scale-[1.15]' : ''}`}>
              <input
                type="checkbox"
                className=""
                id="Accesorios varios"
                checked={isChecked4}
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
                value="Accesorios varios"
              />
              <span className="">Accesorios varios</span>
            </label>
          </div>
        </div>

        <br />
        <br />

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
                    <div className="badge badge-outline text-[13px] ">
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
                    <input type="hidden" value={producto.categoria} />
                    <input type="hidden" value={producto.subcategoria} />
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
      </div>
      <ToastContainer transition={Flip} />
      <Footer />
    </>
  );
}
