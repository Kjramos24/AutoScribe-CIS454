from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from website.access.credentials import params
from flask_login import LoginManager

# Initialize SQLAlchemy database instance
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # Cookies secret key
    app.config['SECRET_KEY'] = 'idek' # To be edited
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc:///?odbc_connect=' + params
    db.init_app(app)
    # Tell Flask that there are different URLs
    from .views import views
    from .auth import auth
    # Define blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    # Import database tables
    from .models import Users
        # Manage the users that have logged in
    login_manager = LoginManager()
    # If not logged in, redirect
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    # Look for user by ID
    @login_manager.user_loader
    def load_user(id):
        return Users.query.get(int(id))
    # Return the app to run it
    return app
