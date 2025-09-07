<template>
  <main class="portfolio" role="main">
    <header class="hero-section">
      <div class="container">
        <h1>我的作品集</h1>
        <p>这里展示我在学习前端开发过程中创建的各种项目和小demo</p>
      </div>
    </header>

    <section class="portfolio-content" aria-labelledby="projects-title">
      <div class="container">
        <nav class="filter-tabs" aria-label="项目分类筛选">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
            :aria-pressed="activeCategory === category.id"
          >
            {{ category.name }}
          </button>
        </nav>

        <section class="projects-grid" aria-label="项目列表">
          <ProjectCard
            v-for="project in filteredProjects" 
            :key="project.id"
            :project="project"
            @click="openProject"
          />
        </section>

        <aside v-if="filteredProjects.length === 0" class="empty-state" role="status">
          <h3>暂无该类型的作品</h3>
          <p>更多精彩内容正在制作中...</p>
        </aside>
      </div>
    </section>

    <BaseModal 
      :visible="!!selectedProject" 
      :title="selectedProject?.title"
      @close="closeModal"
    >
      <figure v-if="selectedProject">
        <img 
          :src="selectedProject.image" 
          :alt="selectedProject.title"
          @error="handleImageError"
          loading="lazy"
        />
      </figure>
      <div class="project-detail-content">
        <p class="project-detail">{{ selectedProject?.fullDescription }}</p>
      </div>
      
      <template #footer>
        <div class="project-links">
          <a v-if="selectedProject?.demo" :href="selectedProject.demo" target="_blank" class="btn btn-primary" rel="noopener">
            在线演示
          </a>
          <a v-if="selectedProject?.code" :href="selectedProject.code" target="_blank" class="btn btn-secondary" rel="noopener">
            查看代码
          </a>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, categories, type Project } from '@/data/projects'
import { handleImageError } from '@/utils/dom'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const activeCategory = ref('all')
const selectedProject = ref<Project | null>(null)

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

const openProject = (id: number) => {
  selectedProject.value = projects.find(p => p.id === id) || null
}

const closeModal = () => {
  selectedProject.value = null
}
</script>

<style scoped>
.portfolio {
  padding-top: 80px;
}

.hero-section {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  border: none;
  background-color: #f8f9fa;
  color: #6c757d;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: #e9ecef;
}

.filter-btn.active {
  background-color: #3498db;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.project-image {
  position: relative;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.view-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.project-info p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #6c757d;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 0;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalAppear 0.3s ease-out;
  flex-shrink: 0;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border-radius: 16px 16px 0 0;
}

.modal-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background-color: #e9ecef;
  color: #495057;
}

.modal-content figure {
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.modal-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.project-detail-content {
  padding: 2rem;
  max-height: 200px;
  overflow-y: auto;
}

.project-detail {
  line-height: 1.7;
  color: #555;
  margin: 0;
}

.project-links {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem 2rem 2rem;
  background: #f8f9fa;
  border-radius: 0 0 16px 16px;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-overlay {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
  
  .modal-content {
    width: 100%;
    max-width: none;
    max-height: 95vh;
    margin: 0;
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
  
  .modal-header h2 {
    font-size: 1.3rem;
  }
  
  .modal-content img {
    height: 200px;
  }
  
  .project-detail-content {
    padding: 1.5rem;
    max-height: 150px;
  }
  
  .project-links {
    flex-direction: column;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
  
  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
}
</style>