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
      "我长期专注于 AI 产品体验设计，负责过多款面向 C 端和内容创作者的 AI 产品。曾负责千万级日活产品的核心功能与 AI 交互设计，主导过 AI 产品从 0 到 1 的体验设计，也负责海外 AI 视频创作平台的核心工作流迭代。",
      "我擅长把复杂的模型能力转化为清晰、可控的产品流程。在生成式 AI 产品中，我关注用户如何表达意图、了解生成进度，以及如何判断和调整结果。我通过交互原型与 AI Coding 验证关键流程，并将成熟的交互模式纳入设计系统，支持后续功能迭代。",
      "作为体验侧项目负责人，我根据业务目标确定需求优先级、版本范围与上线节奏，协调前端和测试资源，负责设计走查与上线验收。上线后，我结合业务数据检验设计效果，判断下一轮应优先解决哪些体验问题。"
    ],
    en: [
      "I specialize in experience design for AI products and have worked on several products for consumers and content creators. I designed core features and AI interactions for a product with tens of millions of daily active users, led experience design for AI products from concept to launch, and refined core workflows for an AI video creation platform serving international markets.",
      "I turn complex model capabilities into workflows users can understand and control. In generative AI products, I design for how people express intent, track generation progress, and evaluate and refine results. I use interactive prototypes and AI-assisted coding to validate key workflows, then incorporate proven interaction patterns into the design system to support future iterations.",
      "As the project lead for experience design, I set requirements priorities, define release scope and timing around business goals, coordinate frontend and QA resources, and lead design reviews and release sign-off. After launch, I use business data to evaluate the design and decide which experience issues to address next."
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
        zh: [
          "负责多款 AI 产品的体验设计：FalcoCut、AI 短剧出海平台及荣耀智慧视频。主导 AI 短剧出海平台从 0 到 1 的体验设计，主导海外 AI 视频创作平台 FalcoCut 的视频生成与数字人创作流程迭代，并搭建设计系统。",
          "担任体验侧项目负责人，决定需求优先级，统筹前端与测试资源，根据业务目标调整版本范围和上线排期。负责设计走查与上线验收，并结合上线后的业务数据推进后续迭代。"
        ],
        en: [
          "Led experience design for FalcoCut, AI Short Drama Studio, and Honor Smart Video. Designed AI Short Drama Studio from concept to launch, led improvements to video generation and digital human creation workflows for FalcoCut, a global AI video creation platform, and built a design system.",
          "As the experience design project lead, I set requirements priorities, coordinated frontend and testing resources, and adjusted release scope and schedules to meet business goals. I led design reviews and release sign-off, then used post-launch business data to guide further improvements."
        ]
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
          "负责千万级 DAU 的通义千问 App 核心功能模块与 AI 交互体验设计，参与「全民舞王」「全民照相馆」等 AI 创新玩法及运营活动，推动 AI 能力在 C 端场景落地。",
          "主导银泰 AI 购物助手、AI 虚拟试衣等消费体验创新，优化用户购物决策与转化链路，助力 GMV 增长 36%、单日 GMV 突破 ¥1M，并获创新突破团队奖。"
        ],
        en: [
          "Designed core features and AI interactions for Tongyi Qianwen, an app with tens of millions of daily active users. Contributed to AI experiences and campaigns including Everybody Dance and AI Photo Studio, bringing AI capabilities to consumer use cases.",
          "Led consumer experience innovation for Intime AI Shopping Assistant and AI Virtual Try-on, improving shopping decisions and conversion. Helped grow GMV by 36%, surpass ¥1M in single-day GMV, and earn an Innovation Breakthrough Team Award."
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
