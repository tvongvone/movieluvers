from flask import Blueprint
from flask_login import login_required, current_user
from app.models import WatchList


watchlist_routes = Blueprint('watchlists', __name__)

# User's watchlists
@watchlist_routes.route("")
@login_required
def get_watchlists():
    all_watchlists = WatchList.query.filter(WatchList.userId == current_user.id)
    return [watchlist.to_dict() for watchlist in all_watchlists]
