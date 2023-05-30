from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get reviews for a movie
@review_routes.route('/<int:id>')
def get_reviews(id):

    reviews = Review.query.filter(Review.movieId == id)

    return [review.to_dict(add_user=True) for review in reviews]

# Create review for a movie
@review_routes.route('/new', methods=['POST'])
@login_required
def post_review():

    res = request.get_json()

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        reviewdata = Review(review=res['review'], movieId=res['movieId'], userId=current_user.id, rating=res['rating'])
        db.session.add(reviewdata)
        db.session.commit()
        return reviewdata.to_dict(add_user=True)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 403

# Edit review
@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_review(id):
    reviewdata = Review.query.get(id)
    res = request.get_json()

    form =  ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        reviewdata.review = res['review']
        db.session.add(reviewdata)
        db.session.commit()
        return reviewdata.to_dict(add_user=True)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 403

# Delete review
@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):

    reviewdata = Review.query.get(id)

    if reviewdata:

        db.session.delete(reviewdata)
        db.session.commit()
    return {'response': 'Successfully deleted'}
