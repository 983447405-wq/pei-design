import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  year: string;
  featured: boolean;
  tone: "cyan" | "blue" | "violet";
  tags: string[];
  title: Localized;
  summary: Localized;
  role: Localized;
  impact: Localized;
  media: Array<{
    type: "Images" | "PDF" | "Video" | "Prototype";
    label: Localized;
    detail: Localized;
  }>;
  metrics: Array<{ label: Localized; value: string }>;
  sections: {
    background: Localized;
    responsibilities: Localized[];
    process: Localized[];
    outcome: Localized[];
    results: Localized[];
  };
};

export const projects: Project[] = [
  {
    slug: "enterprise-agent-copilot",
    year: "2026",
    featured: true,
    tone: "cyan",
    tags: ["Agent UX", "B2B SaaS", "Workflow"],
    title: {
      zh: "Enterprise Agent Copilot",
      en: "Enterprise Agent Copilot"
    },
    summary: {
      zh: "为企业运营团队设计可审计、可接管、可解释的 Agent 工作台。",
      en: "A controllable, auditable, and explainable agent workspace for enterprise operations teams."
    },
    role: {
      zh: "AI 产品设计负责人 / 0→1 产品定义",
      en: "AI Product Design Lead / 0-to-1 Product Definition"
    },
    impact: {
      zh: "任务完成率 +38%，人工接管时长 -31%。",
      en: "Task completion increased by 38%, while manual takeover time dropped by 31%."
    },
    media: [
      {
        type: "PDF",
        label: { zh: "案例汇报 PDF", en: "Case deck PDF" },
        detail: { zh: "问题定义、方案取舍、上线结果。", en: "Problem framing, tradeoffs, and launch results." }
      },
      {
        type: "Video",
        label: { zh: "Agent 接管流程视频", en: "Agent takeover walkthrough" },
        detail: { zh: "展示异常、确认和人工接管链路。", en: "Exception, confirmation, and human takeover flow." }
      },
      {
        type: "Images",
        label: { zh: "关键界面图集", en: "Key interface gallery" },
        detail: { zh: "工作台、任务状态、审计记录。", en: "Workspace, task states, and audit trail." }
      }
    ],
    metrics: [
      { label: { zh: "任务完成率", en: "Task completion" }, value: "+38%" },
      { label: { zh: "接管时长", en: "Takeover time" }, value: "-31%" },
      { label: { zh: "核心流程", en: "Core flows" }, value: "12" }
    ],
    sections: {
      background: {
        zh: "业务团队希望用 Agent 执行重复运营任务，但早期方案只有聊天框，缺少任务状态、引用来源、风险控制和人工接管机制。",
        en: "The operations team wanted agents to execute repetitive work, but the early experience was only a chat box without task state, source references, risk controls, or human takeover."
      },
      responsibilities: [
        { zh: "定义 Agent 工作台信息架构和任务状态模型。", en: "Defined the agent workspace IA and task state model." },
        { zh: "设计引用、确认、撤回、异常接管和审计记录模式。", en: "Designed references, confirmations, undo, exception takeover, and audit trails." },
        { zh: "推动产品、算法、工程对齐 MVP 范围和评测指标。", en: "Aligned product, ML, and engineering on MVP scope and evaluation metrics." }
      ],
      process: [
        { zh: "访谈运营用户，拆解高频任务与人工判断节点。", en: "Interviewed operators and mapped high-frequency tasks with human judgment points." },
        { zh: "用任务流原型验证 Agent 可控性和失败恢复路径。", en: "Validated controllability and recovery paths through task-flow prototypes." },
        { zh: "建立状态组件库，统一等待、执行、风险和完成反馈。", en: "Built a state component library for waiting, running, risky, and completed states." }
      ],
      outcome: [
        { zh: "交付端到端 Agent 工作台、高保真原型和设计系统规范。", en: "Delivered an end-to-end agent workspace, high-fidelity prototype, and design system specs." },
        { zh: "建立从模型输出到人工审核的完整可追溯链路。", en: "Created a traceable path from model output to human review." }
      ],
      results: [
        { zh: "核心任务完成率提升 38%。", en: "Core task completion increased by 38%." },
        { zh: "人工接管平均时长降低 31%。", en: "Average manual takeover time decreased by 31%." },
        { zh: "上线前发现 17 个高风险交互问题。", en: "Identified 17 high-risk interaction issues before launch." }
      ]
    }
  },
  {
    slug: "llm-experience-evaluation",
    year: "2025",
    featured: true,
    tone: "blue",
    tags: ["LLM Eval", "Design Ops", "Dashboard"],
    title: {
      zh: "LLM Experience Evaluation",
      en: "LLM Experience Evaluation"
    },
    summary: {
      zh: "把主观 AI 体验质量拆解为可评分、可复盘、可推动迭代的评测体系。",
      en: "A measurable evaluation framework for subjective AI experience quality."
    },
    role: {
      zh: "体验评测体系负责人 / Design Ops",
      en: "Experience Evaluation Lead / Design Ops"
    },
    impact: {
      zh: "设计评审周期 -42%，上线前问题发现率 +55%。",
      en: "Design review cycles reduced by 42%, with 55% more issues found before launch."
    },
    media: [
      {
        type: "PDF",
        label: { zh: "评测体系说明 PDF", en: "Evaluation framework PDF" },
        detail: { zh: "评分维度、样本结构、评审流程。", en: "Scoring dimensions, sample structure, and review process." }
      },
      {
        type: "Images",
        label: { zh: "评测看板截图", en: "Dashboard screenshots" },
        detail: { zh: "问题分布、版本对比、趋势追踪。", en: "Issue distribution, version comparison, and trend tracking." }
      },
      {
        type: "Prototype",
        label: { zh: "评审工作流原型", en: "Review workflow prototype" },
        detail: { zh: "跨团队评审与标注路径。", en: "Cross-functional review and annotation paths." }
      }
    ],
    metrics: [
      { label: { zh: "评审周期", en: "Review cycle" }, value: "-42%" },
      { label: { zh: "问题发现", en: "Issue discovery" }, value: "+55%" },
      { label: { zh: "评测维度", en: "Eval dimensions" }, value: "8" }
    ],
    sections: {
      background: {
        zh: "团队对“AI 好不好用”的判断高度主观，产品、设计和算法难以围绕同一组问题做优先级决策。",
        en: "The team lacked a shared language for whether an AI experience was good, making prioritization across product, design, and ML difficult."
      },
      responsibilities: [
        { zh: "定义体验评测维度和评分规则。", en: "Defined evaluation dimensions and scoring rules." },
        { zh: "设计评测看板、问题分布和版本对比体验。", en: "Designed evaluation dashboards, issue distribution, and version comparison flows." },
        { zh: "组织跨团队评测工作坊。", en: "Facilitated cross-functional evaluation workshops." }
      ],
      process: [
        { zh: "收集历史问题，聚类为可操作的体验维度。", en: "Clustered historical issues into actionable experience dimensions." },
        { zh: "把模型输出、用户意图和产品反馈串成评测样本。", en: "Connected model output, user intent, and product feedback into evaluation samples." },
        { zh: "用真实用例校准评分一致性。", en: "Calibrated scoring consistency with real use cases." }
      ],
      outcome: [
        { zh: "形成 LLM 体验评分表、看板和评审流程。", en: "Created an LLM experience scorecard, dashboard, and review workflow." },
        { zh: "让模型、产品和设计在同一指标下讨论质量。", en: "Enabled ML, product, and design to discuss quality through the same metrics." }
      ],
      results: [
        { zh: "设计评审周期缩短 42%。", en: "Design review cycles shortened by 42%." },
        { zh: "上线前问题发现率提升 55%。", en: "Pre-launch issue discovery improved by 55%." },
        { zh: "复用于 5 条 AI 产品线。", en: "Reused across five AI product lines." }
      ]
    }
  },
  {
    slug: "multimodal-creation-studio",
    year: "2025",
    featured: true,
    tone: "violet",
    tags: ["Multimodal", "Creation Tool", "Interaction"],
    title: {
      zh: "Multimodal Creation Studio",
      en: "Multimodal Creation Studio"
    },
    summary: {
      zh: "为图片、视频、文案生成工具设计多模态创作控制台。",
      en: "A multimodal creation console for image, video, and copy generation workflows."
    },
    role: {
      zh: "创作工具体验设计 / Interaction Design",
      en: "Creation Tool UX / Interaction Design"
    },
    impact: {
      zh: "核心创作路径从 9 步减少到 4 步。",
      en: "Reduced the core creation path from nine steps to four."
    },
    media: [
      {
        type: "Video",
        label: { zh: "多模态生成演示", en: "Multimodal generation demo" },
        detail: { zh: "图片、视频、文案生成联动。", en: "Image, video, and copy generation loop." }
      },
      {
        type: "Images",
        label: { zh: "控制台界面图集", en: "Studio interface gallery" },
        detail: { zh: "参数、素材、版本和预览。", en: "Parameters, assets, versions, and previews." }
      },
      {
        type: "PDF",
        label: { zh: "组件状态规范", en: "Component state spec" },
        detail: { zh: "等待、失败、队列、生成完成状态。", en: "Waiting, failure, queue, and completion states." }
      }
    ],
    metrics: [
      { label: { zh: "操作步骤", en: "Steps" }, value: "9→4" },
      { label: { zh: "复用组件", en: "Reusable components" }, value: "32" },
      { label: { zh: "原型轮次", en: "Prototype rounds" }, value: "6" }
    ],
    sections: {
      background: {
        zh: "用户需要在多种模型、素材、参数和版本之间切换，旧流程导致预览困难、返工频繁。",
        en: "Users had to switch between models, assets, parameters, and versions, making preview and iteration difficult."
      },
      responsibilities: [
        { zh: "重构多模态生成的信息架构。", en: "Restructured the multimodal generation IA." },
        { zh: "设计素材、参数、版本和预览的联动体验。", en: "Designed the interaction between assets, parameters, versions, and previews." },
        { zh: "推动高保真原型进入工程拆解。", en: "Moved high-fidelity prototypes into engineering planning." }
      ],
      process: [
        { zh: "梳理创作路径中的等待、失败和版本分叉。", en: "Mapped waiting, failure, and version branching in creation flows." },
        { zh: "设计可回溯的时间线和版本面板。", en: "Designed a traceable timeline and version panel." },
        { zh: "用可点击原型测试创作者的控制感。", en: "Tested perceived control through clickable prototypes." }
      ],
      outcome: [
        { zh: "交付创作控制台、参数面板和版本管理体验。", en: "Delivered the studio console, parameter panel, and version management experience." },
        { zh: "沉淀多模态工具的可复用交互模式。", en: "Codified reusable interaction patterns for multimodal tools." }
      ],
      results: [
        { zh: "核心路径减少到 4 步。", en: "Core path reduced to four steps." },
        { zh: "新用户首轮生成完成率提升。", en: "Improved first-generation completion for new users." },
        { zh: "工程复用 32 个组件状态。", en: "Engineering reused 32 component states." }
      ]
    }
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
