from flask import Flask, request, jsonify, Blueprint
from models import db, Reservation

reservation_bp = Blueprint("reservation_blueprint", __name__)