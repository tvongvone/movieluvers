from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text

import requests
import os

KEY = os.environ.get('API_KEY')

# response = requests.get(f'https://api.themoviedb.org/3/movie/upcoming?api_key={KEY}&language=en-US&page=1')

# data = response.json()['results']

# newData = [x['id'] for x in data]

# print(newData)

# Popular movies data
topRated = [238, 157336, 550, 129, 424, 496243, 240, 372058, 19404, 389, 155, 497, 995133, 680, 13, 429, 772071, 324857, 704264, 372754]
upcoming = [502356, 603692, 631842, 884184, 594767, 842945, 804150, 758009, 937278, 934433, 772515, 901563, 599019, 916224, 724495, 816904, 700391, 493529, 758323, 955991]
newMovies = [346698, 667538, 459003, 872585, 976573, 667717, 536437, 615656, 496450, 842675, 616747, 799379, 1008042, 980078, 717930, 747188, 565770, 681303, 614930, 870518]
def seed_movies():
   old_movies = []
   movie_list = []
   new_movies = []
   for x in upcoming:
      response = requests.get(f'https://api.themoviedb.org/3/movie/{x}?api_key={KEY}&language=en-US')

      movie_list.append(response.json())

   for z in topRated:
      response = requests.get(f'https://api.themoviedb.org/3/movie/{z}?api_key={KEY}&language=en-US')

      old_movies.append(response.json())

   for r in newMovies:
      response = requests.get(f'https://api.themoviedb.org/3/movie/{r}?api_key={KEY}&language=en-US')

      new_movies.append(response.json())

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
         movie.posterPath = f'https://image.tmdb.org/t/p/original{str}'
      if y.__contains__('backdrop_path'):
         str = y['backdrop_path']
         movie.backdropPath = f'https://image.tmdb.org/t/p/original{str}'
      movie.genre = 2

      db.session.add(movie)

   for q in old_movies:
      movie = Movie()

      movie.apiId = q['id']
      if q.__contains__('title'):
         movie.title = q['title']
      else:
         movie.title = q['name']

      movie.overview = q['overview']
      if q.__contains__('poster_path'):
         str = q['poster_path']
         movie.posterPath = f'https://image.tmdb.org/t/p/original{str}'
      if q.__contains__('backdrop_path'):
         str = q['backdrop_path']
         movie.backdropPath = f'https://image.tmdb.org/t/p/original{str}'
      movie.genre = 1

      db.session.add(movie)


   for l in new_movies:
      movie = Movie()

      movie.apiId = l['id']
      if l.__contains__('title'):
         movie.title = l['title']
      else:
         movie.title = l['name']

      movie.overview = l['overview']
      if l.__contains__('poster_path'):
         str = l['poster_path']
         movie.posterPath = f'https://image.tmdb.org/t/p/original{str}'
      if l.__contains__('backdrop_path'):
         str = l['backdrop_path']
         movie.backdropPath = f'https://image.tmdb.org/t/p/original{str}'
      movie.genre = 3

      db.session.add(movie)

   db.session.commit()

def undo_movies():
   if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
   else:
      db.session.execute(text("DELETE FROM movies"))

   db.session.commit()
