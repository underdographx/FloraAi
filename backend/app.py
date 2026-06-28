from flask import Flask, request, jsonify
from flask_cors import CORS

from classifier import predict_flower

app = Flask(__name__)

CORS(app)


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    result = predict_flower(

        float(data["sepal_length"]),
        float(data["sepal_width"]),
        float(data["petal_length"]),
        float(data["petal_width"])

    )

    return jsonify(result)


@app.route("/")
def home():

    return jsonify({
        "message": "FloraAI Backend Running 🚀"
    })


if __name__ == "__main__":
    app.run(debug=True)