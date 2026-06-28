from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

iris = load_iris()

X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = KNeighborsClassifier(n_neighbors=5)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

report = classification_report(
    y_test,
    predictions,
    target_names=iris.target_names,
    output_dict=True
)

matrix = confusion_matrix(y_test, predictions)


def predict_flower(sl, sw, pl, pw):

    sample = scaler.transform([[sl, sw, pl, pw]])

    prediction = model.predict(sample)[0]
    probabilities = model.predict_proba(sample)[0]
    confidence = probabilities[prediction]

    return {
        "species": f"Iris {iris.target_names[prediction].title()}",
        "confidence": f"{round(confidence * 100, 2)}%",
        "accuracy": round(accuracy * 100, 2),
        "precision": round(report["weighted avg"]["precision"] * 100, 2),
        "recall": round(report["weighted avg"]["recall"] * 100, 2),
        "f1_score": round(report["weighted avg"]["f1-score"] * 100, 2),
        "confusion_matrix": matrix.tolist()
    }