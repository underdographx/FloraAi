import { useState } from "react";
import "./index.css";
import heroImg from "./assets/hero_iris.jpg";

/* ─── Species Data ─────────────────────────────────────────────── */
const SPECIES = {
  setosa: {
    id: "setosa",
    name: "Iris Setosa",
    subtitle: "The Arctic Iris",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg",
    color: "#FF4FA2",
    brief: "Smallest species with narrow petals. Usually purple with white markings.",
    description:
      "Iris Setosa is the most distinctive and easily separable species in the Iris dataset. It is native to Arctic regions including Alaska, Maine, and parts of Asia. Its narrow, upright petals and compact size make it a favourite in botanical gardens worldwide.",
    taxonomy: {
      Kingdom: "Plantae",
      Order: "Asparagales",
      Family: "Iridaceae",
      Genus: "Iris",
      Species: "I. setosa",
    },
    measurements: {
      "Sepal Length": "4.3 – 5.8 cm",
      "Sepal Width": "2.3 – 4.4 cm",
      "Petal Length": "1.0 – 1.9 cm",
      "Petal Width": "0.1 – 0.6 cm",
    },
    facts: [
      "Easiest class to separate in the Iris dataset — always linearly separable.",
      "Native to subarctic and arctic regions of North America and Asia.",
      "Blooms in late spring with vivid purple-blue petals.",
      "Has the smallest petal dimensions among all three species.",
      "Commonly used as a benchmark in ML classification problems.",
    ],
    mlNote:
      "In the KNN model, Iris Setosa is classified with 100% accuracy on every test run. Its petal measurements are so distinct that even a simple 1-nearest-neighbor model can identify it perfectly.",
  },
  versicolor: {
    id: "versicolor",
    name: "Iris Versicolor",
    subtitle: "The Blue Flag Iris",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg",
    color: "#FF4FA2",
    brief: "Medium-sized species with wide petals. Blue or purple with white/yellow markings.",
    description:
      "Iris Versicolor, commonly known as the Blue Flag Iris, is a medium-sized wildflower native to North America. It grows in wet meadows, marshes, and along the shores of lakes and streams. It is the provincial flower of Quebec, Canada.",
    taxonomy: {
      Kingdom: "Plantae",
      Order: "Asparagales",
      Family: "Iridaceae",
      Genus: "Iris",
      Species: "I. versicolor",
    },
    measurements: {
      "Sepal Length": "4.9 – 7.0 cm",
      "Sepal Width": "2.0 – 3.4 cm",
      "Petal Length": "3.0 – 5.1 cm",
      "Petal Width": "1.0 – 1.8 cm",
    },
    facts: [
      "Provincial flower of Quebec, Canada since 1999.",
      "Thrives in wet habitats — marshes, bogs, and lake shores.",
      "Petals display a beautiful mix of blue, violet, and white.",
      "Often confused with Iris Virginica in the dataset — they overlap in feature space.",
      "Used historically in herbal medicine by Indigenous peoples.",
    ],
    mlNote:
      "Iris Versicolor is the most challenging class in the dataset. Its measurements overlap with Iris Virginica, making it the primary source of misclassifications in weaker models. KNN with k=5 handles this well.",
  },
  virginica: {
    id: "virginica",
    name: "Iris Virginica",
    subtitle: "The Virginia Iris",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg",
    color: "#FF4FA2",
    brief: "Largest species with long petals. Light purple with distinctive patterns.",
    description:
      "Iris Virginica, the Virginia Iris or Southern Blue Flag, is the largest of the three species in the dataset. It is native to the eastern United States and can be found in swamps, marshes, and along stream banks. Its large, showy flowers make it a popular ornamental plant.",
    taxonomy: {
      Kingdom: "Plantae",
      Order: "Asparagales",
      Family: "Iridaceae",
      Genus: "Iris",
      Species: "I. virginica",
    },
    measurements: {
      "Sepal Length": "4.9 – 7.9 cm",
      "Sepal Width": "2.2 – 3.8 cm",
      "Petal Length": "4.5 – 6.9 cm",
      "Petal Width": "1.4 – 2.5 cm",
    },
    facts: [
      "Largest of the three Iris species in terms of petal and sepal dimensions.",
      "Native to the eastern United States, especially Virginia and the Carolinas.",
      "Flowers are light purple to violet with distinctive yellow-tipped veins.",
      "Grows well in waterlogged soils and along riverbanks.",
      "Its large petal size is the key distinguishing feature from Versicolor in KNN.",
    ],
    mlNote:
      "Iris Virginica has the largest measurements but overlaps with Versicolor in the feature space. The KNN model primarily uses Petal Width (> 1.8 cm) to confidently separate Virginica from Versicolor.",
  },
};

