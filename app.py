from flask import Flask, render_template, redirect, request
from api_keys import *
import spotipy
import spotipy.util as util

app = Flask(__name__)
scope = "user-top-read"

def getOAuth():
    """Return a Spotipy Oauth2 object."""
    return spotipy.oauth2.SpotifyOAuth(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        scope=scope,
        cache_path=".tokens")

def getSpotify(auth_token=None):
    """Return an authenticated Spotify object."""
    oauth = getOAuth()
    token_info = oauth.get_cached_token()
    if not token_info and auth_token:
        token_info = oauth.get_access_token(auth_token)
    return spotipy.Spotify(token_info["access_token"])

def getTopTracksWithFeatures():
    sp = getSpotify()
    tracks = sp.current_user_top_tracks(limit=50)
    track_ids = [track["id"] for track in tracks["items"]]
    features = sp.audio_features(track_ids)
    result = {}

    # Create dictionary { "name": {"feature1": ..., "feature2": ..., ...}, ...}
    for i in range(len(tracks["items"])):
        trackName = tracks["items"][i]["name"]
        result[trackName] = features[i]
        result[trackName]["artists"] = tracks["items"][i]["artists"]

    return result

@app.route("/")
def index():
    sp_oauth = getOAuth()
    return redirect(sp_oauth.get_authorize_url())

# @app.route("/login")
# def login():
#     token = util.prompt_for_user_token("sarastik", 
#                                        scope,
#                                        client_id=CLIENT_ID,
#                                        client_secret=CLIENT_SECRET,
#                                        redirect_uri=REDIRECT_URI)
#     temp = ""
#     if token:
#         sp = spotipy.Spotify(auth=token)
#         results = sp.current_user_saved_tracks()
#         for item in results["items"]:
#             track = item["track"]
#             temp += track['name'] + "   "
#     return temp

@app.route("/features")
def getFeatures():
    return render_template("features.html")

@app.route("/graph")
def getGraph():
    if request.args.get("code"):
        getSpotify(request.args["code"])
    result = getTopTracksWithFeatures()
    return render_template("graph.html", data=result)

if __name__ == "__main__": 
    app.run(host="0.0.0.0", debug=True)