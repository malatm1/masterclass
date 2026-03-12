import { useState } from "react";

// ── ITHUVIA SOVEREIGN PALETTE ──────────────────────────────────────────────────
const C = {
  purple:  "#020617",   // Slate-950 — nav, headers, structural borders
  crimson: "#d97706",   // Amber-600 — buttons, active states
  navy:    "#0f172a",   // Slate-900 — inactive tabs, data headers, secondary buttons
  orange:  "#f59e0b",   // Amber-500 — badges, highlights
  gold:    "#fbbf24",   // Amber-400 — callout accents
  white:   "#e2e8f0",   // Slate-200 — text on dark surfaces
  grey100: "#0f172a",   // Slate-900
  grey200: "#1e293b",   // Slate-800 — tactical grid borders
  grey400: "#64748b",   // Slate-500
  grey600: "#94a3b8",   // Slate-400
  grey700: "#cbd5e1",   // Slate-300
  grey800: "#e2e8f0",   // Slate-200
};

const GOLD_LIGHT    = "#1a1608";
const PURPLE_LIGHT  = "#0c0f1a";
const NAVY_LIGHT    = "#0c1220";
const CRIMSON_LIGHT = "#1a1005";

// ── DATA ────────────────────────────────────────────────────────────────────

const SCHEDULE = [
  {
    id: "welcome", time: "09:00", end: "09:30", type: "session",
    label: "Welcome & Scene-Setting", icon: "🎯", color: "purple",
    outcomes: ["Understand the day's objectives", "Meet your AI toolkit", "Frame the analytics maturity ladder"],
    module: "intro",
  },
  {
    id: "m1", time: "09:30", end: "11:00", type: "session",
    label: "Module 1 — Big Data & the Supply Chain", icon: "📊", color: "navy",
    outcomes: ["Define big data (4 V's) in SCM context", "Map data sources: IoT, ERP, CRM, social", "Use ChatGPT Advanced Data Analysis on supplier CSV"],
    module: "module1",
  },
  {
    id: "break1", time: "11:00", end: "11:15", type: "break",
    label: "Morning Break", icon: "☕", color: "gold",
  },
  {
    id: "m2", time: "11:15", end: "12:30", type: "session",
    label: "Module 2 — Descriptive & Predictive Analytics", icon: "🔮", color: "crimson",
    outcomes: ["Distinguish descriptive → diagnostic → predictive analytics", "Apply demand-forecasting prompts via AI", "Identify key supply chain KPIs from raw data"],
    module: "module2",
  },
  {
    id: "lunch", time: "12:30", end: "13:30", type: "break",
    label: "Lunch Break", icon: "🥗", color: "gold",
  },
  {
    id: "m3", time: "13:30", end: "14:45", type: "session",
    label: "Module 3 — Prescriptive Analytics & GenAI", icon: "🤖", color: "purple",
    outcomes: ["Understand prescriptive optimisation in supply chains", "Use Claude to analyse supplier contracts for risk", "Generate scenario analyses via conversational AI"],
    module: "module3",
  },
  {
    id: "break2", time: "14:45", end: "15:00", type: "break",
    label: "Afternoon Break", icon: "☕", color: "gold",
  },
  {
    id: "m4", time: "15:00", end: "16:00", type: "session",
    label: "Module 4 — Insights, Ethics & Storytelling", icon: "🗣️", color: "navy",
    outcomes: ["Build a data-driven narrative for leadership", "Apply POPIA/GDPR considerations to SCM data", "Consolidate recommendations for your organisation"],
    module: "module4",
  },
];

const COLOR_HEX   = { purple: C.purple, navy: C.navy, crimson: C.crimson, gold: C.gold };
const COLOR_LIGHT = { purple: PURPLE_LIGHT, navy: NAVY_LIGHT, crimson: CRIMSON_LIGHT, gold: GOLD_LIGHT };

const BADGE_STYLES = {
  crimson: { background: CRIMSON_LIGHT, color: C.crimson, border: `1px solid ${C.crimson}` },
  navy:    { background: NAVY_LIGHT,    color: C.grey600,    border: `1px solid ${C.grey200}` },
  orange:  { background: GOLD_LIGHT,    color: C.orange, border: `1px solid ${C.orange}` },
};

const TOOLS = [
  {
    name: "ChatGPT Advanced Data Analysis", logo: "🧠", url: "https://chat.openai.com",
    access: "Free (GPT-4o) · Plus $20/mo", badge: "Primary", badgeColor: "crimson",
    uses: ["Upload CSV/Excel files and ask questions in plain English", "Automatic chart generation from supply chain data", "Demand forecasting with zero coding"],
    setup: ["Go to chat.openai.com and sign in", "Click the paperclip icon to attach a file", "Start with: 'Analyse this data and give me 5 supply chain insights'"],
  },
  {
    name: "Claude (claude.ai)", logo: "⚡", url: "https://claude.ai",
    access: "Free · Pro $20/mo", badge: "Primary", badgeColor: "crimson",
    uses: ["Supplier contract review and risk extraction", "Long document summarisation", "Scenario planning via conversation"],
    setup: ["Go to claude.ai and sign in", "Paste your contract text or upload a PDF", "Use the prompt templates provided in each module"],
  },
  {
    name: "Microsoft Copilot in Excel", logo: "📗", url: "https://microsoft.com/copilot",
    access: "Microsoft 365 subscription", badge: "Optional", badgeColor: "navy",
    uses: ["Natural language pivot tables from inventory data", "Automatic formula suggestions", "Trend analysis within spreadsheets"],
    setup: ["Open Excel Online or desktop (M365)", "Click the Copilot button in the ribbon", "Type your question about the open spreadsheet"],
  },
  {
    name: "Google Looker Studio", logo: "📈", url: "https://lookerstudio.google.com",
    access: "100% Free", badge: "Visualisation", badgeColor: "navy",
    uses: ["Interactive supply chain dashboards", "Connect to Google Sheets, BigQuery, CSV", "Share live reports with stakeholders"],
    setup: ["Go to lookerstudio.google.com", "Create a new report > connect to Google Sheets", "Use blank template then add charts"],
  },
  {
    name: "KNIME Analytics Platform", logo: "🔧", url: "https://knime.com",
    access: "Free open-source", badge: "Advanced", badgeColor: "orange",
    uses: ["No-code data pipeline building", "AutoML for supply chain predictions", "ETL workflows across data sources"],
    setup: ["Download KNIME Desktop from knime.com", "Use drag-and-drop workflow canvas", "Apply pre-built supply chain templates"],
  },
];

