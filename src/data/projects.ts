export interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  tags: string[]
  category: string
  demo?: string
  code?: string
}

export interface Category {
  id: string
  name: string
}

export const categories: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'vue', name: 'Vue项目' },
  { id: 'css', name: 'CSS效果' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'ui', name: 'UI组件' }
]

export const projects: Project[] = [
  {
    id: 1,
    title: '响应式作品集网站',
    description: '使用Vue3和TypeScript构建的个人作品集网站',
    fullDescription: '这是我的第一个Vue3项目，使用了TypeScript、Vue Router等现代前端技术。网站具有响应式设计，支持多种设备访问。包含了我的个人信息、技能展示、项目作品等模块。',
    image: '/placeholder-1.svg',
    tags: ['Vue3', 'TypeScript', 'CSS3', '响应式'],
    category: 'vue'
  },
  {
    id: 2,
    title: 'CSS动画特效集合',
    description: '纯CSS实现的各种动画效果和交互特效',
    fullDescription: '收集和创建了多种CSS动画效果，包括loading动画、hover效果、页面转场动画等。所有效果都使用纯CSS实现，无需JavaScript，性能优秀。',
    image: '/placeholder-2.svg',
    tags: ['CSS3', 'Animation', 'Keyframes'],
    category: 'css'
  },
  {
    id: 3,
    title: '交互式计算器',
    description: '功能完整的JavaScript计算器应用',
    fullDescription: '使用原生JavaScript开发的计算器应用，支持基本的数学运算，具有清晰的用户界面和流畅的交互体验。代码结构清晰，易于扩展。',
    image: '/placeholder-3.svg',
    tags: ['JavaScript', 'DOM', '数学运算'],
    category: 'javascript'
  },
  {
    id: 4,
    title: '模态框组件',
    description: '可复用的Vue模态框组件',
    fullDescription: '开发了一个功能丰富的模态框组件，支持自定义内容、多种尺寸、动画效果等。组件API设计友好，易于在项目中复用。',
    image: '/placeholder-4.svg',
    tags: ['Vue3', '组件开发', 'Props', 'Emit'],
    category: 'ui'
  },
  {
    id: 5,
    title: '轮播图组件',
    description: '支持多种切换效果的图片轮播组件',
    fullDescription: '自主开发的轮播图组件，支持自动播放、手动切换、无限循环等功能。提供了多种切换动画效果，可通过配置灵活调整。',
    image: '/placeholder-5.svg',
    tags: ['JavaScript', 'CSS动画', '组件化'],
    category: 'ui'
  },
  {
    id: 6,
    title: '待办事项应用',
    description: '全功能的任务管理应用',
    fullDescription: '使用Vue3开发的待办事项管理应用，支持添加、编辑、删除、完成状态切换等功能。数据持久化存储，界面简洁美观。',
    image: '/placeholder-6.svg',
    tags: ['Vue3', 'LocalStorage', 'CRUD'],
    category: 'vue'
  }
]