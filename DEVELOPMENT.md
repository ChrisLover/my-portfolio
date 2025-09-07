# 个人作品集网站开发文档

## 📋 项目概述

这是一个使用 **Vue 3 + TypeScript + Vite** 构建的个人作品集网站，展示前端开发项目、CSS效果演示和Three.js 3D交互效果。

### 📱 响应式布局系统

### 🏗️ 布局技术架构

项目采用**现代混合布局方式**，主要使用 **CSS Grid + Flexbox** 结合的响应式设计策略。

#### 1. **CSS Grid 布局**
用于复杂的二维布局场景：

```css
/* 首页英雄区域 - 桌面端双列布局 */
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 左右等分 */
  gap: 4rem;
}

/* 项目网格 - 自适应列数 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

/* 关于我区域 - 内容与侧边栏 */
.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;  /* 内容占2份，侧边栏1份 */
  gap: 3rem;
}
```

#### 2. **Flexbox 布局**
用于一维布局和对齐：

```css
/* 导航栏 - 水平分布 */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 按钮组 - 水平排列 */
.hero-buttons {
  display: flex;
  gap: 1rem;
}

/* 标签 - 换行排列 */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

### 📏 容器管理系统

```css
/* 统一容器标准 */
.container {
  max-width: 1200px;  /* 最大宽度限制 */
  margin: 0 auto;     /* 水平居中 */
  padding: 0 2rem;    /* 左右内边距 */
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### 📱 多端兼容性策略

#### 1. **Viewport 配置**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

#### 2. **断点系统**
| 设备类型 | 屏幕宽度 | 布局策略 |
|---------|---------|---------|
| **桌面端** | > 768px | 多列布局，网格系统 |
| **平板** | 768px - 1024px | 过渡布局，部分响应 |
| **手机** | < 768px | 单列布局，垂直堆叠 |

#### 3. **响应式适配实现**

**首页适配：**
```css
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;  /* 双列→单列 */
    text-align: center;          /* 居中对齐 */
  }
  .hero-title {
    font-size: 2.5rem;          /* 缩小标题 */
  }
}
```

**作品集适配：**
```css
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;  /* 强制单列 */
  }
  .project-links {
    flex-direction: column;      /* 按钮垂直排列 */
  }
}
```

**3D页面适配：**
```css
@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;  /* 演示卡片单列 */
  }
  .demo-canvas-container {
    height: 300px;              /* 缩小画布高度 */
  }
}
```

**模态框适配：**
```css
@media (max-width: 768px) {
  .modal-overlay {
    align-items: flex-start;     /* 顶部对齐 */
    padding: 1rem;
  }
  .modal-content {
    width: 100%;                /* 全宽 */
    max-height: 95vh;           /* 限制高度 */
  }
}
```

### 🎯 设计原则

1. **内容优先** - 确保内容在任何设备上都可读
2. **渐进增强** - 从小屏幕向大屏幕扩展
3. **性能考虑** - 避免复杂的JavaScript计算布局
4. **触摸友好** - 按钮最小尺寸44px，合适点击区域

### 🔧 关键技术特点

- **自适应网格**: `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`
- **弹性布局**: 大量使用`flex`进行对齐和分布
- **流式排版**: 使用相对单位 (`rem`, `em`, `%`)
- **统一容器**: 1200px最大宽度，居中显示

## 🛠️ 技术栈
- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **3D图形库**: Three.js
- **样式方案**: 原生CSS + Scoped CSS

## 🗂️ 项目结构

```
my-website/
├── src/
│   ├── components/           # 组件目录
│   │   ├── ui/              # 通用UI组件
│   │   │   └── BaseModal.vue    # 通用模态框组件
│   │   ├── portfolio/       # 作品集相关组件
│   │   │   └── ProjectCard.vue  # 项目卡片组件
│   │   ├── threejs/         # Three.js相关组件
│   │   │   └── DemoCard.vue     # 3D演示卡片组件
│   │   └── Navbar.vue           # 导航栏组件
│   ├── data/                    # 数据文件
│   │   ├── projects.ts          # 项目数据定义
│   │   └── demos.ts             # 3D演示数据定义
│   ├── utils/                   # 工具函数
│   │   ├── dom.ts               # DOM操作工具
│   │   └── threejs.ts           # Three.js场景管理器
│   ├── views/                   # 页面组件
│   │   ├── Home.vue             # 首页
│   │   ├── Portfolio.vue        # 作品集页面
│   │   └── ThreeJS.vue          # 3D效果页面
│   ├── router/                  # 路由配置
│   │   └── index.ts
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 应用入口
│   └── style.css                # 全局样式
├── public/                      # 静态资源
│   └── placeholder-*.svg        # 项目占位符图片
├── index.html                   # HTML入口文件
├── vite.config.ts              # Vite配置
├── tsconfig.app.json           # TypeScript配置
└── package.json                # 项目配置
```

## 🚀 开发环境搭建

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
访问：http://localhost:5173 (或显示的端口)

### 3. 构建生产版本
```bash
npm run build
```

### 4. 预览生产构建
```bash
npm run preview
```

## 🎨 核心功能模块

### 🏠 首页模块 (Home.vue)
- **英雄区域**: 个人介绍和技能展示
- **关于我**: 个人简介和统计信息
- **技能卡片**: 浮动动画效果
- **响应式设计**: 适配移动端

### 📁 作品集模块 (Portfolio.vue)
- **项目筛选**: 按分类过滤项目
- **项目卡片**: 悬停效果和图片展示
- **模态框**: 查看项目详情
- **响应式网格**: 自适应布局

### 🎮 3D效果模块 (ThreeJS.vue)
- **演示卡片**: 6种不同3D效果
- **3D场景**: Three.js实时渲染
- **交互控制**: 暂停/播放/重新开始
- **性能优化**: 动画循环管理

## 🔧 重要配置说明

### 1. 路径别名配置
`vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': resolve(__dirname, 'src')
  }
}
```

`tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2. 路由配置
`src/router/index.ts`:
```typescript
const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/threejs', component: ThreeJS }
]
```

## 📝 开发注意事项

### ⚠️ 重要提醒

1. **组件命名规范**
   - 使用PascalCase命名组件文件
   - 组件名称与文件名保持一致

2. **TypeScript类型安全**
   - 所有数据结构都有明确的接口定义
   - 使用`defineProps<T>()`和`defineEmits<T>()`

3. **样式作用域**
   - 全局样式统一放在`src/style.css`中
   - 组件样式使用`scoped`确保样式隔离
   - App.vue保持简洁，只负责布局结构

4. **Three.js内存管理**
   - 在组件销毁时调用`cleanup()`
   - 及时取消动画帧请求

### 🎯 性能优化要点

1. **图片加载**
   - 使用`loading="lazy"`延迟加载
   - 提供错误处理机制

2. **动画优化**
   - 使用`requestAnimationFrame`
   - 避免在非激活状态下执行动画

3. **代码分割**
   - 按页面组织组件
   - 使用动态导入(如需要)

## 🧩 组件使用指南

### BaseModal 通用模态框
```vue
<BaseModal 
  :visible="showModal" 
  title="标题"
  @close="handleClose"
