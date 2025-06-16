from flask import Flask, request, jsonify
from models import db, User, Restaurant, Reservation, Review, Menu
from flask_migrate import Migrate
from flask_mail import Mail

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reservation.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)


app.config['MAIL_SERVER'] = 'smtp.gmail.com' 
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config["MAIL_USE_SSL"] = False
app.config['MAIL_USERNAME'] = '' 
app.config['MAIL_PASSWORD'] = 'your_password_here'  
app.config['MAIL_DEFAULT_SENDER'] = 'captainmarvel0465@gmail.com'

mail = Mail(app)
from views import *

app.register_blueprint(user_bp)
app.register_blueprint(review_bp)
app.register_blueprint(restaurant_bp)
app.register_blueprint(reservation_bp)
app.register_blueprint(menu_bp)


@app.route("/")
def welcome():
    return "<p>Welcome!!</p>"


if __name__ == "__main__":
    app.run(debug = True)