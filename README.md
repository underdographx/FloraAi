# 🌸 FloraAI

### AI-Powered Flower Classification using K-Nearest Neighbors (KNN)

FloraAI is a Machine Learning web application that classifies Iris flowers into their respective species using the **K-Nearest Neighbors (KNN)** algorithm. The project combines a **Flask backend**, **React frontend**, and **Scikit-learn** to provide real-time flower classification through a clean and responsive interface.

---

# 📸 Preview

### 🏠 Home Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/af2da2aa-50b3-4711-b705-2e230e3eceb9" alt="Home Page" width="90%">
</p>

---

### 🌸 Prediction Interface

<p align="center">
  <img src="https://github.com/user-attachments/assets/dbdf3a54-cfab-44bf-bb32-7d6d3cf21a54" alt="Prediction Interface" width="90%">
</p>
# ✨ Features

-  AI-powered flower species prediction
-  Machine Learning model built using K-Nearest Neighbors (KNN)
-  Uses the Iris Dataset from Scikit-learn
-  Real-time prediction system
-  Model evaluation metrics
-  Machine Learning pipeline visualization
-  Confusion Matrix representation
-  Dedicated pages for each Iris species
-  Responsive and modern UI
-  REST API powered by Flask

---

# 🧠 Machine Learning Workflow

```text
Iris Dataset
      │
      ▼
Data Preprocessing
      │
      ▼
Feature Scaling
      │
      ▼
Train-Test Split
      │
      ▼
KNN Model Training
      │
      ▼
Prediction
      │
      ▼
Model Evaluation
```

---

# 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- CSS3

### Backend

- Flask
- Flask-CORS

### Machine Learning

- Scikit-learn
- NumPy
- Pandas

### Deployment

- Vercel
- Render

---

# 📂 Project Structure

```text
FloraAI
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── app.py
│   ├── classifier.py
│   ├── requirements.txt
│   └── model.pkl
│
└── README.md
```

---

# 🌼 Model Information

**Algorithm**
- K-Nearest Neighbors (KNN)

**Dataset**
- Iris Dataset

**Features**
- Sepal Length
- Sepal Width
- Petal Length
- Petal Width

**Predicted Classes**
- Iris Setosa
- Iris Versicolor
- Iris Virginica

---

# 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/underdographx/FloraAi.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

---

# 🔌 API Endpoint

### Predict Flower Species

```
POST /predict
```

### Example Request

```json
{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2
}
```

### Example Response

```json
{
  "prediction": "Iris Setosa",
  "confidence": 99.8
}
```

---

# 🌐 Live Demo

**Frontend**

https://flora-ai-zeta.vercel.app/

**Backend**

https://floraai-1-stqb.onrender.com/

---

# 🚀 Future Enhancements

- Support additional flower species
- Compare multiple ML algorithms
- Interactive dataset visualization
- Model performance analytics dashboard
- Prediction history
- Export prediction reports

---

# 👩‍💻 Author

**Anuja Yadav**

Computer Engineering Student

AI • Machine Learning • Full Stack Development

**GitHub:** https://github.com/underdographx

**LinkedIn:** https://www.linkedin.com/in/anuja-yadav-5392a6376/
