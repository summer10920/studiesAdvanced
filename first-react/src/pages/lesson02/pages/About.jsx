import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>👋 關於我</h1>
      
      <section className="about-section">
        <h2>自我介紹</h2>
        <p>
          我是一名熱愛前端開發的工程師，專注於 React 生態系的學習與實踐。
          透過建立各種專案來累積經驗，並持續精進技術能力。
        </p>
      </section>

      <section className="about-section">
        <h2>技能</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>前端開發</h3>
            <p>HTML, CSS, JavaScript, React, Vue</p>
          </div>
          <div className="skill-card">
            <h3>工具與框架</h3>
            <p>Vite, Webpack, Git, NPM/PNPM</p>
          </div>
          <div className="skill-card">
            <h3>後端基礎</h3>
            <p>Node.js, Express, RESTful API</p>
          </div>
          <div className="skill-card">
            <h3>設計工具</h3>
            <p>Figma, Photoshop, Illustrator</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>學習歷程</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>2024</h3>
            <p>開始學習 React 19 與 React Router v7</p>
          </div>
          <div className="timeline-item">
            <h3>2023</h3>
            <p>深入學習 JavaScript ES6+ 語法</p>
          </div>
          <div className="timeline-item">
            <h3>2022</h3>
            <p>開始前端開發學習之旅</p>
          </div>
        </div>
      </section>
    </div>
  );
}
