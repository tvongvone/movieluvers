from .db import db, SCHEMA, environment, add_prefix_for_prod
from .watchlist_movies import watchlists_movies

class WatchList(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)


    watchlist_movies = db.relationship("Movie",secondary=watchlists_movies ,back_populates="movie_watchlists")
    user = db.relationship("User", back_populates="watchlists")

    def to_dict(self, add_movies=False):
        watchlist = {
            "id": self.id,
            "name": self.name,
            "userId": self.userId
        }

        if add_movies:
            watchlist['movies'] = [movie.to_dict() for movie in self.watchlist_movies]
        return watchlist
