# Repository Guidelines

## 项目结构与模块组织

本项目是使用 App Router 的 Next.js 14 应用程序：

- `src/app/` - 页面路由和布局（page.tsx 文件）
  - `layout.tsx` - 根布局
  - `page.tsx` - 首页
  - `products/` - 商品列表和创建工作台
  - `templates/` - 模板库
  - `settings/` - 应用设置
  - `api/` - API 路由
  - `image-generation/` - 图片生成功能
  - `image-to-text/` - 图片转文字功能

- `src/components/` - 可复用的 React 组件
- `src/lib/` - 工具函数和Mock 数据

## 构建、测试和开发命令

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器（localhost:3000）
npm run build     # 生产环境构建
npm run start     # 启动生产服务器
npm run lint      # 运行 ESLint
```

## 编码风格与命名约定

- 语言：TypeScript + React
- 缩进：2 个空格
- 文件命名：组件使用帕斯卡命名法
  - 示例：`ProductFormPanel.tsx`、`ImageUploader.tsx`
- 使用 Tailwind CSS 进行样式开发
- 组件采用函数式风格配合 hooks

## 测试指南

当前未配置自动化测试。添加测试时：

- 测试文件放在源文件旁边，使用 `.test.tsx` 后缀
- 推荐使用 Jest 或 React Testing Library
- 优先进行组件测试

## 提交与拉取请求指南

- 分支命名：`feature/描述` 或 `fix/描述`
- 提交信息使用常规格式：
  - `feat: 添加批量导入功能`
  - `fix: 修复图片上传错误`
  - `refactor: 简化商品表单逻辑`
- PR 应包含：
  - 清晰的变更说明
  - UI 变更的截图
  - 相关 Issue 引用
- **重要**：每次做修改前后，都把项目推送到 GitHub 备份

## 环境配置

- 复制 `.env.example` 到 `.env.local` 配置环境变量
- 主要配置项：数据库连接、API 密钥、AI 模型参数

## 相关资源

- README.md 包含项目功能介绍和路由说明
- 可以通过一键测试功能快速验证页面交互

## 架构说明

- 使用服务端组件 (Server Components) 优化首屏加载
- 图片生成功能支持多种风格和批量处理
- 模板系统支持收藏和自定义配置

## 常见问题

- 开发时若遇到端口占用，可修改 `package.json` 中的 dev 脚本
- 图片上传大小限制请查看 `.env.local` 中的配置
- 如遇构建缓慢，可尝试清除 `.next` 缓存后重试