const MODULES: Record<string, {
  title: string;
  theory: { heading: string; points: { v: string; desc: string; example: string }[]; context: string };
  exercise: {
    title: string; groupSize: string; duration: string; tool: string; toolIcon: string;
    scenario: string; dataFile: string; dataDescription: string;
    steps: { n: number; action: string; tip: string }[];
    prompts: { label: string; text: string }[];
    insightKey: string;
  };
}> = {
  module1: {
    title: "Big Data & the Supply Chain",
    theory: {
      heading: "The 4 V's Framework",
      points: [
        { v: "Volume",   desc: "Terabytes from ERP, IoT sensors, POS systems",            example: "A retailer's daily scan data across 500 stores" },
        { v: "Velocity", desc: "Real-time streaming vs. nightly batch processing",          example: "GPS truck data updating every 30 seconds" },
        { v: "Variety",  desc: "Structured tables + unstructured emails, images, text",     example: "Structured: inventory levels · Unstructured: supplier emails" },
        { v: "Veracity", desc: "Data quality, trust, and governance",                       example: "Sensor outages creating gaps in cold-chain data" },
      ],
      context: "According to a 2025 EY survey, 77% of firms now use cloud data lakes — yet most remain stuck on static dashboards rather than predictive insights. This exercise changes that.",
    },
    exercise: {
      title: "Exercise 1A — Supplier Performance Data Analysis",
      groupSize: "Groups of 3–4", duration: "45 minutes",
      tool: "ChatGPT Advanced Data Analysis", toolIcon: "🧠",
      scenario: "You are the Supply Chain Manager at a mid-sized South African FMCG distributor. You have a 12-month supplier performance export from your ERP system.",
      dataFile: "supplier_performance_sample.csv",
      dataDescription: "The file contains: Supplier Name, Month, On-Time Delivery %, Order Fill Rate %, Lead Time (days), Quality Rejection %, Invoice Accuracy %",
      steps: [
        { n: 1, action: "Open ChatGPT (chat.openai.com) and start a new chat",        tip: "Use GPT-4o — it's free and handles data uploads" },
        { n: 2, action: "Click the paperclip icon and upload your CSV file",           tip: "You can use the sample file provided or your own company data" },
        { n: 3, action: "Paste Prompt A and press Enter",                              tip: "Read the output carefully before moving to the next prompt" },
        { n: 4, action: "Paste Prompt B to drill deeper into the findings",            tip: "Ask follow-up questions if the answer isn't clear" },
        { n: 5, action: "Screenshot or copy the charts generated",                    tip: "These become evidence for your insight capture below" },
      ],
      prompts: [
        {
          label: "Prompt A — Initial Analysis",
          text: `I've uploaded a supplier performance dataset for a supply chain analytics exercise. Please:
1. Summarise the overall performance across all suppliers (averages for each KPI)
2. Identify the top 2 best-performing and bottom 2 worst-performing suppliers
3. Highlight any month where performance dramatically dropped (>10% change)
4. Create a bar chart comparing On-Time Delivery % across all suppliers
Present findings as a brief executive summary I can share with my leadership team.`,
        },
        {
          label: "Prompt B — Predictive Insight",
          text: `Based on the trends in this data:
1. Which supplier shows the most concerning trajectory over the 12 months?
2. If current trends continue, what do you predict their On-Time Delivery % will be in Q1 next year?
3. What are the top 3 root causes likely driving the underperformance?
4. Suggest 3 data-driven interventions I should discuss with this supplier.`,
        },
      ],
      insightKey: "m1_insights",
    },
  },
  module2: {
    title: "Descriptive & Predictive Analytics",
    theory: {
      heading: "The Analytics Maturity Ladder",
      points: [
        { v: "Descriptive",  desc: "What happened? — Reporting KPIs, dashboards",          example: "Monthly on-time delivery rates by supplier" },
        { v: "Diagnostic",   desc: "Why did it happen? — Root cause analysis",              example: "Supplier delays correlate with raw material shortages" },
        { v: "Predictive",   desc: "What will happen? — Forecasting, ML models",            example: "Demand will spike 15% in November based on historical patterns" },
        { v: "Prescriptive", desc: "What should we do? — Optimisation, decision support",   example: "Increase safety stock by 200 units to cover predicted peak" },
      ],
      context: "BCG research (2024) found that GenAI can democratise analytics — enabling general managers to run analyses that previously required data science specialists. Today you become that manager.",
    },
    exercise: {
      title: "Exercise 2A — Demand Forecasting with AI",
      groupSize: "Groups of 3–4", duration: "50 minutes",
      tool: "ChatGPT Advanced Data Analysis", toolIcon: "🧠",
      scenario: "You are the Demand Planning Manager for a consumer electronics distributor. You have 24 months of historical sales data and need to forecast Q1 next year to plan inventory purchasing.",
      dataFile: "demand_history_sample.csv",
      dataDescription: "Columns: Product SKU, Month, Units Sold, Promotional Flag (Y/N), Season, Average Selling Price (ZAR)",
      steps: [
        { n: 1, action: "Upload your demand history CSV to ChatGPT",                       tip: "If you don't have a file, ask ChatGPT to generate synthetic data first" },
        { n: 2, action: "Run Prompt A for descriptive analysis first",                     tip: "Always start descriptive before jumping to predictive" },
        { n: 3, action: "Run Prompt B to generate a forecast",                             tip: "Note the confidence level — AI forecasts have uncertainty ranges" },
        { n: 4, action: "Use Prompt C to stress-test the forecast",                        tip: "This is scenario planning — critical for supply chain resilience" },
        { n: 5, action: "Document your key business insight in the capture area below",    tip: "Think: what purchasing decision would you make based on this?" },
      ],
      prompts: [
        {
          label: "Prompt A — Descriptive Baseline",
          text: `Analyse this sales data and provide:
1. Average monthly demand per SKU
2. Identify the top 5 highest-selling SKUs
3. Is there a clear seasonal pattern? Show a line chart of total monthly sales across all SKUs
4. Which months show demand spikes and which show slumps?`,
        },
        {
          label: "Prompt B — Forecast Generation",
          text: `Using this historical sales data, please:
1. Build a simple demand forecast for the next 3 months (Q1) for the top 3 SKUs
2. State clearly what forecasting method you used and why
3. Provide a range (low/base/high scenario) for each SKU forecast
4. Which external factors should I monitor that could shift these forecasts significantly?`,
        },
        {
          label: "Prompt C — Scenario Stress Test",
          text: `Consider two disruption scenarios for our demand forecast:
Scenario A — Bullwhip Effect: Our biggest retail customer over-orders by 25% this month. How does this distort downstream supply chain signals?
Scenario B — Supply Shock: Our primary supplier cuts capacity by 30% in February. 
For each scenario, explain: (1) the supply chain impact, (2) what the data signals would look like early on, and (3) what analytics I should set up to detect these situations faster.`,
        },
      ],
      insightKey: "m2_insights",
    },
  },
  module3: {
    title: "Prescriptive Analytics & GenAI",
    theory: {
      heading: "GenAI in Supply Chains",
      points: [
        { v: "Contract Intelligence",   desc: "Extract risk clauses, terms, obligations from supplier contracts", example: "Identify force majeure gaps in 50 contracts in minutes" },
        { v: "Conversational Analytics",desc: "Query your data in plain English via AI assistants",              example: "'Show me suppliers with >5% rejection rates in Asia'" },
        { v: "Scenario Simulation",     desc: "Run 'what-if' analyses through dialogue",                         example: "Simulate the cost of shifting 30% volume to a backup supplier" },
        { v: "Process Automation",      desc: "AI agents that trigger actions based on thresholds",              example: "Auto-raise PO when inventory drops below reorder point" },
      ],
      context: "Wang et al. (2025) demonstrated that domain-specific LLMs can now pass standardised supply chain exams and simulate the Beer Game — these tools genuinely understand your domain.",
    },
    exercise: {
      title: "Exercise 3A — Supplier Contract Risk Analysis with Claude",
      groupSize: "Individual or pairs", duration: "45 minutes",
      tool: "Claude (claude.ai)", toolIcon: "⚡",
      scenario: "Your procurement team has flagged three supplier contracts for renewal. You need to quickly assess each for commercial risk, compliance gaps, and negotiation leverage points — without waiting for legal.",
      dataFile: "supplier_contract_excerpt.pdf (or paste contract text)",
      dataDescription: "A 2–3 page excerpt from a typical supplier master agreement covering: payment terms, delivery obligations, liability caps, force majeure, termination clauses",
      steps: [
        { n: 1, action: "Open Claude at claude.ai and start a new conversation",                          tip: "Claude excels at long document analysis — it's ideal for contracts" },
        { n: 2, action: "Paste your contract text (or upload a PDF) and run Prompt A",                   tip: "If you don't have a real contract, ask Claude to generate a sample FMCG supplier agreement first" },
        { n: 3, action: "Run Prompt B for the negotiation angle",                                         tip: "This is where MBA thinking meets AI execution" },
        { n: 4, action: "Run Prompt C for compliance check",                                              tip: "Especially relevant given South Africa's POPIA regulations" },
        { n: 5, action: "Capture your top 3 risk findings below",                                         tip: "Think: would you sign this contract as-is?" },
      ],
      prompts: [
        {
          label: "Prompt A — Risk Extraction",
          text: `I'm a procurement manager reviewing this supplier contract for renewal. Please analyse it and:
1. Identify the top 5 commercial risks in this contract (e.g. unfavourable liability caps, vague delivery terms, one-sided termination rights)
2. Flag any missing or weak clauses that should be present in a robust supply agreement
3. Highlight anything that significantly favours the supplier over the buyer
4. Rate overall contract risk: Low / Medium / High and explain why
Format as a structured table where possible.`,
        },
        {
          label: "Prompt B — Negotiation Intelligence",
          text: `Based on the contract you just reviewed:
1. List the top 3 clauses I should push to renegotiate and explain what I should aim for
2. What performance KPIs should be written into this contract that are currently absent?
3. Draft sample contract language (2–3 sentences) for an improved delivery penalty clause
4. What leverage do I have as the buyer in these negotiations?`,
        },
        {
          label: "Prompt C — Ethics & Compliance Check",
          text: `Review this supplier contract through a compliance and ethics lens:
1. Does it address data sharing and data privacy adequately? (Consider POPIA in South Africa / GDPR in Europe)
2. Are there any environmental or ESG obligations mentioned? Should there be?
3. Does the contract address ethical sourcing or modern slavery risk in the upstream supply chain?
4. What compliance gaps should be escalated to legal before signing?`,
        },
      ],
      insightKey: "m3_insights",
    },
  },
  module4: {
    title: "Insights, Ethics & Storytelling",
    theory: {
      heading: "The Data-to-Decision Framework",
      points: [
        { v: "Data Quality",           desc: "Garbage in → garbage out. Validate before you narrate",              example: "Missing 3 months of data skews your entire forecast" },
        { v: "Stakeholder Translation",desc: "Convert analytics into business language, not technical jargon",     example: "'15% stockout risk' not 'MAPE of 0.15'" },
        { v: "Ethical Guardrails",     desc: "POPIA, GDPR, bias in AI models, responsible automation",             example: "Supplier scoring algorithms must be explainable and auditable" },
        { v: "Action Orientation",     desc: "Every insight must link to a decision or next step",                 example: "Insight → So What → Now What → By When → By Whom" },
      ],
      context: "The EY 2025 report found that firms using analytics dashboards outperform peers — but only when insights drive decisions, not just reports. The last mile of analytics is always human judgement.",
    },
    exercise: {
      title: "Exercise 4A — Build Your Executive Brief",
      groupSize: "Individual", duration: "40 minutes",
      tool: "Claude or ChatGPT", toolIcon: "🗣️",
      scenario: "You are presenting to your organisation's ExCo in 48 hours. You need to translate everything you've learned today into a crisp, data-backed recommendation on how to improve your supply chain with analytics.",
      dataFile: "Your insights captured in Modules 1–3",
      dataDescription: "Use the insights you documented throughout the day as raw material for this exercise",
      steps: [
        { n: 1, action: "Review your insight captures from Modules 1, 2, and 3",           tip: "Look for patterns across the exercises — what common themes emerge?" },
        { n: 2, action: "Open Claude or ChatGPT and paste Prompt A",                       tip: "Provide as much context as possible about your actual industry/role" },
        { n: 3, action: "Refine the output with Prompt B for the ethical dimension",       tip: "Leadership cares about risk — show you've thought through it" },
        { n: 4, action: "Use Prompt C to create a 30-second elevator pitch version",       tip: "If you can't explain it in 30 seconds, the insight isn't sharp enough" },
        { n: 5, action: "Complete your final reflection in the capture area",              tip: "This becomes your personal action plan to take back to work" },
      ],
      prompts: [
        {
          label: "Prompt A — Executive Brief",
          text: `I'm an MBA student / supply chain professional. Based on my day's analysis:
- I identified [paste your Module 1 insights] in supplier performance
- I discovered [paste your Module 2 insights] in demand patterns  
- I found [paste your Module 3 insights] in contract risk

Please draft a 1-page executive brief (400 words) for my leadership team structured as:
1. The Supply Chain Analytics Opportunity (why this matters now)
2. Key Findings from Our Data (3–4 bullet points)
3. Recommended Actions (with timelines and owners)
4. Expected ROI or Business Impact
Use confident, business language — not technical jargon.`,
        },
        {
          label: "Prompt B — Risk & Ethics Addendum",
          text: `Add a 'Responsible Analytics' section to my executive brief that covers:
1. Data governance: what data policies should we establish before scaling analytics?
2. POPIA compliance: what supply chain data about people (customers, employees) needs special handling?
3. AI model risk: what could go wrong if we over-rely on AI forecasts without human oversight?
4. Quick wins: what is the lowest-risk, highest-impact first step we could take in the next 30 days?
Keep it to 150 words maximum — executives want brevity.`,
        },
        {
          label: "Prompt C — Elevator Pitch",
          text: `Distil my entire executive brief into a 30-second spoken elevator pitch (maximum 80 words). 
The audience is my CEO. She cares about: competitive advantage, cost reduction, and risk management.
She is sceptical of 'AI hype'. 
The pitch should be confident, data-backed, and end with a clear ask.
Format it as natural spoken language, not bullet points.`,
        },
      ],
      insightKey: "m4_insights",
    },
  },
};

