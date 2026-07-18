import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Soothe AI 舒心婴语",
  description: "AI翻译婴儿哭声，智能育婴育儿助手，帮助新手父母、年轻宝妈宝爸解读宝宝饥饿、困倦、腹痛、胀气等需求",
  lang: 'zh-CN',
  ignoreDeadLinks: true,

  // 1. 生成站点地图 (Sitemap)，对 SEO 极其重要
  sitemap: {
    hostname: 'https://www.soothe.jx.cn'
  },

  // 2. 全局头部配置（我们把所有的东西都合并到这一个 head 里）
  head: [
    // 第一个包裹：百度统计代码
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5d7dd51b506e83206dc2e558e90d2c79";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],
    // 第二个包裹：全局注入 SEO 关键词标签
    ['meta', { name: 'keywords', content: '婴儿哭声翻译,婴儿哭声识别,听懂宝宝哭声,Soothe AI,新手父母,智能育儿,宝宝为什么哭' }],
    // 第三个包裹：网站图标
    ['link', { rel: 'icon', href: '/favicon.png' }] 
  ],

  // 3. 主题与导航菜单配置
  themeConfig: {
    nav: [
      { text: '🏛首页', link: '/' },
      { text: '🎯有问有答', link: '/wenda' },
      { text: '🤝商务合作', link: '/hezuo' },
      { 
        text: '🎈新手爸妈解忧室', 
        items: [
          { text: '母婴护理实操录', link: '/scl/' },
          { text: '全球专家红宝书', link: '/hbs' }
        ]
      },
      { text: '📞联系方式', link: '/contact' },
      { text: '🥉注册/登陆', link: '/login' },
    ],
    
    // 添加侧边栏配置
    sidebar: {
      '/scl/': [
        {
          text: '母婴护理实操录',
          items: [
            { text: '目录', link: '/scl/' },
            { text: '笔记1', link: '/scl/note-001' },
            { text: '笔记2', link: '/scl/note-002' },
            { text: '笔记3', link: '/scl/note-003' },
                        { text: '99999999', link: '/scl/note-004' },
            // 根据需要继续添加更多页面
          ]
        }
      ]
    },
    
    socialLinks: [],
  }
})