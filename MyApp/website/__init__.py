from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from website.access.credentials import params
from flask_login import LoginManager
from os import path


db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    # Cookies secret key
    app.config['SECRET_KEY'] = 'idek' # To be edited
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc:///?odbc_connect=' + params
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    # Initialize SQLAlchemy database instance
    db.init_app(app)

    # Tell Flask that there are different URLs
    from .views import views
    from .auth import auth

    # Define blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    # Import database tables
    from .models import User, Source

    with app.app_context():
        db.create_all()
    
    # Manage the users that have logged in
    login_manager = LoginManager()
    # If not logged in, redirect
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    # Look for user by ID
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    # Return the app to run it
    return app


def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)