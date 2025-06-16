from flask import Flask, request, jsonify, Blueprint
from models import db, Restaurant

restaurant_bp = Blueprint("restaurant_blueprint", __name__)