from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Movie

movie_routes = Blueprint('movies', __name__)


@movie_routes.route('')
def get_movies():
    all_movies = Movie.query.all()
    return [movie.to_dict() for movie in all_movies]

@movie_routes.route('/<int:id>')
def get_single(id):

    single_movie = Movie.query.get(id)

    if single_movie:
        return single_movie.to_dict(add_reviews=True)
