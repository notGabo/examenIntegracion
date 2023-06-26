import oracledb
import os
from dotenv import load_dotenv

load_dotenv()

# CREDEDNCIALES
username = os.getenv("db_username")
password = os.getenv("db_password")
dsn = os.getenv("db_dsn")

try:
    con = oracledb.connect(user=username,password=password,dsn=dsn)
    global cursor 
    cursor = con.cursor()
    # query = 'SELECT * FROM usuario'
    # cursor.execute(query)
    # print(cursor.fetchall())


except Exception as e:
    print(e)

