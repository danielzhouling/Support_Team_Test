/**
 * Dmall Helpdesk 技能评估系统 - 共享工具函数
 */

// Mock 用户数据
const MOCK_USERS = [
    { username: 'admin', password: 'admin123', name: '管理员', role: 'admin' },
    { username: 'E001', password: 'emp123', name: '张三', role: 'employee' },
    { username: 'E002', password: 'emp123', name: '李四', role: 'employee' },
];

/**
 * 表单验证
 */
const FormValidator = {
    required(value, fieldName) {
        if (!value || value.trim() === '') {
            return `${fieldName}不能为空`;
        }
        return null;
    },

    minLength(value, min, fieldName) {
        if (value.length < min) {
            return `${fieldName}长度不能少于${min}个字符`;
        }
        return null;
    },

    maxLength(value, max, fieldName) {
        if (value.length > max) {
            return `${fieldName}长度不能超过${max}个字符`;
        }
        return null;
    },
};

/**
 * 登录处理
 */
function handleLogin(formData) {
    const errors = [];

    const usernameError = FormValidator.required(formData.username, '用户名/工号');
    if (usernameError) errors.push(usernameError);

    const passwordError = FormValidator.required(formData.password, '密码');
    if (passwordError) errors.push(passwordError);

    if (errors.length > 0) {
        return { success: false, errors };
    }

    const user = MOCK_USERS.find(
        u => u.username === formData.username && u.password === formData.password
    );

    if (!user) {
        return { success: false, errors: ['用户名或密码错误'] };
    }

    // 模拟登录成功
    if (formData.remember) {
        localStorage.setItem('remember', 'true');
        localStorage.setItem('username', user.username);
    }
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, user };
}

/**
 * 获取当前登录用户
 */
function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * 登出
 */
function handleLogout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('remember');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

/**
 * 显示错误信息
 */
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

/**
 * 清除错误信息
 */
function clearError() {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

/**
 * 格式化日期
 */
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 格式化时间
 */
function formatDateTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return `${formatDate(date)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * Mock 数据生成
 */
const MockData = {
    employees: [
        { id: 'E001', name: '张三', department: '技术部', position: '运维工程师', status: 'active', createdAt: '2026-01-15' },
        { id: 'E002', name: '李四', department: '技术部', position: '运维工程师', status: 'active', createdAt: '2026-01-16' },
        { id: 'E003', name: '王五', department: '运营部', position: '运营专员', status: 'active', createdAt: '2026-01-17' },
        { id: 'E004', name: '赵六', department: '客服部', position: '客服专员', status: 'inactive', createdAt: '2026-01-18' },
        { id: 'E005', name: '钱七', department: '技术部', position: '运维工程师', status: 'active', createdAt: '2026-01-19' },
    ],
    questions: [
        { id: 'Q001', content: 'Linux系统中，如何查看进程占用情况？', dimension: '系统管理', difficulty: 'easy', status: 'active', source: '人工录入', createdAt: '2026-02-01' },
        { id: 'Q002', content: '描述一下 TCP 三次握手的过程', dimension: '网络基础', difficulty: 'medium', status: 'active', source: '人工录入', createdAt: '2026-02-02' },
        { id: 'Q003', content: '如何排查服务器负载过高的问题？', dimension: '故障处理', difficulty: 'hard', status: 'pending', source: 'AI生成', createdAt: '2026-02-03' },
        { id: 'Q004', content: '什么是 Docker 镜像层？', dimension: '容器技术', difficulty: 'easy', status: 'active', source: '人工录入', createdAt: '2026-02-04' },
        { id: 'Q005', content: 'MySQL 中 InnoDB 和 MyISAM 的区别是什么？', dimension: '数据库', difficulty: 'medium', status: 'active', source: '人工录入', createdAt: '2026-02-05' },
    ],
    exams: [
        { id: 'EX001', name: 'Linux 基础考核', status: 'published', participants: 10, completed: 7, createdAt: '2026-03-01' },
        { id: 'EX002', name: '网络知识月度考核', status: 'ongoing', participants: 8, completed: 3, createdAt: '2026-03-10' },
        { id: 'EX003', name: '运维实操技能考核', status: 'draft', participants: 0, completed: 0, createdAt: '2026-03-15' },
    ]
};
