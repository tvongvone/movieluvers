from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import WatchList, db, Movie
from app.forms import WatchForm


watchlist_routes = Blueprint('watchlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# User's watchlists
@watchlist_routes.route("")
@login_required
def get_watchlists():
    all_watchlists = WatchList.query.filter(WatchList.userId == current_user.id)
    return [watchlist.to_dict(add_movies=True) for watchlist in all_watchlists]


# Create Watchlist
@watchlist_routes.route('/new', methods=['POST'])
@login_required
def create_watchlist():
    res = request.get_json()


    form = WatchForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit:
        watch_list = WatchList(name=res['name'], userId=current_user.id)

        db.session.add(watch_list)
        db.session.commit()
        return watch_list.to_dict(add_movies=True)

    return {'errors': validation_errors_to_error_messages(form.errors)}, 403

# Add movie to watchlist
@watchlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def add_movie(id):
    res = request.get_json()
    movieId = int(res['movieId'])

    watchlist = WatchList.query.get(id)
    movie = Movie.query.get(movieId)

    watchlist.watchlist_movies.append(movie)
    db.session.add(watchlist)
    db.session.commit()
    return watchlist.to_dict(add_movies=True)


# Remove movie from watchlist
@watchlist_routes.route('/<int:id>/remove', methods=['PUT'])
@login_required
def remove_movie(id):
    res = request.get_json()
    movieId = int(res['movieId'])

    watchlist = WatchList.query.get(id)

    for idx, x in enumerate(watchlist.watchlist_movies):
        if x.id == movieId:
            index = idx

    watchlist.watchlist_movies.pop(index)
    db.session.add(watchlist)
    db.session.commit()

    return watchlist.to_dict(add_movies=True)

# Delete watchlist
@watchlist_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_watchlist(id):

    watchlist = WatchList.query.get(id)


    if watchlist:
        db.session.delete(watchlist)
        db.session.commit()

        return {'Response': 'Successfully deleted'}


# Edit watchlist
@watchlist_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_watchlist(id):

    watchlist = WatchList.query.get(id)

    res = request.get_json()

    form = WatchForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        watchlist.name = res['name']

        db.session.commit()
        return watchlist.to_dict(add_movies=True)

    return {'errors': validation_errors_to_error_messages(form.errors)}, 403
