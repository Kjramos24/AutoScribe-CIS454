from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Source
from website.access import sourceSearch, searchTerms
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def welcome():
    return render_template("welcome.html")

# @views.route('/about')
# def about():
#     return render_template("about.html")

@views.route('/dashboard')
@login_required
def dashboard():
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
def home():
    if request.method == "POST":
            res = request.json['inputText']
            # Get the most significant words from SPaCy
            search_terms = searchTerms.get_search_terms(str(res))
            results = sourceSearch.get_main_sources_info(search_terms)
            return jsonify(results)
    # This needs to be fixed
    return render_template("home.html", user=current_user)

@views.route('/more-results', methods=['POST'])
@login_required
def more():
    related_results = {}
    search_link = request.json['link']
    # Get related results using links
    related_results = sourceSearch.get_related_articles(str(search_link))
    return jsonify(related_results)

@views.route('/cite', methods=['POST'])
@login_required
def cite():
    citation = {}
    search_id = request.json['result_id']
    # Get related results using links
    citation = sourceSearch.get_source_citation(str(search_id))
    return jsonify(citation)

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
    # Track status
    status = "exists"
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
        status = "saved"
    #  If not, add the source to the user's database
    return jsonify({'status': status})
