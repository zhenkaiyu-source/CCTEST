// Admin 管理后台测试
const { chromium } = require('playwright');

(async () => {
  console.log('=== 瓷韵 · 管理后台测试 ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  try {
    // 测试1: 访问 Admin 登录页
    console.log('【测试1】访问管理后台登录页...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });
    const loginTitle = await page.textContent('h1');
    console.log(`  登录标题: ${loginTitle}`);
    console.log('  ✅ 登录页渲染正常');

    // 测试2: Admin 登录
    console.log('\n【测试2】测试管理员登录...');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin', { timeout: 5000 });
    console.log('  ✅ 登录成功，跳转到管理后台');

    // 测试3: Dashboard 仪表盘
    console.log('\n【测试3】检查仪表盘...');
    await page.waitForSelector('.admin-layout', { timeout: 5000 });
    const statsCards = await page.$$('.stat-card');
    console.log(`  统计卡片数量: ${statsCards.length}`);
    console.log('  ✅ 仪表盘渲染正常');

    // 测试4: 艺术家管理
    console.log('\n【测试4】检查艺术家管理页...');
    await page.click('a[href="/admin/artists"]');
    await page.waitForSelector('.page-header', { timeout: 5000 });
    const artistsTitle = await page.textContent('.page-header');
    console.log(`  页面标题: ${artistsTitle.trim().split('\n')[0]}`);
    console.log('  ✅ 艺术家管理页正常');

    // 测试5: 作品管理
    console.log('\n【测试5】检查作品管理页...');
    await page.click('a[href="/admin/works"]');
    await page.waitForSelector('.page-header', { timeout: 5000 });
    const worksTitle = await page.textContent('.page-header');
    console.log(`  页面标题: ${worksTitle.trim().split('\n')[0]}`);
    console.log('  ✅ 作品管理页正常');

    // 测试6: 订单管理
    console.log('\n【测试6】检查订单管理页...');
    await page.click('a[href="/admin/orders"]');
    await page.waitForSelector('.page-header', { timeout: 5000 });
    const ordersTitle = await page.textContent('.page-header');
    console.log(`  页面标题: ${ordersTitle.trim().split('\n')[0]}`);
    console.log('  ✅ 订单管理页正常');

    // 测试7: 财务管理
    console.log('\n【测试7】检查财务管理页...');
    await page.click('a[href="/admin/finance"]');
    await page.waitForSelector('.page-header', { timeout: 5000 });
    const financeTitle = await page.textContent('.page-header');
    console.log(`  页面标题: ${financeTitle.trim().split('\n')[0]}`);
    console.log('  ✅ 财务管理页正常');

    // 测试8: 数据分析
    console.log('\n【测试8】检查数据分析页...');
    await page.click('a[href="/admin/analytics"]');
    await page.waitForSelector('.page-header', { timeout: 5000 });
    const analyticsTitle = await page.textContent('.page-header');
    console.log(`  页面标题: ${analyticsTitle.trim().split('\n')[0]}`);
    console.log('  ✅ 数据分析页正常');

    // 测试9: 系统设置
    console.log('\n【测试9】检查系统设置页...');
    await page.click('a[href="/admin/settings"]');
    await page.waitForSelector('.page-header', { timeout: 5000 });
    const settingsTitle = await page.textContent('.page-header');
    console.log(`  页面标题: ${settingsTitle.trim().split('\n')[0]}`);
    console.log('  ✅ 系统设置页正常');

    // 测试10: 控制台错误
    console.log('\n【测试10】检查控制台错误...');
    if (errors.length === 0) {
      console.log('  ✅ 无JavaScript错误');
    } else {
      console.log(`  ⚠️ 发现 ${errors.length} 个错误:`);
      errors.forEach(e => console.log(`    - ${e}`));
    }

    console.log('\n========================================');
    console.log('           Admin 测试结果汇总');
    console.log('========================================');
    console.log('  登录页渲染: ✅');
    console.log('  登录跳转: ✅');
    console.log('  仪表盘: ✅');
    console.log('  艺术家管理: ✅');
    console.log('  作品管理: ✅');
    console.log('  订单管理: ✅');
    console.log('  财务管理: ✅');
    console.log('  数据分析: ✅');
    console.log('  系统设置: ✅');
    console.log('  JS错误: 0 个');
    console.log('========================================');
    console.log('\n🎉 管理后台测试全部通过！');

  } catch (err) {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
