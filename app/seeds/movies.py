from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text

import requests
import os

KEY = os.environ.get('API_KEY')

# response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={KEY}&language=en-US&page=1')

# data = response.json()['results']

# newData = [x['id'] for x in data]

# print(newData)

# Popular movies data
popular = [804150, 315162, 943822, 505642, 594767, 850871, 631842, 1011679, 1077280, 1003579, 646389, 603692, 983768, 1026563, 76600, 677179, 1058949, 536554, 436270, 640146]

def seed_movies():
   movie_list = []
   for x in popular:
      response = requests.get(f'https://api.themoviedb.org/3/movie/{x}?api_key={KEY}&language=en-US&append_to_response=videos')

      movie_list.append(response.json())

   for y in movie_list:
      movie = Movie()

      movie.apiId = y['id']
      if y.__contains__('title'):
         movie.title = y['title']
      else:
         movie.title = y['name']

      movie.overview = y['overview']
      if y.__contains__('poster_path'):
         str = y['poster_path']
         movie.posterPath = f'https://image.tmdb.org/t/p/w500{str}'
      if y.__contains__('backdrop_path'):
         str = y['backdrop_path']
         movie.backdropPath = f'https://image.tmdb.org/t/p/original{str}'

      db.session.add(movie)

   db.session.commit()

def undo_movies():
   if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
   else:
      db.session.execute(text("DELETE FROM movies"))

   db.session.commit()
