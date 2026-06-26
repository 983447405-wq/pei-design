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
      availability: "可接受 AI 产品设计负责人 / 高级设计顾问机会",
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
      title: "把复杂 AI 能力，设计成可上线的产品体验。",
      subtitle:
        "我面向 HR、设计负责人和 AI 创业团队，展示从 0 到 1 AI 产品定义、Agent 工作流、设计系统、评测体系和前端落地能力。",
      skillsTitle: "能力覆盖产品策略、体验设计和工程协作。",
      experienceTitle: "从用户问题到可量化结果。",
      ctaTitle: "正在寻找能把 AI 产品做清楚的人？",
      ctaBody: "我可以帮助团队定义 AI 产品体验、搭建设计系统，并把模糊能力转化为可交付方案。"
    },
    about: {
      title: "我用产品判断力、设计系统和前端理解，连接 AI 能力与真实用户。",
      intro:
        "过去的工作覆盖 B 端平台、生成式 AI 工具、Agent 工作台和设计系统。我关注的不只是界面好看，而是模型能力如何被理解、控制、信任和持续优化。"
    },
    projects: {
      title: "项目案例",
      subtitle: "每个项目都强调问题定义、我的职责、设计过程、最终成果和数据结果。"
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
      title: "让作品集替你打开下一次对话。",
      subtitle: "如果你正在招 AI 产品设计负责人、UI/UX Designer 或需要设计顾问，可以直接联系我。",
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
      availability: "Open to AI product design lead and senior design consultant roles",
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
      title: "Designing complex AI capabilities into shippable product experiences.",
      subtitle:
        "A portfolio for hiring teams, design leaders, and AI startups. It covers 0-to-1 AI product definition, agent workflows, design systems, evaluation frameworks, and frontend fluency.",
      skillsTitle: "A practice across product strategy, UX systems, and engineering collaboration.",
      experienceTitle: "From user problems to measurable outcomes.",
      ctaTitle: "Looking for someone who can make AI products legible?",
      ctaBody: "I help teams define AI experiences, build design systems, and translate ambiguous model capability into shippable product decisions."
    },
    about: {
      title: "I connect AI capability with real users through product judgment, systems thinking, and frontend fluency.",
      intro:
        "My work spans B2B platforms, generative AI tools, agent workspaces, and design systems. I care less about decoration and more about how model behavior becomes understandable, controllable, trustworthy, and measurable."
    },
    projects: {
      title: "Project cases",
      subtitle: "Each case focuses on problem framing, my role, design process, final outcome, and measurable results."
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
      title: "Let the portfolio start the next conversation.",
      subtitle: "If you are hiring an AI product design lead, UI/UX designer, or design consultant, reach out directly.",
      emailLabel: "Send email"
    }
  }
} satisfies Record<Locale, Record<string, unknown>>;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
