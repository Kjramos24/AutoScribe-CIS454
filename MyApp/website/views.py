from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Source
from website.access import sourceSearch
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/about')
def about():
    return render_template("about.html")

@views.route('/dashboard', methods=['GET', 'POST'])
#@login_required
def dashboard():
    if request.method == "POST":
        # textInfo = request.form['currText']
        # if len(textInfo) < 100:
        #     flash("The text is too short!", category='error')
        # else:
            # Return to main page
            flash("Good job!", category='success')
            res = request.json['inputText']
            results = sourceSearch.get_main_sources_info(sourceSearch.get_results("The pyramids in Egypt"))
            return jsonify(results)
    # This needs to be fixed
    return render_template("dashboard.html", user=current_user)

@views.route('/delete-source', methods=['GET', 'POST'])
#@login_required
def delete():
     # A JS function is needed to send the request here
     pass

@views.route('/save-source', methods=['POST'])
#@login_required
def save():
    #  Check to see if the source has already been saved
    data = request.get_json()
    title = data['title']
    link = data['link']
    desc = data['desc']
    result_id = data['result_id']
    source=False # Delete this
    # This is what will be used to check
    # source = Source.query.filter_by(title=title, link=link, desc=desc, result_id=result_id).first()
    if source:
        new_Source = Source(title=title, link=link, desc=desc, result_id=result_id, user_id=current_user.id)
        db.session.add(new_Source)
        db.session.commit()
        flash("Source added!", category='success')
    #  If not, add the source to the user's database
    return jsonify({'status': f'{title, link, result_id}'})
