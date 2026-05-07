# AI 电商主图与文案生成工具

AI 驱动的电商图文生成工具，提供单条与批量生成能力，支持多风格选择，保存到素材库。

## 技术栈
- React 18
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- lucide-react (图标库)

## 项目路由
| 路由           | 页面功能                |
|----------------|------------------------|
| `/`            | 首页 Dashboard，展示统计概览与最近活动 |
| `/products`    | 商品任务列表页，管理所有任务 |
| `/products/new`| 商品图文生成工作台，填写信息并生成 |
| `/templates`   | 模板库，浏览并管理模板收藏 |
| `/settings`    | 设置页，配置默认生成规则 |

## 测试入口
1. **首页一键测试**：点击 "一键测试全流程"，进入商品列表页，在列表页再次点击 "一键测试全流程" 查看全流程
2. **商品列表页**：点击 "批量导入" 打开批量导入弹窗，点击 "一键测试全流程" 查看进度条模拟
3. **商品工作台**：点击 "一键测试" 自动填充示例数据并生成内容

## 本地启动
```bash
npm install
npm run dev
```
访问 `http://localhost:3000` 即可。

## 构建与部署
```bash
npm run build
npm start
```

## 目录结构
```
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── templates/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProductListPage.tsx
│   │   ├── ProductWorkspace.tsx
│   │   ├── ProductFormPanel.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── ResultPanel.tsx
│   │   ├── BatchImportModal.tsx
│   │   ├── TemplatesPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── Home.tsx
│   └── lib/
│       └── mock-data.ts
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── postcss.config.js
```

## 核心组件功能
1. **ProductFormPanel**：商品信息填写，材质、尺寸、颜色等扩展字段，支持参考图上传
2. **ImageUploader**：拖拽上传，缩略图预览
3. **ResultPanel**：主图网格/轮播展示，文案一键复制与重新生成
4. **BatchImportModal**：批量导入流程（含测试数据入口）
5. **TemplatesPage**：模板库（收藏筛选、视图切换）
