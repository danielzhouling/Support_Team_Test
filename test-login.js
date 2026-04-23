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

    const filePath = path.join(__dirname, 'admin', 'login.html');
    const fileUrl = `file://${filePath}`;

    console.log('Testing admin/login.html...');
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    // 验证页面标题
    const title = await page.title();
    console.log(`  Page title: ${title}`);

    // 验证 Logo 存在
    const logo = await page.locator('.login-logo h1').textContent();
    console.log(`  Logo text: ${logo}`);

    // 验证表单存在
    const usernameInput = await page.locator('#username').isVisible();
    const passwordInput = await page.locator('#password').isVisible();
    const submitBtn = await page.locator('#passwordLoginForm button[type="submit"]').isVisible();
    console.log(`  Username input visible: ${usernameInput}`);
    console.log(`  Password input visible: ${passwordInput}`);
    console.log(`  Submit button visible: ${submitBtn}`);

    // 测试 Tab 切换
    await page.click('.login-tab[data-tab="sms"]');
    const smsFormVisible = await page.locator('#smsLoginForm').isVisible();
    const passwordFormHidden = await page.locator('#passwordLoginForm').isHidden();
    console.log(`  SMS form visible after tab click: ${smsFormVisible}`);
    console.log(`  Password form hidden after tab click: ${passwordFormHidden}`);

    // 切换回密码登录
    await page.click('.login-tab[data-tab="password"]');

    // 测试空表单提交（应显示错误）
    await page.locator('#passwordLoginForm button[type="submit"]').click();
    const errorVisible = await page.locator('#errorMessage').isVisible();
    const errorText = await page.locator('#errorMessage').textContent();
    console.log(`  Error message visible on empty submit: ${errorVisible}`);
    console.log(`  Error message text: ${errorText}`);

    // 测试错误账号登录
    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.locator('#passwordLoginForm button[type="submit"]').click();
    const loginError = await page.locator('#errorMessage').textContent();
    console.log(`  Login error for wrong credentials: ${loginError}`);

    // 测试正确账号登录
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.locator('#passwordLoginForm button[type="submit"]').click();

    // 等待跳转（employee-list.html 尚未创建，预期显示文件不存在或跳转到该页）
    await page.waitForTimeout(500);
    const currentUrl = page.url();
    console.log(`  After successful login, URL: ${currentUrl}`);
    // 阶段0单页验证：成功登录后应跳转到 employee-list.html（文件尚未创建，但跳转逻辑已验证）
    const loginSuccess = currentUrl.includes('employee-list.html') || currentUrl === 'chrome-error://chromewebdata/';
    console.log(`  Login redirect triggered (target page will exist when built): ${loginSuccess}`);

    // 检查控制台错误
    if (errors.length > 0) {
        console.log('\n  Console errors found:');
        errors.forEach(err => console.log(`    - ${err}`));
    } else {
        console.log('\n  No console errors detected.');
    }

    // 汇总结果
    const allPassed = title.includes('管理端登录')
        && logo === '技能评估系统'
        && usernameInput && passwordInput && submitBtn
        && smsFormVisible && passwordFormHidden
        && errorVisible
        && loginError === '用户名或密码错误'
        && loginSuccess
        && errors.length === 0;

    console.log(`\n${'='.repeat(40)}`);
    console.log(`Test Result: ${allPassed ? 'PASS ✓' : 'FAIL ✗'}`);
    console.log(`${'='.repeat(40)}`);

    await browser.close();
    process.exit(allPassed ? 0 : 1);
})();
