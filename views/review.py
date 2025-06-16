from flask import Flask, request, jsonify, Blueprint
from models import db, Review

review_bp = Blueprint("review_blueprint", __name__)