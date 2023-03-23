from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Movie

movie_routes = Blueprint('movies', __name__)


@movie_routes.route('')
def get_movies():
    all_movies = Movie.query.all()
    return [movie.to_dict() for movie in all_movies]
