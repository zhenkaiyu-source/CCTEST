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
    await page.waitForTimeout(2000);

    // 测试登录
    console.log('测试登录...');
    await page.fill('input[type="tel"]', '13800138000');
    await page.fill('input[type="password"]', '123456');
    await page.click('.submit-btn');

    await page.waitForTimeout(2000);

    // 检查是否跳转到仪表盘
    const currentUrl = page.url();
    console.log('当前URL:', currentUrl);

    if (currentUrl.includes('dashboard')) {
      console.log('✅ 登录成功');

      // 检查仪表盘内容
      await page.waitForTimeout(2000);

      // 检查是否有概览卡片
      const statCards = await page.$$('.stat-card');
      console.log(`📊 概览卡片数量: ${statCards.length}`);

      // 检查是否有快捷导航
      const quickNav = await page.$('.quick-nav-grid');
      if (quickNav) {
        console.log('✅ 快捷导航已渲染');
      }

      // 检查整个页面内容
      const bodyContent = await page.$eval('body', el => el.innerHTML.substring(0, 500));
      console.log('页面内容片段:', bodyContent.substring(0, 200) + '...');

      // 检查控制台错误
      if (errors.length > 0) {
        console.log('\n控制台错误:');
        errors.forEach(e => console.log('  -', e));
      } else {
        console.log('\n✅ 无控制台错误');
      }
    } else {
      console.log('❌ 登录可能失败');
    }

  } catch (e) {
    console.error('测试错误:', e.message);
  }

  await browser.close();
  console.log('\n测试完成!');
})();
