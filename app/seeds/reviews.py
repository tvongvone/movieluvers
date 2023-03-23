from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    r1 = Review(review='This movie was pretty cool!', movieId=1, userId=1)
    r2 = Review(review='Ive seen better!', movieId=2, userId=1)
    r3 = Review(review='Favorite movie ever!', movieId=3, userId=1)

    r4 = Review(review='I like the vibe of this movie', movieId=1, userId=2)
    r5 = Review(review='This movie was amazing', movieId=2, userId=2)
    r6 = Review(review='Its alright', movieId=3, userId=2)

    r7 = Review(review='I love this movie!!!', movieId=4, userId=3)
    r8 = Review(review='This was a crazy experience!', movieId=5, userId=3)
    r9 = Review(review='This is why I love movies!!!', movieId=6, userId=3)

    db.session.add_all([r1,r2,r3,r4,r5,r6,r7,r8,r9])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
