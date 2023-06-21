"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProfileData {
  email: string;
  username: string;
  rol: string;
  respuesta: number;
}

const getProfile = async (): Promise<ProfileData> => {
  const response = await axios.get("/api/perfilHandler");
  const { email, username, rol, respuesta } = response.data;
  return { email, username, rol, respuesta };
};

const CerrarSesionButton = () => {
  const router = useRouter();

  const handleCerrarSesion = async () => {
    await axios.get("/api/auth/logout");
    const cookies = document.cookie;
    if (!cookies.includes("miCookie")) {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleCerrarSesion}
      className="bg-white text-black px-5 py-2 rounded-xl transition duration-300 hover:bg-red-500 hover:shadow-2xl hover:shadow-red-600"
    >
      Cerrar Sesión
    </button>
  );
};

export default function HomeAdmin() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios.get("/api/perfilHandler");
      console.log(response.data);
      console.log(response.data.respuesta);
      if (response.data.respuesta !== 200) {
        router.push("/");
      } else {
        console.log("No hay ninguna sesión iniciada");
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };

    fetchData();
  }, []);

  const getSession = async () => {
    const router = useRouter();
    const response = await axios.get("/api/perfilHandler");
    console.log(response.data.respuesta);
    if (response.data.respuesta === 401) {
      router.push("/login");
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      {!profile ? (
        <h1>Cargando datos...</h1>
      ) : profile && profile.respuesta === 200 ? (
        <>
          <p>email: {profile.email}</p>
          <p>username: {profile.username}</p>
          <p>rol: {profile.rol}</p>
        </>
      ) : (
        <h1>Inicia sesión nuevamente</h1>
      )}
      <CerrarSesionButton />
    </>
  );
}
