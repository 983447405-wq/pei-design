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
    slug: "ai-short-drama-studio",
    year: "2025",
    featured: true,
    tone: "violet",
    tags: ["AI", "Product", "UX", "Motion"],
    title: {
      zh: "AI Short Drama Studio",
      en: "AI Short Drama Studio"
    },
    summary: {
      zh: "AI 短剧内容创作平台，从 0→1 建立创作流程、设计语言、组件系统和动效体验。",
      en: "An AI content creation platform for short drama production, built from 0 to 1 with workflow, design language, component system, and motion experience."
    },
    role: {
      zh: "Lead Product Designer / AI Workflow",
      en: "Lead Product Designer / AI Workflow"
    },
    impact: {
      zh: "完成 0→1 产品体验、AI 创作工作流和可扩展设计系统。",
      en: "Delivered a 0-to-1 product experience, AI creation workflow, and scalable design system."
    },
    media: [
      {
        type: "Video",
        label: { zh: "AI 生成与创作流程演示", en: "AI generation and creation workflow" },
        detail: { zh: "后续可替换为真实 MP4 / WebM / GIF。", en: "Reserved for real MP4, WebM, or GIF assets." }
      },
      {
        type: "Images",
        label: { zh: "核心界面与动效图集", en: "Key UI and motion gallery" },
        detail: { zh: "覆盖创作台、分镜、生成状态和预览。", en: "Creation console, storyboard, generation states, and preview." }
      },
      {
        type: "PDF",
        label: { zh: "0→1 设计复盘", en: "0-to-1 design case deck" },
        detail: {
          zh: "产品策略、体验架构、组件规范和上线取舍。",
          en: "Product strategy, UX architecture, component specs, and launch tradeoffs."
        }
      }
    ],
    metrics: [
      { label: { zh: "产品阶段", en: "Product stage" }, value: "0→1" },
      { label: { zh: "组件复用", en: "Component reuse" }, value: "40%" },
      { label: { zh: "AI 工作流", en: "AI workflow" }, value: "End-to-end" }
    ],
    sections: {
      background: {
        zh: "短剧创作涉及剧本、角色、分镜、画面生成、视频预览和版本管理。早期流程分散在多个工具中，创作者难以稳定控制 AI 生成结果。",
        en: "Short drama creation spans scripts, characters, storyboards, image generation, video previews, and version management. The early workflow was scattered across tools, making AI output difficult to control."
      },
      responsibilities: [
        { zh: "定义 AI 短剧创作平台的信息架构和核心工作流。", en: "Defined the IA and core workflow for the AI short drama platform." },
        {
          zh: "负责产品策略、UX、视觉语言、动效和设计系统。",
          en: "Owned product strategy, UX, visual language, motion, and design system."
        },
        {
          zh: "与产品、算法、前端协作拆解 MVP 范围和上线优先级。",
          en: "Aligned product, AI, and frontend teams around MVP scope and launch priorities."
        }
      ],
      process: [
        { zh: "拆解创作者从想法到视频预览的完整任务链路。", en: "Mapped the full task chain from idea to video preview." },
        {
          zh: "设计脚本、分镜、素材、生成状态和版本回溯模型。",
          en: "Designed models for scripts, storyboards, assets, generation states, and version history."
        },
        {
          zh: "用高保真原型验证创作效率、控制感和错误恢复路径。",
          en: "Validated efficiency, control, and recovery paths through high-fidelity prototypes."
        }
      ],
      outcome: [
        {
          zh: "交付完整创作平台体验、组件系统和动效规范。",
          en: "Delivered the complete creation platform experience, component system, and motion specs."
        },
        {
          zh: "建立 AI 生成等待、失败、重试、预览和版本对比的统一模式。",
          en: "Established reusable patterns for AI waiting, failure, retry, preview, and version comparison."
        }
      ],
      results: [
        { zh: "完成 0→1 产品体验定义并进入工程拆解。", en: "Completed 0-to-1 experience definition and moved into engineering planning." },
        { zh: "沉淀可复用设计系统，支持后续 AI 内容产品扩展。", en: "Built a reusable design system for future AI content products." },
        { zh: "提高创作路径清晰度和多角色协作效率。", en: "Improved workflow clarity and multi-role collaboration." }
      ]
    }
  },
  {
    slug: "falcocut",
    year: "2025",
    featured: true,
    tone: "cyan",
    tags: ["AI", "Video", "Workflow"],
    title: {
      zh: "FalcoCut",
      en: "FalcoCut"
    },
    summary: {
      zh: "AI 视频编辑平台，通过数据驱动迭代优化创作者工作流、界面一致性和 AI 辅助剪辑体验。",
      en: "An AI video editing platform optimized through data-driven iteration across creator workflows, interface consistency, and AI-assisted editing."
    },
    role: {
      zh: "Product Designer / Creator Workflow",
      en: "Product Designer / Creator Workflow"
    },
    impact: {
      zh: "围绕创作效率和 AI 辅助剪辑建立更轻、更稳定的编辑体验。",
      en: "Created a lighter and more consistent editing experience around creator efficiency and AI-assisted editing."
    },
    media: [
      {
        type: "Video",
        label: { zh: "AI 剪辑流程演示", en: "AI editing workflow demo" },
        detail: { zh: "展示素材导入、智能剪辑、预览和导出。", en: "Import, AI editing, preview, and export." }
      },
      {
        type: "Images",
        label: { zh: "编辑台界面图集", en: "Editor interface gallery" },
        detail: { zh: "时间线、素材库、参数面板和结果预览。", en: "Timeline, asset library, parameter panel, and result preview." }
      },
      {
        type: "Prototype",
        label: { zh: "交互原型", en: "Interaction prototype" },
        detail: { zh: "验证关键剪辑路径和状态反馈。", en: "Validated key editing paths and state feedback." }
      }
    ],
    metrics: [
      { label: { zh: "核心路径", en: "Core path" }, value: "Simplified" },
      { label: { zh: "迭代依据", en: "Iteration basis" }, value: "Data" },
      { label: { zh: "体验重点", en: "Experience focus" }, value: "Creator" }
    ],
    sections: {
      background: {
        zh: "AI 视频编辑工具需要同时服务专业编辑和轻量创作者。旧流程中素材管理、智能生成、预览和导出之间切换频繁，影响效率。",
        en: "AI video editing tools need to serve both professional editors and lightweight creators. The old flow forced frequent switching between assets, AI generation, preview, and export."
      },
      responsibilities: [
        { zh: "梳理创作者高频任务和低效节点。", en: "Mapped creator tasks and workflow bottlenecks." },
        {
          zh: "优化编辑台、素材库、预览和 AI 辅助剪辑体验。",
          en: "Improved the editor, asset library, preview, and AI-assisted editing experience."
        },
        { zh: "推动界面规范统一，提高跨模块一致性。", en: "Unified interface patterns to improve cross-module consistency." }
      ],
      process: [
        { zh: "基于行为数据定位转化损耗和操作断点。", en: "Used behavior data to identify conversion loss and interaction drop-offs." },
        {
          zh: "重构编辑路径，减少用户在参数和预览之间的来回切换。",
          en: "Restructured editing paths to reduce switching between parameters and previews."
        },
        {
          zh: "用原型快速验证时间线、AI 建议和结果确认模式。",
          en: "Validated timeline, AI suggestion, and result confirmation patterns through prototypes."
        }
      ],
      outcome: [
        { zh: "形成更清晰的视频编辑工作台和 AI 辅助状态反馈。", en: "Created a clearer video editor and AI assistance state feedback." },
        { zh: "建立适合视频工具的组件和交互规范。", en: "Built component and interaction standards for video tools." }
      ],
      results: [
        { zh: "提升创作者关键路径效率和界面一致性。", en: "Improved creator efficiency and interface consistency." },
        {
          zh: "让 AI 辅助剪辑从黑盒能力变成可确认、可调整的体验。",
          en: "Made AI-assisted editing confirmable and adjustable instead of a black-box flow."
        },
        { zh: "支持后续真实视频项目接入和商业化迭代。", en: "Supported future real video asset integration and commercial iteration." }
      ]
    }
  },
  {
    slug: "honor-smart-video",
    year: "2025",
    featured: true,
    tone: "blue",
    tags: ["AI", "Smart Video", "UI"],
    title: {
      zh: "Honor Smart Video",
      en: "Honor Smart Video"
    },
    summary: {
      zh: "荣耀合作项目，遵循 Honor Design Language 完成智能视频界面设计和体验优化，多版本高质量交付。",
      en: "A collaboration project with Honor, delivering smart video interface design and experience optimization following Honor Design Language."
    },
    role: {
      zh: "UI/UX Designer / Experience Optimization",
      en: "UI/UX Designer / Experience Optimization"
    },
    impact: {
      zh: "在品牌规范、智能视频能力和工程可实现性之间完成多版本交付。",
      en: "Delivered multiple versions across brand guidelines, smart video capability, and implementation constraints."
    },
    media: [
      {
        type: "Images",
        label: { zh: "智能视频界面", en: "Smart video interfaces" },
        detail: { zh: "遵循荣耀设计语言的核心页面。", en: "Core pages following Honor Design Language." }
      },
      {
        type: "PDF",
        label: { zh: "版本交付说明", en: "Version delivery deck" },
        detail: { zh: "多轮方案、规范对齐和交付记录。", en: "Design iterations, guideline alignment, and delivery records." }
      },
      {
        type: "Prototype",
        label: { zh: "关键流程原型", en: "Key flow prototype" },
        detail: { zh: "验证视频生成、预览和操作反馈。", en: "Validated video generation, preview, and operation feedback." }
      }
    ],
    metrics: [
      { label: { zh: "版本交付", en: "Delivery" }, value: "100%" },
      { label: { zh: "项目类型", en: "Project type" }, value: "Honor" },
      { label: { zh: "体验方向", en: "Experience" }, value: "Smart Video" }
    ],
    sections: {
      background: {
        zh: "智能视频产品需要在品牌设计语言、AI 能力表达和实际操作效率之间取得平衡，同时保证多轮版本交付质量。",
        en: "The smart video product needed to balance brand design language, AI capability expression, and operational efficiency while maintaining delivery quality across versions."
      },
      responsibilities: [
        { zh: "负责核心界面设计和体验优化。", en: "Owned core interface design and experience optimization." },
        { zh: "对齐 Honor Design Language 和项目交付规范。", en: "Aligned with Honor Design Language and delivery requirements." },
        { zh: "配合多轮评审推进方案落地。", en: "Supported multiple review rounds to move designs into implementation." }
      ],
      process: [
        { zh: "分析品牌规范、组件约束和视频场景任务。", en: "Analyzed brand guidelines, component constraints, and video use cases." },
        { zh: "打磨关键界面层级、状态反馈和操作入口。", en: "Refined hierarchy, state feedback, and operation entry points." },
        { zh: "按版本节奏输出高保真稿和交付标注。", en: "Delivered high-fidelity designs and handoff specs by version cadence." }
      ],
      outcome: [
        { zh: "完成智能视频关键界面和多版本设计交付。", en: "Delivered key smart video interfaces across multiple versions." },
        {
          zh: "保持品牌一致性的同时提升 AI 视频操作清晰度。",
          en: "Improved AI video operation clarity while preserving brand consistency."
        }
      ],
      results: [
        { zh: "按项目节点完成 100% 版本交付。", en: "Completed 100% of version delivery milestones." },
        { zh: "减少跨团队评审中的视觉与交互返工。", en: "Reduced visual and interaction rework during cross-team reviews." },
        { zh: "支持后续智能视频体验扩展。", en: "Supported future smart video experience extensions." }
      ]
    }
  },
  {
    slug: "ai-shopping-assistant",
    year: "2024",
    featured: true,
    tone: "cyan",
    tags: ["AI", "Shopping", "Conversation"],
    title: {
      zh: "AI Shopping Assistant",
      en: "AI Shopping Assistant"
    },
    summary: {
      zh: "阿里巴巴 · 银泰 AI 购物助手，从 V1.0–V2.4 设计对话式购物体验、推荐策略和用户行为优化。",
      en: "Alibaba · Intime AI shopping assistant, designing conversational shopping experiences, recommendation strategy, and behavior-based optimization from V1.0 to V2.4."
    },
    role: {
      zh: "Product Designer / Conversational Commerce",
      en: "Product Designer / Conversational Commerce"
    },
    impact: {
      zh: "推动 GMV +36%，改善转化率和 NPS。",
      en: "Drove +36% GMV growth while improving conversion rate and NPS."
    },
    media: [
      {
        type: "Images",
        label: { zh: "对话式购物界面", en: "Conversational shopping UI" },
        detail: {
          zh: "对话、商品推荐、意图识别和转化路径。",
          en: "Dialogue, product recommendation, intent recognition, and conversion path."
        }
      },
      {
        type: "PDF",
        label: { zh: "V1.0–V2.4 迭代复盘", en: "V1.0-V2.4 iteration deck" },
        detail: { zh: "用户行为分析、策略调整和体验演进。", en: "Behavior analysis, strategy changes, and experience evolution." }
      },
      {
        type: "Prototype",
        label: { zh: "AI 对话流程原型", en: "AI dialogue flow prototype" },
        detail: { zh: "覆盖咨询、推荐、追问和购买决策。", en: "Consultation, recommendation, follow-up, and purchase decisions." }
      }
    ],
    metrics: [
      { label: { zh: "GMV 增长", en: "GMV growth" }, value: "+36%" },
      { label: { zh: "迭代版本", en: "Versions" }, value: "V1.0-2.4" },
      { label: { zh: "体验指标", en: "UX metric" }, value: "NPS" }
    ],
    sections: {
      background: {
        zh: "线下零售场景中，用户需要快速获得适合自己的商品推荐。传统筛选和搜索很难承接模糊需求，也难以持续推动成交。",
        en: "In retail shopping, users need relevant recommendations quickly. Traditional search and filters struggle with ambiguous intent and conversion continuity."
      },
      responsibilities: [
        {
          zh: "设计 AI 对话式购物 V1.0–V2.4 的体验框架。",
          en: "Designed the V1.0-V2.4 experience framework for AI conversational shopping."
        },
        { zh: "优化 AI 对话流、推荐策略和转化链路。", en: "Optimized dialogue flow, recommendation strategy, and conversion path." },
        { zh: "基于用户行为分析推动体验迭代。", en: "Drove iteration through user behavior analysis." }
      ],
      process: [
        { zh: "拆解用户从模糊需求到购买决策的关键节点。", en: "Mapped key moments from ambiguous need to purchase decision." },
        {
          zh: "设计多轮追问、商品推荐、理由解释和兜底路径。",
          en: "Designed follow-up questions, product recommendations, rationale, and fallback paths."
        },
        {
          zh: "结合数据反馈优化推荐卡片、对话节奏和行动按钮。",
          en: "Improved recommendation cards, dialogue rhythm, and calls to action with data feedback."
        }
      ],
      outcome: [
        {
          zh: "形成可迭代的 AI 购物助手体验和对话组件模式。",
          en: "Created an iterative AI shopping assistant experience and dialogue component patterns."
        },
        { zh: "让 AI 推荐从被动展示转向主动协助决策。", en: "Shifted AI recommendation from passive display to active decision support." }
      ],
      results: [
        { zh: "GMV 增长 36%。", en: "GMV increased by 36%." },
        { zh: "转化率和 NPS 得到改善。", en: "Conversion rate and NPS improved." },
        { zh: "沉淀 V1.0–V2.4 连续迭代经验。", en: "Built iteration learnings across V1.0-V2.4." }
      ]
    }
  },
  {
    slug: "ai-virtual-try-on",
    year: "2024",
    featured: true,
    tone: "violet",
    tags: ["AI", "Virtual Try-on", "Retail"],
    title: {
      zh: "AI Virtual Try-on",
      en: "AI Virtual Try-on"
    },
    summary: {
      zh: "阿里巴巴 · 银泰 AI 虚拟试衣，从 0→2.2 设计完整体验，降低购买犹豫并提升线上购物效率。",
      en: "Alibaba · Intime AI virtual fitting experience from 0 to 2.2, reducing purchase hesitation and improving online shopping efficiency."
    },
    role: {
      zh: "Product Designer / AI Retail Experience",
      en: "Product Designer / AI Retail Experience"
    },
    impact: {
      zh: "获得中国零售数字化创新案例 2024 和创新突破团队奖。",
      en: "Recognized as China Retail Digital Innovation Case 2024 and awarded Innovation Breakthrough Team Award."
    },
    media: [
      {
        type: "Images",
        label: { zh: "虚拟试衣流程图集", en: "Virtual try-on flow gallery" },
        detail: { zh: "上传、生成、对比、换款和购买决策。", en: "Upload, generation, comparison, style switch, and purchase decision." }
      },
      {
        type: "Video",
        label: { zh: "AI 试衣动效演示", en: "AI try-on motion demo" },
        detail: { zh: "展示生成等待、结果呈现和对比反馈。", en: "Generation wait, result reveal, and comparison feedback." }
      },
      {
        type: "PDF",
        label: { zh: "获奖项目复盘", en: "Awarded project case deck" },
        detail: { zh: "0→2.2 演进、商业结果和创新价值。", en: "0-to-2.2 evolution, business outcomes, and innovation value." }
      }
    ],
    metrics: [
      { label: { zh: "产品阶段", en: "Product stage" }, value: "0→2.2" },
      { label: { zh: "案例奖项", en: "Recognition" }, value: "2024" },
      { label: { zh: "团队奖项", en: "Team award" }, value: "Innovation" }
    ],
    sections: {
      background: {
        zh: "服饰购买中的尺码、上身效果和搭配预期会造成用户犹豫。AI 虚拟试衣需要在生成能力、可信反馈和购物决策之间建立顺畅路径。",
        en: "Fashion shopping often creates hesitation around size, fit, and styling expectations. AI virtual try-on needed a smooth path across generation, trustworthy feedback, and purchase decisions."
      },
      responsibilities: [
        { zh: "负责 AI 虚拟试衣 0→2.2 完整体验设计。", en: "Designed the complete AI virtual try-on experience from 0 to 2.2." },
        {
          zh: "设计生成等待、结果呈现、换款、对比和购买路径。",
          en: "Designed waiting, result reveal, style switching, comparison, and purchase paths."
        },
        {
          zh: "推动体验与零售业务目标、AI 能力边界对齐。",
          en: "Aligned experience design with retail goals and AI capability constraints."
        }
      ],
      process: [
        { zh: "分析用户购买犹豫场景和试衣决策链路。", en: "Analyzed purchase hesitation and try-on decision paths." },
        {
          zh: "把 AI 生成不确定性转化为可理解的状态和反馈。",
          en: "Turned AI generation uncertainty into understandable states and feedback."
        },
        {
          zh: "通过多版本迭代提升结果可信度和购物闭环效率。",
          en: "Improved perceived trust and shopping loop efficiency through multiple versions."
        }
      ],
      outcome: [
        { zh: "交付沉浸式 AI 试衣体验和完整购物闭环。", en: "Delivered an immersive AI try-on experience and complete shopping loop." },
        { zh: "建立生成式 AI 在零售场景中的体验表达范式。", en: "Built an experience pattern for generative AI in retail." }
      ],
      results: [
        { zh: "入选中国零售数字化创新案例 2024。", en: "Selected as China Retail Digital Innovation Case 2024." },
        { zh: "获得创新突破团队奖。", en: "Received Innovation Breakthrough Team Award." },
        { zh: "降低线上购物犹豫并提升决策效率。", en: "Reduced online shopping hesitation and improved decision efficiency." }
      ]
    }
  },
  {
    slug: "tongyi-app",
    year: "2023-2024",
    featured: true,
    tone: "cyan",
    tags: ["AI", "Interaction", "Campaign"],
    title: {
      zh: "Tongyi App",
      en: "Tongyi App"
    },
    summary: {
      zh: "通义 App AI 交互体验，参与多个 AI 互动功能和运营活动设计，连接模型能力与用户场景。",
      en: "AI interaction experience for Tongyi App, designing multiple AI interaction features and operation campaigns that connect model capability with user scenarios."
    },
    role: {
      zh: "UI Designer / AI Interaction",
      en: "UI Designer / AI Interaction"
    },
    impact: {
      zh: "完成多项 AI 互动功能与运营活动设计，提升用户参与和功能理解。",
      en: "Delivered multiple AI interaction features and operation campaigns to improve engagement and feature comprehension."
    },
    media: [
      {
        type: "Images",
        label: { zh: "AI 互动界面", en: "AI interaction interfaces" },
        detail: { zh: "通义场景下的多种 AI 互动能力。", en: "AI interaction capabilities across Tongyi scenarios." }
      },
      {
        type: "Prototype",
        label: { zh: "运营活动原型", en: "Campaign prototype" },
        detail: { zh: "活动路径、互动反馈和结果页体验。", en: "Campaign paths, interaction feedback, and result pages." }
      },
      {
        type: "Video",
        label: { zh: "交互动效预览", en: "Interaction motion preview" },
        detail: { zh: "AI 反馈、生成过程和转场动效。", en: "AI feedback, generation process, and transition motion." }
      }
    ],
    metrics: [
      { label: { zh: "功能类型", en: "Feature type" }, value: "AI" },
      { label: { zh: "设计方向", en: "Design focus" }, value: "Interaction" },
      { label: { zh: "交付范围", en: "Scope" }, value: "Campaign" }
    ],
    sections: {
      background: {
        zh: "通义 App 的 AI 能力需要通过更直观的交互和运营活动被用户感知。设计需要在模型能力、活动传播和日常使用之间找到清晰表达。",
        en: "Tongyi App needed AI capabilities to become more visible through intuitive interaction and campaigns. Design had to clarify model capability, campaign communication, and everyday use."
      },
      responsibilities: [
        { zh: "参与通义 App AI 互动功能和运营活动设计。", en: "Designed AI interaction features and operation campaigns for Tongyi App." },
        {
          zh: "负责关键界面、视觉表达、状态反馈和动效方向。",
          en: "Owned key interfaces, visual expression, state feedback, and motion direction."
        },
        { zh: "与产品和研发协作推进多版本交付。", en: "Worked with product and engineering to deliver multiple iterations." }
      ],
      process: [
        {
          zh: "梳理用户触达、互动、生成和分享的完整活动链路。",
          en: "Mapped the full campaign path from entry, interaction, generation, to sharing."
        },
        { zh: "设计 AI 等待、生成、结果呈现和异常反馈。", en: "Designed AI waiting, generation, result reveal, and exception feedback." },
        { zh: "通过高保真稿和动效说明降低交付误差。", en: "Reduced handoff ambiguity through high-fidelity designs and motion specs." }
      ],
      outcome: [
        { zh: "交付多项 AI 互动体验和运营活动页面。", en: "Delivered multiple AI interaction experiences and campaign pages." },
        { zh: "让 AI 能力更容易被用户理解、尝试和传播。", en: "Made AI capabilities easier for users to understand, try, and share." }
      ],
      results: [
        { zh: "支持通义 App 多项 AI 互动功能上线。", en: "Supported the launch of multiple Tongyi App AI interaction features." },
        { zh: "提升活动体验完整度和 AI 功能感知。", en: "Improved campaign experience completeness and AI feature perception." },
        { zh: "沉淀 AI 互动与运营活动的设计经验。", en: "Built design learnings for AI interaction and campaigns." }
      ]
    }
  },
  {
    slug: "ziroom-enterprise-platform",
    year: "2021-2024",
    featured: true,
    tone: "blue",
    tags: ["SaaS", "CRM", "Workflow"],
    title: {
      zh: "Ziroom Enterprise Platform",
      en: "Ziroom Enterprise Platform"
    },
    summary: {
      zh: "企业 SaaS 体验设计，覆盖 CRM、VR 看房、房源管理、客户管理和业务流程优化。",
      en: "Enterprise SaaS experience design across CRM, VR house viewing, property management, customer management, and workflow optimization."
    },
    role: {
      zh: "Product Designer / Enterprise UX",
      en: "Product Designer / Enterprise UX"
    },
    impact: {
      zh: "通过用户中心设计提升复杂业务系统的操作效率和流程清晰度。",
      en: "Improved operational efficiency and workflow clarity in complex business systems through user-centered design."
    },
    media: [
      {
        type: "Images",
        label: { zh: "SaaS 界面图集", en: "SaaS interface gallery" },
        detail: { zh: "CRM、房源、客户、VR 看房和运营工作台。", en: "CRM, properties, customers, VR viewing, and operations console." }
      },
      {
        type: "PDF",
        label: { zh: "业务流程复盘", en: "Workflow case deck" },
        detail: { zh: "复杂角色、权限、任务和数据结构梳理。", en: "Roles, permissions, tasks, and data structure mapping." }
      },
      {
        type: "Prototype",
        label: { zh: "业务系统原型", en: "Enterprise system prototype" },
        detail: { zh: "验证高频操作和异常处理流程。", en: "Validated frequent operations and exception handling." }
      }
    ],
    metrics: [
      { label: { zh: "系统范围", en: "System scope" }, value: "4+" },
      { label: { zh: "项目周期", en: "Duration" }, value: "3 yrs" },
      { label: { zh: "体验类型", en: "UX type" }, value: "SaaS" }
    ],
    sections: {
      background: {
        zh: "长租业务系统角色多、流程长、数据密度高。设计需要在效率、准确性、权限控制和异常处理之间保持平衡。",
        en: "Long-term rental operations involve many roles, long workflows, and dense data. Design needed to balance efficiency, accuracy, permission control, and exception handling."
      },
      responsibilities: [
        {
          zh: "负责 CRM、VR 看房、房源管理和客户管理等模块体验。",
          en: "Owned UX for CRM, VR house viewing, property management, and customer management modules."
        },
        { zh: "梳理业务流程、信息架构、权限和任务状态。", en: "Mapped workflows, IA, permissions, and task states." },
        {
          zh: "与产品、业务、研发协作推动复杂系统上线。",
          en: "Collaborated with product, business, and engineering to ship complex systems."
        }
      ],
      process: [
        {
          zh: "访谈一线业务角色，识别高频任务和系统断点。",
          en: "Interviewed business roles to identify frequent tasks and system breakpoints."
        },
        { zh: "重构信息架构和表单、列表、详情页操作路径。", en: "Restructured IA and paths for forms, lists, and detail pages." },
        { zh: "用原型和规范降低跨团队理解成本。", en: "Used prototypes and specs to reduce cross-team communication cost." }
      ],
      outcome: [
        { zh: "交付多个企业系统模块和复用交互规范。", en: "Delivered multiple enterprise modules and reusable interaction standards." },
        {
          zh: "提升业务人员处理任务、查看信息和推进流程的效率。",
          en: "Improved task handling, information access, and workflow efficiency for operators."
        }
      ],
      results: [
        {
          zh: "支撑 CRM、VR 看房、房源和客户管理等核心业务。",
          en: "Supported core business areas including CRM, VR viewing, properties, and customer management."
        },
        { zh: "提升复杂流程清晰度和运营效率。", en: "Improved complex workflow clarity and operational efficiency." },
        { zh: "为后续 AI 产品设计积累了企业工作流经验。", en: "Built enterprise workflow experience that informed later AI product work." }
      ]
    }
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
