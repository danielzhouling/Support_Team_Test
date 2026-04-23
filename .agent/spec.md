# 研发规范

## 代码规范

### Git Commit 规范
```
格式: <type>(<scope>): <subject>

类型:
- feat: 新功能
- fix: 修复bug
- docs: 文档变更
- style: 代码格式（不影响功能）
- refactor: 重构
- test: 测试相关
- chore: 构建/工具变更

示例:
- feat(admin): 添加员工账号CRUD功能
- feat(exam): 完成考核创建向导
- fix(exam): 修复交卷后成绩显示错误
- docs(readme): 更新部署文档
```

### 命名规范
- 文件命名：kebab-case (e.g., `exam-list.vue`)
- 组件命名：PascalCase (e.g., `ExamList.vue`)
- 变量命名：camelCase (e.g., `examList`)
- 常量命名：UPPER_SNAKE_CASE (e.g., `EXAM_STATUS`)

## 前端规范

### Vue3 项目结构
```
src/
├── api/           # API 接口
├── assets/        # 静态资源
├── components/    # 公共组件
├── composables/   # 组合式函数
├── layouts/       # 布局组件
├── router/        # 路由配置
├── stores/        # Pinia 状态管理
├── utils/         # 工具函数
├── views/         # 页面组件
│   ├── admin/     # 管理端页面
│   └── employee/  # 员工端页面
├── App.vue
└── main.js
```

### 代码风格
- 使用 `<script setup>` 语法
- 组件 Props 使用 TypeScript 类型定义
- 优先使用 Composition API
- 避免使用 Options API（除非必要）

## 后端规范

### FastAPI 项目结构
```
backend/
├── app/
│   ├── api/           # API 路由
│   │   ├── v1/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── questions.py
│   │   │   ├── exams.py
│   │   │   └── reports.py
│   │   └── deps.py   # 依赖注入
│   ├── core/          # 核心配置
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/       # SQLAlchemy 模型
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # 业务逻辑
│   └── main.py
├── tests/
├── requirements.txt
└── README.md
```

## 测试规范

### 必须包含测试
- 每个功能模块必须有对应的测试用例
- 页面功能使用 Playwright 进行 E2E 测试
- API 接口使用 pytest 进行单元测试

### 测试通过标准
- 单元测试覆盖率 > 70%
- E2E 测试覆盖核心流程
- 所有测试必须通过才能提交

## 部署规范

### 环境配置
- 开发环境：`.env.development`
- 生产环境：`.env.production`
- 敏感信息不得提交到代码仓库

### 提交前检查
1. [ ] 代码格式检查通过
2. [ ] 单元测试全部通过
3. [ ] E2E 测试全部通过
4. [ ] 无 console.error
5. [ ] 提交信息符合规范