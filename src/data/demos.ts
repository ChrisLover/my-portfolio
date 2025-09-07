import * as THREE from 'three'

export interface Demo {
  id: number
  title: string
  description: string
  fullDescription: string
  color: string
  icon: string
  tags: string[]
  features: string[]
  setupFunction: (scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) => void
}

export const demos: Demo[] = [
  {
    id: 1,
    title: '旋转立方体',
    description: '基础的3D立方体旋转动画',
    fullDescription: '这是一个简单的3D立方体旋转演示，展示了Three.js的基本几何体、材质和动画系统。立方体会持续旋转，展示3D空间中的深度感。',
    color: '#3498db',
    icon: '🎲',
    tags: ['几何体', '动画', '基础'],
    features: ['WebGL渲染', '实时旋转动画', '透视投影', '基础材质'],
    setupFunction: () => {} // 暂时为空，稍后实现
  },
  {
    id: 2,
    title: '粒子系统',
    description: '动态粒子效果和交互',
    fullDescription: '展示了Three.js的粒子系统，包含数千个粒子的实时渲染和动画。粒子会随机运动，创造出梦幻的视觉效果。',
    color: '#e74c3c',
    icon: '✨',
    tags: ['粒子', '性能', '视觉效果'],
    features: ['大量粒子渲染', '随机动画', '颜色渐变', '性能优化'],
    setupFunction: () => {}
  },
  {
    id: 3,
    title: '交互球体',
    description: '可以用鼠标控制的3D球体',
    fullDescription: '这个演示展示了用户交互在3D场景中的应用。用户可以通过鼠标控制球体的旋转，体验真实的3D交互感。',
    color: '#2ecc71',
    icon: '🌍',
    tags: ['交互', '鼠标控制', '球体'],
    features: ['鼠标交互', '实时响应', '平滑过渡', '用户控制'],
    setupFunction: () => {}
  },
  {
    id: 4,
    title: '几何变形',
    description: '动态几何体变形动画',
    fullDescription: '展示了Three.js中几何体顶点动画的能力，几何体会实时变形，创造出流动的视觉效果。',
    color: '#9b59b6',
    icon: '🌊',
    tags: ['变形', '顶点动画', '数学'],
    features: ['顶点操作', '实时变形', '数学函数', '流畅动画'],
    setupFunction: () => {}
  },
  {
    id: 5,
    title: '光影效果',
    description: '复杂的光照和阴影系统',
    fullDescription: '演示了Three.js强大的光照系统，包括方向光、点光源、阴影映射等高级渲染技术。',
    color: '#f39c12',
    icon: '💡',
    tags: ['光照', '阴影', '渲染'],
    features: ['多光源', '实时阴影', '材质反射', '高级渲染'],
    setupFunction: () => {}
  },
  {
    id: 6,
    title: '3D文字',
    description: '立体文字和排版效果',
    fullDescription: '展示了如何在3D空间中创建和操作文字，包括立体效果、动画和交互。',
    color: '#1abc9c',
    icon: '📝',
    tags: ['文字', '排版', '3D'],
    features: ['3D文字生成', '字体加载', '文字动画', '排版布局'],
    setupFunction: () => {}
  }
]