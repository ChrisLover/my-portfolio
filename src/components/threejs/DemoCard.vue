<template>
  <article 
    class="demo-card"
    @click="$emit('click', demo)"
    role="listitem"
    tabindex="0"
    :aria-label="`体验3D效果: ${demo.title}`"
  >
    <figure class="demo-preview">
      <div class="demo-placeholder" :style="{ backgroundColor: demo.color }">
        <div class="demo-icon" role="img" :aria-label="demo.title">{{ demo.icon }}</div>
      </div>
    </figure>
    <div class="demo-info">
      <header>
        <h3>{{ demo.title }}</h3>
      </header>
      <p>{{ demo.description }}</p>
      <footer class="demo-tags">
        <span v-for="tag in demo.tags" :key="tag" class="tag">{{ tag }}</span>
      </footer>
      <button class="demo-btn" :aria-label="`体验${demo.title}效果`">体验效果</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Demo } from '@/data/demos'

defineProps<{
  demo: Demo
}>()

defineEmits<{
  click: [demo: Demo]
}>()
</script>

<style scoped>
.demo-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.demo-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.15);
}

.demo-preview {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.demo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, var(--bg-color, #3498db), rgba(255,255,255,0.1));
  position: relative;
}

.demo-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.demo-card:hover .demo-placeholder::before {
  left: 100%;
}

.demo-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.demo-info {
  padding: 1.5rem;
}

.demo-info h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.3rem;
}

.demo-info p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.demo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.demo-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>