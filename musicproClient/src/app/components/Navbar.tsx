"use client";
import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navmenu() {
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const [paginas, setPaginas] = useState(<></>);

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
      let paginas = [
        {
          nombre: "",
          href: "",
        }
      ];
      switch (datosCliente.id_rol) {
        case 1:
          paginas = [
            {
              nombre: "Ventas",
              href: "/ventas",
            },
            {
              nombre: "Desempeño",
              href: "/desempeño",
            },
            {
              nombre: "Estrategias",
              href: "/estrategias",
            },
          ];
          break;
        case 2:
          paginas = [
            {
              nombre: "Productos",
              href: "/productos",
            },
            {
              nombre: "Pedidos",
              href: "/pedidos",
            },
            {
              nombre: "pagos",
              href: "/pagos",
            },
          ];
          break;
        case 3:
          paginas = [
            {
              nombre: "Preparar",
              href: "/preparacion",
            },
            {
              nombre: "Entregar",
              href: "/entrega",
            },
          ];
          break;
        case 4:
          paginas = [
            {
              nombre: "Productos",
              href: "/productos",
            },
            {
              nombre: "Pagos",
              href: "/pagos",
            },
          ];
          break;
        case 5:
          paginas = [];
          break;
        case 6:
          paginas = [
            {
              nombre: "Catalogo",
              href: "/catalogo",
            },
            {
              nombre: "Carrito",
              href: "/carrito",
            },
            {
              nombre: "Seguimiento",
              href: "/seguimiento",
            }
          ];
          break;
        default:
          router.push("/");
          break;
      }
      setPaginas(<> 
        {paginas.map((pagina) => (
          <li key={pagina.nombre}>
            <Link
              href={pagina.href}
              className="block cursor-default py-2 text-center transition hover:text-red-800 lg:px-5"
            >
              {pagina.nombre}
            </Link>
          </li>
        ))}
      </>);

    };
    checkLoggedIn();
  }, []);

  return (
    <header className="border-b  bg-neutral-900 py-3 shadow-md">
      <div className="flex w-full max-w-full flex-wrap items-center justify-between px-[8%] xl:mx-auto xl:max-w-7xl ">
        {/* logo */}
        <Link
          href="/home"
          className="flex rounded-2xl bg-red-800 p-1 px-2 transition duration-300 hover:bg-amber-800 hover:shadow-2xl hover:shadow-amber-800 "
        >
          <Image src="/img/logo.png" alt="logo" width={50} height={50} />
          <p className="cursor-default py-2 text-2xl">MusicPro</p>
        </Link>

        <FiMenu
          className="block h-6 w-6 cursor-pointer  lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        />

        <nav
          className={`${
            openNav ? "block" : "hidden"
          } w-full transition-opacity duration-200 ease-in lg:flex lg:w-auto lg:items-center`}
        >
          <ul className="text-base  lg:flex lg:justify-between">
            { paginas }
            <li className="px-5">
              <Link
                href="/perfil"
                className="block cursor-default rounded bg-white py-2 text-center text-gray-900 no-underline transition hover:bg-red-800 hover:text-white hover:shadow-2xl hover:shadow-white lg:px-5">
                Mi perfil
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
