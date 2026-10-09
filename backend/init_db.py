import mysql.connector
from mysql.connector import errorcode

def setup_database():
    config = {
        'user': 'root',
        'password': 'root',
        'host': '127.0.0.1',
    }

    db_name = 'hemoscan_db'

    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        
        # Create Database
        try:
            cursor.execute(f"CREATE DATABASE {db_name} DEFAULT CHARACTER SET 'utf8'")
            print(f"Database {db_name} created successfully.")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_DB_CREATE_EXISTS:
                print(f"Database {db_name} already exists.")
            else:
                print(err.msg)
                return

        cnx.database = db_name

        # Create Tables
        TABLES = {}
        TABLES['users'] = (
            "CREATE TABLE `users` ("
            "  `id` int(11) NOT NULL AUTO_INCREMENT,"
            "  `name` varchar(100) NOT NULL,"
            "  `email` varchar(100) NOT NULL UNIQUE,"
            "  `password` varchar(100) NOT NULL,"
            "  `hospital` varchar(200),"
            "  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,"
            "  PRIMARY KEY (`id`)"
            ") ENGINE=InnoDB")

        for table_name in TABLES:
            table_description = TABLES[table_name]
            try:
                print(f"Creating table {table_name}: ", end='')
                cursor.execute(table_description)
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                    print("already exists.")
                else:
                    print(err.msg)
            else:
                print("OK")

        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        print(f"Error: {err}")

if __name__ == "__main__":
    setup_database()
