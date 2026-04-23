const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    page.on('pageerror', err => {
        errors.push(err.message);
    });

    const filePath = path.join(__dirname, 'admin', 'employee-list.html');
    const fileUrl = `file://${filePath}`;

    console.log('Testing admin/employee-list.html...');
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    // 验证页面标题
    const title = await page.title();
    console.log(`  Page title: ${title}`);

    // 验证侧边栏
    const sidebarLogo = await page.locator('.sidebar-logo h1').textContent();
    console.log(`  Sidebar logo: ${sidebarLogo}`);

    // 验证导航菜单
    const navItems = await page.locator('.nav-item').count();
    console.log(`  Navigation items count: ${navItems}`);

    // 验证页面标题
    const pageTitle = await page.locator('.page-title').textContent();
    console.log(`  Page title: ${pageTitle}`);

    // 验证筛选条件
    const departmentFilter = await page.locator('#filterDepartment').isVisible();
    const positionFilter = await page.locator('#filterPosition').isVisible();
    const statusFilter = await page.locator('#filterStatus').isVisible();
    console.log(`  Department filter visible: ${departmentFilter}`);
    console.log(`  Position filter visible: ${positionFilter}`);
    console.log(`  Status filter visible: ${statusFilter}`);

    // 验证表格数据
    const tableRows = await page.locator('.table tbody tr').count();
    console.log(`  Table rows count: ${tableRows}`);

    // 验证分页信息
    const totalCount = await page.locator('#totalCount').textContent();
    console.log(`  Total count: ${totalCount}`);

    // 测试新增按钮
    const addBtn = await page.locator('button:has-text("新增账号")').isVisible();
    console.log(`  Add button visible: ${addBtn}`);

    // 点击新增按钮打开弹窗
    await page.click('button:has-text("新增账号")');
    await page.waitForTimeout(300);
    const modalVisible = await page.locator('#employeeModal').isVisible();
    console.log(`  Modal opens on add button click: ${modalVisible}`);

    // 关闭弹窗
    await page.click('.modal-close');
    await page.waitForTimeout(300);
    const modalClosed = !(await page.locator('#employeeModal.show').isVisible());
    console.log(`  Modal closes on close button: ${modalClosed}`);

    // 测试搜索
    await page.fill('#searchKeyword', '张三');
    await page.click('.search-btn');
    await page.waitForTimeout(300);
    const filteredCount = await page.locator('.table tbody tr').count();
    console.log(`  Search works (filtered rows): ${filteredCount}`);

    // 清空搜索
    await page.fill('#searchKeyword', '');
    await page.click('.search-btn');

    // 测试编辑按钮
    await page.click('.action-btn:has-text("编辑")');
    await page.waitForTimeout(300);
    const editModalVisible = await page.locator('#employeeModal.show').isVisible();
    const modalTitle = await page.locator('#modalTitle').textContent();
    console.log(`  Edit modal opens: ${editModalVisible}, title: ${modalTitle}`);
    await page.click('.modal-close');

    // 测试禁用/启用按钮
    const toggleBtn = await page.locator('.action-btn.danger, .action-btn.primary').first();
    const toggleText = await toggleBtn.textContent();
    console.log(`  Toggle status button text: ${toggleText}`);

    // 检查控制台错误
    if (errors.length > 0) {
        console.log('\n  Console errors found:');
        errors.forEach(err => console.log(`    - ${err}`));
    } else {
        console.log('\n  No console errors detected.');
    }

    // 汇总结果
    const allPassed =
        title.includes('员工管理')
        && sidebarLogo === '技能评估系统'
        && navItems > 0
        && pageTitle === '员工管理'
        && departmentFilter && positionFilter && statusFilter
        && tableRows > 0
        && addBtn
        && modalVisible
        && modalClosed
        && editModalVisible && modalTitle === '编辑账号'
        && errors.length === 0;

    console.log(`\n${'='.repeat(40)}`);
    console.log(`Test Result: ${allPassed ? 'PASS ✓' : 'FAIL ✗'}`);
    console.log(`${'='.repeat(40)}`);

    await browser.close();
    process.exit(allPassed ? 0 : 1);
})();
