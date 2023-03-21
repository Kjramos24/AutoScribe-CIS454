"""This file either allows or denies access to users"""
from website.access import database
from werkzeug.security import check_password_hash

# This function allows the user access to AutoScribe's services
def log_into_acc(email, password):
    # Connect to the database
    conn = database.connect_to_user_database()
    # Check if the email and password exist in the database
    cursor = conn.cursor()
    # Find the user with this email
    cursor.execute(f'SELECT * FROM Users WHERE Email = \'{email}\'')
    account = cursor.fetchone()
    # If the email exists, keep checking
    if account:
        # Check hashed password
        hashed = check_password_hash(account[3], password)
        # Password and email match
        if hashed:
            return account[0], account[1]
        # Incorrect password
        return "Incorrect password"
    # User does not exist
    else:
        return "User does not exist"
