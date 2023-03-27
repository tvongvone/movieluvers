from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>')
def get_reviews(id):

    reviews = Review.query.filter(Review.movieId == id)

    return [review.to_dict(add_user=True) for review in reviews]
