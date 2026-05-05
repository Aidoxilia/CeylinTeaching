export const allTopicsLabel = "All topics";

export const modeMeta = {
  official: {
    label: "Official Reference Mode",
    headline: "Verified answers for official/public paper references.",
    description:
      "Shows the paper, question reference, short legal summary, answer area, instant marking, and correction without copying full Pearson question text.",
    icon: "✓",
  },
  pdf: {
    label: "PDF Study Mode",
    headline: "Open the linked paper and answer the referenced question.",
    description:
      "Use the paper library and question card together. This mode prioritises items with public paper links so the source can stay beside your trainer workflow.",
    icon: "▣",
  },
  timed: {
    label: "Timed Paper Mode",
    headline: "Timed practice for papers without verified public mark schemes.",
    description:
      "This mode does not auto-mark. It is for timed runs, notes, and later self-review.",
    icon: "★",
  },
  model: {
    label: "Model Revision Mode",
    headline:
      "Optional model revision, clearly separated from official material.",
    description:
      "Every item here is labelled model revision and is not an official Pearson question.",
    icon: "↺",
  },
};

export const sourceTypeMeta = {
  "official-reference": {
    label: "Official reference",
    icon: "✓",
    badgeClass: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  },
  "selfcheck-only": {
    label: "Timed / self-check only",
    icon: "★",
    badgeClass: "border-amber-400/30 bg-amber-300/10 text-amber-100",
  },
  model: {
    label: "Model revision — not official Pearson question",
    icon: "↺",
    badgeClass: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100",
  },
};

export const paperLibrary = [
  {
    id: "pearson-search",
    title: "Pearson official past papers search",
    tag: "Official source index",
    badge: "Pearson",
    description:
      "Use the official Pearson search page to locate public papers and mark schemes for Unit 5.",
    paperUrl:
      "https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html",
  },
  {
    id: "jun23-paper",
    title: "June 2023 question paper",
    tag: "Public paper link",
    badge: "June 2023",
    description:
      "Public non-Studocu source for June 2023 paper references used in official mode.",
    paperUrl: "https://www.scribd.com/document/849468586/31627H-1P-0623-QU",
  },
  {
    id: "jan22-markscheme",
    title: "January 2022 official mark scheme",
    tag: "Official answer source",
    badge: "January 2022",
    description:
      "Official Pearson mark scheme used to verify January 2022 reference answers in the trainer.",
    markSchemeUrl:
      "https://qualifications.pearson.com/content/dam/pdf/BTEC-Nationals/Applied-Science/2016/External-assessments/31627h1p-unit5-rms-20220323.pdf",
  },
  {
    id: "jan25-preview",
    title: "January 2025 paper preview",
    tag: "Timed paper preview",
    badge: "January 2025",
    description:
      "Public preview link for timed paper practice only. Auto-marking stays disabled until verified answers are added.",
    paperUrl:
      "https://www.studocu.com/en-gb/document/school-of-advanced-study/science/unit-5-principles-and-applications-of-science-ii-physics-exam-qp-jan-2025/127234398",
  },
];