>
  <div>模态框内容</div>
  <template #footer>
    <button>确定</button>
  </template>
</BaseModal>
```

### ProjectCard 项目卡片
```vue
<ProjectCard
  :project="project"
  @click="handleClick"
/>
```

### DemoCard 3D演示卡片
```vue
<DemoCard
  :demo="demo"
  @click="handleDemoClick"
/>
```

## 📊 数据结构说明

### Project 项目数据
```typescript
interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  tags: string[]
  category: string
  demo?: string    // 演示链接
  code?: string    // 代码链接
}
```

### Demo 3D演示数据
```typescript
interface Demo {
  id: number
  title: string
  description: string
  fullDescription: string
  color: string     // 卡片背景色
  icon: string      // 表情符号图标
  tags: string[]
  features: string[]
}
```

## 🔄 常见开发任务

### 1. 添加新项目
1. 在`src/data/projects.ts`中添加项目数据
2. 将项目图片放入`public/`目录
3. 如需新分类，更新`categories`数组

### 2. 添加新的3D演示
1. 在`src/data/demos.ts`中添加演示数据
2. 在`ThreeJS.vue`的`setupScene()`中添加对应的场景设置
3. 在`animate()`中添加动画逻辑

### 3. 修改样式主题
1. 更新`src/style.css`中的全局样式
2. 修改各组件的`<style scoped>`部分
3. 调整颜色变量和字体设置

### 4. 添加新页面
1. 在`src/views/`创建新的页面组件
2. 在`src/router/index.ts`添加路由配置
3. 在导航栏`Navbar.vue`添加链接

## 🐛 常见问题解决

### 问题1: Three.js暂停/播放不工作
**原因**: 动画循环被完全停止
**解决**: 确保`requestAnimationFrame`始终被调用，只在播放状态才更新动画属性

### 问题2: 模态框不居中
**原因**: 使用了`<dialog>`标签的默认样式
**解决**: 使用`<div>`配合flex布局实现居中

### 问题3: 图片不显示
**原因**: 外部图片服务不可用
**解决**: 使用本地SVG占位符，添加错误处理函数

### 问题4: 路径别名不工作
**原因**: Vite和TypeScript配置不一致
**解决**: 同时配置`vite.config.ts`和`tsconfig.app.json`

## 📈 扩展建议

### 短期优化
- [ ] 添加暗黑模式切换
- [ ] 实现项目搜索功能
- [ ] 添加页面加载动画
- [ ] 优化移动端体验

### 长期规划
- [ ] 集成CMS系统管理内容
- [ ] 添加博客功能模块
- [ ] 实现用户评论系统
- [ ] 加入数据统计功能

## 🔗 相关资源

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [Three.js 官方文档](https://threejs.org/docs/)
- [TypeScript 官方文档](https://www.typescriptlang.org/zh/)

---

**开发者**: Claude Code Assistant  
**最后更新**: 2025年9月  
**版本**: v1.0.0