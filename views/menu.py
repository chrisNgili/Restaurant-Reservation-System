from flask import Flask, request, jsonify, Blueprint
from models import db, Menu

menu_bp = Blueprint("menu_blueprint", __name__)