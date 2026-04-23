# Dmall Helpdesk 技能评估系统 - 产品需求文档（PRD）

---

## 一、产品概述

### 1.1 产品定位

**产品名称**：Dmall Helpdesk 技能评估系统

**产品定位**：针对 Dmall 菲律宾 SM 项目 Helpdesk 团队，提供「AI辅助出题 + 在线考核 + 智能分析」一体化的技能评估解决方案。

**核心价值**：

- 文档 → 题目自动化，释放管理员出题精力
- 考核 → 流程线上化，告别 Excel 统计时代
- 分析 → AI驱动精准培训，每次考核都有收获

### 1.2 目标用户

|角色|人数|说明|
|---|---|---|
|超级管理员|1人|系统初始创建，负责系统配置|
|管理员|1-3人|Daniel 等，负责日常运营|
|员工|11人|Helpdesk 团队成员，参与考核|

### 1.3 技术架构

- **员工端**：网页端 + Chat 智能体对话
- **管理端**：网页后台管理系统
- **AI能力**：文档解析、题目生成、智能问答、报告生成
- **部署方式**：Web 应用，支持 PC 和移动端浏览器访问

---

## 二、账号体系

### 2.1 角色定义

|角色|权限说明|
|---|---|
|超级管理员|系统配置、账号管理、数据查看、全部功能|
|管理员|文档管理、题库管理、考核管理、数据查看、员工管理|
|员工|参与考核、智能答疑、查看个人成绩与学习|

### 2.2 员工账号字段

|字段|类型|必填|说明|
|---|---|---|---|
|id|int|是|主键，自增|
|employee_no|varchar(20)|是|工号，唯一标识|
|name|varchar(50)|是|员工姓名|
|phone|varchar(20)|是|手机号（菲律宾格式）|
|email|varchar(100)|否|邮箱|
|department|varchar(50)|是|部门，默认 "Helpdesk"|
|position|varchar(50)|是|岗位：技术支持/客服/组长|
|hire_date|date|是|入职日期|
|role|enum|是|admin/employee|
|status|enum|是|enabled/disabled|
|password|varchar(255)|是|加密存储|
|created_at|datetime|是|创建时间|
|updated_at|datetime|是|更新时间|

### 2.3 登录方式

- 账号密码登录
- 记住登录状态

---

## 三、系统功能架构

Text

├── 账号管理模块

│   ├── 员工账号列表

│   ├── 新增/编辑账号

│   ├── 批量导入账号

│   ├── 启用/禁用账号

│   └── 重置密码

│

├── 文档管理模块

│   ├── 文档上传（PDF/Word/Excel/图片）

│   ├── 文档分类管理

│   ├── 文档预览

│   ├── AI解析文档

│   └── 文档版本管理

│

├── 题库管理模块

│   ├── 题库列表

│   ├── AI生成题目

│   ├── 手动添加题目

│   ├── 题目审核

│   ├── 题目编辑/删除

│   ├── 批量导入/导出

│   └── 题目标签管理

│

├── 考核管理模块

│   ├── 考核列表

│   ├── 创建考核

│   ├── 考核发布

│   ├── 考核监控

│   ├── 批阅管理

│   └── 成绩发布

│

├── 数据报表模块

│   ├── 团队数据看板

│   ├── 个人档案

│   ├── 考核记录

│   ├── AI分析报告

│   └── 数据导出

│

└── 员工端模块（双入口）

    ├── A. Chat智能体对话

    ├── B. 卡片首页

    ├── C. 学习中心

    ├── D. 个人中心

    └── E. 考核作答

---

## 四、功能详细说明

---

## 4.1 账号管理模块

### 4.1.1 员工账号列表

**功能描述**：

- 展示所有员工账号信息
- 支持筛选：部门、岗位、状态
- 支持搜索：工号、姓名
- 支持分页

**页面元素**：

|元素|说明|
|---|---|
|筛选条件|部门、岗位、状态下拉选择|
|搜索框|输入工号或姓名搜索|
|数据表格|工号、姓名、部门、岗位、状态、创建时间、操作|
|分页组件|首页、上一页、下一页、末页、每页条数|
|新增账号按钮|右上角|
|批量导入按钮|右上角|

**操作按钮**：

- 查看：弹窗展示详情
- 编辑：弹窗编辑信息
- 禁用/启用：切换状态
- 重置密码：发送新密码到手机

### 4.1.2 新增/编辑账号

**表单字段**：

