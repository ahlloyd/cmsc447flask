"""
    author: Alex Lloyd <alloyd2@umbc.edu>
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime

## Old tutorial stuff, unused
# players = [
# {'id': 0,
# 'name': 'Tom Brady',
# 'team': 'Buccaneers'},
# {'id': 1,
# 'name': 'Aaron Rodgers',
# 'team': 'Packers'},
# {'id':2,
# 'name':'Patrick Mahomes',
# 'team': 'Chiefs'}
# ]
# x = datetime.now()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

# User class, our database's only table
class User(db.Model):
    # if id is defined, use that
    # if it's null, use the algorithm-assigned primary key pk
    pk         = db.Column(db.Integer, primary_key=True )
    id         = db.Column(db.Integer,    nullable=True, unique=True)
    firstName  = db.Column(db.String(20), nullable=False)
    lastName   = db.Column(db.String(20), nullable=False)
    points     = db.Column(db.Integer,    nullable=False)

    # How the object is jsonified
    def getJSON(self):
        return jsonify({
            'id':        self.id,
            'firstName': self.firstName,
            'lastName':  self.lastName,
            'points':    self.points
        })

    # How the object is printed
    def __repr__(self):
        id = -1

        if self.id is None:
            id = self.pk
        else:
            id = self.id

        return f"User('{id}', '{self.firstName} {self.lastName}', '{self.points}')"

# # ref: https://pynative.com/make-python-class-json-serializable/
# # ref: https://stackoverflow.com/questions/41658015/object-has-no-attribute-dict-in-python3
# class UserEncoder(JSONEncoder):
#         def default(self, o):
#             return o.__dict__

def resetDatabase():
    # Defaults
    user_1 = User(id=211, firstName='Steve',  lastName='Smith',     points=80)
    user_2 = User(id=122, firstName='Jian',   lastName='Wong',      points=92)
    user_3 = User(id=213, firstName='Chris',  lastName='Peterson',  points=91)
    user_4 = User(id=524, firstName='Sai',    lastName='Patel',     points=94)
    user_5 = User(id=425, firstName='Andrew', lastName='Whitehead', points=99)
    user_6 = User(id=626, firstName='Sai',    lastName='Patel',     points=90)
    user_7 = User(id=287, firstName='Robert', lastName='Sanders',   points=75)

    # Perform reset
    try:
        # Try to drop everything & recreate
        app.app_context().push()
        db.drop_all()
        db.create_all()
    except Exception as e:
        # Create from scratch
        o = str(e)
        app.app_context().push()
        db.create_all()

    # Add defaults in
    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.add(user_6)
    db.session.add(user_7)
    db.session.commit()

    # Send out data
    print(User.query.all())

# Route for creating new users
@app.route("/create", methods=["POST"], strict_slashes=False)
def create():
    # Vars
    receivedData = None
    firstName    = None
    lastName     = None
    points       = None
    id           = None
    pointsInt    = 0
    idInt        = 0
    user         = None

    try:
        receivedData = request.get_json()
        firstName    = receivedData['firstName']
        lastName     = receivedData['lastName']
        points       = receivedData['points']
        id           = receivedData['userIDC']
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400
    
    try:
        pointsInt    = int(points)
        idInt        = int(id)
    except Exception as e:
        o = str(e)
        return 'Bad format', 422
    
    if pointsInt < 0 or idInt < 1:
        return 'Bad format', 422

    print("JSON:  ", receivedData)
    print("Name:  ", firstName, lastName)
    print("Points:", pointsInt)
    print("ID:    ", idInt)

    # Add new user to database
    user = User(id=idInt, firstName=firstName, lastName=lastName, points=pointsInt)

    # Attempt to add to database
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        # Uniqueness error (probably), bail out
        o = str(e)
        db.session.close()
        return 'Uniqueness error', 406 # 406 not acceptable

    # Received, OK (created)
    return 'Done', 201

# Route for searching users
@app.route("/search", methods=["POST"], strict_slashes=False)
def search():
    # Vars
    receivedData = None
    firstName    = None
    lastName     = None
    o            = None

    try:
        receivedData = request.get_json()
        firstName    = receivedData['firstNameS']
        lastName     = receivedData['lastNameS']
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400

    print("JSON:", receivedData)
    print("Name:", firstName, lastName)

    # Search by Last, First
    user = User.query.filter_by(lastName=lastName, firstName=firstName).first()
    if user is None:
        print("User was not found")
        db.session.close()
        return 'No such user', 404

    print("Found:", user)

    # User found, send back data
    return user.getJSON(), 201

# # Route for sending data after a successful search
# @app.route('/search/result', methods=["GET"], strict_slashes=False)
# def searchResult():
#     # Returning an api for showing in  reactjs
#     return {
#         'Name':"geek", 
#         "Age":"22",
#         "Date":x, 
#         "programming":"python"
#         }

# Route to reset the database to its defaults
# NOTE: Untested, not implemented on front end
@app.route("/reset", methods=["POST"], strict_slashes=False)
def reset():
    resetDatabase()

    # Database reset (ok)
    return 'Done', 200

# Route for deleting users
@app.route("/delete", methods=["POST"], strict_slashes=False)
def delete():
    # Vars
    receivedData = None
    userID       = None
    o            = None
    user         = None

    try:
        receivedData = request.get_json()
        userID       = receivedData['userID']
    except Exception as e:
        o = str(e)
        return 'Malformed request', 400

    print("JSON:", receivedData)
    print("ID:  ", userID)

    # Search by ID
    user = User.query.filter_by(id=userID).first()
    if user is not None:
        print("Deleted:", user)
        db.session.delete(user)
        db.session.commit()
        print(User.query.all())
    else:
        print("User was not found")
        db.session.close()
        return 'No such user', 404

    # Founded & deleted (ok)
    return 'Found & deleted', 200

# Running app
if __name__ == '__main__':
    resetDatabase()
    app.run(debug=True)