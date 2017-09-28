from flask import Flask, render_template

app = Flask(__name__)

CLIENT_ID = "1d6559453b7045208e227f50b7276401"
CLIENT_SECRET = "eefd28242abf4b77a94f43495d7be0e7"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/features")
def getFeatures():
    return render_template("features.html")

if __name__ == "__main__": 
    app.run(debug=True)