|字段|类型|必填|验证规则|
|---|---|---|---|
|工号|text|是|唯一，不超过20字符|
|姓名|text|是|不超过50字符|
|手机号|text|是|菲律宾手机号格式，以09开头|
|邮箱|email|否|有效邮箱格式|
|部门|select|是|默认 Helpdesk|
|岗位|select|是|技术支持/客服/组长|
|入职日期|date|是|不超过当前日期|
|角色|select|是|admin/employee|
|状态|radio|是|启用/禁用|

**交互逻辑**：

- 保存时自动发送账号通知短信（可选）
- 工号重复时提示错误

### 4.1.3 批量导入账号

**功能描述**：

- 下载 Excel 模板
- 上传 Excel 文件
- 预览导入数据
- 确认导入

**Excel 模板字段**： 工号、姓名、手机号、部门、岗位、入职日期

**导入规则**：

- 支持 .xlsx、.xls 格式
- 必填字段：工号、姓名、手机号
- 工号重复时跳过或覆盖（可配置）
- 手机号格式错误时标记为错误行

---

## 4.2 文档管理模块

### 4.2.1 文档上传

**功能描述**：

- 支持文件类型：PDF、Word、Excel、PPT、TXT、图片
- 单文件不超过 50MB
- 上传后自动解析（可选）

**表单字段**：

|字段|类型|必填|说明|
|---|---|---|---|
|文件|file|是|上传文件|
|分类|select|是|SLA文档/工单记录/系统手册/业务文档/培训资料|
|文档描述|textarea|否|文档说明|

**上传后处理**：

- 自动生成文件大小、页数统计
- 自动提取文档文本内容
- 进入解析队列

### 4.2.2 文档列表

**页面元素**：

|元素|说明|
|---|---|
|分类筛选|下拉选择分类|
|状态筛选|已解析/解析中/未解析|
|折叠文件夹|按分类展示文档|
|文档卡片|文件名、状态、大小、页数、上传时间|

**文档卡片操作**：

- 预览：在线查看文档
- 解析：手动触发解析
- 重新解析：覆盖已有解析
- 删除：删除文档及解析结果

### 4.2.3 文档预览

**功能描述**：

- PDF 在线预览
- Word/Excel 在线预览
- 左栏：文档内容
- 右栏：解析结果

**解析结果展示**：

- 已提取知识点数量
- 已生成题目数量
- 知识点列表
- 查看已生成题目入口

### 4.2.4 文档分类

**预设分类**：

1. SLA文档 - 服务级别协议相关
2. 工单记录 - 历史工单汇总
3. 系统手册 - 系统操作文档
4. 业务文档 - 业务流程文档
5. 培训资料 - 培训相关内容

---

## 4.3 题库管理模块

### 4.3.1 题库列表

**页面元素**：

|元素|说明|
|---|---|
|筛选条件|维度、难度、状态、搜索框|
|数据表格|题号、题目内容、维度、难度、状态、来源、创建时间、操作|
|统计信息|各维度题目数量分布|
|操作按钮|AI批量生成、新建题目、批量导入、导出Excel|

**题目字段**：

|字段|类型|说明|
|---|---|---|
|id|int|主键|
|question_no|varchar(20)|题号，自动生成|
|content|text|题目内容|
|type|enum|单选/多选/判断/问答/场景|
|dimension|enum|业务知识/问题排查/系统操作/沟通协调|
|difficulty|enum|基础/中级/高级|
|options|json|选项内容（选择题）|
|answer|text|正确答案|
|analysis|text|答案解析|
|source|varchar(100)|来源文档|
|source_page|varchar(20)|来源页码|
|tags|json|自定义标签数组|
|status|enum|待审核/已通过/已禁用|
|created_at|datetime|创建时间|
|updated_at|datetime|更新时间|

**筛选维度**：

|维度|说明|
|---|---|
|业务知识|SLA规范、业务流程等|
|问题排查|工单处理、故障排查等|
|系统操作|Dmall系统操作等|
|沟通协调|客户沟通、协作处理等|

### 4.3.2 AI生成题目

**功能描述**： 从上传的文档中，使用 AI 自动生成考核题目

**表单配置**：

|字段|类型|必填|说明|
|---|---|---|---|
|选择文档|select|是|下拉选择已解析的文档|
|目标维度|checkbox|是|选择出题维度|
|题目数量|number|是|1-100|
|难度分布|object|是|基础/中级/高级各数量|
|题型|checkbox|是|单选/多选/判断/问答/场景|
|生成要求|textarea|否|特殊要求说明|

