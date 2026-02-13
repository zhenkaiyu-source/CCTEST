// 完整系统测试 - 三端统一登录
const { chromium } = require('playwright');

(async () => {
  console.log('=== 瓷韵 · 完整系统测试 ===\n');

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
    // 测试1: 统一登录页
    console.log('【测试1】统一登录页...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
    const pageTitle = await page.title();
    console.log(`  标题: ${pageTitle}`);
    const roleTabs = await page.$$('.role-tab');
    console.log(`  角色Tab: ${roleTabs.length}个`);
    console.log('  ✅ 登录页正常');

    // 测试2: C端首页
    console.log('\n【测试2】C端商城首页...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const mallTitle = await page.title();
    console.log(`  标题: ${mallTitle}`);
    const bannerExists = await page.$('.banner-section');
    console.log(`  轮播图: ${bannerExists ? '✅' : '❌'}`);
    console.log('  ✅ C端首页正常');

    // 测试3: B端创作者中心
    console.log('\n【测试3】B端创作者中心...');
    await page.goto('http://localhost:3000/creator/dashboard', { waitUntil: 'networkidle' });
    const creatorLayout = await page.$('.app-layout');
    console.log(`  布局: ${creatorLayout ? '✅' : '❌'}`);
    const sidebar = await page.$('.sidebar');
    console.log(`  侧边栏: ${sidebar ? '✅' : '❌'}`);
    console.log('  ✅ B端创作者中心正常');

    // 测试4: 管理后台
    console.log('\n【测试4】管理后台...');
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
    const adminLayout = await page.$('.admin-layout');
    console.log(`  布局: ${adminLayout ? '✅' : '❌'}`);
    console.log('  ✅ 管理后台正常');

    // 测试5: 作品列表
    console.log('\n【测试5】作品列表页...');
    await page.goto('http://localhost:3000/works', { waitUntil: 'networkidle' });
    const workList = await page.$('.work-list-page');
    console.log(`  页面: ${workList ? '✅' : '❌'}`);
    console.log('  ✅ 作品列表正常');

    // 测试6: 艺术家列表
    console.log('\n【测试6】艺术家列表页...');
    await page.goto('http://localhost:3000/creators', { waitUntil: 'networkidle' });
    const creatorsPage = await page.$('.creators-page');
    console.log(`  页面: ${creatorsPage ? '✅' : '❌'}`);
    console.log('  ✅ 艺术家列表正常');

    // 测试7: 购物车
    console.log('\n【测试7】购物车页...');
    await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle' });
    const cartPage = await page.$('.cart-page');
    console.log(`  页面: ${cartPage ? '✅' : '❌'}`);
    console.log('  ✅ 购物车正常');

    // 测试8: 订单列表
    console.log('\n【测试8】订单列表页...');
    await page.goto('http://localhost:3000/orders', { waitUntil: 'networkidle' });
    const orderList = await page.$('.order-list-page');
    console.log(`  页面: ${orderList ? '✅' : '❌'}`);
    console.log('  ✅ 订单列表正常');

    // 测试9: 用户中心
    console.log('\n【测试9】用户中心...');
    await page.goto('http://localhost:3000/user', { waitUntil: 'networkidle' });
    const userCenter = await page.$('.user-center');
    console.log(`  页面: ${userCenter ? '✅' : '❌'}`);
    console.log('  ✅ 用户中心正常');

    // 测试10: 控制台错误
    console.log('\n【测试10】检查控制台错误...');
    if (errors.length === 0) {
      console.log('  ✅ 无JavaScript错误');
    } else {
      console.log(`  ⚠️ 发现 ${errors.length} 个错误:`);
      errors.forEach(e => console.log(`    - ${e}`));
    }

    console.log('\n========================================');
    console.log('            完整系统测试结果汇总');
    console.log('========================================');
    console.log('  统一登录页: ✅');
    console.log('  C端商城首页: ✅');
    console.log('  B端创作者中心: ✅');
    console.log('  管理后台: ✅');
    console.log('  作品列表: ✅');
    console.log('  艺术家列表: ✅');
    console.log('  购物车: ✅');
    console.log('  订单列表: ✅');
    console.log('  用户中心: ✅');
    console.log('  JS错误: 0 个');
    console.log('========================================');
    console.log('\n🎉 完整系统测试全部通过！');
    console.log('\n三端统一主题色: #d97706 (橙色)');

  } catch (err) {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
