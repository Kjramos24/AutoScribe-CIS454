from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Source
from website.access import sourceSearch, searchTerms
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def welcome():
    return render_template("welcome.html")

@views.route('/about')
def about():
    return render_template("about.html")

@views.route('/dashboard')
@login_required
def home():
    return render_template("dashboard.html", user=current_user)

@views.route('/files')
@login_required
def files():
    return render_template("files.html", user=current_user)

@views.route('/topics')
@login_required
def topics():
    return render_template("topics.html", user=current_user)

@views.route('/home', methods=['GET', 'POST'])
@login_required
def dashboard():
    if request.method == "POST":
        # textInfo = request.form['currText']
        # if len(textInfo) < 100:
        #     flash("The text is too short!", category='error')
        # else:
            # Return to main page
            flash("Good job!", category='success')
            res = request.json['inputText']
            # Get the most significant words from SPaCy
            search_terms = searchTerms.get_search_terms(str(res))
            results = sourceSearch.get_main_sources_info(sourceSearch.get_results(search_terms))
            return jsonify(results)
    # This needs to be fixed
    return render_template("home.html", user=current_user)

@views.route('/delete-source', methods=['POST'])
@login_required
def delete():
    data = request.get_json()
    title = data['title']
    link = data['link']
    desc = data['desc']
    result_id = data['result_id']
    # Check if the source exists in the database
    sourceID = 0 # Change it
    source = Source.query.get(sourceID)
    # If it exists, delete
    if source:
        # If it belongs to the user, delete
        if source.user_id == current_user.id:
            db.session.delete(source)
            db.session.commit()
    return jsonify({})


@views.route('/save-source', methods=['POST'])
@login_required
def save():
    # Check to see if the source has already been saved
    data = request.get_json()
    title = data['title']
    link = data['link']
    desc = data['desc']
    result_id = data['result_id']
    # This is what will be used to check, ensure it does not exist
    source = Source.query.filter_by(title=title, link=link, desc=desc, result_id=result_id).first()
    if not source:
        new_Source = Source(title=title, link=link, desc=desc, result_id=result_id, user_id=current_user.id)
        db.session.add(new_Source)
        db.session.commit()
    #  If not, add the source to the user's database
    return jsonify({'status': f'{title, link, result_id}'})
