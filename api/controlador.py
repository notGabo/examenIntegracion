from fastapi import FastAPI
import re
import modelo as db

app = FastAPI()

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
            }
        }
    }


@app.get("/login/")
def iniciarSesion(email: str, password: str):
    try:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return {"mensaje": "El correo ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                    }
        query = f"SELECT correo, clave FROM usuario WHERE correo = '{email}' AND clave = '{password}'"
        db.cursor.execute(query)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            queryNombre = f"SELECT nombre FROM usuario WHERE correo = '{email}'"
            db.cursor.execute(queryNombre)
            nombre = db.cursor.fetchone()[0]
            return {"mensaje": f"Bienvenido {nombre}",
                    "respuesta": 200}
        else:
            return {"mensaje": "Usuario o contraseña incorrectos",
                    "respuesta": 401}
    except Exception as e:
        return {
            "mensaje": f"Error en el servidor: {e}",
            "respuesta": 500
        }

@app.post('/registro/')
def registrarUsuario(correo: str, clave: str, id_rol: int, rol: str, nombre: str, apellido: str, rut: str):
    try:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", correo) and not re.match(r'^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$', rut):
            return {"mensaje": "El correo y el rut ingresado no son validos, vuelve a intentarlo",
                    "respuesta": 402
                    }
        if not re.match(r"[^@]+@[^@]+\.[^@]+", correo):
            return {"mensaje": "El correo ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                    }
        if not re.match(r'^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$', rut):
            return {"mensaje": "El rut ingresado no es valido, vuelve a intentarlo",
                    "respuesta": 402
                    }
        query = f"SELECT correo FROM usuario WHERE correo = '{correo}'"
        db.cursor.execute(query)
        db.cursor.fetchall()
        if db.cursor.rowcount == 1:
            return {"mensaje": "El correo ya ha sido registrado, intente con otro",
                    "respuesta": 403}
        else:
            query = f"INSERT INTO usuario (correo, clave, id_rol,nombrerol, nombre, apellido, rut) VALUES ('{correo}', '{clave}',{id_rol},'{rol}', '{nombre}', '{apellido}', '{rut}')"
            db.cursor.execute(query)
            db.con.commit()
            return {"mensaje": f"Bienvenido {nombre}, tu cuenta ha sido con exito",
                    "respuesta": 200}

    except Exception as e:
        return {"mensaje": f"Error en el servidor: {e}",
                "respuesta": 500}
