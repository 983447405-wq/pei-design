import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type BlogPost = {
  slug: string;
  date: string;
  updated: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  category: Localized;
  author: string;
  title: Localized;
  excerpt: Localized;
  topic: Localized;
  sections: Array<{
    heading: Localized;
    body: Localized;
  }>;
};

export const posts: BlogPost[] = [
  {
    slug: "agent-ux-control",
    date: "2026-05-18",
    updated: "2026-05-22",
    readTime: "6 min",
    featured: true,
    tags: ["Agent UX", "Workflow", "AI Product"],
    category: { zh: "AI 产品设计", en: "AI Product Design" },
    author: "Pei",
    topic: { zh: "Agent UX", en: "Agent UX" },
    title: {
      zh: "Agent 产品不是聊天框，而是可控工作流",
      en: "Agent products are controllable workflows, not chat boxes"
    },
    excerpt: {
      zh: "如何设计任务状态、人工确认、异常接管和审计记录，让 Agent 真的进入业务流程。",
      en: "How task state, human confirmation, exception takeover, and audit trails help agents enter real workflows."
    },
    sections: [
      {
        heading: { zh: "问题", en: "Problem" },
        body: {
          zh: "很多 Agent 产品把聊天框当成入口，却没有把真实业务任务拆成状态、权限、风险和确认机制。用户无法判断系统正在做什么，也不知道什么时候应该介入。",
          en: "Many agent products start with a chat box but fail to model real work as states, permissions, risks, and confirmation moments. Users cannot tell what the system is doing or when they should intervene."
        }
      },
      {
        heading: { zh: "设计判断", en: "Design judgment" },
        body: {
          zh: "Agent UX 的关键不是让模型说得更自然，而是让任务流变得可见、可控、可恢复。每个自动化动作都应该有来源、状态、置信度和人工接管路径。",
          en: "The core of agent UX is not more natural language, but visible, controllable, and recoverable workflows. Every automated action needs source, state, confidence, and a human takeover path."
        }
      },
      {
        heading: { zh: "可复用模式", en: "Reusable pattern" },
        body: {
          zh: "我会优先设计任务队列、执行状态、确认卡片、异常队列、引用来源和审计记录。这些模式比单个聊天界面更能支撑企业场景上线。",
          en: "I start with task queues, execution states, confirmation cards, exception queues, citations, and audit trails. These patterns support enterprise deployment better than a single chat surface."
        }
      }
    ]
  },
  {
    slug: "llm-eval-for-designers",
    date: "2026-04-02",
    updated: "2026-04-10",
    readTime: "8 min",
    featured: true,
    tags: ["LLM Eval", "Design Ops", "Metrics"],
    category: { zh: "体验评测", en: "Experience Evaluation" },
    author: "Pei",
    topic: { zh: "Evaluation", en: "Evaluation" },
    title: {
      zh: "设计师为什么需要理解 LLM 体验评测",
      en: "Why designers need to understand LLM experience evaluation"
    },
    excerpt: {
      zh: "把体验质量拆成可观察维度，是 AI 产品团队协作效率的关键。",
      en: "Breaking experience quality into observable dimensions is key to efficient AI product collaboration."
    },
    sections: [
      {
        heading: { zh: "为什么设计师要参与评测", en: "Why designers should join evaluation" },
        body: {
          zh: "AI 产品体验质量经常被描述成“好不好用”，但团队很难围绕这个主观判断做取舍。设计师需要把可理解性、可控性、稳定性和失败恢复拆成可观察指标。",
          en: "AI product quality is often reduced to whether it feels good, but teams cannot prioritize around that vague judgment. Designers can turn understandability, control, reliability, and recovery into observable metrics."
        }
      },
      {
        heading: { zh: "评测不是算法团队的专属工作", en: "Evaluation is not only an ML task" },
        body: {
          zh: "算法指标可以说明模型能力，但产品体验评测要覆盖用户意图、上下文、界面反馈和任务结果。设计师可以帮助团队判断模型输出是否真的完成了用户任务。",
          en: "Model metrics explain capability, but product evaluation must cover user intent, context, interface feedback, and task outcome. Designers help teams decide whether the output actually completes the user's job."
        }
      },
      {
        heading: { zh: "落地方式", en: "How to operationalize it" },
        body: {
          zh: "建立样本库、评分表、问题标签和版本对比看板，让产品、设计、算法和工程能在同一组证据上讨论迭代优先级。",
          en: "Build sample sets, scorecards, issue labels, and version comparison dashboards so product, design, ML, and engineering can prioritize from the same evidence."
        }
      }
    ]
  },
  {
    slug: "design-system-for-ai",
    date: "2026-03-12",
    updated: "2026-03-18",
    readTime: "5 min",
    featured: false,
    tags: ["Design System", "AI UX", "Components"],
    category: { zh: "设计系统", en: "Design System" },
    author: "Pei",
    topic: { zh: "Design System", en: "Design System" },
    title: {
      zh: "AI 产品设计系统应该沉淀什么",
      en: "What an AI product design system should codify"
    },
    excerpt: {
      zh: "从等待态、置信度、引用来源到失败恢复，AI 产品的系统化远不止组件库。",
      en: "From waiting states and confidence to citations and recovery, AI design systems go beyond components."
    },
    sections: [
      {
        heading: { zh: "组件之外", en: "Beyond components" },
        body: {
          zh: "AI 产品设计系统不能只沉淀按钮、输入框和卡片，还要沉淀模型相关的产品行为，比如等待、生成、置信度、来源、失败和重试。",
          en: "An AI design system should not only codify buttons, inputs, and cards. It also needs product behaviors around waiting, generation, confidence, sources, failure, and retry."
        }
      },
      {
        heading: { zh: "状态是核心资产", en: "States are core assets" },
        body: {
          zh: "AI 体验最容易出问题的地方往往是状态不可见。系统应该定义每个生成任务在准备、执行、需要确认、失败、完成时的反馈和可操作项。",
          en: "AI experiences often fail when state is invisible. The system should define feedback and available actions for preparing, running, confirming, failing, and completed generation tasks."
        }
      },
      {
        heading: { zh: "团队协作价值", en: "Team value" },
        body: {
          zh: "当这些模式被系统化，产品和工程就能快速复用可靠体验，设计评审也能从视觉一致性升级到行为一致性。",
          en: "When these patterns are systemized, product and engineering can reuse reliable experiences, while design reviews move from visual consistency to behavioral consistency."
        }
      }
    ]
  }
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
  };
}
