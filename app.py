from flask import Flask, request, jsonify
from models import db, User, Restaurant, Reservation, Review, Menu
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reservation.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

from views import *

app.register_blueprint(user_bp)
app.register_blueprint(review_bp)
app.register_blueprint(restaurant_bp)
app.register_blueprint(reservation_bp)
app.register_blueprint(menu_bp)





if __name__ == "__main__":
    app.run(debug = True)