**生成流程**：

1. 选择文档和配置
2. 点击开始生成
3. 显示生成进度
4. 生成完成后展示题目列表
5. 逐题审核：可修改、可删除、可批量通过
6. 保存题目到题库

**生成结果展示**： 每道题目显示：

- 题号（临时）
- 题目内容
- 选项（选择题）
- 正确答案
- 审核状态：待审核/通过/需修改

### 4.3.3 手动添加题目

**表单字段**：

|字段|类型|必填|说明|
|---|---|---|---|
|题目内容|textarea|是|题目文本|
|题型|select|是|单选/多选/判断/问答/场景|
|技能维度|select|是|业务知识/问题排查/系统操作/沟通协调|
|难度|select|是|基础/中级/高级|
|标签|tag input|否|添加自定义标签|
|选项|dynamic|是|题型为选择时，显示A/B/C/D选项输入框|
|正确答案|dynamic|是|根据题型不同，选项不同|
|答案解析|textarea|否|答案解析说明|

### 4.3.4 题目审核

**功能描述**：

- 查看 AI 生成的题目
- 逐题审核
- 可修改题目内容
- 可标记删除
- 批量操作

**审核状态**：

- 待审核：AI生成后默认状态
- 已通过：审核确认后
- 需修改：发现错误但不删除
- 已禁用：不再使用

### 4.3.5 批量导入/导出

**导入功能**：

- 支持 Excel 格式
- 模板字段与题目字段对应
- 导入前预览数据
- 错误行标记

**导出功能**：

- 支持 Excel 格式
- 可按筛选条件导出
- 字段与列表展示一致

---

## 4.4 考核管理模块

### 4.4.1 考核列表

**页面元素**：

|元素|说明|
|---|---|
|筛选条件|状态、时间范围|
|数据表格|考核名称、状态、时间、参与人数、操作|
|新建考核按钮|右上角|

**考核状态**：

|状态|说明|
|---|---|
|未发布|草稿状态|
|进行中|考核已开始，尚未截止|
|已结束|截止时间已过|
|已归档|历史考核归档|

### 4.4.2 创建考核（3步向导）

#### Step 1：基本信息

|字段|类型|必填|说明|
|---|---|---|---|
|考核名称|text|是|如：Q2季度技能评估|
|考核说明|textarea|否|考核描述|
|及格分数|number|是|0-100，默认70|
|答题时长|number|是|分钟，默认30|
|截止时间|datetime|是|截止日期时间|

#### Step 2：题目配置

**出题方式**：

|方式|说明|
|---|---|
|从题库选择|手动勾选题目|
|AI智能选题|系统根据设置自动选题|
|固定题目|指定题目列表|

**AI智能选题配置**：

|字段|类型|必填|说明|
|---|---|---|---|
|各维度题目数|number|是|每个维度出题数量|
|难度分布|object|是|基础/中级/高级比例|
|随机抽题|checkbox|是|每人题目顺序不同|

**题目数量汇总**：

- 显示各维度题目数
- 显示总题量
- 显示总分

#### Step 3：参与人员

**选择方式**：

|方式|说明|
|---|---|
|指定团队|选择团队名称，自动包含所有成员|
|指定人员|手动勾选人员|
|导入名单|上传Excel名单|

**发布设置**：

|字段|说明|
|---|---|
|发布方式|立即发布 / 定时发布|
|通知设置|短信通知、站内通知、邮件通知|

**预览信息**：

- 考核名称
- 题目数量/总分
- 答题时长/及格分
- 参与人数
- 发布时间
- 截止时间

### 4.4.3 考核监控

**实时进度卡片**：

|指标|说明|
|---|---|
|已完成人数|提交答卷人数|
|进行中人数|正在作答人数|
|未开始人数|尚未开始人数|
|考核进度|百分比进度条|
|剩余时间|距离截止时间|

**参与人员状态表**：

|字段|说明|
|---|---|
|姓名|员工姓名|
|状态|已完成/进行中/未开始/异常|
|用时|实际答题用时|
|作答进度|已答/总题数|
|操作|查看详情/强制交卷|

**异常处理**：

- 切屏次数统计
- 异常行为标记
- 强制结束考核

**操作按钮**：

- 强制结束异常考核
- 提醒未参与人员
- 导出答题数据

### 4.4.4 批阅管理

**待批阅列表**：

- 显示需要人工批阅的题目
- 如问答题、场景题

