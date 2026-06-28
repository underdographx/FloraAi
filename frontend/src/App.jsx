import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import heroImg from "./assets/hero_iris.jpg";

/* ─── Species Data for Educational Pages ─── */
const SPECIES_DETAILS = {
  setosa: {
    id: "setosa",
    name: "Iris Setosa",
    scientificName: "Iris setosa",
    subtitle: "The Arctic Iris",
    brief: "Smallest species with narrow petals. Usually purple with white markings.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg",
    description: "Iris Setosa is a hardy, subarctic species of iris characterized by its smaller size and distinctive narrow petals. Native to cold regions such as Alaska, Canada, and Russian Siberia, it is highly resilient to cold climates and often grows near coastal shorelines and wet meadows.",
    family: "Iridaceae (Iris Family)",
    genus: "Iris",
    characteristics: {
      sepalLength: "4.3 - 5.8 cm (Avg: 5.0 cm)",
      sepalWidth: "2.3 - 4.4 cm (Avg: 3.4 cm)",
      petalLength: "1.0 - 1.9 cm (Avg: 1.5 cm)",
      petalWidth: "0.1 - 0.6 cm (Avg: 0.2 cm)",
      size: "Small / Dwarf",
      colors: "Purple, violet-blue, lavender with white and yellow base markings."
    },
    mlFeatures: "Iris Setosa is extremely easy for the KNN model to classify. It is linearly separable from the other two species. In feature space, its petal length (always under 2 cm) and petal width (under 0.6 cm) form a completely distinct cluster, allowing the model to achieve 100% accuracy when classifying Setosa.",
    funFacts: [
      "Known as the 'beachhead iris' because it thrives near sandy coastal shorelines.",
      "Extremely cold-tolerant, capable of surviving harsh sub-arctic winters.",
      "Its seeds are waterproof and can float on water to disperse along rivers.",
      "Used historically by native communities in Alaska for traditional purposes."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=600&q=80"
    ],
    knnExplanation: "KNN identifies Iris Setosa instantly because any input with a petal length under 2.0 cm is surrounded exclusively by other Setosa data points in the training set. There is zero overlap with other species."
  },
  versicolor: {
    id: "versicolor",
    name: "Iris Versicolor",
    scientificName: "Iris versicolor",
    subtitle: "The Blue Flag Iris",
    brief: "Medium-sized species with wide petals. Blue or purple with white/yellow markings.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg",
    description: "Iris Versicolor, commonly known as the Blue Flag or Harlequin Blue Flag, is a medium-sized wildflower native to eastern North America. It thrives in wet environments like marshes, bogs, and along stream banks, and is widely recognized by its beautiful blue-purple blossoms.",
    family: "Iridaceae (Iris Family)",
    genus: "Iris",
    characteristics: {
      sepalLength: "4.9 - 7.0 cm (Avg: 5.9 cm)",
      sepalWidth: "2.0 - 3.4 cm (Avg: 2.8 cm)",
      petalLength: "3.0 - 5.1 cm (Avg: 4.3 cm)",
      petalWidth: "1.0 - 1.8 cm (Avg: 1.3 cm)",
      size: "Medium",
      colors: "Blue, blue-violet, purple with yellow-white throat patterns."
    },
    mlFeatures: "Iris Versicolor is moderately difficult to classify. In the dataset, its measurements sit between Setosa and Virginica. While it is completely distinct from Setosa, its sepal dimensions and petal sizes overlap with those of Iris Virginica, making it the primary source of classification errors in KNN.",
    funFacts: [
      "It is the official provincial flower of Quebec, Canada, and the state wildflower of Maine.",
      "Thrives directly in shallow water or waterlogged soils, acting as a wetland health indicator.",
      "The name 'Versicolor' translates to 'changing color', referencing the complex hues of its petals.",
      "Its roots contain iridin, which is toxic when consumed raw but historically used in controlled medicine."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1508615070457-7baebe4003ab?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1470509037663-253afd7fecf5?auto=format&fit=crop&w=600&q=80"
    ],
    knnExplanation: "KNN classifies Iris Versicolor by looking at its nearest K neighbors. If a sample falls in the overlapping region with Virginica, the choice of K and local density of neighbors determines the classification."
  },
  virginica: {
    id: "virginica",
    name: "Iris Virginica",
    scientificName: "Iris virginica",
    subtitle: "The Virginia Iris",
    brief: "Largest species with long petals. Light purple with distinctive patterns.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg",
    description: "Iris Virginica, the Virginia Iris or Southern Blue Flag, is the largest of the three species in the dataset. Native to the eastern United States, it is found in swamps, coastal plains, and wetlands. It produces large, elegant flowers that are a key subject in ML feature analysis.",
    family: "Iridaceae (Iris Family)",
    genus: "Iris",
    characteristics: {
      sepalLength: "4.9 - 7.9 cm (Avg: 6.6 cm)",
      sepalWidth: "2.2 - 3.8 cm (Avg: 3.0 cm)",
      petalLength: "4.5 - 6.9 cm (Avg: 5.6 cm)",
      petalWidth: "1.4 - 2.5 cm (Avg: 2.0 cm)",
      size: "Large",
      colors: "Light purple, pale violet, violet-blue with bright yellow patches on the sepals."
    },
    mlFeatures: "Iris Virginica is the largest species. It overlaps significantly with Iris Versicolor. The KNN model relies heavily on Petal Width and Petal Length to separate the two: Virginica typically has a petal width greater than 1.8 cm and longer petals, which helps KNN distinguish it from Versicolor.",
    funFacts: [
      "It is highly adaptable and can grow in stagnant swamp waters up to six inches deep.",
      "The species name 'virginica' refers to the historic Virginia colony where it was first cataloged.",
      "Excellent for ecological restoration, rain gardens, and shoreline erosion control.",
      "Features a soft, velvet-like bright yellow crest at the base of its sepals."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550937078-433604f323a6?auto=format&fit=crop&w=600&q=80"
    ],
    knnExplanation: "KNN separates Iris Virginica from Versicolor by calculating Euclidean distances in a 4D feature space. Points with petal widths above 1.8 cm are almost always closest to Virginica neighbors."
  }
};

