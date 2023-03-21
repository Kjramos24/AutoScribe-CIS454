from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from website.access import sourceSearch


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

@views.route('/save-source', methods=['GET', 'POST'])
#@login_required
def save():
     # A JS function is not needed to send the request here
     # A form sumbmission can be used
     pass