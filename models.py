from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData


metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'

    id =db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    # password = db.Column(db.String, nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    is_admin = db.Column(db.Boolean, default=False)

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

class Reservation(db.Model):
    __tablename__ = 'reservations'

class Menu(db.Model):
    __tablename__ = 'menus'

class Review(db.Model):
    __tablename__ = 'reviews'