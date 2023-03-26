from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class WatchForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=30, min=1)])
