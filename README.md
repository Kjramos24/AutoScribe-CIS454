## FRONT END INFO

Creating a file
 - HTML: Please add the HTML File to ./Frontend/autoscribe-webapp/public directory
 - CSS: For this project we are using tailwindcss. For right now just add this tag "<script src="https://cdn.tailwindcss.com"></script>" in the <head> tag
 - JavaScript: if your document is in need of javascript please the put the file in the ./Frontend/autoscribe-webapp/src folder

 
File List and Purposes
 - index.html: First page the user sees. Contains an about section as well as directions
 - register.html: Registering page for users
 - login.html: Login page for users
 - recovery.html: Recovery page for user if forgotten password.
 - homepage.html: Takes in user long text input and returns sources
 - output-style.css: PLEASE DO NOT TOUCH


About Components.html
 - In order to make consistent web-page designed without using a framework like react I will be creating a document called components.html that will contain repeated web components such as navbar, etc. PLEASE DO NOT RUN. The code will be long and probably look weird.
  

Finally! - Either way I will be going through the Web-app and cleaning up the files so if any of this is too complicated it is ok!


Install:
    To run this Flask Application:
        - pip install flask, Flask-SQLAlchemy, flask-login
    To run SpaCy:
        - pip install -U pip setuptools wheel
        - pip install -U spacy
        - python -m spacy download en_core_web_sm