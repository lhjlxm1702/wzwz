import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

import matter from 'gray-matter' 

function getSidebarItems() {
  // ... 读取文件
  const { data } = matter(content)  // 提取 frontmatter
  const title = data.title ? `📖 第${number}篇：${data.title}` : `笔记 ${number}`
  return { text: title, link: `/scl/${slug}` }
}
=======
import matter from 'gray-matter'
>>>>>>> cb842fd0ce79c04ce175e5c5d2ac86d04f017d83

// 动态读取 scl 目录中的所有 note-*.md 文件，并提取标题
function getSidebarItems() {
  const sclDir = path.join(__dirname, '../scl')
  const files = fs.readdirSync(sclDir)
    .filter(file => file.match(/^note-\d+\.md$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0])
      const numB = parseInt(b.match(/\d+/)[0])
      return numA - numB
    })
  
  return [
    { text: '📑 目录', link: '/scl/' },
    ...files.map(file => {
      const filePath = path.join(sclDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      const slug = file.replace('.md', '')
      const number = slug.replace('note-', '')
      
      // 从 frontmatter 读取标题，若无则使用默认
      const title = data.title ? `📖 第${number}篇：${data.title}` : `笔记 ${number}`
      return { text: title, link: `/scl/${slug}` }
    })
  ]
}

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
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5d7dd51b506e83206dc2e558e90d2c79";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `],    
    
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
          text: '🏠 母婴护理实操录',
          items: getSidebarItems()
        }
      ]
    },
    
    socialLinks: [],
  }
})
