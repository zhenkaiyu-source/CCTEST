const { chromium } = require('playwright');

(async () => {
  console.log('启动浏览器测试...');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // 监听控制台错误
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  try {
    console.log('打开登录页...');
    await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle', timeout: 30000 });

    // 等待页面渲染
    await page.waitForTimeout(3000);

    // 检查页面标题
    const title = await page.title();
    console.log('页面标题:', title);

    // 检查登录表单是否存在
    const loginForm = await page.$('.login-page');
    if (loginForm) {
      console.log('✅ 登录页面已渲染');
    } else {
      console.log('❌ 登录页面未找到');
    }

    // 检查按钮
    const submitBtn = await page.$('.submit-btn');
    if (submitBtn) {
      console.log('✅ 登录按钮已找到');
    }

    // 输出错误
    if (errors.length > 0) {
      console.log('\n控制台错误:');
      errors.forEach(e => console.log('  -', e));
    } else {
      console.log('\n✅ 无控制台错误');
    }

    // 测试登录
    console.log('\n测试登录...');
    await page.fill('input[type="tel"]', '13800138000');
    await page.fill('input[type="password"]', '123456');
    await page.click('.submit-btn');

    await page.waitForTimeout(2000);

    // 检查是否跳转到仪表盘
    const currentUrl = page.url();
    console.log('当前URL:', currentUrl);

    if (currentUrl.includes('dashboard') || currentUrl === 'http://localhost:3001/') {
      console.log('✅ 登录成功，跳转到仪表盘');
    } else {
      console.log('❌ 登录可能失败');
    }

  } catch (e) {
    console.error('测试错误:', e.message);
  }

  await browser.close();
  console.log('\n测试完成!');
})();
