import type { Locale } from "@/lib/i18n";

export const dictionary = {
  zh: {
    nav: {
      home: "首页",
      projects: "项目",
      about: "关于",
      blog: "博客",
      resources: "资源",
      contact: "联系"
    },
    common: {
      availability: "可接受全职、自由职业和 AI 产品协作机会",
      viewProjects: "查看项目",
      viewResources: "查看资源",
      contactMe: "联系我",
      readMore: "阅读全文",
      viewCase: "查看案例",
      selectedWork: "精选项目",
      latestWriting: "精选文章",
      featuredResources: "精选资源",
      previous: "上一篇",
      next: "下一篇",
      backToList: "返回列表"
    },
    home: {
      eyebrow: "AI Product Designer + UI/UX Designer",
      title: "用 AI、交互与动效设计有温度的数字体验。",
      subtitle: "我是一名 Product Designer，关注用户体验、产品思考、AI 技术和动效表达。",
      skillsTitle: "以用户体验、产品判断和新兴 AI 技术为核心。",
      experienceTitle: "干净的时间线，记录设计如何进入真实业务。",
      ctaTitle: "Let's Create Something Meaningful.",
      ctaBody: "如果你正在寻找一名能把 AI、产品体验和动效表达连接起来的设计师，可以直接联系我。"
    },
    about: {
      title: "我用产品判断力、交互设计和视觉表达，把复杂 AI 能力变成清晰体验。",
      intro:
        "过去的工作覆盖 AI 内容创作、AI 购物、虚拟试衣、智能视频、企业 SaaS 和设计系统。我关注的不只是界面好看，而是产品是否降低复杂度、创造清晰度，并交付可衡量的价值。"
    },
    projects: {
      title: "项目案例",
      subtitle: "精选 AI、视频、购物、企业平台和交互体验项目。"
    },
    blog: {
      title: "设计笔记",
      subtitle: "关于 AI 产品体验、Agent 交互、评测体系和设计系统的复盘。"
    },
    resources: {
      title: "设计资源库",
      subtitle: "沉淀 AI 产品设计模板、评审清单、Prompt 和工作流资源。"
    },
    contact: {
      title: "Let's build something meaningful.",
      subtitle: "如果你正在寻找 AI Product Designer、UI/UX Designer，或需要 0→1 AI 产品顾问，可以直接联系我。",
      emailLabel: "发送邮件"
    }
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      blog: "Blog",
      resources: "Resources",
      contact: "Contact"
    },
    common: {
      availability: "Available for full-time, freelance, and AI product collaboration",
      viewProjects: "View projects",
      viewResources: "View resources",
      contactMe: "Contact me",
      readMore: "Read more",
      viewCase: "View case",
      selectedWork: "Selected work",
      latestWriting: "Featured writing",
      featuredResources: "Featured resources",
      previous: "Previous",
      next: "Next",
      backToList: "Back to list"
    },
    home: {
      eyebrow: "AI Product Designer + UI/UX Designer",
      title: "Designing AI products that connect technology, business and people.",
      subtitle: "I'm a Product Designer focused on user experience, product thinking, emerging AI technologies, and motion craft.",
      skillsTitle: "A practice around user experience, product thinking, and emerging AI technologies.",
      experienceTitle: "A clean timeline of design work inside real products.",
      ctaTitle: "Let's Create Something Meaningful.",
      ctaBody: "Reach out if you are looking for a designer who connects AI, product experience, and motion craft."
    },
    about: {
      title:
        "I transform complex AI capability into clear product experiences through product judgment, interaction design, and visual craft.",
      intro:
        "My work spans AI content creation, AI shopping, virtual try-on, smart video, enterprise SaaS, and design systems. I care less about decoration and more about reducing complexity, creating clarity, and delivering measurable value."
    },
    projects: {
      title: "Project cases",
      subtitle: "Selected AI, video, shopping, enterprise platform, and interaction experience projects."
    },
    blog: {
      title: "Design notes",
      subtitle: "Reflections on AI product UX, agent interaction, evaluation frameworks, and design systems."
    },
    resources: {
      title: "Design resources",
      subtitle: "Templates, checklists, prompts, and workflows for AI product design."
    },
    contact: {
      title: "Let's build something meaningful.",
      subtitle: "If you are hiring an AI Product Designer, UI/UX Designer, or 0-to-1 AI product consultant, reach out directly.",
      emailLabel: "Send email"
    }
  }
} satisfies Record<Locale, Record<string, unknown>>;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
