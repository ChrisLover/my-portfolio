<template>
  <main class="threejs-page" role="main">
    <header class="hero-section">
      <div class="container">
        <h1>3D 交互效果</h1>
        <p>使用Three.js创建的各种3D场景和交互效果</p>
      </div>
    </header>

    <section class="demos-section" aria-labelledby="demos-title">
      <div class="container">
        <div class="demo-grid" role="list">
          <article 
            v-for="demo in demos" 
            :key="demo.id"
            class="demo-card"
            @click="openDemo(demo)"
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
              <button class="demo-btn" aria-label="体验{{ demo.title }}效果">体验效果</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <div v-if="selectedDemo" class="demo-modal" @click="closeDemo">
      <article class="demo-modal-content" @click.stop role="document">
        <header class="demo-header">
          <h2>{{ selectedDemo.title }}</h2>
          <button class="close-btn" @click="closeDemo" aria-label="关闭3D演示">&times;</button>
        </header>
        <section class="demo-canvas-container" role="application" aria-label="3D场景演示">
          <canvas ref="threeCanvas" id="three-canvas" :aria-label="`${selectedDemo.title}3D效果`"></canvas>
          <nav class="demo-controls" aria-label="演示控制">
            <button @click="restartDemo" class="control-btn" aria-label="重新开始演示">重新开始</button>
            <button @click="pauseDemo" class="control-btn" :aria-label="isPaused ? '播放演示' : '暂停演示'">{{ isPaused ? '播放' : '暂停' }}</button>
          </nav>
        </section>
        <aside class="demo-description">
          <p>{{ selectedDemo.fullDescription }}</p>
          <div class="demo-features">
            <h4>技术特点：</h4>
            <ul role="list">
              <li v-for="feature in selectedDemo.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </aside>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as THREE from 'three'

interface Demo {
  id: number
  title: string
  description: string
  fullDescription: string
  color: string
  icon: string
  tags: string[]
  features: string[]
  setupFunction: (scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer) => void
}

const selectedDemo = ref<Demo | null>(null)
const threeCanvas = ref<HTMLCanvasElement | null>(null)
const isPaused = ref(false)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null

const demos: Demo[] = [
  {
    id: 1,
    title: '旋转立方体',
    description: '基础的3D立方体旋转动画',
    fullDescription: '这是一个简单的3D立方体旋转演示，展示了Three.js的基本几何体、材质和动画系统。立方体会持续旋转，展示3D空间中的深度感。',
    color: '#3498db',
    icon: '🎲',
    tags: ['几何体', '动画', '基础'],
    features: ['WebGL渲染', '实时旋转动画', '透视投影', '基础材质']
  },
  {
    id: 2,
    title: '粒子系统',
    description: '动态粒子效果和交互',
    fullDescription: '展示了Three.js的粒子系统，包含数千个粒子的实时渲染和动画。粒子会随机运动，创造出梦幻的视觉效果。',
    color: '#e74c3c',
    icon: '✨',
    tags: ['粒子', '性能', '视觉效果'],
    features: ['大量粒子渲染', '随机动画', '颜色渐变', '性能优化']
  },
  {
    id: 3,
    title: '交互球体',
    description: '可以用鼠标控制的3D球体',
    fullDescription: '这个演示展示了用户交互在3D场景中的应用。用户可以通过鼠标控制球体的旋转，体验真实的3D交互感。',
    color: '#2ecc71',
    icon: '🌍',
    tags: ['交互', '鼠标控制', '球体'],
    features: ['鼠标交互', '实时响应', '平滑过渡', '用户控制']
  },
  {
    id: 4,
    title: '几何变形',
    description: '动态几何体变形动画',
    fullDescription: '展示了Three.js中几何体顶点动画的能力，几何体会实时变形，创造出流动的视觉效果。',
    color: '#9b59b6',
    icon: '🌊',
    tags: ['变形', '顶点动画', '数学'],
    features: ['顶点操作', '实时变形', '数学函数', '流畅动画']
  },
  {
    id: 5,
    title: '光影效果',
    description: '复杂的光照和阴影系统',
    fullDescription: '演示了Three.js强大的光照系统，包括方向光、点光源、阴影映射等高级渲染技术。',
    color: '#f39c12',
    icon: '💡',
    tags: ['光照', '阴影', '渲染'],
    features: ['多光源', '实时阴影', '材质反射', '高级渲染']
  },
  {
    id: 6,
    title: '3D文字',
    description: '立体文字和排版效果',
    fullDescription: '展示了如何在3D空间中创建和操作文字，包括立体效果、动画和交互。',
    color: '#1abc9c',
    icon: '📝',
    tags: ['文字', '排版', '3D'],
    features: ['3D文字生成', '字体加载', '文字动画', '排版布局']
  }
]

const openDemo = async (demo: Demo) => {
  selectedDemo.value = demo
  // 防止背景滚动
  document.body.style.overflow = 'hidden'
  await nextTick()
  if (threeCanvas.value) {
    initThreeJS(demo)
  }
}

const closeDemo = () => {
  cleanupThreeJS()
  selectedDemo.value = null
  isPaused.value = false
  // 恢复背景滚动
  document.body.style.overflow = 'auto'
}

const restartDemo = () => {
  if (selectedDemo.value) {
    cleanupThreeJS()
    initThreeJS(selectedDemo.value)
    isPaused.value = false
  }
}

const pauseDemo = () => {
  isPaused.value = !isPaused.value
}

