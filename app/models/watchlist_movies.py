from .db import db, add_prefix_for_prod, environment, SCHEMA

watchlists_movies = db.Table(
    "watchlists_movies",
    db.Model.metadata,
    db.Column('watchlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")), primary_key=True),
    db.Column('movie_id', db.Integer, db.ForeignKey(add_prefix_for_prod("movies.id")), primary_key=True)
)

if environment == "production":
    watchlists_movies.schema = SCHEMA
