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
    password = db.Column(db.String, nullable=False, unique=False)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    is_admin = db.Column(db.Boolean, default=False)

    reservations = db.relationship('Reservation', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)


class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    location = db.Column(db.String, nullable=False, unique=True)
    contacts = db.Column(db.Integer, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    # admin_id = db.Column(db.Integer, db.ForeignKey('users.admin.id'), nullable=False)

    reservations = db.relationship('Reservation', backref='restaurant', lazy=True)
    menus = db.relationship('Menu', backref='restaurant', lazy=True)
    reviews = db.relationship('Review', backref='restaurant', lazy=True)

class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    party_size = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False, default='pending')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)

class Menu(db.Model):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
