from fastapi import FastAPI
import re
import modelo as db
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#get root
@app.get("/")
def root():
    return { 
        "Endpoints": {
            "/login/": {
                "email": "string",
                "password": "string"
            },
            "/registro/": {
                "correo": "string",
                "clave": "string",
                "id_rol": "int",
                "rol": "string",
                "nombre": "string",
                "apellido": "string",
                "rut": "string"
            },
            "/perfil/": {
                "correo": "string"
            },
        }
    }

# Login

class Login(BaseModel):
    email: str
    password: str

@app.post("/login/")
def iniciarSesion(session: Login):
    email = session.email
    password = session.password
    try:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return {"mensaje": "El correo ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                    }
        query = f"SELECT correo, clave FROM usuario WHERE correo = '{email}' AND clave = '{password}'"
        db.cursor.execute(query)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            # Nombre
            queryNombre = f"SELECT nombre FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryNombre)
            nombre = db.cursor.fetchone()[0]
            # Apellido
            queryApellido = f"SELECT apellido FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryApellido)
            apellido = db.cursor.fetchone()[0]
            # Email
            queryEmail = f"SELECT correo FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryEmail)
            email = db.cursor.fetchone()[0]
            # Username
            queryUsername = f"SELECT USERNAME FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryUsername)
            username = db.cursor.fetchone()[0]
            # id_rol
            queryidRol = f"SELECT id_rol FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryidRol)
            id_rol = db.cursor.fetchone()[0]
            # Rol
            queryRol = f"SELECT nombrerol FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryRol)
            rol = db.cursor.fetchone()[0]
            return {"mensaje": f"Bienvenido {nombre}",
                    "nombre": nombre,
                    "apellido": apellido,  
                    "email": email,
                    "username": username,
                    "id_rol": id_rol,
                    "rol": rol,
                    "respuesta": 200}
        else:
            return {"mensaje": "Usuario o contraseña incorrectos",
                    "respuesta": 401}
    except Exception as e:
        return {
            "mensaje": f"Error en el servidor: {e}",
            "respuesta": 500
        }

# Registro

class Registro(BaseModel):
    correo: str
    clave: str
    id_rol: int
    rol: str
    nombre: str
    apellido: str
    rut: str

@app.post('/registro/')
def registrarUsuario(registro: Registro):
    correo = registro.correo
    clave = registro.clave
    id_rol = registro.id_rol
    rol = registro.rol
    nombre = registro.nombre
    apellido = registro.apellido
    rut = registro.rut
    try:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", correo) and not re.match(r'^\d{7,8}-[\dkK]$', rut):
            return {"mensaje": "El correo y el rut ingresado no son validos, vuelve a intentarlo",
                    "respuesta": 402
                    }
        if not re.match(r"[^@]+@[^@]+\.[^@]+", correo):
            return {"mensaje": "El correo ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                    }
        if not re.match(r'^\d{7,8}-[\dkK]$', rut):
            return {"mensaje": "El rut ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                    }

        queryCorreo = f"SELECT correo FROM usuario WHERE correo = '{correo}'"
        db.cursor.execute(queryCorreo)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            return {"mensaje": "El correo ya ha sido registrado, intente con otro",
                    "respuesta": 403}
        queryRut = f"SELECT rut FROM usuario WHERE rut = '{rut}'"
        db.cursor.execute(queryRut)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            return {"mensaje": "El rut ya ha sido registrado, intente con otro",
                    "respuesta": 403}
        else:
            query = f"INSERT INTO usuario (correo, clave, id_rol,nombrerol, nombre, apellido, rut) VALUES ('{correo}', '{clave}',{id_rol},'{rol}', '{nombre}', '{apellido}', '{rut}')"
            db.cursor.execute(query)
            db.con.commit()
            queryUsername = f"SELECT USERNAME FROM usuario WHERE correo = '{correo}'"
            db.cursor.execute(queryUsername)
            username = db.cursor.fetchone()[0]
            return {"mensaje": f"Bienvenido {nombre}, tu cuenta ha sido creada con exito, tu nombre de usuario es {username}",
                    "respuesta": 200}

    except Exception as e:
        return {"mensaje": f"Error en el servidor: {e}",
                "respuesta": 500}
    
# Perfil

class Perfil(BaseModel):
    correo : str

@app.get('/perfil/')
def perfilUsuario(correo: Perfil):
    correoQuery = correo.correo
    try:
        query = f"SELECT nombre, apellido, rut, correo, username, id_rol ,nombrerol FROM USUARIO WHERE CORREO = '{correoQuery}'"
        print(query)
        db.cursor.execute(query)
        datos = db.cursor.fetchall()
        if db.cursor.rowcount == 0:
            return {"mensaje": "El correo ingresado no existe, vuelve a intentarlo",
                    "respuesta": 402
                    }
        elif db.cursor.rowcount == 1:
            print(datos)
            nombre = datos[0][0]
            apellido = datos[0][1] 
            rut = datos[0][2]
            correo = datos[0][3]
            username = datos[0][4]
            id_rol = datos[0][5]
            rol = datos[0][6]
            return {"nombre": nombre,
                    "apellido": apellido,
                    "rut": rut,
                    "correo": correo,
                    "username": username,
                    "id_rol": id_rol,
                    "rol": rol,
                    "respuesta": 200}
    except Exception as e:
        return {"mensaje": f"Error en el servidor: {e}",
                "respuesta": 500}
