import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type Resource = {
  slug: string;
  type: "template" | "guide" | "prompt" | "tool";
  date: string;
  updated: string;
  featured: boolean;
  tags: string[];
  title: Localized;
  description: Localized;
  category: Localized;
  sections: Array<{
    heading: Localized;
    body: Localized;
  }>;
};

export const resources: Resource[] = [
  {
    slug: "ai-product-case-study-template",
    type: "template",
    date: "2026-06-01",
    updated: "2026-06-12",
    featured: true,
    tags: ["Portfolio", "Case Study", "AI Product"],
    title: {
      zh: "AI 产品案例复盘模板",
      en: "AI Product Case Study Template"
    },
    description: {
      zh: "用于整理 AI 产品项目背景、职责、设计过程、结果数据和设计思考的作品集模板。",
      en: "A portfolio template for AI product background, role, process, metrics, and design reflections."
    },
    category: { zh: "作品集模板", en: "Portfolio Template" },
    sections: [
      {
        heading: { zh: "适用场景", en: "Use case" },
        body: {
          zh: "适合整理 Agent、生成式 AI 工具、B 端 AI 工作台、评测系统等项目，帮助面试官快速看到你的产品判断和设计深度。",
          en: "Useful for agent products, generative AI tools, B2B AI workspaces, and evaluation systems where interviewers need to see product judgment and design depth."
        }
      },
      {
        heading: { zh: "结构", en: "Structure" },
        body: {
          zh: "建议按项目背景、我的职责、设计目标、过程推演、最终方案、数据结果和反思复盘组织内容。",
          en: "Organize content by background, role, goals, design process, final solution, metrics, and reflection."
        }
      }
    ]
  },
  {
    slug: "agent-ux-checklist",
    type: "guide",
    date: "2026-05-10",
    updated: "2026-05-16",
    featured: true,
    tags: ["Agent UX", "Checklist", "Design Review"],
    title: {
      zh: "Agent UX 设计评审清单",
      en: "Agent UX Design Review Checklist"
    },
    description: {
      zh: "从任务状态、确认机制、风险提示、引用来源、人工接管和审计记录检查 Agent 产品体验。",
      en: "Review task states, confirmations, risks, citations, human takeover, and audit trails for agent products."
    },
    category: { zh: "设计清单", en: "Design Checklist" },
    sections: [
      {
        heading: { zh: "核心检查项", en: "Core checks" },
        body: {
          zh: "每个 Agent 行为是否有明确状态、触发条件、用户确认、失败恢复和可追溯记录，是上线前必须检查的基础。",
          en: "Every agent action should have explicit state, trigger, confirmation, recovery, and traceability before launch."
        }
      },
      {
        heading: { zh: "评审方式", en: "Review method" },
        body: {
          zh: "建议用真实任务样本做走查，而不是只看理想路径。重点观察用户何时失去控制感。",
          en: "Use real task samples instead of ideal flows, and observe where users lose a sense of control."
        }
      }
    ]
  },
  {
    slug: "llm-eval-scorecard",
    type: "template",
    date: "2026-04-28",
    updated: "2026-05-02",
    featured: false,
    tags: ["LLM Eval", "Scorecard", "Design Ops"],
    title: {
      zh: "LLM 体验评测评分表",
      en: "LLM Experience Evaluation Scorecard"
    },
    description: {
      zh: "帮助团队把 AI 体验拆成可评分、可复盘、可排序的问题维度。",
      en: "A scorecard for turning AI experience quality into measurable and reviewable dimensions."
    },
    category: { zh: "评测工具", en: "Evaluation Tool" },
    sections: [
      {
        heading: { zh: "评分维度", en: "Scoring dimensions" },
        body: {
          zh: "包含意图理解、事实准确、上下文连续、可解释性、可控性、失败恢复和任务完成质量。",
          en: "Includes intent understanding, factuality, context continuity, explainability, controllability, recovery, and task completion quality."
        }
      },
      {
        heading: { zh: "使用建议", en: "Usage" },
        body: {
          zh: "每次评测都保留样本、评分原因和版本信息，方便后续对比模型和产品改动。",
          en: "Keep samples, scoring rationale, and version information so future model and product changes can be compared."
        }
      }
    ]
  }
];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

export function getAdjacentResources(slug: string) {
  const index = resources.findIndex((resource) => resource.slug === slug);

  return {
    previous: index > 0 ? resources[index - 1] : null,
    next: index >= 0 && index < resources.length - 1 ? resources[index + 1] : null
  };
}
