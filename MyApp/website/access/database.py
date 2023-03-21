"""This file makes a connection to the AutoScribe database. ODBC version 18 must be installed"""
import pypyodbc # pip install pyodbc
from website.access.credentials import username, password
import urllib
from sqlalchemy import create_engine

# These are the SQL Database and Server credentials. The username and password are in another file
server = 'myautoscribe.database.windows.net'
database = 'AutoScribe'


# This function connects to the database
def connect_to_user_database():
    # This is a connection string used to access the server and the corresponding database
    params = urllib.parse.quote_plus('Driver={ODBC Driver 18 for SQL Server};' \
             'Server=tcp:myautoscribe.database.windows.net,1433;' \
             f'Database=AutoScribe;' \
             f'Uid={username};' \
             f'Pwd={password};' \
             'Encrypt=yes;' \
             'TrustServerCertificate=no;' \
             'Connection Timeout=30')
    connection_string = 'mssql+pyodbc:///?odbc_connect=' + params
    # Connect to the database
    conn = create_engine(connection_string, echo=True)
    print("Success")
    return conn