**批阅功能**：

- 查看员工答案
- 输入得分
- 添加批注
- 批量提交

### 4.4.5 成绩发布

**发布前确认**：

- 查看成绩统计
- 确认发布

**发布后**：

- 员工端可查看成绩
- 自动发送通知

---

## 4.5 数据报表模块

### 4.5.1 团队数据看板

**选择考核**：下拉选择已完成的考核

**整体概览卡片**：

|指标|说明|
|---|---|
|参与人数|实考人数|
|平均分|团队平均分|
|及格率|及格人数占比|
|最高分|团队最高分|
|最低分|团队最低分|

**得分分布**：

- 90-100分人数
- 80-89分人数
- 70-79分人数
- 60-69分人数
- 60分以下人数

**技能维度分析**：

|维度|平均分|目标分|状态|
|---|---|---|---|
|业务知识|82分|75分|达标|
|问题排查|68分|75分|待提升|
|系统操作|85分|70分|超标|
|沟通协调|74分|70分|达标|

**高频错题TOP5**：

- 显示题目内容
- 显示错误率
- 可点击查看详情

**AI分析报告**：

- 团队整体评价
- 培训建议
- 需关注人员
- 可导出

### 4.5.2 个人档案

**员工选择**：下拉选择员工

**个人信息**：

- 姓名、工号、部门、岗位、入职时间

**技能雷达图**：

- 四维度雷达图展示
- 可视化技能分布

**成长曲线**：

- 历次考核分数趋势
- 折线图展示

**考核历史**：

|考核名称|日期|分数|等级|变化|
|---|---|---|---|---|
|Q2评估|2024-06|82分|良好|↑|
|Q1评估|2024-03|78分|合格|-|

**薄弱点追踪**：

- 同一知识点的历史错误率变化
- 改善趋势

### 4.5.3 数据导出

**导出内容**：

- 团队成绩表（Excel）
- 个人成绩单（Excel）
- 错题汇总（Excel）
- 考核报告（PDF）

---

## 4.6 员工端模块

### 4.6.1 整体架构

**底部Tab导航**：

|Tab|图标|说明|
|---|---|---|
|智能体|💬|Chat对话入口|
|首页|🏠|卡片式首页|
|学习|📖|学习中心|
|我的|👤|个人中心|

### 4.6.2 Tab1：Chat智能体

**页面布局**：

- 顶部标题栏：智能考核助手
- 消息区域：对话内容展示
- 快捷操作卡片区
- 输入区域：文本输入框 + 发送按钮

**对话能力**：

|对话类型|示例问题|回复形式|
|---|---|---|
|考核咨询|当前有什么考核？|卡片 + 文字|
|业务知识问答|P2工单响应时间？|文字 + 表格|
|问题排查指导|POS无法连接怎么办？|步骤指引|
|学习推荐|我哪些地方薄弱？|能力分析|
|成绩查询|我考了多少分？|数据卡片|

**快捷操作卡片**：

- 当前待办考核
- 学习任务
- 我的成绩入口

**对话示例1 - 考核咨询**：

Text

用户：有待完成的考核吗？

助手：

你有 1 个待完成考核：

📋 Q2季度技能评估

   • 截止时间: 6月30日 18:00（还剩3天）

   • 预计时长: 30分钟

   • 题量: 30题

   [ 立即开始考核 ]

**对话示例2 - 业务知识问答**：

Text

用户：P2级别响应时限是多久？

助手：

根据 SLA 服务标准规范，P2级别工单的响应时限是：

⏱️ 30分钟

📖 完整分级标准：

┌──────────┬──────────┬──────────┐

│ 级别     │ 响应时限 │ 解决时限 │

├──────────┼──────────┼──────────┤

│ P1宕机   │ 15分钟  │ 4小时   │

│ P2核心故障│ 30分钟  │ 8小时   │

│ P3非核心 │ 2小时   │ 24小时  │

│ P4咨询   │ 4小时   │ 72小时  │

└──────────┴──────────┴──────────┘

来源: SM_SLA_服务标准_2024.pdf

**对话示例3 - 问题排查**：

Text

用户：门店POS打不开怎么排查？

助手：

🔧 POS系统无法打开 - 问题排查步骤：

**第一步：确认影响范围**

• 是否单台异常还是全部异常？

• 全部异常 → 优先检查网络/服务器（P1）

• 单台异常 → 按以下步骤排查

**第二步：检查本地状态**

• POS机是否正常开机？

• 显示屏是否有显示？

