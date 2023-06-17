import Link from 'next/link';
import { useRouter } from 'next/router';

function Integrantes(){
  const listaIntegrantes = [
    {
      nombre: 'Alfredo Galdames',
      github: 'https://github.com/XLangley'
    },
    {
      nombre: 'Fabian Muñoz',
      github: 'https://github.com/Sfreimx'
    },
    {
      nombre: 'Fernando Muñoz',
      github: 'https://github.com/Namnoh'
    },
    {
      nombre: 'Gabriel Soto',
      github: 'www.github.com/notGabo'
    }
  ];

  const router = useRouter();

}

export default function Home() {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <img src="/logo.png" alt="MusicPro Logo" width={200} height={200} />
      <h1 className="text-6xl font-bold mt-10">MusicPro</h1>
      <div className="m-5 text-2xl text-center">
        <p>Trabajo para integración de plataformas DuocUC Sede Maipú 2023</p>
        <p>Profesor evaluador: Francisco Valdivieso</p>
        <p>Integrantes:</p>
        <ul>
          {integrantes.map((integrante, index) => (
            <li key={index}>
              <a href=''>{integrante.nombre}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href="/login" className="p-6 mt-6 text-left border w-96 rounded-xl transition duration-500 hover:text-blue-600 focus:text-blue-600">
          
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Inicia sesión para poder acceder a la plataforma
            </p>
          
        </Link>
        <Link href="/register" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
          
            <h3 className="text-2xl font-bold">Register &rarr;</h3>
            <p className="mt-4 text-xl">
              Regístrate para poder acceder a la plataforma
            </p>
          
        </Link>
      </div>
    </div>
  );
}
