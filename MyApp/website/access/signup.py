"""This file creates user instances and adds them to the database"""
from website.access import database


# This function creates user instances and adds them to the database
def add_user(user, email, password):
    # Connect to the database
    conn = database.connect_to_user_database()
    # This is a query to access the email elements from a table in a database
    sql = '''
    SELECT Email
    FROM Users
    '''
    # Get all the emails and put them in a list
    cursor = conn.cursor()
    cursor.execute(sql)
    emails = [email[0] for email in cursor.fetchall()]
    # If the user exists, return message
    if email in emails:
        return False
    # Else add user to database
    cursor.execute(f"INSERT INTO Users (Username, Email, Password) VALUES ('{user}', '{email}', '{password}')")
    conn.commit()
    return True