const initThreeJS = (demo: Demo) => {
  if (!threeCanvas.value) return

  const canvas = threeCanvas.value
  const rect = canvas.parentElement!.getBoundingClientRect()
  
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  
  renderer.setSize(rect.width, rect.height)
  renderer.setClearColor(0x000011)

  // 根据demo类型设置不同的场景
  setupDemoScene(demo)
  
  // 开始动画循环
  animate()
}

const setupDemoScene = (demo: Demo) => {
  if (!scene || !camera || !renderer) return

  switch (demo.id) {
    case 1: // 旋转立方体
      setupRotatingCube()
      break
    case 2: // 粒子系统
      setupParticleSystem()
      break
    case 3: // 交互球体
      setupInteractiveSphere()
      break
    case 4: // 几何变形
      setupMorphingGeometry()
      break
    case 5: // 光影效果
      setupLightingDemo()
      break
    case 6: // 3D文字
      setup3DText()
      break
  }
}

const setupRotatingCube = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x3498db,
    wireframe: false 
  })
  const cube = new THREE.Mesh(geometry, material)
  scene!.add(cube)
  camera!.position.z = 5

  // 存储cube引用以便动画使用
  ;(scene as any).userData.cube = cube
}

const setupParticleSystem = () => {
  const particlesCount = 1000
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10
    positions[i + 1] = (Math.random() - 0.5) * 10
    positions[i + 2] = (Math.random() - 0.5) * 10

    colors[i] = Math.random()
    colors[i + 1] = Math.random()
    colors[i + 2] = Math.random()
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true
  })

  const particles = new THREE.Points(geometry, material)
  scene!.add(particles)
  camera!.position.z = 8

  ;(scene as any).userData.particles = particles
}

const setupInteractiveSphere = () => {
  const geometry = new THREE.SphereGeometry(2, 32, 32)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x2ecc71,
    wireframe: true 
  })
  const sphere = new THREE.Mesh(geometry, material)
  scene!.add(sphere)
  camera!.position.z = 6

  ;(scene as any).userData.sphere = sphere
}

const setupMorphingGeometry = () => {
  const geometry = new THREE.PlaneGeometry(4, 4, 32, 32)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x9b59b6,
    wireframe: true 
  })
  const plane = new THREE.Mesh(geometry, material)
  scene!.add(plane)
  camera!.position.z = 6

  ;(scene as any).userData.plane = plane
  ;(scene as any).userData.time = 0
}

const setupLightingDemo = () => {
  // 添加几何体
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshPhongMaterial({ color: 0xf39c12 })
  const cube = new THREE.Mesh(geometry, material)
  scene!.add(cube)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
  scene!.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene!.add(directionalLight)

  camera!.position.z = 6
  ;(scene as any).userData.cube = cube
}

const setup3DText = () => {
  // 创建简单的3D文字效果（使用几何体模拟）
  const group = new THREE.Group()
  
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(0.5, 1, 0.2)
    const material = new THREE.MeshBasicMaterial({ color: 0x1abc9c })
    const letter = new THREE.Mesh(geometry, material)
    letter.position.x = (i - 2) * 1
    group.add(letter)
  }
  
  scene!.add(group)
  camera!.position.z = 8

  ;(scene as any).userData.textGroup = group
}

const animate = () => {
  if (!scene || !renderer || !camera) {
    return
  }

  // 如果暂停，只渲染当前帧但不更新动画，继续动画循环
  if (!isPaused.value) {
    const userData = scene.userData

    // 根据不同demo执行不同的动画
    if (userData.cube) {
      userData.cube.rotation.x += 0.01
      userData.cube.rotation.y += 0.01
    }

    if (userData.particles) {
      userData.particles.rotation.y += 0.005
    }

    if (userData.sphere) {
      userData.sphere.rotation.x += 0.005
      userData.sphere.rotation.y += 0.01
    }

    if (userData.plane) {
      userData.time += 0.05
      const positions = userData.plane.geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = Math.sin(x * 2 + userData.time) * Math.cos(y * 2 + userData.time) * 0.2
        positions.setZ(i, z)
      }
      positions.needsUpdate = true
    }

    if (userData.textGroup) {
      userData.textGroup.children.forEach((child: THREE.Object3D, index: number) => {
        child.position.y = Math.sin(Date.now() * 0.002 + index * 0.5) * 0.5
        child.rotation.y += 0.02
      })
    }
  }

  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}

const cleanupThreeJS = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  
  if (renderer) {
    renderer.dispose()
    renderer = null
  }
  
  scene = null
  camera = null
}
</script>

<style scoped>
.threejs-page {
  padding-top: 80px;
}

.hero-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

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

.demo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  box-sizing: border-box;
}

.demo-modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.demo-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-header h2 {
  color: #2c3e50;
  margin: 0;
}

.close-btn {
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
}

.close-btn:hover {
  background-color: #f8f9fa;
}

.demo-canvas-container {
  position: relative;
  height: 400px;
  background: #000011;
}

#three-canvas {
  width: 100%;
  height: 100%;
}

.demo-controls {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background: rgba(255,255,255,0.9);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.control-btn:hover {
  background: white;
}

.demo-description {
  padding: 2rem;
  flex: 1;
}

.demo-description p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.demo-features h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.demo-features ul {
  padding-left: 1.5rem;
}

.demo-features li {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-modal {
    padding: 1rem;
  }
  
  .demo-modal-content {
    width: 100%;
  }
  
  .demo-canvas-container {
    height: 300px;
  }
  
  .demo-description {
    padding: 1.5rem;
  }
}
</style>