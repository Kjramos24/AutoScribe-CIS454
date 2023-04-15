from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# This is for the Users table
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150))
    email = db.Column(db.String(320), unique=True)
    password = db.Column(db.String(320))
    sources = db.relationship('Source')

# This is for the Source table
class Source(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(10000))
    link = db.Column(db.String(10000))
    desc = db.Column(db.String(10000))
    result_id = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    # Create the association to the user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
