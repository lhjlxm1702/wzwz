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
            { text: '14.详细分解，安抚哭闹婴…', link: '/scl/详细分解，安抚哭闹婴儿的侧卧操作手法' },
            { text: '13.婴儿爆哭哄不住，试试…', link: '/scl/婴儿爆哭哄不住，试试打包，注意6个细节' },
            { text: '12.我判断出了肠绞痛，但…', link: '/scl/我判断出了肠绞痛，但宝妈的追问、让我无语' },
            { text: '11.小宝贝莫名哭闹，难道…', link: '/scl/小宝贝莫名哭闹，难道与父母感情不和有关？' },
            { text: '10.小家伙，越饿越不吃奶…', link: '/scl/小家伙，越饿越不吃奶？答案藏在宝妈闲聊中…' },
            { text: '09.宝宝哭闹小半天，最后…', link: '/scl/宝宝哭闹小半天，最后发现，竟是纸尿裤害的' },
            { text: '08.3月龄男宝哭了半小时…', link: '/scl/3月龄男宝哭了半小时，第2遍排查才找到真相' },
            { text: '07.婴儿哭不停？别慌！先…', link: '/scl/婴儿哭不停？别慌！先查这4件事' },
            { text: '06.用美金，为自己的退休…', link: '/scl/用美金，为自己的退休礼物续费' },
            { text: '05.半年心血归零，我黯然…', link: '/scl/半年心血归零，我黯然关掉电脑' },
            { text: '04.平时抠门，这次我花千…', link: '/scl/平时抠门，这次我花千元买了…' },
            { text: '03.为省1万元，家政老板熬…', link: '/scl/为省1万元，家政老板熬成“夜半码农”' },
            { text: '02.我混母婴圈17年，最怕…', link: '/scl/我混母婴圈17年，最怕“猜”' },
            { text: '01.老婆发现，我手机收藏…', link: '/scl/老婆发现，我手机收藏6000多个婴儿哭声' },
            // 根据需要继续添加更多页面
          ]
        }
      ]
    },
    
    socialLinks: [],
  }
})

