from flask import Flask
from models import db, User, Restaurant, Reservation, Review, Menu
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)




if __name__ == "__main__":
    app.run(debug = True)