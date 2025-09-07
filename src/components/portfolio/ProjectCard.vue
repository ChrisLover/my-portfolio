<template>
  <article 
    class="project-card"
    @click="$emit('click', project.id)"
    :aria-label="`查看项目: ${project.title}`"
    tabindex="0"
    role="button"
  >
    <figure class="project-image">
      <img 
        :src="project.image" 
        :alt="project.title"
        @error="handleImageError"
        loading="lazy"
      />
      <div class="project-overlay">
        <button class="view-btn" aria-label="查看项目详情">查看项目</button>
      </div>
    </figure>
    <div class="project-info">
      <header>
        <h3>{{ project.title }}</h3>
      </header>
      <p>{{ project.description }}</p>
      <footer class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '@/data/projects'
import { handleImageError } from '@/utils/dom'

defineProps<{
  project: Project
}>()

defineEmits<{
  click: [id: number]
}>()
</script>

<style scoped>
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
</style>