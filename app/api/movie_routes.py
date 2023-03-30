from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Movie
import requests
import os

KEY = os.environ.get('API_KEY')

movie_routes = Blueprint('movies', __name__)


@movie_routes.route('')
def get_movies():
    old_movies = Movie.query.filter(Movie.genre == 1)
    new_movies = Movie.query.filter(Movie.genre == 2)

    old = [movie.to_dict() for movie in old_movies]
    new = [movie.to_dict() for movie in new_movies]

    return {'old': old, 'new': new}

@movie_routes.route('/<int:id>')
def get_single(id):

    single_movie = Movie.query.get(id)


    if single_movie:
        movie =  single_movie.to_dict(add_reviews=True)
        response = requests.get(f'https://api.themoviedb.org/3/movie/{int(movie["apiId"])}/videos?api_key={KEY}&language=en-US')
        movie['videos'] = response.json()['results'][0]
        return movie
