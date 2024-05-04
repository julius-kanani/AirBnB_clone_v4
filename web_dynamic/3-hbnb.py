#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from os import environ
from flask import Flask, render_template
app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/3-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    return render_template('3-hbnb.html')


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