const officialReferences = [
  {
    id: "jun23-q1a",
    paper: "June 2023",
    paperCode: "31627H/1P",
    year: 2023,
    series: "June",
    questionRef: "1(a)",
    topic: "Fluids",
    sourceType: "official-reference",
    publicPaperUrl:
      "https://www.scribd.com/document/849468586/31627H-1P-0623-QU",
    prompt: "Open June 2023 Q1(a). Short summary: unit of pressure.",
    type: "mcq",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    correction:
      "Correct option: C — N m⁻². Pressure = force / area, so the unit is N/m², also called Pa.",
    learn: "Pressure = force ÷ area.",
  },
  {
    id: "jun23-q1bi",
    paper: "June 2023",
    paperCode: "31627H/1P",
    year: 2023,
    series: "June",
    questionRef: "1(b)(i)",
    topic: "Fluids",
    sourceType: "official-reference",
    publicPaperUrl:
      "https://www.scribd.com/document/849468586/31627H-1P-0623-QU",
    prompt:
      "Open June 2023 Q1(b)(i). Short summary: region where oil pressure is lowest in the laminar-flow diagram.",
    type: "short",
    answers: ["R"],
    correction: "Expected answer: R.",
  },
  {
    id: "jun23-q1bii",
    paper: "June 2023",
    paperCode: "31627H/1P",
    year: 2023,
    series: "June",
    questionRef: "1(b)(ii)",
    topic: "Fluids",
    sourceType: "official-reference",
    publicPaperUrl:
      "https://www.scribd.com/document/849468586/31627H-1P-0623-QU",
    prompt:
      "Open June 2023 Q1(b)(ii). Short summary: region where oil velocity is lowest in the laminar-flow diagram.",
    type: "short",
    answers: ["P"],
    correction: "Expected answer: P.",
  },
  {
    id: "jun23-q1c",
    paper: "June 2023",
    paperCode: "31627H/1P",
    year: 2023,
    series: "June",
    questionRef: "1(c)",
    topic: "Fluids",
    sourceType: "official-reference",
    publicPaperUrl:
      "https://www.scribd.com/document/849468586/31627H-1P-0623-QU",
    prompt:
      "Open June 2023 Q1(c). Short summary: explain why oil flow changes when temperature increases.",
    type: "keywords",
    required: ["viscosity decreases", "flows faster", "thinner"],
    alternatives: {
      "viscosity decreases": [
        "lower viscosity",
        "less viscous",
        "viscosity is reduced",
        "viscosity drops",
      ],
      "flows faster": [
        "flow increases",
        "moves faster",
        "speed increases",
        "runs faster",
      ],
      thinner: ["more runny", "less thick", "not as thick", "runnier"],
    },
    correction:
      "At higher temperature, oil has lower viscosity, becomes thinner/runnier, and flows faster.",
  },
  {
    id: "jan22-q1a",
    paper: "January 2022",
    paperCode: "31627H/1P",
    year: 2022,
    series: "January",
    questionRef: "1(a)",
    topic: "Fluids",
    sourceType: "official-reference",
    officialMarkSchemeUrl:
      "https://qualifications.pearson.com/content/dam/pdf/BTEC-Nationals/Applied-Science/2016/External-assessments/31627h1p-unit5-rms-20220323.pdf",
    prompt:
      "Open January 2022 Q1(a). Short summary: state two features of turbulent water flow.",
    type: "keywords",
    requiredAny: 2,
    required: [
      "chaotic flow",
      "speed changing",
      "eddies",
      "streamlines cross",
      "increased viscous drag",
    ],
    alternatives: {
      "chaotic flow": [
        "random flow",
        "rough flow",
        "not smooth",
        "not laminar",
      ],
      "speed changing": [
        "speed constantly changing",
        "velocity changing",
        "different speeds",
      ],
      eddies: ["eddy currents", "swirls"],
      "streamlines cross": [
        "streamlines mix",
        "layers mix",
        "flow lines cross",
      ],
      "increased viscous drag": ["more drag", "greater viscous drag"],
    },
    correction:
      "Any two valid features: chaotic/random flow, changing speed, eddies, streamlines crossing/mixing, or increased viscous drag.",
  },
];

const timedReferences = [
  {
    id: "jan25-paper-mode",
    paper: "January 2025",
    paperCode: "31627H/1P",
    year: 2025,
    series: "January",
    questionRef: "All questions",
    topic: "Timed Paper",
    sourceType: "selfcheck-only",
    publicPaperUrl:
      "https://www.studocu.com/en-gb/document/school-of-advanced-study/science/unit-5-principles-and-applications-of-science-ii-physics-exam-qp-jan-2025/127234398",
    prompt:
      "Open January 2025 paper. No verified public mark scheme is available in the app, so use this for timed practice only.",
    type: "selfcheck",
    correction:
      "Timed/self-check only. Do not auto-mark until verified answers are added.",
  },
];

const modelRevision = [
  {
    id: "model-fluids-pressure-unit",
    paper: "Model Revision",
    paperCode: "31627H/1P",
    year: 2026,
    series: "Model",
    questionRef: "M1",
    topic: "Fluids",
    sourceType: "model",
    prompt:
      "Model revision — not official Pearson question. Which option gives the correct SI unit for pressure?",
    type: "mcq",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    correction:
      "Correct option: C. The SI unit of pressure is N m⁻², also called the pascal.",
    learn: "This is a model revision question, not an official Pearson item.",
  },
  {
    id: "model-thermal-evaporation",
    paper: "Model Revision",
    paperCode: "31627H/1P",
    year: 2026,
    series: "Model",
    questionRef: "M2",
    topic: "Thermal Physics",
    sourceType: "model",
    prompt:
      "Model revision — not official Pearson question. A heater supplies 2.00 × 10^6 J of energy to water at boiling point. Calculate the mass evaporated.",
    type: "numeric",
    value: 0.885,
    tolerance: 0.01,
    unit: "kg",
    correction: "m = E / L = (2.00 × 10^6) / (2.26 × 10^6) ≈ 0.885 kg.",
    learn:
      "At boiling point, the energy goes into change of state, so use E = mL.",
  },
  {
    id: "model-materials-strain",
    paper: "Model Revision",
    paperCode: "31627H/1P",
    year: 2026,
    series: "Model",
    questionRef: "M3",
    topic: "Materials",
    sourceType: "model",
    prompt:
      "Model revision — not official Pearson question. A 2.0 m wire extends by 4.0 mm. Calculate the strain.",
    type: "numeric",
    value: 0.002,
    tolerance: 0.0002,
    correction: "Strain = extension / original length = 0.004 / 2.0 = 0.002.",
    learn: "Strain has no unit because it is a ratio.",
  },
];

export const questionBank = [
  ...officialReferences,
  ...timedReferences,
  ...modelRevision,
];
