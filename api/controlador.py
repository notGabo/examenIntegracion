from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
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

# get root
@app.get("/")
def root():
    return {"Hola!"}

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
            return JSONResponse(
                content={"mensaje": "El correo ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 401
                    },
                status_code=401
            )
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
            return JSONResponse(
                content={
                    "mensaje": f"Bienvenido {nombre} {apellido}, tu sesion ha sido iniciada con exito",
                    "respuesta": 200,
                    "nombre": nombre,
                    "apellido": apellido,
                    "correo": email,
                    "username": username,
                    "id_rol": id_rol,
                    "rol": rol
                },
                status_code=200
            )
        else:
            return JSONResponse(
                content={
                    "mensaje": "El correo o la contraseña son incorrectos, vuelve a intentarlo",
                    "respuesta": 401
                },
                status_code=401
            )
    except Exception as e:
        return JSONResponse(
            content={
                "mensaje": "Ha ocurrido un error, vuelve a intentarlo",
                "respuesta": 500,
                "error": e
            },
            status_code=500
        )

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
            return JSONResponse(
                content={
                    "mensaje": "El correo y el rut ingresados no son validos, vuelve a intentarlo",
                    "respuesta": 402
                },
                status_code=402
            )
        if not re.match(r"[^@]+@[^@]+\.[^@]+", correo):
            return JSONResponse(
                content={
                    "mensaje": "El correo ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                },
                status_code=402
            )
        if not re.match(r'^\d{7,8}-[\dkK]$', rut):
            return JSONResponse(
                content={
                    "mensaje": "El rut ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                },
                status_code=402
            )

        queryCorreo = f"SELECT correo FROM usuario WHERE correo = '{correo}'"
        db.cursor.execute(queryCorreo)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            return JSONResponse(
                content={
                    "mensaje": "El correo ya ha sido registrado, intente con otro",
                    "respuesta": 402
                },
                status_code=402
            )
        queryRut = f"SELECT rut FROM usuario WHERE rut = '{rut}'"
        db.cursor.execute(queryRut)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            return JSONResponse(
                content={
                    "mensaje": "El rut ya ha sido registrado, intente con otro",
                    "respuesta": 402
                },
                status_code=402
            )
        else:
            query = f"INSERT INTO usuario (correo, clave, id_rol,nombrerol, nombre, apellido, rut) VALUES ('{correo}', '{clave}',{id_rol},'{rol}', '{nombre}', '{apellido}', '{rut}')"
            db.cursor.execute(query)
            db.con.commit()
            queryUsername = f"SELECT USERNAME FROM usuario WHERE correo = '{correo}'"
            db.cursor.execute(queryUsername)
            username = db.cursor.fetchone()[0]
            return JSONResponse(
                content={
                    "mensaje": f"El usuario {username} ha sido registrado con exito",
                    "respuesta": 200,
                    "username": username
                },
                status_code=200
            )
    except Exception as e:
        return JSONResponse(
            content={
                "mensaje": "Ha ocurrido un error, vuelve a intentarlo",
                "respuesta": 500,
                "error": e
            },
            status_code=500
        )
    
# Perfil
class Perfil(BaseModel):
    correo: str

@app.get('/perfil/')
def perfilUsuario(correo: Perfil):
    correoQuery = correo.correo
    try:
        query = f"SELECT nombre, apellido, rut, correo, username, id_rol ,nombrerol FROM USUARIO WHERE CORREO = '{correoQuery}'"
        db.cursor.execute(query)
        datos = db.cursor.fetchall()
        if db.cursor.rowcount == 0:
            return {"mensaje": "El correo ingresado no existe, vuelve a intentarlo",
                    "respuesta": 402
                    }
        elif db.cursor.rowcount == 1:
            nombre = datos[0][0]
            apellido = datos[0][1]
            rut = datos[0][2]
            correo = datos[0][3]
            username = datos[0][4]
            id_rol = datos[0][5]
            rol = datos[0][6]
            return JSONResponse(
                content={
                    "mensaje": "Datos obtenidos con exito",
                    "respuesta": 200,
                    "nombre": nombre,
                    "apellido": apellido,
                    "rut": rut,
                    "correo": correo,
                    "username": username,
                    "id_rol": id_rol,
                    "rol": rol
                },
                status_code=200
            )
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Error en el servidor: {e}")

# Get productos
@app.get('/productos/')
def getProductos():
    try:
        query = "select * from producto"
        db.cursor.execute(query)
        datos = db.cursor.fetchall()

        datosLista = []
        for i in range(db.cursor.rowcount):
            id_producto = datos[i][0]
            nombre = datos[i][1]
            precio = datos[i][2]
            marca = datos[i][3]
            categoria = datos[i][4]
            subcategoria = datos[i][5]
            descripcion = datos[i][6]
            stock = datos[i][7]
            urlimagen = datos[i][8]
            datosLista.append({
                "id_producto": id_producto,
                "nombre": nombre,
                "precio": precio,
                "marca": marca,
                "categoria": categoria,
                "subcategoria": subcategoria,
                "descripcion": descripcion,
                "stock": stock,
                "urlimagen": urlimagen
            })
        
        if db.cursor.rowcount == 0:
            return {"mensaje": "No hay productos disponibles",
                    "respuesta": 402
                    }
        elif db.cursor.rowcount > 0:
            return JSONResponse(
                content={
                    "mensaje": "Productos obtenidos con exito",
                    "respuesta": 200,
                    "productos": datosLista
                },
                status_code=200
            )
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Error en el servidor: {e}")
    
