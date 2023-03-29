from .db import db, environment, SCHEMA
from .watchlist_movies import watchlists_movies

class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    apiId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(40), nullable=False)
    overview = db.Column(db.String, nullable=False)
    genre = db.Column(db.Integer, nullable=False)
    posterPath = db.Column(db.String)
    backdropPath = db.Column(db.String)



    reviews = db.relationship("Review", back_populates="movie")
    movie_watchlists = db.relationship("WatchList", secondary=watchlists_movies, back_populates="watchlist_movies")

    def to_dict(self, add_watchlists=False, add_reviews=False):
        movie = {
            "id": self.id,
            "apiId": self.apiId,
            "title": self.title,
            "overview": self.overview,
            "genre": self.genre,
            "posterPath": self.posterPath,
            "backdropPath": self.backdropPath
        }
        if(add_watchlists):
            movie["watchlists"] = [watchlist.to_dict() for watchlist in self.movie_watchlists]

        if(add_reviews):
            movie['reviews'] = [review.to_dict(add_user=True) for review in self.reviews]

        return movie
