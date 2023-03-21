from flask import Blueprint, render_template, request, flash, redirect, url_for  # pip install flask
from website.access import signup, loginto
from werkzeug.security import generate_password_hash, check_password_hash # pip install flask-login
from .models import Users
from flask_login import login_user, login_required, logout_user, current_user
from . import db # Get the database


auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # Check if the user exists
        account = Users.query.filter_by(email=email).first()
        # If email exists, either the password is correct or not
        if account:
            # If passwords match
            if check_password_hash(account.password, password):
                flash("Logged in successfully!", category='success')
                # Log user into their account and remember them
                login_user(account, remember=True)
                return redirect(url_for('views.dashboard'))
            # Incorrect password
            else:
                flash("Incorrect password. Try again.", category='error')
        else:
            flash("Email does not exist.", category='error')
    return render_template("log_in.html")

@auth.route('/logout')
@login_required
def logout():
   # Forget the user and redirect them to log in
   logout_user()
   return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        # Get all the information from the request
        first = request.form['first-name']
        second = request.form['last-name']
        email = request.form['email']
        pass1 = request.form['password']
        pass2 = request.form['confirm-password']
        # Check if the user exists
        account = Users.query.filter_by(email=email).first()
        # Conditionals
        if account:
            flash("Email already exists.", category='error')
        elif len(email) < 6:
            flash("Email must be greater than 6 characters.", category='error')
        elif len(first + second) < 2:
            flash("Name must be greater than 2 characters.", category='error')
        elif pass1 != pass2:
            flash("Passwords do not match.", category='error')
        elif len(pass1) < 8:
            flash("Password is too short.", category='error')
        else:
            # Add the user and hash the password
            new_user = Users(username=f"{first} {second}", email=email, password=generate_password_hash(pass1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            # Log user into their account and remember them
            login_user(new_user, remember=True)
            # Let the user know that their account has been created
            flash("Account created!", category='success')
            # Redirect the user to the homescreen
            return redirect(url_for('views.dashboard'))
    return render_template("sign_up.html")