/* ─── Shared Species Page Component ─── */
function SpeciesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const s = SPECIES_DETAILS[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!s) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h1>Species Not Found</h1>
        <button onClick={() => navigate("/")} className="cta-button" style={{ marginTop: "20px" }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <span className="logo-icon">🌸</span> FloraAI
        </div>
        <div className="nav-links">
          <Link to="/">← Back to Home</Link>
        </div>
        <button className="github-btn" onClick={() => window.open("#", "_blank")}>
          GitHub
        </button>
      </nav>

      {/* 1. Hero Section */}
      <header className="species-hero">
        <div className="species-hero-content">
          <div className="ai-badge">🧬 SPECIES PROFILE</div>
          <h1>{s.name}</h1>
          <p className="scientific-name">Scientific Name: <em>{s.scientificName}</em></p>
          <p className="species-intro">{s.description}</p>
        </div>
        <div className="species-hero-image">
          <img src={s.image} alt={s.name} className="hero-img" />
        </div>
      </header>

      {/* 2. Overview Card */}
      <section className="card-section overview-section">
        <div className="section-header">
          <span className="section-icon">ℹ️</span>
          <h2>Overview</h2>
        </div>
        <div className="overview-content">
          <p>
            <strong>{s.name}</strong> belongs to the <strong>{s.family}</strong> within the genus <strong>{s.genus}</strong>.
            This species is unique due to its adaptation to its native habitat.
            {s.id === "setosa" && " It stands out as the most visually and statistically distinct group among the three Iris species, making it a critical baseline for classification tasks."}
            {s.id === "versicolor" && " It represents the perfect middle ground in size and features, bridging the gap between Setosa and Virginica, which poses a classic test for clustering and distance-based classification models."}
            {s.id === "virginica" && " It exhibits the largest overall dimensions, particularly in its petal structure, and represents the upper boundary of the dataset's numerical distributions."}
          </p>
        </div>
      </section>

      {/* 3. Characteristics Cards */}
      <section className="characteristics-section">
        <div className="section-header">
          <span className="section-icon">📐</span>
          <h2>Key Characteristics</h2>
        </div>
        <div className="stats-grid characteristics-grid">
          <div className="stat-card char-card">
            <strong>Avg Sepal Length</strong>
            <p>{s.characteristics.sepalLength}</p>
          </div>
          <div className="stat-card char-card">
            <strong>Avg Sepal Width</strong>
            <p>{s.characteristics.sepalWidth}</p>
          </div>
          <div className="stat-card char-card">
            <strong>Avg Petal Length</strong>
            <p>{s.characteristics.petalLength}</p>
          </div>
          <div className="stat-card char-card">
            <strong>Avg Petal Width</strong>
            <p>{s.characteristics.petalWidth}</p>
          </div>
          <div className="stat-card char-card">
            <strong>Flower Size</strong>
            <p>{s.characteristics.size}</p>
          </div>
          <div className="stat-card char-card">
            <strong>Common Colors</strong>
            <p>{s.characteristics.colors}</p>
          </div>
        </div>
      </section>

      {/* 4. Machine Learning Features */}
      <section className="card-section ml-features-section">
        <div className="section-header">
          <span className="section-icon">🧠</span>
          <h2>Machine Learning Features</h2>
        </div>
        <p className="dataset-desc">{s.mlFeatures}</p>
      </section>

      {/* 5. Fun Facts */}
      <section className="card-section fun-facts-section">
        <div className="section-header">
          <span className="section-icon">✨</span>
          <h2>Fun Facts</h2>
        </div>
        <ul className="dataset-list">
          {s.funFacts.map((fact, index) => (
            <li key={index}>✅ {fact}</li>
          ))}
        </ul>
      </section>

      {/* 6. AI Classification Summary */}
      <section className="card-section ai-summary-section">
        <div className="section-header">
          <span className="section-icon">🛡️</span>
          <h2>AI Classification Summary</h2>
        </div>
        <div className="ai-summary-card">
          <div className="summary-row">
            <strong>Algorithm Used:</strong>
            <span>K-Nearest Neighbors (KNN)</span>
          </div>
          <div className="summary-row">
            <strong>Dataset:</strong>
            <span>Scikit-learn Iris Dataset</span>
          </div>
          <div className="summary-row">
            <strong>Prediction Based On:</strong>
            <span>Sepal Length, Sepal Width, Petal Length, Petal Width</span>
          </div>
          <div className="summary-row">
            <strong>Model Role:</strong>
            <span>{s.knnExplanation}</span>
          </div>
        </div>
      </section>



      {/* Explore Other Species */}
      <section className="species-section">
        <div className="section-header">
          <span className="section-icon">🌸</span>
          <h2>Explore Other Species</h2>
        </div>
        <div className="species-grid">
          {Object.values(SPECIES_DETAILS)
            .filter((item) => item.id !== s.id)
            .map((item) => (
              <div className="species-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="species-info">
                  <h3>{item.name}</h3>
                  <p>{item.brief}</p>
                  <button className="learn-more" onClick={() => navigate(`/${item.id}`)}>
                    View Species
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 8. Footer */}
      <footer>
        <div className="footer-left">
          <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <span className="logo-icon">🌸</span> FloraAI
          </div>
          <p>AI Flower Classification<br/>Using KNN Algorithm</p>
        </div>
        <div className="footer-links">
          <strong>Quick Links</strong>
          <Link to="/">Home</Link>
          <a href="/#dataset">Dataset</a>
          <a href="/#pipeline">Pipeline</a>
          <a href="/#evaluation">Evaluation</a>
          <a href="/#predict">Predict</a>
          <a href="/#about">About</a>
        </div>
        <div className="footer-links">
          <strong>Connect</strong>
          <a href="https://github.com/underdographx" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/anuja-yadav-5392a6376/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="footer-right">
          <p>crafted with passion by <a href="https://www.linkedin.com/in/anuja-yadav-5392a6376/" target="_blank" rel="noreferrer" style={{color: 'var(--accent-color)', textDecoration: 'none'}}>Anuja Yadav</a></p>
          <p className="copyright">© 2026 FloraAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Home Page Component ─── */
function HomePage({ prediction, error, handleChange, predictFlower }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌸</span> FloraAI
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#dataset">Dataset</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#evaluation">Evaluation</a>
          <a href="#predict">Predict</a>
          <a href="#about">About</a>
        </div>
        <button className="github-btn">
          GitHub
        </button>
      </nav>

      {/* Hero Section (Compact ~30%) */}
      <header className="hero" id="home">
        <div className="hero-content">
          <div className="ai-badge">✨ AI POWERED</div>
          <h1>
            AI Flower <br />
            <span className="highlight">Classification</span>
          </h1>
          <h3>Machine Learning using <span className="highlight">K-Nearest Neighbors (KNN)</span></h3>
          <p>
            An intelligent system that classifies Iris flowers into their species
            using ML techniques and real data.
          </p>
          <a href="#predict" className="cta-button">Explore the Model ❯</a>
        </div>
        <div className="hero-image-container">
          <img src={heroImg} alt="AI Purple Iris" className="hero-img" />
          <div className="floating-badge badge-1">
            <span className="badge-icon">🗄️</span>
            <div>
              <strong>Iris Dataset</strong>
              <p>150 samples<br/>3 species</p>
            </div>
          </div>
          <div className="floating-badge badge-2">
            <span className="badge-icon">🧠</span>
            <div>
              <strong>KNN Algorithm</strong>
              <p>Instance-based learning</p>
            </div>
          </div>
        </div>
      </header>

      {/* AI Content (~70%) */}
      
      {/* AI Statistics */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🗄️</span>
          <div className="stat-info">
            <h2>150</h2>
            <strong>Dataset Samples</strong>
            <p>Iris Flower Dataset</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🌸</span>
          <div className="stat-info">
            <h2>3</h2>
            <strong>Classes</strong>
            <p>Setosa, Versicolor, Virginica</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📏</span>
          <div className="stat-info">
            <h2>4</h2>
            <strong>Features</strong>
            <p>Sepal & Petal Dimensions</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🧠</span>
          <div className="stat-info">
            <h2>KNN</h2>
            <strong>Algorithm</strong>
            <p>K-Nearest Neighbors</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div className="stat-info">
            <h2>100%</h2>
            <strong>Model Accuracy</strong>
            <p>On Test Data</p>
          </div>
        </div>
      </section>

      <div className="two-col-layout">
        {/* Dataset & Feature Info */}
        <section id="dataset" className="card-section">
          <div className="section-header">
            <span className="section-icon">📄</span>
            <h2>About Dataset & Features</h2>
          </div>
          <p className="dataset-desc">
            The <strong>Iris</strong> dataset is a classic and well-known dataset in
            machine learning. It contains 150 samples of iris flowers from three different species.
          </p>
          <ul className="dataset-list">
            <li>✅ 50 samples per species</li>
            <li>✅ 3 species: Iris Setosa, Iris Versicolor, Iris Virginica</li>
            <li>✅ 4 numerical features</li>
            <li>✅ Balanced and clean dataset</li>
          </ul>

          <h3 className="sub-heading">Feature Information</h3>
          <table className="feature-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sepal Length</td>
                <td>Length of the sepal in cm</td>
              </tr>
              <tr>
                <td>Sepal Width</td>
                <td>Width of the sepal in cm</td>
              </tr>
              <tr>
                <td>Petal Length</td>
                <td>Length of the petal in cm</td>
              </tr>
              <tr>
                <td>Petal Width</td>
                <td>Width of the petal in cm</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="card-section">
          <div className="section-header">
            <span className="section-icon">⚙️</span>
            <h2>Machine Learning Pipeline</h2>
          </div>
          <div className="pipeline-steps">
            <div className="step">
              <div className="step-icon">🗄️</div>
              <span>1. Dataset</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className="step">
              <div className="step-icon">🧹</div>
              <span>2. Preprocessing</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className="step">
              <div className="step-icon">📏</div>
              <span>3. Feature Scaling</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className="step">
              <div className="step-icon">✂️</div>
              <span>4. Train/Test Split</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className="step">
              <div className="step-icon">🧠</div>
              <span>5. KNN Training</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className="step">
              <div className="step-icon">🎯</div>
              <span>6. Prediction</span>
            </div>
            <div className="step-arrow">➔</div>
            <div className="step">
              <div className="step-icon">📊</div>
              <span>7. Evaluation</span>
            </div>
          </div>
        </section>
      </div>

      <div className="two-col-layout evaluation-layout">
        {/* Model Evaluation */}
        <section id="evaluation" className="card-section">
          <div className="section-header">
            <span className="section-icon">📈</span>
            <h2>Model Evaluation</h2>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-box">
              <span>Accuracy</span>
              <h2>100%</h2>
            </div>
            <div className="metric-box">
              <span>Precision</span>
              <h2>100%</h2>
            </div>
            <div className="metric-box">
              <span>Recall</span>
              <h2>100%</h2>
            </div>
            <div className="metric-box">
              <span>F1 Score</span>
              <h2>100%</h2>
            </div>
          </div>
          <div className="metric-footer">
            <p>The model performs exceptionally well on the test data.</p>
          </div>
        </section>

        {/* Confusion Matrix */}
        <section className="card-section">
          <div className="section-header">
            <h2>Confusion Matrix</h2>
          </div>
          <div className="matrix-container">
             <table className="matrix-table">
               <thead>
                 <tr>
                   <th></th>
                   <th>Setosa</th>
                   <th>Versicolor</th>
                   <th>Virginica</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <th>Setosa</th>
                   <td className="correct">10</td>
                   <td>0</td>
                   <td>0</td>
                 </tr>
                 <tr>
                   <th>Versicolor</th>
                   <td>0</td>
                   <td className="correct">10</td>
                   <td>0</td>
                 </tr>
                 <tr>
                   <th>Virginica</th>
                   <td>0</td>
                   <td>0</td>
                   <td className="correct">10</td>
                 </tr>
               </tbody>
             </table>
             <div className="matrix-legend">
               <div className="legend-item">
                 <span className="box correct-box"></span> Correct Prediction
               </div>
               <div className="legend-item">
                 <span className="box incorrect-box"></span> Incorrect Prediction
               </div>
             </div>
          </div>
        </section>
      </div>

      <div className="two-col-layout">
        {/* Prediction Form */}
        <section id="predict" className="card-section">
          <div className="section-header">
            <span className="section-icon">🌸</span>
            <h2>Predict Flower Species</h2>
          </div>
          
          <div className="prediction-form">
            <div className="input-group">
              <label>Sepal Length (cm)</label>
              <input type="number" placeholder="Enter sepal length" name="sepal_length" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Sepal Width (cm)</label>
              <input type="number" placeholder="Enter sepal width" name="sepal_width" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Petal Length (cm)</label>
              <input type="number" placeholder="Enter petal length" name="petal_length" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Petal Width (cm)</label>
              <input type="number" placeholder="Enter petal width" name="petal_width" onChange={handleChange} />
            </div>
            <button className="predict-btn" onClick={predictFlower}>
              ✨ Predict Flower
            </button>
            {error && <p className="error-text">{error}</p>}
          </div>
        </section>

        {/* Prediction Result */}
        <section className="card-section prediction-result">
          <div className="section-header">
            <span className="section-icon">🎯</span>
            <h2>Prediction Result</h2>
          </div>
          
          <div className="result-content">
            <div className="result-image-placeholder">
               {prediction ? "🌸" : "❓"}
            </div>
            <div className="result-details">
              <p className="label">Predicted Species</p>
              <h2 className="predicted-name">{prediction ? prediction.species : "Awaiting Input..."}</h2>
              {prediction && (
                <>
                  <p className="label">Confidence</p>
                  <h2 className="predicted-confidence">{prediction.confidence}</h2>
                </>
              )}
            </div>
            <div className="result-about">
              <p className="label">About this Flower</p>
              <p className="about-text">
                {prediction 
                  ? `${prediction.species} is one of the three species in the Iris dataset. Based on the measurements provided, the model is highly confident in this classification.`
                  : "Enter the sepal and petal measurements to predict the Iris species."}
              </p>
            </div>
            <div className="result-model">
              <p className="label">Classification Model</p>
              <p className="about-text" style={{ fontWeight: '500', color: 'var(--accent-color)' }}>
                K-Nearest Neighbors (KNN)
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Species Info */}
      <section id="about" className="species-section">
        <div className="section-header">
          <span className="section-icon">🌸</span>
          <h2>Iris Flower Species</h2>
        </div>
        
        <div className="species-grid">
          <div className="species-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg" alt="Iris Setosa" />
            <div className="species-info">
              <h3>Iris Setosa</h3>
              <p>Smallest species with narrow petals. Usually purple with white markings.</p>
              <button className="learn-more" onClick={() => navigate("/setosa")}>Learn More</button>
            </div>
          </div>
          <div className="species-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg" alt="Iris Versicolor" />
            <div className="species-info">
              <h3>Iris Versicolor</h3>
              <p>Medium-sized species with wide petals. Blue or purple with white/yellow markings.</p>
              <button className="learn-more" onClick={() => navigate("/versicolor")}>Learn More</button>
            </div>
          </div>
          <div className="species-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg" alt="Iris Virginica" />
            <div className="species-info">
              <h3>Iris Virginica</h3>
              <p>Largest species with long petals. Light purple with distinctive patterns.</p>
              <button className="learn-more" onClick={() => navigate("/virginica")}>Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-left">
          <div className="logo"><span className="logo-icon">🌸</span> FloraAI</div>
          <p>AI Flower Classification<br/>Using KNN Algorithm</p>
        </div>
        <div className="footer-links">
          <strong>Quick Links</strong>
          <a href="#home">Home</a>
          <a href="#dataset">Dataset</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#evaluation">Evaluation</a>
          <a href="#predict">Predict</a>
          <a href="#about">About</a>
        </div>
        <div className="footer-links">
          <strong>Connect</strong>
          <a href="https://github.com/underdographx" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/anuja-yadav-5392a6376/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="footer-right">
          <p>crafted with passion by <a href="https://www.linkedin.com/in/anuja-yadav-5392a6376/" target="_blank" rel="noreferrer" style={{color: 'var(--accent-color)', textDecoration: 'none'}}>Anuja Yadav</a></p>
          <p className="copyright">© 2026 FloraAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Main App Shell with Router ─── */
export default function App() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const predictFlower = async () => {
    try {
      setError(null);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sepal_length: Number(form.sepal_length),
          sepal_width: Number(form.sepal_width),
          petal_length: Number(form.petal_length),
          petal_width: Number(form.petal_width),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Backend not running or invalid input.");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            prediction={prediction}
            error={error}
            handleChange={handleChange}
            predictFlower={predictFlower}
          />
        }
      />
      <Route path="/:id" element={<SpeciesPage />} />
    </Routes>
  );
}