• 是否有报错信息？

**第三步：检查网络连接**

• 网络指示灯是否正常？

• 重启网络设备试试

**第四步：重启应用**

• 尝试重启POS收银应用

• 如仍异常，联系二线技术支持

⚠️ 如影响收银，建议先引导用户使用备用收银方式

### 4.6.3 Tab2：卡片首页

**页面结构**：

1. **顶部导航栏**
    
    - 用户问候语
    - 通知入口
    - 个人中心入口
2. **待完成考核卡片**（有考核时显示）
    
    - 考核名称
    - 截止时间
    - 题量/时长
    - 立即开始按钮
3. **我的技能档案卡片**
    
    - 四维度得分展示
    - 可点击查看详情
4. **近期成绩卡片**
    
    - 最近3次考核成绩
    - 分数、等级、变化趋势
5. **为你推荐卡片**
    
    - 基于薄弱点推荐学习内容
    - 点击进入学习
6. **快捷入口卡片**
    
    - 智能助手入口
    - 学习中心入口

### 4.6.4 Tab3：学习中心

**页面结构**：

1. **搜索区域**
    
    - 搜索知识点、题目类型
2. **我的薄弱点**（基于最近考核）
    
    - 标签卡片展示
    - 显示错误率
    - 点击进入练习
3. **学习内容分类**
    
    - SLA服务标准
    - 问题排查方法
    - 系统操作手册
    - 沟通协调技巧
    - 每个分类显示知识点数量、练习数量
4. **我的练习记录**
    
    - 练习内容
    - 正确率
    - 用时

**学习内容详情页**：

- 知识内容展示
- 场景练习题
- 练习结果反馈
- 重新练习按钮

### 4.6.5 Tab4：个人中心

**页面结构**：

1. **个人信息卡片**
    
    - 头像
    - 姓名、部门、岗位、工号
2. **我的考核数据**
    
    - 参加次数
    - 平均分
    - 最高分
    - 查看完整记录入口
3. **通知消息**
    
    - 最新3条消息
    - 查看全部入口
4. **设置**
    
    - 账号安全
    - 消息通知
    - 切换入口模式
    - 关于系统
5. **退出登录**
    

### 4.6.6 考核作答流程

**Step 1：考核列表**

- 待完成考核（进行中、截止提醒）
- 已完成考核（可查看详情）

**Step 2：考核说明**

- 考核名称、说明
- 题量、满分、及格分
- 时长、截止时间
- 注意事项
- 开始考核按钮

**Step 3：开始作答**

- 顶部：考核名称、剩余时间、进度
- 中部：题目内容、选项
- 底部：上一题、下一题、题号列表、交卷按钮

**题目类型**：

- 单选题：4个选项
- 多选题：4个选项，可选多个
- 判断题：正确/错误
- 问答题：文本输入框

**功能**：

- 标记题目（可疑题目标记）
- 跳转题号（点击题号直接跳转）
- 自动保存答案

**Step 4：交卷确认**

- 显示已答/未答数量
- 未答题目列表
- 继续答题 / 确认交卷

**Step 5：成绩展示**

- 总分展示
- 正确率、用时
- 各维度得分
- 薄弱点分析
- 学习建议
- 查看答卷详情按钮

---

## 五、数据模型设计

### 5.1 核心数据表

#### 用户表（users）

Sql

