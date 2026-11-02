import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;
type LocalizedParagraphs = Record<Locale, string | string[]>;

export const profile = {
  name: "Pei Jinxian",
  role: {
    zh: "AI Product Designer",
    en: "AI Product Designer"
  },
  tagline: {
    zh: "用 AI 与体验设计，打造下一代智能体验。",
    en: "Designing intelligent products with AI, interaction and motion."
  },
  meta: {
    zh: "5+ 年经验 · AI 产品 · UX · 动效 · Design System",
    en: "5+ Years Experience · AI Product · UX · Motion · Design System"
  },
  location: {
    zh: "杭州，中国",
    en: "Hangzhou, China"
  },
  email: "pjx983447405@outlook.com",
  availability: {
    zh: "可接受全职、自由职业和 AI 产品协作机会",
    en: "Available for full-time, freelance, and AI product collaboration"
  },
  about: {
    zh: [
      "我专注于 AI 大模型产品、企业平台和消费级应用的体验设计，致力于将复杂的技术能力转化为简单、可信且易于使用的产品体验。",
      "我相信优秀的设计不仅来自视觉表达，更源于产品思考、用户洞察与技术理解。我的工作涵盖 AI Workflow、视觉设计、Design System 与前端实现，不断探索设计与 AI 的融合方式。",
      "除了产品设计，我也持续研究 Web Coding、AIGC 与创意开发，通过代码、动画和 AI 工具构建更具表现力的数字体验。"
    ],
    en: [
      "I focus on experience design for large-model AI products, enterprise platforms, and consumer applications, turning complex technical capabilities into simple, trustworthy, and usable product experiences.",
      "I believe excellent design comes not only from visual expression, but also from product thinking, user insight, and technical understanding. My work spans AI workflows, interaction design, design systems, and frontend implementation as I explore new ways to bring design and AI together.",
      "Beyond product design, I continue to explore web coding, AIGC, and creative development, using code, motion, and AI tools to build more expressive digital experiences."
    ]
  },
  numbers: [
    { value: "5+", label: { zh: "年设计经验", en: "Years experience" } },
    { value: "30+", label: { zh: "产品项目", en: "Product projects" } },
    { value: "8+", label: { zh: "AI 产品交付", en: "AI products delivered" } },
    { value: "100%", label: { zh: "版本交付率", en: "Version delivery" } },
    { value: "36%", label: { zh: "GMV 增长", en: "GMV growth" } },
    { value: "1M+", label: { zh: "单日 GMV", en: "Single-day GMV" } },
    { value: "40%", label: { zh: "组件复用", en: "Component reuse" } }
  ],
  impact: [
    {
      value: "36%",
      label: { zh: "GMV 增长", en: "GMV Growth" },
      project: { zh: "AI 购物助手", en: "AI Shopping Assistant" },
      description: {
        zh: "通过优化 AI 对话体验与购物流程，帮助产品实现 GMV 提升 36%。",
        en: "By refining AI dialogue and shopping flows, the product achieved a 36% increase in GMV."
      }
    },
    {
      value: "1M+",
      label: { zh: "单日 GMV", en: "Single-day GMV" },
      project: { zh: "AI 虚拟试衣", en: "AI Virtual Try-on" },
      description: {
        zh: "AI 创新项目上线后，单日 GMV 突破 100 万。",
        en: "After launch, the AI innovation initiative surpassed ¥1M in single-day GMV."
      }
    },
    {
      value: "50%",
      label: { zh: "工作流效率", en: "Workflow Efficiency" },
      project: { zh: "自如企业平台", en: "Ziroom Enterprise Platform" },
      description: {
        zh: "优化企业工作流，提升跟进效率约 50%。",
        en: "Redesigned enterprise workflows improved follow-up efficiency by approximately 50%."
      }
    },
    {
      value: "30s",
      label: { zh: "节省时间", en: "Time Saved" },
      project: { zh: "企业 SaaS", en: "Enterprise SaaS" },
      description: {
        zh: "通过流程重构，减少单次操作约 30 秒。",
        en: "Workflow restructuring reduced each operation by approximately 30 seconds."
      }
    },
    {
      value: "2024",
      label: { zh: "创新奖项", en: "Innovation Award" },
      project: {
        zh: "中国零售数字化创新案例",
        en: "China Retail Digital Innovation Case"
      },
      description: { zh: "AI 虚拟试衣", en: "AI Virtual Try-on" }
    }
  ],
  skills: [
    {
      title: { zh: "AI 产品策略", en: "AI product strategy" },
      body: {
        zh: "从业务目标、用户任务和模型能力之间定义 MVP 范围、体验原则和可衡量结果。",
        en: "Define MVP scope, experience principles, and measurable outcomes across business goals, user tasks, and model capability."
      }
    },
    {
      title: { zh: "复杂 UX 与工作流", en: "Complex UX and workflows" },
      body: {
        zh: "设计 B 端平台、AI 创作工具、对话式购物、Agent 接管和多角色协同流程。",
        en: "Design B2B platforms, AI creation tools, conversational commerce, agent takeover, and multi-role workflows."
      }
    },
    {
      title: { zh: "Design System", en: "Design systems" },
      body: {
        zh: "沉淀跨产品组件、状态、动效和交付规范，让体验一致性可以长期扩展。",
        en: "Codify reusable components, states, motion patterns, and delivery specs so consistency can scale."
      }
    },
    {
      title: { zh: "Motion 与创意编码", en: "Motion and creative coding" },
      body: {
        zh: "用 Lottie、Runway、Three.js、Rive 和前端动效探索 AI 产品的叙事与反馈。",
        en: "Use Lottie, Runway, Three.js, Rive, and frontend motion to explore narrative and feedback in AI products."
      }
    }
  ],
  motionShowcase: {
    title: {
      zh: "Interaction tells stories before words.",
      en: "Interaction tells stories before words."
    },
    description: {
      zh: "AI 生成视频、界面动效、Motion Graphics 和交互实验集合，后续可替换为真实视频、GIF、Lottie 或 WebM。",
      en: "A collection of AI-generated videos, interface animations, motion graphics, and interaction explorations. Each slot can later become a real video, GIF, Lottie, or WebM."
    },
    items: ["AI Generated Video", "Motion Design", "UI Animation", "Lottie", "Runway", "Midjourney", "Interface Motion"]
  },
  experience: [
    {
      company: "Huxiang Technology",
      displayName: { zh: "小影科技", en: "QuVideo" },
      logo: "/company-logos/quvideo.png",
      trailItems: [
        "/experience-trail/quvideo-01.png",
        "/experience-trail/quvideo-02.png",
        "/experience-trail/quvideo-03.png",
        "/experience-trail/quvideo-04.png"
      ],
      title: { zh: "Design Lead", en: "Design Lead" },
      period: "2025 — 2026",
      body: {
        zh: "负责 AI 产品体验与设计体系建设，覆盖 FalcoCut、AI 短剧及荣耀 AI 生成等业务；主导 0-1 产品设计、核心体验迭代与 Design System 建设，以数据驱动持续优化用户转化与内容生产效率。",
        en: "Responsible for multiple AI product lines, including AI Short Drama Platform, FalcoCut, Honor Smart Video, design systems, and AI product experience."
      },
      highlights: {
        zh: ["AI Short Drama Platform", "FalcoCut", "Honor Smart Video", "Design System"],
        en: ["AI Short Drama Platform", "FalcoCut", "Honor Smart Video", "Design System"]
      }
    },
    {
      company: "Alibaba",
      displayName: { zh: "阿里巴巴", en: "Alibaba" },
      logo: "/company-logos/tongyi.png",
      trailItems: [
        "/experience-trail/alibaba-01.png",
        "/experience-trail/alibaba-02.png",
        "/experience-trail/alibaba-03.png",
        "/experience-trail/alibaba-04.png"
      ],
      title: { zh: "UI / UED", en: "UI / UED" },
      period: "2024 — 2025",
      body: {
        zh: [
          "负责 AI 购物助手、AI 虚拟试衣和 AI 购物体验创新，推动 GMV +36%、单日 GMV 超 ¥1M，并获得创新突破团队奖。",
          "参与通义、百炼相关 AI 交互体验和 Web 产品设计，支持多项 AI 运营活动和交互能力落地。"
        ],
        en: [
          "Owned AI Shopping Assistant, AI Virtual Try-on, and AI shopping experience innovation, driving +36% GMV growth, ¥1M+ single-day GMV, and innovation awards.",
          "Designed AI interaction experiences and web products for Tongyi and Bailian, supporting AI operation campaigns and interaction features."
        ]
      },
      highlights: {
        zh: ["GMV +36%", "单日 GMV ¥1M+", "中国零售数字化创新案例 2024", "Tongyi App", "Bailian"],
        en: ["GMV +36%", "¥1M+ single-day GMV", "China Retail Digital Innovation Case 2024", "Tongyi App", "Bailian"]
      }
    },
    {
      company: "Ziroom",
      displayName: { zh: "自如", en: "Ziroom" },
      logo: "/company-logos/ziroom.webp",
      trailItems: [
        "/experience-trail/ziroom-01.jpg",
        "/experience-trail/ziroom-02.jpg",
        "/experience-trail/ziroom-03.jpg",
        "/experience-trail/ziroom-04.jpg"
      ],
      title: { zh: "UI", en: "UI" },
      period: "2021 — 2024",
      body: {
        zh: "负责企业 SaaS 产品体验设计，覆盖 CRM、VR 看房、房源及客户管理等核心业务，持续优化复杂业务流程与产品易用性。",
        en: "Designed enterprise SaaS experiences across CRM, VR house viewing, property management, customer management, and workflow optimization."
      },
      highlights: {
        zh: ["CRM", "VR House Viewing", "Property Management", "Customer Management"],
        en: ["CRM", "VR House Viewing", "Property Management", "Customer Management"]
      }
    }
  ],
  philosophy: {
    title: {
      zh: "Less Interface. More Intelligence.",
      en: "Less Interface. More Intelligence."
    },
    body: {
      zh: "好的设计不是装饰，而是降低复杂度、创造清晰度，并交付可衡量的价值。每一次交互都应该有目的，每一个产品都应该解决真实问题。",
      en: "Great design is not decoration. It reduces complexity, creates clarity, and delivers measurable value. Every interaction should have a purpose. Every product should solve a real problem."
    }
  },
  workflow: {
    title: {
      zh: "AI 如何进入我的设计流程",
      en: "How AI becomes part of my design process"
    },
    steps: ["Research", "Product Thinking", "AI Ideation", "Visual Exploration", "Prototype", "Motion", "Delivery"]
  },
  tools: [
    "ChatGPT",
    "Claude",
    "Midjourney",
    "Stable Diffusion",
    "Runway",
    "Cursor",
    "Codex",
    "Figma AI",
    "Photoshop",
    "After Effects",
    "Principle",
    "ProtoPie"
  ],
  writingChannels: [
    {
      name: "人人都是产品经理",
      topics: ["Product Thinking"],
      href: "https://www.woshipm.com/share/6194629.html"
    },
    {
      name: "微信公众号",
      topics: ["Design Notes"],
      href: "https://mp.weixin.qq.com/s/r2GD-v4bwLayTrSYN0YAzQ"
    },
    {
      name: "小红书",
      topics: ["AI Design"],
      href: "https://www.xiaohongshu.com/user/profile/5f53a67900000000010001d6?xsec_token=ABOJpmH_naOgbJbq7Td_JXL3xkqLUVamWBvTclmWllwII%3D&xsec_source=pc_search&m_source=baidusem"
    },
    {
      name: "站酷",
      topics: ["Portfolio"],
      href: "https://www.zcool.com.cn/u/20817353"
    }
  ],
  playground: [
    "AI Generated Images",
    "Motion Concepts",
    "Rive",
    "Lottie",
    "Three.js",
    "Creative Coding",
    "Cursor Projects",
    "Codex Websites",
    "Shader Experiments"
  ],
  contactOptions: {
    zh: ["AI 产品设计负责人", "UI/UX 设计", "0-1设计负责人"],
    en: ["AI product design lead", "UI/UX design", "0-to-1 AI product consulting"]
  },
  socialLinks: [
    { label: "Email", href: "mailto:pjx983447405@outlook.com" },
    { label: "WeChat", href: "#" },
    { label: "Phone", href: "tel:15272508556" }
  ]
} satisfies {
  name: string;
  role: Localized;
  tagline: Localized;
  meta: Localized;
  location: Localized;
  email: string;
  availability: Localized;
  about: Record<Locale, string[]>;
  numbers: Array<{ value: string; label: Localized }>;
  impact: Array<{
    value: string;
    label: Localized;
    project: Localized;
    description: Localized;
  }>;
  skills: Array<{ title: Localized; body: Localized }>;
  motionShowcase: { title: Localized; description: Localized; items: string[] };
  experience: Array<{
    company: string;
    displayName?: Localized;
    logo?: string;
    trailItems?: string[];
    title: Localized;
    period: string;
    body: LocalizedParagraphs;
    highlights: Record<Locale, string[]>;
  }>;
  philosophy: { title: Localized; body: Localized };
  workflow: { title: Localized; steps: string[] };
  tools: string[];
  writingChannels: Array<{ name: string; topics: string[]; href: string }>;
  playground: string[];
  contactOptions: Record<Locale, string[]>;
  socialLinks: Array<{ label: string; href: string }>;
};