// ── HELPERS ─────────────────────────────────────────────────────────────────

function useInsights(): [Record<string, string>, (key: string, val: string) => void] {
  const [insights, setInsights] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem("sca_insights") || "{}"); }
    catch { return {}; }
  });
  const save = (key: string, val: string) => {
    const next = { ...insights, [key]: val };
    setInsights(next);
    try { localStorage.setItem("sca_insights", JSON.stringify(next)); } catch {}
  };
  return [insights, save];
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 rounded-full h-2" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: C.crimson }} />
      </div>
      <span className="text-sm font-mono font-medium whitespace-nowrap" style={{ color: "rgba(255,255,255,0.7)" }}>
        {completed}/{total} modules
      </span>
    </div>
  );
}

function PromptCard({ prompt }: { prompt: { label: string; text: string } }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copyToClipboard(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.grey200}` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: C.navy }}>
        <span className="text-xs font-mono font-semibold tracking-wide uppercase" style={{ color: C.crimson }}>
          {prompt.label}
        </span>
        <button onClick={handleCopy}
          className="text-xs px-3 py-1 rounded font-mono font-semibold transition-all hover:brightness-110"
          style={{ background: C.crimson, color: "#020617" }}>
          {copied ? "✓ Copied!" : "Copy Prompt"}
        </button>
      </div>
      <pre className="text-sm p-4 whitespace-pre-wrap font-mono leading-relaxed"
        style={{ background: "#0a0e1a", color: C.grey600 }}>
        {prompt.text}
      </pre>
    </div>
  );
}

function InsightCapture({ insightKey, insights, onSave, title }: { insightKey: string; insights: Record<string, string>; onSave: (k: string, v: string) => void; title: string }) {
  const [val, setVal] = useState(insights[insightKey] || "");
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    onSave(insightKey, val);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="rounded-lg p-5" style={{ border: `1px dashed ${C.crimson}`, background: CRIMSON_LIGHT }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚡</span>
        <h4 className="font-mono font-bold" style={{ color: C.crimson }}>Insight Capture — {title}</h4>
      </div>
      <p className="text-sm mb-3" style={{ color: C.grey600 }}>
        Document your key findings here. What did the AI reveal? What business decision would you make?
      </p>
      <textarea
        className="w-full rounded-lg p-3 text-sm font-mono resize-y min-h-32"
        style={{ border: `1px solid ${C.grey200}`, background: "#0a0e1a", color: C.grey700, outline: "none" }}
        onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${C.crimson}`; }}
        onBlur={e => { e.target.style.boxShadow = "none"; }}
        placeholder="Type your insights here… (e.g. 'Supplier X is trending toward 65% on-time delivery — I would recommend a performance review meeting and exploring backup suppliers…')"
        value={val}
        onChange={e => setVal(e.target.value)}
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-mono" style={{ color: C.grey400 }}>
          {val.length > 0 ? `${val.length} characters` : "Nothing saved yet"}
        </span>
        <button onClick={handleSave}
          className="px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all hover:brightness-110"
          style={{ background: C.crimson, color: "#020617" }}>
          {saved ? "✓ Saved!" : "Save Insight"}
        </button>
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: { n: number; action: string; tip: string }[] }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const toggle = (n: number) => setDone(d => ({ ...d, [n]: !d[n] }));
  return (
    <div className="space-y-2">
      {steps.map(step => (
        <div key={step.n} onClick={() => toggle(step.n)}
          className="flex gap-3 p-3 rounded-lg cursor-pointer transition-all"
          style={{
            border: `1px solid ${done[step.n] ? C.crimson : C.grey200}`,
            background: done[step.n] ? CRIMSON_LIGHT : C.grey100,
            opacity: done[step.n] ? 0.6 : 1,
          }}>
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold"
            style={{
              background: done[step.n] ? C.crimson : "transparent",
              border: `2px solid ${done[step.n] ? C.crimson : C.grey400}`,
              color: done[step.n] ? "#020617" : C.grey400,
            }}>
            {done[step.n] ? "✓" : step.n}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium"
              style={{ textDecoration: done[step.n] ? "line-through" : "none", color: done[step.n] ? C.grey400 : C.grey700 }}>
              {step.action}
            </p>
            <p className="text-xs mt-0.5 font-mono" style={{ color: C.grey400 }}>⚡ {step.tip}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ModuleContent({ moduleKey, insights, onSave }: { moduleKey: string; insights: Record<string, string>; onSave: (k: string, v: string) => void }) {
  const mod = MODULES[moduleKey];
  if (!mod) return null;
  const ex = mod.exercise;
  const th = mod.theory;

  return (
    <div className="space-y-8">
      {/* Theory block */}
      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.grey200}` }}>
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: C.purple, borderBottom: `1px solid ${C.grey200}` }}>
          <span className="text-xl">📚</span>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: C.crimson }}>Theory Foundation</p>
            <h3 className="font-mono font-bold text-lg" style={{ color: C.white }}>{th.heading}</h3>
          </div>
        </div>
        <div className="p-6" style={{ background: C.grey100 }}>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {th.points.map(p => (
              <div key={p.v} className="rounded-lg p-4 transition-all hover:shadow-[0_0_15px_0_rgba(217,119,6,0.15)]" style={{ background: "#0a0e1a", border: `1px solid ${C.grey200}` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: C.crimson }} />
                  <span className="font-mono font-bold text-sm" style={{ color: C.crimson }}>{p.v}</span>
                </div>
                <p className="text-sm mb-2" style={{ color: C.grey600 }}>{p.desc}</p>
                <p className="text-xs font-mono rounded px-3 py-1.5 italic"
                  style={{ background: NAVY_LIGHT, color: C.grey400, border: `1px solid ${C.grey200}` }}>
                  eg. {p.example}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-4 text-sm"
            style={{ background: CRIMSON_LIGHT, border: `1px solid ${C.crimson}`, color: C.grey600 }}>
            <span className="font-mono font-semibold" style={{ color: C.crimson }}>2024–25 Industry Context: </span>
            {th.context}
          </div>
        </div>
      </div>

      {/* Exercise block */}
      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.grey200}` }}>
        <div className="px-6 py-4" style={{ background: C.navy, borderBottom: `1px solid ${C.grey200}` }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: C.crimson }}>Hands-On Exercise</p>
              <h3 className="font-mono font-bold text-xl" style={{ color: C.white }}>{ex.title}</h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="text-xs font-mono px-3 py-1 rounded-full font-medium"
                style={{ background: "rgba(255,255,255,0.08)", color: C.grey600 }}>👥 {ex.groupSize}</span>
              <span className="text-xs font-mono px-3 py-1 rounded-full font-medium"
                style={{ background: C.crimson, color: "#020617" }}>⏱ {ex.duration}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6" style={{ background: C.grey100 }}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4" style={{ background: CRIMSON_LIGHT, border: `1px solid ${C.crimson}` }}>
              <p className="text-xs font-mono font-semibold uppercase tracking-wide mb-2" style={{ color: C.crimson }}>🎭 Business Scenario</p>
              <p className="text-sm leading-relaxed" style={{ color: C.grey600 }}>{ex.scenario}</p>
            </div>
            <div className="rounded-lg p-4" style={{ background: NAVY_LIGHT, border: `1px solid ${C.grey200}` }}>
              <p className="text-xs font-mono font-semibold uppercase tracking-wide mb-2" style={{ color: C.grey600 }}>🛠 AI Tool for This Exercise</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{ex.toolIcon}</span>
                <span className="font-mono font-bold" style={{ color: C.grey700 }}>{ex.tool}</span>
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.grey200}` }}>
                <p className="text-xs font-mono font-semibold mb-1" style={{ color: C.grey400 }}>Sample Data:</p>
                <p className="text-xs font-mono rounded px-2 py-1"
                  style={{ background: "#0a0e1a", border: `1px solid ${C.grey200}`, color: C.crimson }}>
                  {ex.dataFile}
                </p>
                <p className="text-xs mt-1" style={{ color: C.grey400 }}>{ex.dataDescription}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono font-bold mb-3 flex items-center gap-2" style={{ color: C.grey700 }}>
              <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center"
                style={{ background: C.crimson, color: "#020617" }}>→</span>
              Step-by-Step Instructions{" "}
              <span className="text-xs font-normal" style={{ color: C.grey400 }}>(click to mark complete)</span>
            </h4>
            <StepList steps={ex.steps} />
          </div>

          <div>
            <h4 className="font-mono font-bold mb-3" style={{ color: C.grey700 }}>🗨️ AI Prompts to Use</h4>
            <div className="space-y-3">
              {ex.prompts.map((p, i) => <PromptCard key={i} prompt={p} />)}
            </div>
          </div>

          <InsightCapture insightKey={ex.insightKey} insights={insights} onSave={onSave} title={ex.title} />
        </div>
      </div>
    </div>
  );
}

function AgendaTimeline({ activeModule, onSelect }: { activeModule: string; onSelect: (mod: string) => void }) {
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="space-y-2">
      {SCHEDULE.map(item => {
        const [sh, sm] = item.time.split(":").map(Number);
        const [eh, em] = item.end.split(":").map(Number);
        const startMins = sh * 60 + sm;
        const endMins = eh * 60 + em;
        const isNow = currentMins >= startMins && currentMins < endMins;
        const isPast = currentMins >= endMins;
        const isActive = activeModule === item.module;
        const stripColor = COLOR_HEX[item.color as keyof typeof COLOR_HEX] || C.grey400;

        let rowBg = C.grey100, rowBorder = C.grey200;
        if (isActive) { rowBg = COLOR_LIGHT[item.color as keyof typeof COLOR_LIGHT] || "#0a0e1a"; rowBorder = stripColor; }
        else if (isNow) { rowBg = CRIMSON_LIGHT; rowBorder = C.crimson; }
        else if (item.type === "break") { rowBg = "#0a0e1a"; rowBorder = C.grey200; }

        return (
          <div key={item.id}
            onClick={() => item.module && onSelect(item.module)}
            className="flex gap-3 rounded-lg p-3 transition-all"
            style={{
              cursor: item.module ? "pointer" : "default",
              background: rowBg,
              border: `1px solid ${rowBorder}`,
              boxShadow: isActive ? "0 0 15px rgba(217,119,6,0.12)" : "none",
            }}>
            <div className="text-center min-w-14">
              <div className="text-xs font-mono font-bold" style={{ color: C.grey600 }}>{item.time}</div>
              <div className="text-xs font-mono" style={{ color: C.grey400 }}>{item.end}</div>
            </div>
            <div className="w-1 rounded-full flex-shrink-0" style={{ background: stripColor === C.purple ? C.crimson : stripColor }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-mono font-semibold"
                  style={{ color: isPast && !isActive ? C.grey400 : C.grey700 }}>
                  {item.label}
                </span>
                {isNow && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full font-medium animate-pulse"
                    style={{ background: C.crimson, color: "#020617" }}>NOW</span>
                )}
              </div>
              {item.outcomes && (
                <ul className="mt-1 space-y-0.5">
                  {item.outcomes.map((o, j) => (
                    <li key={j} className="text-xs flex items-start gap-1" style={{ color: C.grey400 }}>
                      <span style={{ color: C.grey200 }} className="mt-0.5">–</span>{o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ToolsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg p-6" style={{ background: C.purple, border: `1px solid ${C.grey200}` }}>
        <h2 className="text-2xl font-mono font-bold mb-2" style={{ color: C.crimson }}>🛠 Your AI Toolkit for Today</h2>
        <p className="text-sm leading-relaxed" style={{ color: C.grey600 }}>
          No installation required for the primary tools. All you need is a browser and a free account.
          Set these up before 09:00 so you hit the ground running.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {TOOLS.map(tool => {
          const badgeStyle = BADGE_STYLES[tool.badgeColor as keyof typeof BADGE_STYLES] || BADGE_STYLES.navy;
          return (
            <div key={tool.name}
              className="rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_0_rgba(217,119,6,0.15)]"
              style={{ border: `1px solid ${C.grey200}`, background: C.grey100 }}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tool.logo}</span>
                    <div>
                      <h3 className="font-mono font-bold" style={{ color: C.grey700 }}>{tool.name}</h3>
                      <p className="text-xs font-mono" style={{ color: C.grey400 }}>{tool.access}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded-full font-semibold" style={badgeStyle}>
                    {tool.badge}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wide mb-2" style={{ color: C.grey400 }}>
                    Use This Tool For:
                  </p>
                  <ul className="space-y-1">
                    {tool.uses.map((u, i) => (
                      <li key={i} className="text-sm flex gap-2" style={{ color: C.grey600 }}>
                        <span style={{ color: C.crimson }} className="mt-0.5 flex-shrink-0">✓</span>{u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg p-3" style={{ background: "#0a0e1a", border: `1px solid ${C.grey200}` }}>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wide mb-2" style={{ color: C.grey400 }}>Quick Setup:</p>
                  {tool.setup.map((s, i) => (
                    <div key={i} className="flex gap-2 mb-1">
                      <span className="text-xs font-mono font-bold min-w-4" style={{ color: C.crimson }}>{i + 1}.</span>
                      <p className="text-xs" style={{ color: C.grey600 }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-4">
                <a href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-mono font-semibold py-2.5 rounded-lg transition-all hover:brightness-110"
                  style={{ background: C.crimson, color: "#020617" }}>
                  Open {tool.name} →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InsightsDashboard({ insights }: { insights: Record<string, string> }) {
  const keys   = ["m1_insights", "m2_insights", "m3_insights", "m4_insights"];
  const labels = ["Module 1 — Supplier Performance", "Module 2 — Demand Forecasting", "Module 3 — Contract Risk", "Module 4 — Executive Brief"];
  const filled = keys.filter(k => insights[k] && insights[k].trim());

  const [exportMsg, setExportMsg] = useState("");
  const handleExport = () => {
    const text = keys.map((k, i) => `## ${labels[i]}\n${insights[k] || "(no insights saved)"}`).join("\n\n---\n\n");
    copyToClipboard(text);
    setExportMsg("Copied to clipboard!");
    setTimeout(() => setExportMsg(""), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg p-6" style={{ background: C.purple, border: `1px solid ${C.grey200}` }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-mono font-bold mb-1" style={{ color: C.crimson }}>📋 My Insight Dashboard</h2>
            <p className="text-sm" style={{ color: C.grey400 }}>
              All insights you've captured throughout the day in one place.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-black" style={{ color: C.crimson }}>{filled.length}/4</div>
            <div className="text-xs font-mono" style={{ color: C.grey400 }}>modules complete</div>
          </div>
        </div>
        <div className="mt-4"><ProgressBar completed={filled.length} total={4} /></div>
      </div>

      <div className="space-y-4">
        {keys.map((k, i) => (
          <div key={k} className="rounded-lg p-5"
            style={{
              background: insights[k] ? CRIMSON_LIGHT : "#0a0e1a",
              border: `1px solid ${insights[k] ? C.crimson : C.grey200}`,
            }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono font-bold text-sm" style={{ color: insights[k] ? C.crimson : C.grey400 }}>
                {labels[i]}
              </h3>
              {insights[k] ? (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: C.crimson, color: "#020617" }}>
                  ✓ Saved
                </span>
              ) : (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: C.grey200, color: C.grey400 }}>
                  Pending
                </span>
              )}
            </div>
            {insights[k] ? (
              <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: C.grey600 }}>{insights[k]}</p>
            ) : (
              <p className="text-sm italic" style={{ color: C.grey400 }}>
                No insights captured yet. Complete the exercise in this module to add insights.
              </p>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleExport}
        className="w-full font-mono font-semibold py-3 rounded-lg transition-all hover:brightness-110 text-sm"
        style={{ background: C.crimson, color: "#020617" }}>
        {exportMsg || "📋 Export All Insights to Clipboard"}
      </button>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────

export default function SupplyChainMasterclass() {
  const [activeTab, setActiveTab] = useState("agenda");
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [insights, saveInsight] = useInsights();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filledInsights = ["m1_insights", "m2_insights", "m3_insights", "m4_insights"]
    .filter(k => insights[k] && insights[k].trim()).length;

  const navItems = [
    { id: "agenda",   label: "Agenda",      icon: "🗓" },
    { id: "tools",    label: "AI Tools",    icon: "🛠" },
    { id: "module1",  label: "Module 1",    icon: "📊" },
    { id: "module2",  label: "Module 2",    icon: "🔮" },
    { id: "module3",  label: "Module 3",    icon: "🤖" },
    { id: "module4",  label: "Module 4",    icon: "🗣️" },
    { id: "insights", label: "My Insights", icon: "⚡" },
  ];

  const handleModuleSelect = (mod: string) => {
    setActiveModule(mod);
    setActiveTab(mod);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    if (activeTab === "agenda") {
      return (
        <div className="space-y-6">
          {/* Hero banner */}
          <div className="rounded-lg p-6" style={{ background: C.purple, border: `1px solid ${C.grey200}` }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: C.crimson }}>MBA Masterclass</p>
            <h1 className="text-3xl font-mono font-black mb-2" style={{ color: C.white }}>
              Supply Chain<br />Analytics
            </h1>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.grey400 }}>
              A full-day immersive session guiding you from data theory to AI-powered decision making.
              No coding. Just business intelligence.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {["📅 09:00 – 16:00", "✅ SO 05 aligned", `⚡ ${filledInsights}/4 insights saved`].map(label => (
                <div key={label} className="rounded-lg px-4 py-2 text-sm font-mono"
                  style={{ background: "rgba(217,119,6,0.1)", border: `1px solid ${C.crimson}`, color: C.crimson }}>
                  <span className="font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning outcomes */}
          <div className="rounded-lg p-5" style={{ background: C.grey100, border: `1px solid ${C.grey200}` }}>
            <h2 className="font-mono font-bold mb-1" style={{ color: C.grey700 }}>Learning Outcomes (SO 05)</h2>
            <p className="text-xs font-mono mb-4" style={{ color: C.grey400 }}>Upon completion you will be able to:</p>
            <div className="space-y-2">
              {[
                "Identify and collect relevant supply chain data from IoT, ERP, social media and external sources",
                "Apply AI/ML analytics tools to identify meaningful patterns and trends in complex datasets",
                "Translate analytic insights into data-driven decisions and communicate them to stakeholders",
              ].map((o, i) => (
                <div key={i} className="flex gap-3 rounded-lg p-3" style={{ background: "#0a0e1a", border: `1px solid ${C.grey200}` }}>
                  <span className="w-6 h-6 rounded-full text-xs flex-shrink-0 flex items-center justify-center font-mono font-bold"
                    style={{ background: C.crimson, color: "#020617" }}>{i + 1}</span>
                  <p className="text-sm" style={{ color: C.grey600 }}>{o}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-lg p-5" style={{ background: C.grey100, border: `1px solid ${C.grey200}` }}>
            <h2 className="font-mono font-bold mb-4" style={{ color: C.grey700 }}>📅 Day Schedule</h2>
            <AgendaTimeline activeModule={activeTab} onSelect={handleModuleSelect} />
          </div>
        </div>
      );
    }

    if (activeTab === "tools")    return <ToolsPage />;
    if (activeTab === "insights") return <InsightsDashboard insights={insights} />;
    if (MODULES[activeTab])       return <ModuleContent moduleKey={activeTab} insights={insights} onSave={saveInsight} />;
    return null;
  };

  return (
    <div className="min-h-screen" style={{ background: "#020617", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Header / nav ── */}
      <header className="sticky top-0 z-50" style={{ background: C.purple, borderBottom: `1px solid ${C.grey200}`, boxShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg transition-opacity hover:opacity-70"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <div className="w-5 h-0.5 mb-1" style={{ background: C.crimson }} />
              <div className="w-5 h-0.5 mb-1" style={{ background: C.crimson }} />
              <div className="w-5 h-0.5"     style={{ background: C.crimson }} />
            </button>
            <div>
              <p className="text-xs font-mono font-medium tracking-widest uppercase" style={{ color: C.crimson }}>MBA Masterclass</p>
              <h1 className="font-mono font-black text-base leading-tight" style={{ color: C.white }}>Supply Chain Analytics</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {filledInsights > 0 && (
              <div className="text-xs font-mono px-3 py-1 rounded-full font-bold"
                style={{ background: C.crimson, color: "#020617" }}>
                {filledInsights} insights ✓
              </div>
            )}
          </div>
        </div>

        {/* Desktop nav tabs */}
        <div className="hidden md:block" style={{ borderTop: `1px solid ${C.grey200}` }}>
          <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto">
            {navItems.map(item => (
              <button key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className="px-4 py-2.5 text-sm font-mono font-medium whitespace-nowrap transition-colors"
                style={{
                  color: activeTab === item.id ? C.crimson : C.grey400,
                  borderBottom: activeTab === item.id ? `2px solid ${C.crimson}` : "2px solid transparent",
                  background: "transparent",
                }}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Mobile sidebar ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 shadow-2xl pt-20 px-4"
            style={{ background: C.purple, borderRight: `1px solid ${C.grey200}` }}>
            {navItems.map(item => (
              <button key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg mb-1 text-sm font-mono font-medium transition-opacity"
                style={{
                  background: activeTab === item.id ? C.crimson : "transparent",
                  color: activeTab === item.id ? "#020617" : C.grey400,
                }}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-16">
        {renderContent()}
      </main>

      {/* ── Mobile bottom nav ── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-30"
        style={{ background: C.purple, borderTop: `1px solid ${C.grey200}` }}>
        <div className="flex overflow-x-auto">
          {navItems.slice(0, 6).map(item => (
            <button key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className="flex-1 min-w-12 flex flex-col items-center py-2 text-xs font-mono transition-colors"
              style={{ color: activeTab === item.id ? C.crimson : C.grey400 }}>
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs leading-tight">{item.label.split(" ")[0]}</span>
            </button>
          ))}
          <button onClick={() => setActiveTab("insights")}
            className="flex-1 min-w-12 flex flex-col items-center py-2 text-xs font-mono transition-colors"
            style={{ color: activeTab === "insights" ? C.crimson : C.grey400 }}>
            <span className="text-lg relative">
              ⚡
              {filledInsights > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                  style={{ background: C.crimson, color: "#020617", fontSize: "8px" }}>
                  {filledInsights}
                </span>
              )}
            </span>
            <span>Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
}
