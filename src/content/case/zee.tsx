// src/content/case/zee.tsx
export default function ZeeCase() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Zee Media — React & System Architecture Internship</h1>
      <p><strong>Role:</strong> React & System Architecture Intern • <strong>Period:</strong> May–Sep 2022</p>
      <p><strong>Stack:</strong> React, TypeScript, System Design</p>

      <h2>Highlights</h2>
      <ul>
        <li>Refactored component trees to cut unnecessary re-renders.</li>
        <li>Standardized ESLint/Prettier; added CI to catch regressions.</li>
        <li>Worked on auth/session flow and API consumption patterns.</li>
      </ul>

      <h2>Impact</h2>
      <ul>
        <li>Snappier UI; improved PR turnaround.</li>
        <li>More reliable deploys with basic test gates.</li>
      </ul>

      <h2>What I’d improve</h2>
      <ul>
        <li>Design tokens + storybook for shared components.</li>
        <li>Observability around API failures in the UI.</li>
      </ul>
    </article>
  );
}