# GitHub Pages 部署指南

## 概述
本文档描述了如何使用 GitHub Actions 自动部署 Vue.js 项目到 GitHub Pages。

## 部署流程

### 1. GitHub 端设置

#### 1.1 创建仓库
1. 在 GitHub 上创建新仓库
2. 选择 Public（Private 仓库需要 Pro 账户才能使用 Pages）

#### 1.2 启用 GitHub Pages
1. 进入仓库设置：`https://github.com/username/repo-name/settings/pages`
2. 在 "Source" 部分选择 **"GitHub Actions"**
3. 保存设置

### 2. 本地项目配置

#### 2.1 GitHub Actions 配置
创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Setup Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

#### 2.2 Vite 配置
确保 `vite.config.ts` 包含正确的 base 路径：

```typescript
export default defineConfig({
  base: '/repo-name/', // 替换为你的仓库名
  // ... 其他配置
})
```

### 3. 本地操作流程

#### 3.1 初始化仓库（首次）
```bash
# 初始化 git 仓库
git init -b main

# 添加远程仓库
git remote add origin https://github.com/username/repo-name.git

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: Project setup"

# 推送到远程仓库
git push -u origin main
```

#### 3.2 日常开发流程
```bash
# 开发完成后
git add .
git commit -m "feat: add new feature"
git push origin main
```

#### 3.3 代理配置（如需要）
```bash
# 配置 Git 代理
git config --global http.proxy http://127.0.0.1:8001
git config --global https.proxy http://127.0.0.1:8001
```

### 4. 自动部署流程

每次推送到 `main` 分支后，GitHub 会自动：

1. **触发 Actions** - 检测到推送事件
2. **环境准备** - 启动 Ubuntu 虚拟机
3. **代码检出** - 下载最新代码
4. **安装依赖** - 执行 `npm ci`
5. **构建项目** - 执行 `npm run build`
6. **部署到 Pages** - 将 `dist` 目录发布到 GitHub Pages

### 5. 访问网站

部署成功后，网站将在以下地址可用：
```
https://username.github.io/repo-name/
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 `package.json` 中的 build 脚本
   - 确保所有依赖都已正确安装

2. **部署失败**
   - 检查仓库是否为 Public
   - 确认 Pages 设置中选择了 "GitHub Actions"

3. **网站无法访问**
   - 等待几分钟，部署可能需要时间
   - 检查 `vite.config.ts` 中的 base 路径设置

4. **网络连接问题**
   - 配置代理（见 3.3 节）
   - 或使用 SSH 连接：`git@github.com:username/repo-name.git`

### 检查部署状态
1. 进入仓库的 "Actions" 标签页
2. 查看最新的工作流运行状态
3. 点击具体的运行查看详细日志

## 注意事项

- 每次推送都会触发重新部署
- 构建产物存储在 `dist` 目录
- 确保 `.gitignore` 不包含 `.github` 目录
- 使用 `main` 分支作为默认分支（推荐）

## 项目结构要求

```
project/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
├── public/
├── package.json
├── vite.config.ts
└── ...
```