CREATE TABLE users (

    id INT PRIMARY KEY AUTO_INCREMENT,

    employee_no VARCHAR(20) UNIQUE NOT NULL COMMENT '工号',

    name VARCHAR(50) NOT NULL COMMENT '姓名',

    phone VARCHAR(20) NOT NULL COMMENT '手机号',

    email VARCHAR(100) COMMENT '邮箱',

    department VARCHAR(50) DEFAULT 'Helpdesk' COMMENT '部门',

    position VARCHAR(50) COMMENT '岗位',

    hire_date DATE COMMENT '入职日期',

    role ENUM('super_admin', 'admin', 'employee') DEFAULT 'employee' COMMENT '角色',

    status ENUM('enabled', 'disabled') DEFAULT 'enabled' COMMENT '状态',

    password VARCHAR(255) NOT NULL COMMENT '密码',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

#### 文档表（documents）

Sql

CREATE TABLE documents (

    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255) NOT NULL COMMENT '文档名称',

    file_path VARCHAR(500) NOT NULL COMMENT '文件存储路径',

    file_size INT COMMENT '文件大小(字节)',

    file_type VARCHAR(20) COMMENT '文件类型',

    page_count INT COMMENT '页数',

    category VARCHAR(50) COMMENT '分类',

    description TEXT COMMENT '描述',

    parse_status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending' COMMENT '解析状态',

    parse_result JSON COMMENT '解析结果',

    created_by INT COMMENT '上传人',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

#### 题目表（questions）

Sql

CREATE TABLE questions (

    id INT PRIMARY KEY AUTO_INCREMENT,

    question_no VARCHAR(20) UNIQUE NOT NULL COMMENT '题号',

    content TEXT NOT NULL COMMENT '题目内容',

    type ENUM('single', 'multiple', 'judge', 'essay', 'scenario') NOT NULL COMMENT '题型',

    options JSON COMMENT '选项',

    answer TEXT NOT NULL COMMENT '正确答案',

    analysis TEXT COMMENT '答案解析',

    dimension ENUM('knowledge', 'troubleshooting', 'operation', 'communication') NOT NULL COMMENT '技能维度',

    difficulty ENUM('basic', 'intermediate', 'advanced') DEFAULT 'basic' COMMENT '难度',

    tags JSON COMMENT '标签',

    source_id INT COMMENT '来源文档ID',

    source_page VARCHAR(20) COMMENT '来源页码',

    status ENUM('pending', 'approved', 'rejected', 'disabled') DEFAULT 'pending' COMMENT '状态',

    created_by INT COMMENT '创建人',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

#### 考核表（exams）

Sql

CREATE TABLE exams (

    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255) NOT NULL COMMENT '考核名称',

    description TEXT COMMENT '考核说明',

    pass_score INT DEFAULT 70 COMMENT '及格分数',

    total_score INT DEFAULT 100 COMMENT '总分',

    duration INT DEFAULT 30 COMMENT '时长(分钟)',

    start_time DATETIME COMMENT '开始时间',

    end_time DATETIME COMMENT '截止时间',

    status ENUM('draft', 'published', 'ongoing', 'ended', 'archived') DEFAULT 'draft' COMMENT '状态',

    question_config JSON COMMENT '题目配置',

    participant_type ENUM('team', 'individual', 'import') DEFAULT 'team' COMMENT '参与方式',

    participants JSON COMMENT '参与人员列表',

    random_order BOOLEAN DEFAULT FALSE COMMENT '随机顺序',

    notify_sms BOOLEAN DEFAULT TRUE COMMENT '短信通知',

    notify_app BOOLEAN DEFAULT TRUE COMMENT '站内通知',

    created_by INT COMMENT '创建人',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

#### 考核-题目关联表（exam_questions）

Sql

CREATE TABLE exam_questions (

    id INT PRIMARY KEY AUTO_INCREMENT,

    exam_id INT NOT NULL COMMENT '考核ID',

    question_id INT NOT NULL COMMENT '题目ID',

    question_order INT COMMENT '题目顺序',

    is_random BOOLEAN DEFAULT FALSE COMMENT '是否随机',

    FOREIGN KEY (exam_id) REFERENCES exams(id),

    FOREIGN KEY (question_id) REFERENCES questions(id)

);

#### 答题记录表（exam_records）

Sql

CREATE TABLE exam_records (

    id INT PRIMARY KEY AUTO_INCREMENT,

    exam_id INT NOT NULL COMMENT '考核ID',

    user_id INT NOT NULL COMMENT '用户ID',

    status ENUM('not_start', 'in_progress', 'completed', 'expired') DEFAULT 'not_start' COMMENT '状态',

    start_time DATETIME COMMENT '开始时间',

    end_time DATETIME COMMENT '结束时间',

    score INT COMMENT '得分',

    pass BOOLEAN COMMENT '是否及格',

    time_spent INT COMMENT '用时(秒)',

    abnormal_count INT DEFAULT 0 COMMENT '异常次数',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (exam_id) REFERENCES exams(id),

    FOREIGN KEY (user_id) REFERENCES users(id)

);

#### 用户答案表（user_answers）

Sql

CREATE TABLE user_answers (

    id INT PRIMARY KEY AUTO_INCREMENT,

    record_id INT NOT NULL COMMENT '答题记录ID',

    question_id INT NOT NULL COMMENT '题目ID',

    answer TEXT COMMENT '用户答案',

    is_correct BOOLEAN COMMENT '是否正确',

    score INT COMMENT '得分',

    marked BOOLEAN DEFAULT FALSE COMMENT '是否标记',

    answered_at DATETIME COMMENT '作答时间',

    FOREIGN KEY (record_id) REFERENCES exam_records(id),

    FOREIGN KEY (question_id) REFERENCES questions(id)

);

#### 学习记录表（learning_records）

Sql

CREATE TABLE learning_records (

    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL COMMENT '用户ID',

    content_type ENUM('question', 'document', 'course') COMMENT '内容类型',

    content_id INT COMMENT '内容ID',

    score INT COMMENT '得分/正确率',

    time_spent INT COMMENT '用时(秒)',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)

);

#### 消息通知表（notifications）

Sql

CREATE TABLE notifications (

    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL COMMENT '用户ID',

    type VARCHAR(50) COMMENT '通知类型',

    title VARCHAR(255) COMMENT '标题',

    content TEXT COMMENT '内容',

    is_read BOOLEAN DEFAULT FALSE COMMENT '是否已读',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)

);

