# import pyodbc

# from config import (
#     DB_SERVER,
#     DB_DATABASE,
#     DB_USER,
#     DB_PASSWORD,
#     DB_PORT
# )


# def get_connection():

#     connection = pyodbc.connect(

#         f"DRIVER={{ODBC Driver 17 for SQL Server}};"
#         f"SERVER={DB_SERVER},{DB_PORT};"
#         f"DATABASE={DB_DATABASE};"
#         f"UID={DB_USER};"
#         f"PWD={DB_PASSWORD};"
#         "TrustServerCertificate=yes;"

#     )

#     return connection


import psycopg2
from psycopg2.extras import RealDictCursor

from config import DATABASE_URL


def get_connection():
    connection = psycopg2.connect(
        DATABASE_URL,
        cursor_factory=RealDictCursor
    )

    return connection