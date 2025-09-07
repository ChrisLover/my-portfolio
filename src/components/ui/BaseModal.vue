<template>
  <div v-if="visible" class="modal-overlay" @click="handleClose">
    <div class="modal-content" @click.stop :class="contentClass">
      <header v-if="showHeader" class="modal-header">
        <h2>{{ title }}</h2>
        <button class="modal-close" @click="handleClose" aria-label="关闭对话框">&times;</button>
      </header>
      <div class="modal-body">
        <slot></slot>
      </div>
      <footer v-if="$slots.footer" class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { preventBackgroundScroll, restoreBackgroundScroll } from '@/utils/dom'

interface Props {
  visible: boolean
  title?: string
  showHeader?: boolean
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: true,
  contentClass: ''
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}

watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    preventBackgroundScroll()
  } else {
    restoreBackgroundScroll()
  }
})
</script>

<style scoped>
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

.modal-body {
  max-height: calc(90vh - 200px);
  overflow-y: auto;
}

.modal-footer {
  padding: 1rem 2rem 2rem 2rem;
  background: #f8f9fa;
  border-radius: 0 0 16px 16px;
}

@media (max-width: 768px) {
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
}
</style>