### 5.2 数据关系图

Text

┌─────────┐       ┌─────────────┐       ┌──────────┐

│  users  │───────│ exam_records │───────│  exams   │

└─────────┘       └─────────────┘       └────┬─────┘

     │                   │                   │

     │                   │                   │

     ▼                   ▼                   ▼

┌─────────────┐   ┌─────────────┐   ┌─────────────────┐

│learning_rec │   │user_answers │   │  exam_questions │

└─────────────┘   └─────────────┘   └────────┬────────┘

                                              │

                                              ▼

                                       ┌──────────┐

                                       │questions │

                                       └────┬─────┘

                                            │

                                            ▼

                                       ┌──────────┐

                                       │documents │

                                       └──────────┘

---

## 六、API 接口设计（RESTful）

### 6.1 认证接口

|方法|路径|说明|
|---|---|---|
|POST|/api/auth/login|登录|
|POST|/api/auth/logout|登出|
|POST|/api/auth/reset-password|重置密码|
|GET|/api/auth/me|获取当前用户信息|

### 6.2 用户管理接口

|方法|路径|说明|
|---|---|---|
|GET|/api/users|获取用户列表|
|GET|/api/users/:id|获取用户详情|
|POST|/api/users|创建用户|
|PUT|/api/users/:id|更新用户|
|DELETE|/api/users/:id|删除用户|
|POST|/api/users/import|批量导入用户|
|POST|/api/users/:id/reset-password|重置密码|

### 6.3 文档管理接口

|方法|路径|说明|
|---|---|---|
|GET|/api/documents|获取文档列表|
|GET|/api/documents/:id|获取文档详情|
|POST|/api/documents|上传文档|
|PUT|/api/documents/:id|更新文档|
|DELETE|/api/documents/:id|删除文档|
|POST|/api/documents/:id/parse|解析文档|
|GET|/api/documents/:id/preview|预览文档|

### 6.4 题库管理接口

|方法|路径|说明|
|---|---|---|
|GET|/api/questions|获取题目列表|
|GET|/api/questions/:id|获取题目详情|
|POST|/api/questions|创建题目|
|PUT|/api/questions/:id|更新题目|
|DELETE|/api/questions/:id|删除题目|
|POST|/api/questions/batch|批量创建题目|
|POST|/api/questions/generate|AI生成题目|
|POST|/api/questions/import|批量导入题目|
|GET|/api/questions/export|导出题目|

### 6.5 考核管理接口

|方法|路径|说明|
|---|---|---|
|GET|/api/exams|获取考核列表|
|GET|/api/exams/:id|获取考核详情|
|POST|/api/exams|创建考核|
|PUT|/api/exams/:id|更新考核|
|DELETE|/api/exams/:id|删除考核|
|POST|/api/exams/:id/publish|发布考核|
|POST|/api/exams/:id/end|结束考核|
|GET|/api/exams/:id/progress|考核进度|
|POST|/api/exams/:id/force-submit|强制交卷|

### 6.6 员工考核接口

|方法|路径|说明|
|---|---|---|
|GET|/api/employee/exams|获取我的考核列表|
|GET|/api/employee/exams/:id|获取考核详情（含题目）|
|POST|/api/employee/exams/:id/start|开始考核|
|POST|/api/employee/exams/:id/submit|提交考核|
|GET|/api/employee/exams/:id/result|获取考核成绩|

### 6.7 数据报表接口

