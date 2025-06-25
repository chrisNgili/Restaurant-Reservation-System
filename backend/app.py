from flask import Flask, request, jsonify
from datetime import timedelta
from models import db, TokenBlocklist
from flask_cors import CORS
from flask_migrate import Migrate
from flask_mail import Mail
from flask_jwt_extended import JWTManager


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://chronobites_br4e_user:T8lEpCddhnhtXmH8X53rEyJ7kj3tWl6b@dpg-d1e54pndiees73bgjfog-a.oregon-postgres.render.com/chronobites_br4e'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

CORS(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com' 
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config["MAIL_USE_SSL"] = False
app.config['MAIL_USERNAME'] = 'captainmarvel0465@gmail.com' 
app.config['MAIL_PASSWORD'] = 'tqkr zgad erwz wrhf'  
app.config['MAIL_DEFAULT_SENDER'] = 'Restauflow@gmail.com'

mail = Mail(app)
mail.init_app(app)

app.config["JWT_SECRET_KEY"] = "hhjjkjggjjbbhukgjgghgverefdgdfgghgfhfdfdf"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=600)
jwt = JWTManager(app)
jwt.init_app(app)


from views import *
app.register_blueprint(user_bp)
app.register_blueprint(review_bp)
app.register_blueprint(restaurant_bp)
app.register_blueprint(reservation_bp)
app.register_blueprint(menu_bp)
app.register_blueprint(auth_bp)





@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None



@app.route("/")
def welcome():
    return "<p>Welcome!!</p>"


if __name__ == "__main__":
    app.run(debug = True)