/* ─── Species Detail Page ──────────────────────────────────────── */
function SpeciesPage({ speciesKey, onNavigate }) {
  const s = SPECIES[speciesKey];

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌸</span> FloraAI
        </div>
        <div className="nav-links">
          <button className="nav-back-btn" onClick={() => onNavigate("home")}>← Back to Home</button>
        </div>
        <a href="https://github.com/underdographx" target="_blank" rel="noreferrer" className="github-btn">🐙 GitHub</a>
      </nav>

      {/* Species Hero — two column: text left, image right */}
      <header className="sp-hero">
        <div className="sp-hero-text">
          <div className="ai-badge">🌿 SPECIES PROFILE</div>
          <h1 className="sp-name">{s.name}</h1>
          <p className="sp-subtitle">{s.subtitle}</p>
          <p className="sp-desc">{s.description}</p>

          {/* Taxonomy as neat key:value grid */}
          <div className="sp-taxonomy">
            {Object.entries(s.taxonomy).map(([key, val]) => (
              <div key={key} className="sp-tax-item">
                <span className="sp-tax-key">{key}</span>
                <span className="sp-tax-colon">:</span>
                <span className="sp-tax-val">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sp-hero-img-wrap">
          <img src={s.image} alt={s.name} className="sp-hero-img" />
        </div>
      </header>

      {/* Stats + Measurements */}
      <div className="two-col-layout">
        {/* Measurements Table */}
        <section className="card-section">
          <div className="section-header">
            <span className="section-icon">📏</span>
            <h2>Average Measurements</h2>
          </div>
          <table className="feature-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Range (cm)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(s.measurements).map(([feat, val]) => (
                <tr key={feat}>
                  <td>{feat}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Fun Facts */}
        <section className="card-section">
          <div className="section-header">
            <span className="section-icon">✨</span>
            <h2>Key Facts</h2>
          </div>
          <ul className="sp-facts-list">
            {s.facts.map((fact, i) => (
              <li key={i}>
                <span className="sp-fact-num">{i + 1}</span>
                {fact}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ML Insight */}
      <section className="card-section sp-ml-note">
        <div className="section-header">
          <span className="section-icon">🧠</span>
          <h2>ML Model Insight</h2>
        </div>
        <p className="sp-ml-text">{s.mlNote}</p>
      </section>

      {/* Other Species */}
      <section className="sp-others">
        <div className="section-header">
          <span className="section-icon">🌸</span>
          <h2>Other Species</h2>
        </div>
        <div className="species-grid">
          {Object.values(SPECIES)
            .filter((sp) => sp.id !== speciesKey)
            .map((sp) => (
              <div key={sp.id} className="species-card">
                <img src={sp.image} alt={sp.name} />
                <div className="species-info">
                  <h3>{sp.name}</h3>
                  <p>{sp.brief}</p>
                  <button
                    className="learn-more"
                    onClick={() => { window.scrollTo(0, 0); onNavigate(sp.id); }}
                  >
                    View Species
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-left">
          <div className="logo"><span className="logo-icon">🌸</span> FloraAI</div>
          <p>AI Flower Classification<br />Using KNN Algorithm</p>
        </div>
        <div className="footer-links">
          <strong>Quick Links</strong>
          <button className="footer-link-btn" onClick={() => onNavigate("home")}>← Home</button>
        </div>
        <div className="footer-right">
          <p>Crafted with passion by Anuja Yadav ✨</p>
          <p className="copyright">© 2026 FloraAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Home Page ────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home"); // "home" | "setosa" | "versicolor" | "virginica"
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ sepal_length: "", sepal_width: "", petal_length: "", petal_width: "" });

  const goToSpecies = (id) => {
    window.scrollTo(0, 0);
    setPage(id);
  };

  const goHome = () => {
    window.scrollTo(0, 0);
    setPage("home");
  };

  // unified navigate function
  const navigate = (target) => {
    window.scrollTo(0, 0);
    setPage(target);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const predictFlower = async () => {
    try {
      setError(null);
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sepal_length: Number(form.sepal_length),
          sepal_width: Number(form.sepal_width),
          petal_length: Number(form.petal_length),
          petal_width: Number(form.petal_width),
        }),
      });
      if (!res.ok) throw new Error();
      setPrediction(await res.json());
    } catch {
      setError("Backend not running or invalid input.");
    }
  };

  /* Show species page */
  if (page !== "home") {
    return <SpeciesPage speciesKey={page} onNavigate={navigate} />;
  }

  /* ── Home ── */
  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo"><span className="logo-icon">🌸</span> FloraAI</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#dataset">Dataset</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#evaluation">Evaluation</a>
          <a href="#predict">Predict</a>
          <a href="#about">About</a>
        </div>
        <a href="https://github.com/underdographx" target="_blank" rel="noreferrer" className="github-btn">🐙 GitHub</a>
      </nav>

      {/* Hero */}
      <header className="hero" id="home">
        <div className="hero-content">
          <div className="ai-badge">✨ AI POWERED</div>
          <h1>AI Flower <br /><span className="highlight">Classification</span></h1>
          <h3>Machine Learning using <span className="highlight">K-Nearest Neighbors (KNN)</span></h3>
          <p>An intelligent system that classifies Iris flowers into their species using ML techniques and real data.</p>
          <a href="#predict" className="cta-button">Explore the Model ❯</a>
        </div>
        <div className="hero-image-container">
          <img src={heroImg} alt="AI Purple Iris" className="hero-img" />
          <div className="floating-badge badge-1">
            <span className="badge-icon">🗄️</span>
            <div><strong>Iris Dataset</strong><p>150 samples<br />3 species</p></div>
          </div>
          <div className="floating-badge badge-2">
            <span className="badge-icon">🧠</span>
            <div><strong>KNN Algorithm</strong><p>Instance-based learning</p></div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="stats-grid">
        {[
          { icon: "🗄️", val: "150", label: "Dataset Samples", sub: "Iris Flower Dataset" },
          { icon: "🌸", val: "3",   label: "Classes",         sub: "Setosa, Versicolor, Virginica" },
          { icon: "📏", val: "4",   label: "Features",        sub: "Sepal & Petal Dimensions" },
          { icon: "🧠", val: "KNN", label: "Algorithm",       sub: "K-Nearest Neighbors" },
          { icon: "📈", val: "100%",label: "Model Accuracy",  sub: "On Test Data" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-icon">{s.icon}</span>
            <div className="stat-info"><h2>{s.val}</h2><strong>{s.label}</strong><p>{s.sub}</p></div>
          </div>
        ))}
      </section>

      <div className="two-col-layout">
        {/* Dataset */}
        <section id="dataset" className="card-section">
          <div className="section-header"><span className="section-icon">📄</span><h2>About Dataset &amp; Features</h2></div>
          <p className="dataset-desc">The <strong>Iris</strong> dataset is a classic dataset in machine learning. It contains 150 samples of iris flowers from three different species.</p>
          <ul className="dataset-list">
            <li>✅ 50 samples per species</li>
            <li>✅ 3 species: Iris Setosa, Iris Versicolor, Iris Virginica</li>
            <li>✅ 4 numerical features</li>
            <li>✅ Balanced and clean dataset</li>
          </ul>
          <h3 className="sub-heading">Feature Information</h3>
          <table className="feature-table">
            <thead><tr><th>Feature</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>Sepal Length</td><td>Length of the sepal in cm</td></tr>
              <tr><td>Sepal Width</td><td>Width of the sepal in cm</td></tr>
              <tr><td>Petal Length</td><td>Length of the petal in cm</td></tr>
              <tr><td>Petal Width</td><td>Width of the petal in cm</td></tr>
            </tbody>
          </table>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="card-section">
          <div className="section-header"><span className="section-icon">⚙️</span><h2>Machine Learning Pipeline</h2></div>
          <div className="pipeline-steps">
            {[["🗄️","1. Dataset"],["🧹","2. Preprocessing"],["📏","3. Feature Scaling"],["✂️","4. Train/Test Split"],["🧠","5. KNN Training"],["🎯","6. Prediction"],["📊","7. Evaluation"]].map(([icon, label], i, arr) => (
              <span key={label} style={{ display: "contents" }}>
                <div className="step"><div className="step-icon">{icon}</div><span>{label}</span></div>
                {i < arr.length - 1 && <div className="step-arrow">➔</div>}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="two-col-layout evaluation-layout">
        {/* Model Evaluation */}
        <section id="evaluation" className="card-section">
          <div className="section-header"><span className="section-icon">📈</span><h2>Model Evaluation</h2></div>
          <div className="metrics-grid">
            {[["Accuracy","100%"],["Precision","100%"],["Recall","100%"],["F1 Score","100%"]].map(([label, val]) => (
              <div className="metric-box" key={label}><span>{label}</span><h2>{val}</h2></div>
            ))}
          </div>
          <div className="metric-footer"><p>The model performs exceptionally well on the test data.</p></div>
        </section>

        {/* Confusion Matrix */}
        <section className="card-section">
          <div className="section-header"><h2>Confusion Matrix</h2></div>
          <div className="matrix-container">
            <table className="matrix-table">
              <thead><tr><th></th><th>Setosa</th><th>Versicolor</th><th>Virginica</th></tr></thead>
              <tbody>
                <tr><th>Setosa</th><td className="correct">10</td><td>0</td><td>0</td></tr>
                <tr><th>Versicolor</th><td>0</td><td className="correct">10</td><td>0</td></tr>
                <tr><th>Virginica</th><td>0</td><td>0</td><td className="correct">10</td></tr>
              </tbody>
            </table>
            <div className="matrix-legend">
              <div className="legend-item"><span className="box correct-box"></span> Correct Prediction</div>
              <div className="legend-item"><span className="box incorrect-box"></span> Incorrect Prediction</div>
            </div>
          </div>
        </section>
      </div>

      <div className="two-col-layout">
        {/* Prediction Form */}
        <section id="predict" className="card-section">
          <div className="section-header"><span className="section-icon">🌸</span><h2>Predict Flower Species</h2></div>
          <div className="prediction-form">
            {[["Sepal Length (cm)","sepal_length","Enter sepal length"],["Sepal Width (cm)","sepal_width","Enter sepal width"],["Petal Length (cm)","petal_length","Enter petal length"],["Petal Width (cm)","petal_width","Enter petal width"]].map(([lbl, name, ph]) => (
              <div className="input-group" key={name}>
                <label>{lbl}</label>
                <input type="number" placeholder={ph} name={name} onChange={handleChange} />
              </div>
            ))}
            <button className="predict-btn" onClick={predictFlower}>✨ Predict Flower</button>
            {error && <p className="error-text">{error}</p>}
          </div>
        </section>

        {/* Prediction Result */}
        <section className="card-section prediction-result">
          <div className="section-header"><span className="section-icon">🎯</span><h2>Prediction Result</h2></div>
          <div className="result-content">
            <div className="result-image-placeholder">{prediction ? "🌸" : "❓"}</div>
            <div className="result-details">
              <p className="label">Predicted Species</p>
              <h2 className="predicted-name">{prediction ? prediction.species : "Awaiting Input..."}</h2>
              {prediction && (<><p className="label">Confidence</p><h2 className="predicted-confidence">{prediction.confidence}</h2></>)}
            </div>
            <div className="result-about">
              <p className="label">About this Flower</p>
              <p className="about-text">
                {prediction
                  ? `${prediction.species} is one of the three species in the Iris dataset. Based on the measurements provided, the model is highly confident in this classification.`
                  : "Enter the sepal and petal measurements to predict the Iris species."}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Species Cards */}
      <section id="about" className="species-section">
        <div className="section-header"><span className="section-icon">🌸</span><h2>Iris Flower Species</h2></div>
        <div className="species-grid">
          {[
            { id: "setosa",     img: SPECIES.setosa.image,     name: "Iris Setosa",     desc: "Smallest species with narrow petals. Usually purple with white markings." },
            { id: "versicolor", img: SPECIES.versicolor.image, name: "Iris Versicolor", desc: "Medium-sized species with wide petals. Blue or purple with white/yellow markings." },
            { id: "virginica",  img: SPECIES.virginica.image,  name: "Iris Virginica",  desc: "Largest species with long petals. Light purple with distinctive patterns." },
          ].map((sp) => (
            <div className="species-card" key={sp.id}>
              <img src={sp.img} alt={sp.name} />
              <div className="species-info">
                <h3>{sp.name}</h3>
                <p>{sp.desc}</p>
                <button className="learn-more" onClick={() => goToSpecies(sp.id)}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-left">
          <div className="logo"><span className="logo-icon">🌸</span> FloraAI</div>
          <p>AI Flower Classification<br />Using KNN Algorithm</p>
        </div>
        <div className="footer-links">
          <strong>Quick Links</strong>
          <a href="#home">Home</a><a href="#dataset">Dataset</a><a href="#pipeline">Pipeline</a>
          <a href="#evaluation">Evaluation</a><a href="#predict">Predict</a><a href="#about">About</a>
        </div>
        <div className="footer-links"><strong>Connect</strong><a href="https://github.com/underdographx" target="_blank" rel="noreferrer">🐙 GitHub</a><a href="https://www.linkedin.com/in/anuja-yadav-5392a6376/" target="_blank" rel="noreferrer">💼 LinkedIn</a></div>
        <div className="footer-right">
          <p>Made with ❤️ by Anuja Yadav</p>
          <p className="copyright">© 2026 FloraAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}