|方法|路径|说明|
|---|---|---|
|GET|/api/reports/exam/:id|考核报表|
|GET|/api/reports/exam/:id/analysis|AI分析报告|
|GET|/api/reports/user/:id|个人档案|
|GET|/api/reports/user/:id/history|考核历史|
|GET|/api/reports/team/overview|团队概览|
|GET|/api/reports/export|导出报表|

### 6.8 AI接口

|方法|路径|说明|
|---|---|---|
|POST|/api/ai/parse-document|解析文档|
|POST|/api/ai/generate-questions|生成题目|
|POST|/api/ai/chat|智能对话|
|POST|/api/ai/analyze-report|生成分析报告|

### 6.9 通知接口

|方法|路径|说明|
|---|---|---|
|GET|/api/notifications|获取通知列表|
|PUT|/api/notifications/:id/read|标记已读|
|PUT|/api/notifications/read-all|全部已读|

---

## 七、AI 能力设计

### 7.1 文档解析

**输入**：上传的文档文件 **输出**：

- 文档文本内容
- 提取的知识点列表
- 知识点关联的文档位置

**处理流程**：

1. 文件格式识别
2. 文本内容提取
3. 内容清洗
4. 知识点抽取
5. 存储解析结果

### 7.2 题目生成

**输入**：

- 文档内容
- 生成配置（维度、难度、数量、题型）

**输出**：

- 生成的题目列表
- 每题包含：题目、选项、答案、解析

**生成要求**：

- 题目内容基于文档
- 难度分布符合配置
- 答案准确
- 提供解析说明

### 7.3 智能对话

**能力范围**：

- 考核相关咨询
- 业务知识问答
- 问题排查指导
- 学习推荐

**知识来源**：

- 题库内容
- 文档内容
- 历史工单
- 考核成绩

**交互形式**：

- 自然语言理解
- 结构化回复
- 快捷操作卡片

### 7.4 报告生成

**输入**：

- 考核数据
- 答题记录
- 维度分析

**输出**：

- 团队整体评价
- 培训建议
- 关注人员名单
- 改进方向

---

## 八、非功能性需求

### 8.1 性能需求

- 页面加载时间 < 3秒
- 考核提交响应时间 < 2秒
- AI题目生成 < 60秒（30题）
- 支持 100 并发用户

### 8.2 安全需求

- 用户密码加密存储
- JWT Token 认证
- 敏感操作日志记录
- 考核过程防作弊

### 8.3 兼容性

- 支持 Chrome、Firefox、Safari、Edge
- 移动端适配（iOS Safari、Android Chrome）
- 响应式布局

### 8.4 数据备份

- 每日自动备份
- 支持手动备份
- 备份保留 30 天

---

## 九、项目交付物

### 9.1 功能交付

|模块|功能点|优先级|
|---|---|---|
|账号管理|员工CRUD、批量导入、状态管理|P0|
|文档管理|上传、分类、预览、解析|P0|
|题库管理|题目CRUD、AI生成、审核、导入导出|P0|
|考核管理|创建、发布、监控、批阅、发布成绩|P0|
|数据报表|团队报表、个人档案、导出|P1|
|员工端|双入口、考核作答、学习中心|P0|
|Chat智能体|对话答疑、快捷操作|P1|
|AI能力|文档解析、题目生成、报告生成|P0|

### 9.2 文档交付

- 产品需求文档（PRD）
- 技术设计方案
- 数据库设计文档
- API接口文档
- 用户操作手册
- 部署文档

---

## 十、开发优先级建议

### 第一阶段（MVP）- 4-6周

**核心功能**：

- 账号管理（员工CRUD）
- 文档上传与解析
- 题库管理（手动录入、AI生成）
- 考核管理（创建、发布、作答、成绩）
- 员工端（卡片首页、考核作答）
- 基础数据报表

### 第二阶段 - 3-4周

**增强功能**：

- Chat智能体对话
- 学习中心
- AI分析报告
- 高级数据可视化
- 移动端优化

### 第三阶段 - 持续迭代

**优化功能**：

- 智能学习推荐
- 错题本
- 培训联动
- 更多集成能力

---

## 附录

### A. 术语表

|术语|说明|
|---|---|
|SLA|Service Level Agreement，服务级别协议|
|P1/P2/P3/P4|问题优先级，P1最高|
|维度|技能分类维度|
|题库|考核题目集合|
|考核|一次完整的评估活动|

### B. 联系方式

- 产品负责人：[待定]
- 技术负责人：[待定]
- 项目周期：[待定]

---

**文档版本**：V1.0 **最后更新**：2024年 **文档状态**：初稿，待评审