/**
 * DRAFTED CONTENT — needs client sign-off.
 *
 * The PRD gives the nine step names and nothing else, identical for all twelve
 * services. This expands each step into what actually happens, what X9 needs
 * from the client, and what the client walks away with. The three-column shape
 * is deliberate: "what we need from you" is what makes an agency process page
 * read as operationally real rather than as a stock diagram.
 */

export interface ProcessStep {
  n: number;
  name: string;
  summary: string;
  /** What X9 does. */
  activities: string[];
  /** What the client has to provide for the step to close. */
  needs: string;
  /** What the client receives when it closes. */
  output: string;
}

export const PROCESS: ProcessStep[] = [
  {
    n: 1,
    name: "Discovery",
    summary:
      "Establish what the business actually needs before anyone proposes a solution.",
    activities: [
      "Stakeholder interviews",
      "Current-state audit of brand, channels and systems",
      "Commercial goals and constraints",
      "Success criteria agreed in writing",
    ],
    needs: "Access to the people who own the outcome, and honest numbers.",
    output: "Discovery summary with agreed objectives and success criteria.",
  },
  {
    n: 2,
    name: "Research",
    summary: "Replace assumptions with evidence about the market and audience.",
    activities: [
      "Competitor and category analysis",
      "Audience and customer research",
      "Keyword, trend and channel research",
      "Technical or operational baseline",
    ],
    needs: "Existing analytics, CRM exports and past campaign data.",
    output: "Research findings with the implications called out, not just data.",
  },
  {
    n: 3,
    name: "Strategy",
    summary: "Decide the approach, the sequence, and what is deliberately not being done.",
    activities: [
      "Positioning and messaging decisions",
      "Channel and budget allocation",
      "Measurement framework and KPI targets",
      "Trade-offs made explicit",
    ],
    needs: "A decision-maker available to approve direction.",
    output: "Strategy document with the measurement framework attached.",
  },
  {
    n: 4,
    name: "Planning",
    summary: "Turn the strategy into a dated, owned, resourced plan.",
    activities: [
      "Scope broken into deliverables",
      "Timeline with dependencies",
      "Owners assigned on both sides",
      "Review and approval gates scheduled",
    ],
    needs: "Named client-side owner and realistic review availability.",
    output: "Project plan, delivery schedule and RACI.",
  },
  {
    n: 5,
    name: "Design / Execution",
    summary: "Build the work.",
    activities: [
      "Creative, content or engineering production",
      "Internal quality checks before anything is shown",
      "Progress visible against the plan",
    ],
    needs: "Brand assets, access credentials, and timely answers to blockers.",
    output: "Work in progress, shared at the agreed checkpoints.",
  },
  {
    n: 6,
    name: "Review",
    summary: "Check the work against the success criteria set in Discovery.",
    activities: [
      "Internal review against brief and brand",
      "Accessibility, performance or compliance checks where relevant",
      "Consolidated feedback round",
    ],
    needs: "Feedback consolidated into one voice, not conflicting notes.",
    output: "Reviewed work with a documented change list.",
  },
  {
    n: 7,
    name: "Client Approval",
    summary: "A recorded decision, so nothing ships on an assumption.",
    activities: [
      "Final walkthrough",
      "Sign-off captured in writing",
      "Any out-of-scope requests logged and quoted separately",
    ],
    needs: "Sign-off from the person who can actually give it.",
    output: "Approved deliverables and a clear scope boundary.",
  },
  {
    n: 8,
    name: "Delivery",
    summary: "Hand over in a form the client owns and can operate.",
    activities: [
      "Launch or deployment",
      "Source files, accounts and credentials transferred",
      "Documentation and team walkthrough",
    ],
    needs: "The right people in the room for handover.",
    output: "Live work, owned assets, documentation and training.",
  },
  {
    n: 9,
    name: "Optimization",
    summary: "Measure against the KPIs agreed in Strategy, then improve.",
    activities: [
      "Performance reporting against targets",
      "Testing and iteration",
      "Recommendations for the next cycle",
    ],
    needs: "Continued access to performance data.",
    output: "Reporting, an optimisation log, and a recommended next cycle.",
  },
];
