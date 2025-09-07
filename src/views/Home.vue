<template>
  <main class="home" role="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-content">
        <header class="hero-header">
          <h1 id="hero-title" class="hero-title">欢迎来到我的作品集</h1>
          <p class="hero-subtitle" role="doc-subtitle">前端开发者 | 创意工程师</p>
          <p class="hero-description">
            这里展示我在前端开发、UI/UX设计和3D交互方面的作品。
            从简单的小demo到复杂的Three.js 3D效果，记录我的学习和成长之路。
          </p>
        </header>
        <nav class="hero-buttons" aria-label="快速导航">
          <router-link to="/portfolio" class="btn btn-primary">查看作品</router-link>
          <router-link to="/threejs" class="btn btn-secondary">3D效果</router-link>
        </nav>
      </div>
      <aside class="hero-visual" aria-label="技能展示">
        <figure class="floating-card">
          <div class="card-content">
            <h3>技能</h3>
            <ul role="list">
              <li>Vue.js / React</li>
              <li>TypeScript</li>
              <li>CSS3 / Sass</li>
              <li>Three.js</li>
              <li>响应式设计</li>
            </ul>
          </div>
        </figure>
      </aside>
    </section>

    <section class="about" aria-labelledby="about-title">
      <div class="container">
        <header>
          <h2 id="about-title">关于我</h2>
        </header>
        <div class="about-grid">
          <article class="about-text">
            <p>
              我是一名充满热情的前端开发学习者，专注于创造优美的用户界面和交互体验。
              虽然刚刚开始前端开发之旅，但我对新技术充满好奇，特别是在3D网页交互和现代JavaScript框架方面。
            </p>
            <p>
              通过不断的学习和实践，我希望能够创造出既实用又具有视觉冲击力的web应用。
              每一个项目都是我成长路上的重要里程碑。
            </p>
          </article>
          <aside class="about-stats" aria-label="成就统计">
            <div class="stat">
              <h3>项目数量</h3>
              <p class="stat-number">10+</p>
            </div>
            <div class="stat">
              <h3>学习时长</h3>
              <p class="stat-number">6个月</p>
            </div>
            <div class="stat">
              <h3>掌握技术</h3>
              <p class="stat-number">8+</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  padding-top: 80px;
}

.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
}

.hero-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 0 2rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #e0e6ed;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #f1f3f4;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #667eea;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.card-content h3 {
  margin-bottom: 1rem;
  color: #f8f9fa;
}

.card-content ul {
  list-style: none;
  padding: 0;
}

.card-content li {
  margin-bottom: 0.5rem;
  color: #e9ecef;
}

.about {
  padding: 5rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1.5rem;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stat h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-stats {
    flex-direction: row;
    justify-content: center;
  }
}
</style>