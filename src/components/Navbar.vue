<template>
  <header class="site-header">
    <nav class="navbar" role="navigation" aria-label="主导航">
      <div class="nav-container">
        <router-link to="/" class="nav-logo" aria-label="返回首页">我的作品集</router-link>
        <ul class="nav-menu" role="menubar">
          <li class="nav-item" role="none">
            <router-link to="/" class="nav-link" active-class="nav-active" role="menuitem">首页</router-link>
          </li>
          <li class="nav-item" role="none">
            <router-link to="/portfolio" class="nav-link" active-class="nav-active" role="menuitem">作品展示</router-link>
          </li>
          <li class="nav-item" role="none">
            <router-link to="/threejs" class="nav-link" active-class="nav-active" role="menuitem">3D效果</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-logo {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
  background-color: rgba(52, 152, 219, 0.1);
}

.nav-active {
  color: #3498db !important;
  background-color: rgba(52, 152, 219, 0.1);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>